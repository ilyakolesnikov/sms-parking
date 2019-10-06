import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import styles from './CreateNewZoneBtn.module.css';

const CreateNewZoneBtn = ({ className, onClick }) => {
    const fabClasses = { primary: className };

    return (
        <div className={styles.root}>
            <Fab
                color="primary"
                onClick={onClick}
                classes={fabClasses}
            >
                <AddIcon/>
            </Fab>
        </div>
    );
};

export default CreateNewZoneBtn;