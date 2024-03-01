import styles from './Button.module.css';

function Button({
    text,
    onClick = () => { },
    disabled,
}) {

    return (
        <div>
            <button
                className={styles.buttonCastom}
                role="button"
                onClick={onClick}
                disabled={disabled}
            >
                <span className={styles.text}>{text}</span>
            </button>
        </div>
    );
}

export default Button