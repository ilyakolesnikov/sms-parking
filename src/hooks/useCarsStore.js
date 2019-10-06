import useLocalStorage from './useLocalStorage';
import { DATA_KEYS } from '../constants/store';

const initialCarData = {
    licenseCode: ''
};

const useCarsStore = () => {
    const [carData, setCarData] = useLocalStorage(DATA_KEYS.CAR, initialCarData);

    return {
        ...carData,
        setCarData,
    };
};

export default useCarsStore;

