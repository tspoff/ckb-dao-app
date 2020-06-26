// src/contexts/index.tsx
import React from 'react';
import RootStore from '../stores/RootStore';

export const ServicesContext = React.createContext({
    root: new RootStore(),
});

export const useServices = () => React.useContext(ServicesContext);
