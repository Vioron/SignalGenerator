import React from 'react';
import styles from './Calculation.module.css';

function Calculation({
    title,
    value,
    type,
    minus = () => { },
    plus = () => { }
}) {

    const icon_left = '<';
    const icon_right = '>';

    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.calculation}>
                <div className={styles.minus} onClick={() => minus(type)}>
                    <div className={styles.icon_left}>{icon_left}</div>
                </div>
                <div className={styles.calculationValue}>{value}</div>
                <div className={styles.plus} onClick={() => plus(type)}>
                    <div className={styles.icon_right}>{icon_right}</div>
                </div>
            </div>
        </div>
    );
}

export default Calculation;