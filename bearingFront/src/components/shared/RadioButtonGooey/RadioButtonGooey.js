import styles from './RadioButtonGooey.module.css';

function RadioButtonGooey({
    type,
    defaultChecked,
    onClick,
    text,
}) {

    return (
        <div className={styles.radio}>
            <div className={styles.checkboxWrapper}>
                <div className={styles.cbx}>
                    <input id={type} name="cbx" type="radio" defaultChecked={defaultChecked} onClick={onClick} />
                    <label className={styles.label}></label>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                </div>
                {/*       Gooey       */}
                <svg version="1.1">
                    <defs>
                        <filter id="goo">
                            <fegaussianblur in="SourceGraphic" stdDeviation="4" result="blur"></fegaussianblur>
                            <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                            <feblend in="SourceGraphic" in2="goo-12"></feblend>
                        </filter>
                    </defs>
                </svg>
            </div >
            <div className={styles.divLabel}><label className={styles.label}>{text}</label></div>
        </div>
    );
}

export default RadioButtonGooey