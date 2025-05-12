"use client";

import React from 'react';
import dynamic from "next/dynamic";
import QueOfrecemos from '@/componentes/QueOfrecemos/QueOfrecemos';
import Servicios from '@/componentes/Servicios/Servicios';
import QuieroMiSpazio from './quiero-mi-spazio/page';

const Home = dynamic(() => import("@/componentes/Home/Home"));

export default function HomePage() {
  return (
    <div>
      <main style={{ backgroundColor: "#000" }}>
        <Home />
        <QueOfrecemos />
        {/* <Servicios /> */}
        {/* <QuieroMiSpazio /> */}
      </main>
    </div>
  );
}
