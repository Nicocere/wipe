"use client";


import { useState, useEffect } from 'react';

export const useDeviceDetect = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsSafari(/^((?!chrome|android).)*safari/i.test(userAgent));
    setIsMobile(/iphone|ipad|ipod|android|mobile/.test(userAgent));
    
  }, []);

  return { isIOS, isSafari, isMobile };
};