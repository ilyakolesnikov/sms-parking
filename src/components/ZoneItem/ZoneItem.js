import React, { useState, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useLongClick from '../../hooks/useLongClick';

import styles from './ZoneItem.module.css';

const MOS_PARKING_PHONE = '7757';

// TODO: add ability to edit item

function ZoneItem({ id, zoneId, name, address, licenseCode, onDelete }) {
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const { onTouchStart, onTouchEnd } = useLongClick((event) => {
        setShowDeleteOverlay(true);
    });

    const handleDeleteCancel = useCallback(() => {
        setShowDeleteOverlay(false);
    }, [setShowDeleteOverlay]);
    const handleDeleteZone = useCallback(() => {
        setShowDeleteOverlay(false);
        onDelete(id);
    }, [id, onDelete])

    const link = smsLinkFactory({ zoneId, licenseCode });
    const paperClasses = { root: styles.root };
    const place = `${address} (Зона ${zoneId})`;

    return (
        <Paper
            classes={paperClasses}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
        >
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                <div className={styles.place}>{place}</div>
            </div>
            <a href={link}>
                <button className={styles.parkingBtn}>P</button>
            </a>
            {showDeleteOverlay &&
                <div className={styles.deleteOverlay}>
                    <Button
                        className={styles.utilButton}
                        onClick={handleDeleteCancel}
                    >
                        Отмена
                    </Button>
                    <Button
                        className={styles.utilButton}
                        color="secondary"
                        onClick={handleDeleteZone}
                    >
                        Удалить
                    </Button>
                </div>
            }
        </Paper>
    );
}

const smsLinkFactory = ({ zoneId, licenseCode }) => {
    const body = encodeURI(`${zoneId}*${licenseCode}*1`);

    return `sms://${MOS_PARKING_PHONE}/?body=${body}`;
};

export default ZoneItem;