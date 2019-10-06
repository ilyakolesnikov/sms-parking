import React, { useContext } from 'react';
import ZoneItem from '../ZoneItem';

import { StoreContext } from '../../providers/StoreProvider';

const ZonesList = () => {
    const { zones, deleteZone, licenseCode } = useContext(StoreContext);

    const zonesList = Object.values(zones)
        .sort((a, b) => a.id - b.id);

    return (
        <div>
            {zonesList.map((zone, idx) => (
                <ZoneItem
                    key={idx}
                    licenseCode={licenseCode}
                    onDelete={deleteZone}
                    {...zone}
                />
            ))}
        </div>
    );
}

export default ZonesList;