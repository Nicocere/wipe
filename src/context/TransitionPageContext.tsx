"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  nextPath: string;
  setTransitionState: (value: boolean, path?: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState('');

  const setTransitionState = useCallback((value: boolean, path?: string) => {
    setIsTransitioning(value);
    if (path) {
      setNextPath(path);
    }
  }, []);

  return (
    <TransitionContext.Provider 
      value={{
        isTransitioning,
        nextPath,
        setTransitionState
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  
  return context;
};