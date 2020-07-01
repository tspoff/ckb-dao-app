// src/contexts/index.tsx
import React from 'react';
import RootStore from '../stores/RootStore';

export const StoresContext = React.createContext({
    root: new RootStore(),
});

export const useStores = () => React.useContext(StoresContext);
