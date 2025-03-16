import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import clientPromise from "../../../lib/mongodb"

export async function GET(request: Request) {
    try {
        const uid = request.headers.get('uid');
        console.log("UID ", uid)
        if (!uid) {
            throw new Error('No se proporcionó el UID');
        }
         console.log("clientPromise ", await clientPromise)
        
        // Conectar a MongoDB
        const client = await clientPromise;
        const db = client.db("spazio_database");
        console.log("DB ", db)

        // Buscar el documento del usuario por uidFirebase
        const userDocument = await db.collection("spazio_collection").findOne({ uidFirebase: uid });
        console.log("USER DOCUMENT get  ", userDocument)

        if (!userDocument) {
            throw new Error('Usuario no encontrado');
        }

        
        // console.log("userDocument.contenido", userDocument.contenido)
        return NextResponse.json({ contenido: userDocument.contenido, userData: userDocument });

    } catch (error) {
        console.log('Hubo un error al procesar la solicitud de peticion: ', error);
        return NextResponse.json({ error: error });
    }
}