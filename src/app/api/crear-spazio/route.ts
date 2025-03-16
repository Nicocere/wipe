import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();

    console.log('body', body);

    try {
        // Serializar los datos en una cookie
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'userData',
            value: JSON.stringify(body),
            httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7, // 1 semana
            path: '/',
        });

        const response = NextResponse.json({ body });

        return response;
    } catch (error) {
        console.log('Hubo un error al procesar la solicitud: ', error);
        return NextResponse.json({ error: error });
    }
}
export async function GET() {
    try {
        const cookieStore = await cookies();
        const userDataCookie = cookieStore.get('userData');
        const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;

        return NextResponse.json({ userData });
    } catch (error) {
        console.log('Hubo un error al obtener las cookies: ', error);
        return NextResponse.json({ error: error });
    }
}