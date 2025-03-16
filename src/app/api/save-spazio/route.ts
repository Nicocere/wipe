import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import clientPromise from "../../../lib/mongodb"

export async function POST(request: Request) {
    const body = await request.json();
    const { uid, contenido } = body;

    console.log("BOODYY ", contenido)
    try {
        // Conectar a MongoDB
        const client = await clientPromise;
        const db = client.db("spazio_database");

        // Buscar el documento del usuario por uidFirebase
        const userDocument = await db.collection("spazio_collection").findOne({ uidFirebase: uid });

        console.log("USER DOCUMENT ", userDocument)
        if (!userDocument) {
            throw new Error('Usuario no encontrado');
        }

        // Actualizar el documento del usuario
        const result = await db.collection("spazio_collection").updateOne(
            { uidFirebase: uid },
            { $set: { contenido, updatedAt: new Date() } }
        );

        return NextResponse.json({ message: 'Datos guardados exitosamente', result });

    } catch (error) {
        console.log('Hubo un error al procesar la solicitud: ', error);
        return NextResponse.json({ error: (error as Error).message });
    }
}

export async function GET(request: Request) {
    try {
        const uid = request.headers.get('uid');
        console.log("UID ", uid)
        if (!uid) {
            throw new Error('No se proporcionó el UID');
        }
        
        // Conectar a MongoDB
        const client = await clientPromise;
        const db = client.db("spazio_database");

        // Buscar el documento del usuario por uidFirebase
        const userDocument = await db.collection("spazio_collection").findOne({ uidFirebase: uid });

        if (!userDocument) {
            throw new Error('Usuario no encontrado');
        }

        
        // console.log("userDocument.contenido", userDocument.contenido)
        return NextResponse.json({ contenido: userDocument.contenido, userData: userDocument });

    } catch (error) {
        console.log('Hubo un error al procesar la solicitud de peticion: ', error);
        return NextResponse.json({ error: (error as Error).message });
    }
}