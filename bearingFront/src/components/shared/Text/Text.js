import React from 'react';
import styles from './Text.module.css';
import classNames from 'classnames';


function Text({
    text,
    typeColor = 'noPriority'
}) {

    return (
        <div className={typeColor == 'priority' ? styles.colorPriority : styles.color}>
            <div>{text}</div>
        </div>
    );
}

export default Text;
