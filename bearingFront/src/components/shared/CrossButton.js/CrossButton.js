import styles from './CrossButton.module.css';

function CrossButton({ onClick }) {
    return (
        <div className={styles.delete} onClick={onClick}>
            X
        </div>
    );
}

export default CrossButton;
