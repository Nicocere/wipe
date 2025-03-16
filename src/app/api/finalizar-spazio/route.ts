import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import clientPromise from "@/lib/mongodb";
import fs from 'fs';
import path from 'path';
import { Octokit } from "@octokit/rest";

export async function POST(request: Request) {
    const body = await request.json();
    const { brandName, tipoSpazio } = body;

    // Obtén los tokens de las variables de entorno
    const githubToken = process.env.GITHUB_TOKEN;
    const vercelToken = process.env.VERCEL_TOKEN;

    if (!githubToken || !vercelToken) {
        throw new Error('GitHub y Vercel tokens son necesarios');
    }

    async function checkVercelProjectAvailability(projectName: string, vercelToken: string) {
        const response = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${vercelToken}`,
                'Content-Type': 'application/json',
            },
        });

        return response.status === 404; // Si el proyecto no existe, el estado será 404
    }

    async function createGitHubRepo(token: string) {
        const octokit = new Octokit({ auth: token });

        // Crear un nuevo repositorio
        const repoName = `${brandName}-${tipoSpazio}`;
        const { data: repo } = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            private: true,
        });

        // Crear un commit inicial con un archivo README.md
        const content = Buffer.from('# Proyecto E-commerce').toString('base64');
        await octokit.repos.createOrUpdateFileContents({
            owner: repo.owner.login,
            repo: repoName,
            path: 'README.md',
            message: 'Initial commit',
            content: content,
        });

        return {
            repoName,
            repoUrl: repo.html_url,
            repoId: repo.full_name,
            owner: repo.owner.login
        };
    }


    async function uploadDirectoryToGitHub(dirPath: string, repoName: string, basePath: string) {
        const octokit = new Octokit({ auth: githubToken });
        const filesToCommit: { path: string; content: string; }[] = [];

        async function uploadFile(filePath: string, repoName: string, basePath: string) {
            const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/'); // Asegurarse de que las rutas sean compatibles con GitHub
            const content = fs.readFileSync(filePath, 'utf8');
            filesToCommit.push({
                path: relativePath,
                content: Buffer.from(content).toString('base64'),
            });
        }

        async function processDirectory(currentPath: string, repoName: string, basePath: string) {
            const files = fs.readdirSync(currentPath);
            for (const file of files) {
                const filePath = path.join(currentPath, file);
                const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/'); // Asegurarse de que las rutas sean compatibles con GitHub

                // Filtrar archivos y directorios que no deseas subir
                if (relativePath.includes('node_modules') || relativePath.includes('.git') || relativePath.includes('.next') || relativePath.includes('build')) {
                    continue;
                }

                console.log("RELATIVE PATH", relativePath);
                if (fs.statSync(filePath).isDirectory()) {
                    await processDirectory(filePath, repoName, basePath);
                } else {
                    await uploadFile(filePath, repoName, basePath);
                }
            }
        }

        await processDirectory(dirPath, repoName, basePath);

        // Crear un commit con todos los archivos subidos
        for (const file of filesToCommit) {
            await octokit.repos.createOrUpdateFileContents({
                owner: (await octokit.users.getAuthenticated()).data.login,
                repo: repoName,
                path: file.path,
                message: `Add ${file.path}`,
                content: file.content,
            });
        }
    }

    async function deployToVercel(projectName: string, repoInfo: any, vercelToken: string) {
        console.log('Deploying to Vercel with the following details:');
        console.log('Project Name:', projectName);
        console.log('Repo Info:', repoInfo);

        // Primero crear el proyecto en Vercel
        const createProjectResponse = await fetch("https://api.vercel.com/v9/projects", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vercelToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: projectName,
                framework: 'nextjs',
            })
        });

        if (!createProjectResponse.ok) {
            const errorData = await createProjectResponse.json();
            throw new Error(`Error creando proyecto en Vercel: ${JSON.stringify(errorData)}`);
        }

        const projectData = await createProjectResponse.json();
        console.log('Project created:', projectData);

        const body = `{
            "name": "${projectName}",
            "gitSource": {
              "owner": "${repoInfo.owner}",
              "type": "github",
              "repoId": "${repoInfo.repoUrl}",
              "ref": "main"
            },
            "project": "${projectData.id}",
            "projectSettings": {
              "framework": "nextjs",
              "buildCommand": "npm run build",
              "outputDirectory": ".next",
              "nodeVersion": "18.x",
              "installCommand": "npm install"
            },
            "target": "production"
          }`


        // Luego crear el deployment
        const deploymentResponse = await fetch("https://api.vercel.com/v13/deployments", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vercelToken}`,
                'Content-Type': 'application/json',
            },
            body
        });

        if (!deploymentResponse.ok) {
            const errorData = await deploymentResponse.json();
            console.error('Deployment error details:', errorData);
            throw new Error(`Error en el deployment: ${JSON.stringify(errorData)}`);
        }

        const data = await deploymentResponse.json();
        console.log('Deployment successful:', data);

        return {
            deploymentUrl: data.url,
            deploymentId: data.id,
            projectId: projectData.id
        };
    }

    try {
        // Verificar disponibilidad del nombre del proyecto en Vercel
        const isAvailable = await checkVercelProjectAvailability(brandName, vercelToken);
        if (!isAvailable) {
            return NextResponse.json({ error: 'El nombre del proyecto no está disponible. Por favor, elige otro nombre.' });
        }

        // Definir la ruta del proyecto utilizando la plantilla [username]
        const projectPath = path.join(process.cwd(), 'src', 'app', tipoSpazio, '[username]');

        // Crear el repositorio en GitHub
        const repoInfo = await createGitHubRepo(githubToken);

        // Subir los archivos de la plantilla al repositorio
        await uploadDirectoryToGitHub(projectPath, repoInfo.repoName, projectPath);

        // Desplegar en Vercel
        const deployment = await deployToVercel(brandName, repoInfo, vercelToken);

        // Guardar en MongoDB
        const client = await clientPromise;
        const db = client.db("spazio_db");
        await db.collection("spazio_collection").insertOne({
            ...body,
            createdAt: new Date(),
            repoUrl: repoInfo.repoUrl,
            deploymentUrl: deployment.deploymentUrl,
            deploymentId: deployment.deploymentId
        });

        return NextResponse.json({
            success: true,
            repoUrl: repoInfo.repoUrl,
            deploymentUrl: deployment.deploymentUrl
        });

    } catch (error) {
        console.error('Error detallado:', error);
        return NextResponse.json({
            error: (error as Error).message,
            details: (error as any).response?.data || 'No additional details available'
        }, {
            status: 500
        });
    }
}