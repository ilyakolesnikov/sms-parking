import React, { useState, useCallback, useContext } from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { StoreContext } from '../../providers/StoreProvider';
import { letterRegex } from '../../constants/licenseCode';

import styles from './CarInfo.module.css';

const LicenseCodeEditField = ({ licenseCode, onSave }) => {
    const [value, setValue] = useState(licenseCode || '');

    const onChange = useCallback(({ target }) => {
        target && setValue(target.value);
    }, [setValue]);
    const onBlur = useCallback(() => {
        onSave(value);
    }, [onSave, value]);

    const classes = classNames(styles.licenseCode, styles.licenseCodeInput);

    return (
        <InputMask
            mask="c999cc999"
            formatChars={{
                '9': '[0-9]',
                'c': letterRegex
            }}
            maskChar=""
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={classes}
            placeholder="ГОСНОМЕР"
        />
    );
}

const CarInfo = () => {
    const { name, licenseCode, setCarData } = useContext(StoreContext);
    const [isEditMode, setIsEditMode] = useState(!licenseCode);
    const onToggleEditMode = useCallback(() => {
        setIsEditMode(true);
    }, [setIsEditMode]);
    const onSaveCode = useCallback((code) => {
        setIsEditMode(false);
        setCarData({ name, licenseCode: code });
    }, [name, setCarData, setIsEditMode]);

    return (
        <div>
            {name}
            {isEditMode ?
                <LicenseCodeEditField  
                    licenseCode={licenseCode}
                    onSave={onSaveCode}
                /> :
                <div
                    onClick={onToggleEditMode}
                    className={styles.licenseCode}
                >{licenseCode}</div>
            }
        </div>
    );
};

export default CarInfo;