import React, { memo, useId } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    label: string;
    type: string;
    id?: string;
    width?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = memo(({ 
    label, 
    type, 
    id: externalId, 
    width = '100%',
    value,
    onChange
}) => {
    const internalId = useId();
    const id = externalId || internalId;
    
    return (
        <div className={styles.inputWrapper}>
            <div style={{ width }}>
                <input
                    type={type}
                    id={id}
                    className={styles.inputField}
                    aria-label={label}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                    spellCheck="false"
                />
                <label 
                    htmlFor={id} 
                    className={`${styles.inputLabel} ${value && value.length > 0 ? styles.hideLabel : ''}`}
                >
                    {label}
                </label>
            </div>
        </div>
    );
});

InputField.displayName = 'InputField';

export default InputField;