"use client";

import React, {  } from 'react';
import dynamic from "next/dynamic";
import QueOfrecemos from '@/componentes/QueOfrecemos/QueOfrecemos';
import Servicios from '@/componentes/Servicios/Servicios';
import QuieroMiEspazio from './quiero-mi-spazio/page';

const Home = dynamic(() => import("@/componentes/Home/Home"));

export default function HomePage() {


    return (
        <div>
            <main >
                <Home />
                <QueOfrecemos />
                <Servicios />

                <QuieroMiEspazio />
        
            </main>
        </div>
    );
}