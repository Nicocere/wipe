'use client';
import { useEffect } from 'react';

import fluidCursor from '@/hooks/useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-[2] pointer-events-none overflow-hidden h-screen max-h-screen'>
      <canvas id='fluid' className='w-[100%] top-0 left-0 block' style={{zIndex:'0',  position: 'fixed',height:'100%', width: '-webkit-fill-available' }} />
    </div>
  );
};
export default FluidCursor;