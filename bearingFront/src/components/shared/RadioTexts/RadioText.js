import styles from './RadioText.module.css';

function RadioText({
    checked,
    accessOtherPages,
    handleClick,
    typeGroup,
    typeButton,
    text
}) {

    const textClassName = checked
        ? styles.textActive
        : accessOtherPages
            ? styles.textNotActive
            : styles.textNotDisabled;

    return (
        <div className={textClassName} onClick={() => handleClick(typeGroup, typeButton)}>
            <div>{text}</div>
            <div className={styles.underline}></div>
        </div>
    );
}

export default RadioText;