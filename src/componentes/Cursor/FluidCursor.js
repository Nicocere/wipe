'use client';
import { useEffect } from 'react';

import fluidCursor from '@/hooks/useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-[1] pointer-events-none overflow-hidden h-screen max-h-screen'>
      <canvas id='fluid' className='w-[100%] top-0 left-0 block opacity-80' style={{
        zIndex:'0', 
        position: 'fixed',
        height:'100%', 
        top: '0',
        width: '100%', // Usamos 100% en lugar de -webkit-fill-available para mejor soporte
        filter: 'blur(0px)', // Ligero blur para suavizar el efecto
        // mixBlendMode: 'plus-lighter', // Mejora la integración con fondos
        pointerEvents: 'none', // Asegura que no interfiera con interacciones
        transform: 'translate3d(0,0,0)' // Activa aceleración hardware
      }} />
    </div>
  );
};
export default FluidCursor;