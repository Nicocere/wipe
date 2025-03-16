"use client";

import React, { useEffect, useState } from 'react';
import HomeBanner from "@/componentes/HomeBanner/HomeBanner";
import styles from '@/app/page.module.css';
import dynamic from "next/dynamic";
import HomePlanes from "@/componentes/HomePlanes/HomePlanes";
import HomeServicios from "@/componentes/HomeServicios/HomeServicios";
import ComoFunciona from "@/componentes/ComoFunciona/ComoFunciona";
import NavBar from "@/componentes/NavBar/NavBar";
import ProjectExamples from "@/componentes/PageExamples/ProjectExamples";
import SecondTextSpazio from "@/componentes/TextSpazio/SecondTextSpazio";
import ScrollDimension from "@/componentes/ScrollDimension/ScrollDimension";
import Skill from '@/componentes/Carousel/TechSkills/TechSkills';
import { useMediaQuery } from "@mui/material";
import QueOfrecemos from '@/componentes/QueOfrecemos/QueOfrecemos';
import Servicios from '@/componentes/Servicios/Servicios';
import QuieroMiEspazio from './quiero-mi-spazio/page';

const TextSpazio = dynamic(() => import("@/componentes/TextSpazio/TextSpazio"));
const Home = dynamic(() => import("@/componentes/Home/Home"));
const CarouselPages = dynamic(() => import("@/componentes/Carousel/Pages-examples/CarouselPages"));
const ViewsPagesCarousel = dynamic(() => import('@/componentes/Carousel/ViewsPages/ViewsPagesCarousel'));

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