import React, { useRef, useCallback, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import GetAppIcon from '@material-ui/icons/GetApp';

import useFileAPI from '../../hooks/useFileAPI';
import { StoreContext } from '../../providers/StoreProvider';

import styles from './FilesToolbar.module.css';

const FilesToolbar = () => {
    const { isFileAPISupported, saveFile, loadFile } = useFileAPI();
    const { getData, setData } = useContext(StoreContext);
    const fileInputRef = useRef(null);

    const onSaveClick = useCallback(() => {
        const dataString = JSON.stringify(getData());
        const fileName = generateFileName();

        saveFile(dataString, fileName);
    }, [getData, saveFile]);

    const onLoadButtonClick = useCallback(() => {
        fileInputRef && fileInputRef.current &&
            fileInputRef.current.click();
    }, []);

    const onLoadFile = useCallback((event) => {
        console.log(event.target.files);

        loadFile(event)
            .then(data => setData(data))
            .catch((err) => console.log(err)); // TODO: add valid error message in ui
    }, [loadFile, setData]);

    if (!isFileAPISupported) {
        return null;
    }

    return (
        <div className={styles.root}>
            <input
                type="file"
                ref={fileInputRef}
                className={styles.fileInput}
                onChange={onLoadFile}
            />
            <IconButton
                className={styles.button}
                onClick={onLoadButtonClick}
            >
                <FolderOpenIcon/>
            </IconButton>
            <IconButton
                className={styles.button}
                onClick={onSaveClick}
            >
                <GetAppIcon/>
            </IconButton>
        </div>
    )
};

const generateFileName = () => {
    return 'sms-parking-data.json';
};

export default FilesToolbar;