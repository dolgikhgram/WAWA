import React, { memo, useId, useState, useEffect, useRef } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    label: string;
    type: 'text' | 'email' | 'select' | 'textarea';
    id?: string;
    width?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    options?: { value: string; label: string }[];
    name?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = memo(({
                                                        label,
                                                        type,
                                                        id: externalId,
                                                        width = '100%',
                                                        value = '',
                                                        onChange,
                                                        options,
                                                        name,
                                                        required = false,
                                                        disabled = false,
                                                        placeholder
                                                    }) => {
    const internalId = useId();
    const id = externalId || internalId;
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Reset isOtherSelected when value changes from outside
        if (value && options && !options.find(opt => opt.value === value)) {
            setIsOtherSelected(true);
        } else if (value && options && options.find(opt => opt.value === value)) {
            setIsOtherSelected(false);
        }
    }, [value, options]);

    useEffect(() => {
        // Focus on text input when switching to "Other" mode
        if (isOtherSelected && textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [isOtherSelected]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        if (newValue === 'other') {
            setIsOtherSelected(true);
            // Trigger onChange with empty value to clear the input
            if (onChange) {
                const event = { ...e, target: { ...e.target, value: '' } };
                onChange(event);
            }
        } else {
            setIsOtherSelected(false);
            if (onChange) {
                onChange(e);
            }
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // If input is empty when losing focus, switch back to select mode
        if (!e.target.value.trim()) {
            setIsOtherSelected(false);
            if (onChange) {
                const event = {
                    ...e,
                    target: {
                        ...e.target,
                        value: '',
                        type: 'select'
                    }
                } as unknown as React.ChangeEvent<HTMLSelectElement>;
                onChange(event);
            }
        }
    };

    const renderInput = () => {
        if (type === 'select' && options) {
            if (isOtherSelected) {
                return (
                    <input
                        type="text"
                        id={id}
                        name={name}
                        className={styles.inputField}
                        aria-label={label}
                        value={value}
                        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                        onBlur={handleInputBlur}
                        required={required}
                        disabled={disabled}
                        autoComplete="off"
                        spellCheck="false"
                        placeholder={placeholder || "Enter game name"}
                        ref={textInputRef}
                    />
                );
            }

            return (
                <select
                    id={id}
                    name={name}
                    className={styles.inputField}
                    aria-label={label}
                    value={value}
                    onChange={handleSelectChange}
                    required={required}
                    disabled={disabled}
                >
                    <option value="" disabled>Select a game</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    <option value="other">Other</option>
                </select>
            );
        }

        if (type === 'textarea') {
            return (
                <textarea
                    id={id}
                    name={name}
                    className={`${styles.inputField} ${styles.textarea}`}
                    aria-label={label}
                    value={value}
                    onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={4}
                />
            );
        }

        return (
            <input
                type={type}
                id={id}
                name={name}
                className={styles.inputField}
                aria-label={label}
                value={value}
                onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                required={required}
                disabled={disabled}
                autoComplete="off"
                spellCheck="false"
                placeholder={placeholder || " "}
                ref={textInputRef}
            />
        );
    };

    return (
        <div className={styles.inputWrapper}>
            <div style={{ width }}>
                {renderInput()}
                <label
                    htmlFor={id}
                    className={`${styles.inputLabel} ${disabled ? styles.disabled : ''}`}
                >
                    {label}
                </label>
            </div>
        </div>
    );
});

InputField.displayName = 'InputField';

export default InputField;