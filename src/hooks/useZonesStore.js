import useLocalStorage from './useLocalStorage';
import { DATA_KEYS } from '../constants/store';

const initialZones = [];

const useZonesStore = () => {
    const [zones, setZones] = useLocalStorage(DATA_KEYS.ZONES, initialZones);

    function createZone(data) {
        const newId = (new Date()).getTime();
        const newZoneData = { ...data, id: newId };
        const newZones = {
            ...zones,
            [newId]: newZoneData
        };

        setZones(newZones);

        return newZones;
    };

    function setZoneById(id, data) {
        const newZones = { ...zones };

        newZones[id] = { ...newZones[id], data };

        setZones(newZones);
    };

    function deleteZone(id) {
        const newZones = { ...zones };

        delete newZones[id];

        setZones(newZones);
    };

    return {
        zones,
        setZones,
        createZone,
        setZoneById,
        deleteZone,
    };
};

export default useZonesStore;