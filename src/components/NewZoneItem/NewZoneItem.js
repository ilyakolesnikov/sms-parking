import React, { useState, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './NewZoneItem.module.css';

const onChangeGenerator = (func) =>
    (event) =>
        func(event.target.value);

export default function NewZoneItem({ onCreateZone, onCancel }) {
    const [ name, setName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ zoneId, setZoneId ] = useState('');

    const handleCreateZone = useCallback(() => {
        onCreateZone({ name, address, zoneId });
    }, [onCreateZone, name, address, zoneId]);

    const paperClasses = { root: styles.root };

    return (
        <Paper classes={paperClasses}>
            <TextField
                label="Имя места"
                value={name}
                className={styles.inputField}
                onChange={onChangeGenerator(setName)}
            />
            <TextField
                label="Адрес места"
                value={address}
                className={styles.inputField}
                onChange={onChangeGenerator(setAddress)}
            />
            <TextField
                required
                label="Номер зоны"
                value={zoneId}
                className={styles.inputField}
                onChange={onChangeGenerator(setZoneId)}
            />
            <div className={styles.actions}>
                <Button
                    className={styles.utilButton}
                    onClick={onCancel}
                >
                    Отмена
                </Button>
                <Button
                    className={styles.utilButton}
                    variant="contained"
                    color="primary"
                    onClick={handleCreateZone}
                >
                    Создать
                </Button>
            </div>
        </Paper>
    );
}