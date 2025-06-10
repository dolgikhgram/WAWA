import React, { useState, ChangeEvent } from 'react';
import styles from './Form.module.css'
import InputField from "../Content/FAQ/RegistrationQuestion/InputField/InputField";
import { submitForm } from '../../services/formService';
import { trackFormStart, trackFormComplete, trackButtonClick, FORM_TYPES } from '../../services/analyticsService';

type FormPropsType = {
    closeFormHandler:()=>void,
    showFormOfGratitudeHandler:()=>void,
    selectedGame?: string
}

const Form : React.FC<FormPropsType> = React.memo(({closeFormHandler, showFormOfGratitudeHandler, selectedGame}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        game: '',
        describe: ''
    });

    const gameOptions = [
        { value: 'Destiny 2', label: 'Destiny 2' },
        { value: 'CoD MW2', label: 'CoD MW2' },
        { value: 'WARZONE', label: 'WARZONE' },
        { value: 'BLACK OPS 6', label: 'BLACK OPS 6' },
        { value: 'CoD MW 3', label: 'CoD MW 3' },
        { value: 'SPACE MARINE 2', label: 'SPACE MARINE 2' },
        { value: 'ZOMBIES', label: 'ZOMBIES' }
    ];

    // Отслеживаем начало заполнения формы
    React.useEffect(() => {
        trackFormStart(FORM_TYPES.CONTACT_FORM);
    }, []);

    // Автоматически заполняем поле game при получении selectedGame
    React.useEffect(() => {
        if (selectedGame) {
            setFormData(prev => ({
                ...prev,
                game: selectedGame
            }));
        }
    }, [selectedGame]);

    const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const fieldName = id.replace('Form_', '').toLowerCase();
        setFormData(prev => ({
            ...prev,
            [fieldName]: event.target.value
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.border = '1px solid #ccc';
            e.target.style.setProperty('--check-display', 'block');
        } else {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.setProperty('--check-display', 'none');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isChecked) {
            alert('Пожалуйста, подтвердите условия перед отправкой');
            return;
        }

        if (!formData.name || !formData.email || !formData.game || !formData.describe) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitForm({
                name: formData.name,
                email: formData.email,
                game: formData.game,
                message: formData.describe
            });

            if (result.success) {
                trackFormComplete(FORM_TYPES.CONTACT_FORM, true);
                trackButtonClick('form_submit', 'form');

                // Очистка формы после успешной отправки
                setFormData({
                    name: '',
                    email: '',
                    game: '',
                    describe: ''
                });
                setIsChecked(false);

                // Показываем форму благодарности
                closeFormHandler();
                showFormOfGratitudeHandler();
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            trackFormComplete(FORM_TYPES.CONTACT_FORM, false);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div onClick={closeFormHandler} className={styles.overlay}/>
            <div className={styles.container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className={styles.textContainer}>
                                <div className={styles.mainTitle}>Fill in the details</div>
                                <div className={styles.mainTitleToOrder}>to order</div>
                            </div>
                            <h1 className={styles.boosting}> boosting </h1>
                        </div>
                        <div className={styles.inputs}>
                            <div className={styles.inputs12Container}>
                                <div>
                                    <InputField
                                        id='Form_Name'
                                        type="text"
                                        label="Your name"
                                        width={'230px'}
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('Form_Name', e)}
                                    />
                                </div>
                                <div className={styles.inputNumber}>
                                    <InputField
                                        id='Form_Game'
                                        type="select"
                                        label="Your game"
                                        width={'230px'}
                                        value={formData.game}
                                        onChange={(e) => handleInputChange('Form_Game', e)}
                                        options={gameOptions}
                                    />
                                </div>
                            </div>
                            <div>
                                <InputField
                                    id='Form_Email'
                                    type="email"
                                    label="Your mail"
                                    width={'495px'}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('Form_Email', e)}
                                />
                            </div>
                            <div>
                                <InputField
                                    id='Form_Describe'
                                    type="text"
                                    label="Describe your question"
                                    width={'495px'}
                                    value={formData.describe}
                                    onChange={(e) => handleInputChange('Form_Describe', e)}
                                />
                            </div>
                            <div className={styles.btnCheckBoxContainer} >
                                <button
                                    type="submit"
                                    className={styles.btn}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                    disabled={!formData.name || !formData.email || !formData.game || !formData.describe || !isChecked || isSubmitting}
                                    style={{
                                        opacity: (!formData.name || !formData.email || !formData.game || !formData.describe || !isChecked || isSubmitting) ? 0.5 : 1,
                                        cursor: (!formData.name || !formData.email || !formData.game || !formData.describe || !isChecked || isSubmitting) ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <div className={styles.btnTitle}>
                                        {isSubmitting ? 'Отправка...' : 'Send data'}
                                    </div>
                                    <img
                                        className={styles.img}
                                        src='./VectorBtnQuestion.png'
                                        alt='vector'
                                        style={{
                                            filter: isHovering ? 'grayscale(100%) brightness(200%) contrast(0%) brightness(1.8)' : 'none'
                                        }}
                                    />
                                </button>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <input
                                        className={styles.checkBox}
                                        type='checkbox'
                                        id="form_confirmCheckbox"
                                        checked={isChecked}
                                        style={{
                                            backgroundColor: 'transparent',
                                            appearance: 'none',
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'none',
                                            border: '1px solid #ccc',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                        onChange={handleCheckboxChange}
                                    />
                                    <style>{`
                                    input[type="checkbox"]::before {
                                        content: '✓';
                                        position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        transform: translate(-50%, -50%);
                                        color: #ccc;
                                        display: var(--check-display, none);
                                    }
                                `}</style>
                                    <label htmlFor="form_confirmCheckbox" className={styles.checkBoxTitle}>
                                        I confirm that the information provided is
                                        accurate and agree to the terms and conditions
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <button className={styles.x} onClick={closeFormHandler}>
                    <img src='./VEctorForBtn.png' alt='vector'/>
                </button>
            </div>
        </div>
    );
});

export default Form;