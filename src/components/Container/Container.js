import React, { useContext, useState, useCallback } from 'react';
import { StoreContext } from '../../providers/StoreProvider';
import NewZoneItem from '../NewZoneItem';
import ZonesList from '../ZonesList';
import CreateNewZoneBtn from '../CreateNewZoneBtn';

import styles from './Container.module.css';

const Container = () => {
    const { createZone, licenseCode } = useContext(StoreContext);

    const [showCreateZoneBtn, setShowCreateZoneBtn] = useState(true);

    const onCreateNewZoneButtonClick = useCallback(() => {
        setShowCreateZoneBtn(false);
    }, [setShowCreateZoneBtn]);
    const onSaveNewZone = useCallback((data) => {
        createZone(data);
        setShowCreateZoneBtn(true);
    }, [createZone, setShowCreateZoneBtn]);

    if (!licenseCode){
        return (
            <div className={styles.warningMessageWrapper}>
                <p className={styles.warningMessage}>
                    Введите гос. номер вашего автомобиля, чтобы начать работу
                </p>
            </div>
        );
    } 

    const actionComponent = showCreateZoneBtn ? (
        <CreateNewZoneBtn
            className={styles.showNewZoneBtn}
            onClick={onCreateNewZoneButtonClick}
        />
    ) : <NewZoneItem onCreateZone={onSaveNewZone} />;

    return (
        <div className={styles.container}>
            <ZonesList />
            {actionComponent}
        </div>
    )
};

export default Container;
