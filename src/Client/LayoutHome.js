"use client";

import GsapCursor from '@/componentes/Cursor/GsapCursor';
import FluidCursor from "@/componentes/Cursor/FluidCursor";
import {TransitionEffect} from '@/utils/TransitionPages/TransitionEffect'
import React from 'react';
import { useMediaQuery } from '@mui/material';
import NavBar from '@/componentes/NavBar/NavBar';

const ClientLayoutComponent = ({ children }) => {

  const isSmallScreen = useMediaQuery('(max-width: 600px)');


  return (
    <div style={{ transition: 'all 0.8s ease' }}>
                  <NavBar />

      {
        !isSmallScreen &&
        <>
          <GsapCursor />
          <FluidCursor />
        </>
      }
      {/* <TransitionEffect > */}

      {children}

      {/* </TransitionEffect> */}
    </div>
  );
};

export default ClientLayoutComponent;