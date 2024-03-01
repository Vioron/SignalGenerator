import styles from './FormSettingOptionsButton.module.css';


import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'components/shared/Button/Button';

function FormSettingOptionsButton({
    onClick = () => { },
    type,
    disabled
}) {
    const text = useSelector((state) => state.FormStartParameters.button[type].text);

    return (
        <div className={styles.buttonContainer}>
            <Button text={text} onClick={onClick} disabled={disabled} />
        </div>
    );
}

export default FormSettingOptionsButton;