import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    label: string;
    type: string;
    id: string;
    width?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, width }) => {
    return (
        <div className={styles.inputWrapper}>
            <div id={id} style={{width: width || '100%' }}>
                <input
                    type={type}
                    id={id}
                    className={styles.inputField}
                    aria-label={label}
                />
            <label htmlFor={id} className={styles.inputLabel}>{label}</label>
            </div>
        </div>
    );
};

export default InputField;