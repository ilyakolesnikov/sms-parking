import React, { useState, useCallback } from 'react';

import StoreProvider from './providers/StoreProvider';

import FilesToolbar from './components/FilesToolbar';
import Container from './components/Container';
import CarInfo from './components/CarInfo';


import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.root}>
            <StoreProvider>
                <div className={styles.header}>
                    <CarInfo />
                    <FilesToolbar />
                </div>
                <Container/>
                <div className={styles.helpMessage}>
                    Заблудились? Откройте карту на&nbsp;
                    <a
                        href="https://parking.mos.ru/"
                        tatget="_blank"
                        rel="noopener norefferer"
                    >
                    сайте Московского Паркинга
                    </a>
                </div>
            </StoreProvider>
        </div>
    );
};

export default App;
