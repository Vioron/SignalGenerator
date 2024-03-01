import styles from './DefectItemForm.module.css';
import Text from 'components/shared/Text/Text';

import CrossButton from 'components/shared/CrossButton.js/CrossButton';
import RadialBallBearing from 'api/RadialBallBearing/RadialBallBearing';
import { useEffect } from 'react';


function DefectItemForm({
    defectShape,
    startAngle,
    finishAngle,
    depth,
    number,
    deleteFun,
    index
}) {

    const textDefectShape = {
        'Sector': 'Сектор',
        'Segment': 'Сегмент',
        'Triangle': 'треугольник'
    }[defectShape];

    return (
        <div className={styles.container}>

            <div className={styles.info}>
                <div className={styles.itemContainer}>
                    <Text text='Форма дефекта: ' />
                    <Text text={textDefectShape} typeColor='priority' />
                </div>
                <div className={styles.itemContainer}>
                    <Text text='Начальный угол дефекта:' />
                    <Text text={startAngle} typeColor='priority' />
                    <Text text='°' />
                </div>
                <div className={styles.itemContainer}>
                    <Text text='Конечный угол дефекта:' />
                    <Text text={finishAngle} typeColor='priority' />
                    <Text text='°' />
                </div>
                {defectShape != 'Segment' && <div className={styles.itemContainer}>
                    <Text text='Глубина дефекта:' />
                    <Text text={depth} typeColor='priority' />
                    <Text text='мкм' />
                </div>}
                {number &&
                    <div className={styles.itemContainer}>
                        <Text text='Номер тела качения:' />
                        <Text text={number} typeColor='priority' />
                    </div>}
            </div>
            <CrossButton onClick={() => deleteFun(index)} />
        </div>
    );
}

export default DefectItemForm