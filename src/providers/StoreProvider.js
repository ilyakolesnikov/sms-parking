import React, { createContext, useCallback } from 'react';
import useCarsStore from '../hooks/useCarsStore';
import useZonesStore from '../hooks/useZonesStore';
import { DATA_KEYS } from '../constants/store';

export const StoreContext = createContext({});

const StoreProvider = ({ children }) => {
    const { licenseCode, setCarData } = useCarsStore();
    const zonesData = useZonesStore();
    const { zones, setZones } = zonesData || {};

    const getData = useCallback(() => ({
        [DATA_KEYS.CAR]: { licenseCode },
        [DATA_KEYS.ZONES]: zones
    }), [licenseCode, zones]);

    const setData = useCallback((data) => {
        if (!data) {
            return;
        }
    
        const newCarData = data[DATA_KEYS.CAR] || {};
        const newZones = data[DATA_KEYS.ZONES];
    
        newCarData && setCarData(newCarData);
        newZones && setZones(newZones);
    }, [setCarData, setZones]);

    return (
        <StoreContext.Provider
            value={{
                licenseCode,
                setCarData,
                ...zonesData,
                setData,
                getData,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;