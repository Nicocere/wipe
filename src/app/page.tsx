"use client";

import React from 'react';
import dynamic from "next/dynamic";
import QueOfrecemos from '@/componentes/QueOfrecemos/QueOfrecemos';
import Servicios from '@/componentes/Servicios/Servicios';
import QuieroMiSpazio from './quiero-mi-spazio/page';

const HomeBanner = dynamic(() => import("@/componentes/HomeBanner/HomeBanner"));

export default function HomePage() {
  return (
    <div>
      <main >
        <HomeBanner />
        <QueOfrecemos />
        {/* <Servicios /> */}
        {/* <QuieroMiSpazio /> */}
      </main>
    </div>
  );
}
