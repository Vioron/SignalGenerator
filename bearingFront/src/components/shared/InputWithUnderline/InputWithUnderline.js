import styles from './InputWithUnderline.module.css';
import classNames from 'classnames';

function InputWithUnderline({
    value,
    type,
    text,
    units,
    onChange,
    correct
}) {

    const inputColor = correct ? styles.inputCorrect : styles.inputNotCorrect;

    return (
        <div className={styles.container}>
            <div className={styles.inputData}>
                <input
                    value={value}
                    className={classNames(styles.input, inputColor)}
                    type="number"
                    name={type}
                    id={type}
                    onChange={(e) => onChange(e)}
                    required
                />
                <div className={styles.underline}></div>
                <label>{text}, {units}</label>
            </div>
        </div>
    );
}

export default InputWithUnderline;