import React, { useState, ChangeEvent } from 'react';
import styles from './Form.module.css'
import InputField from "../Content/FAQ/RegistrationQuestion/InputField/InputField.tsx";
import { submitForm } from '../../services/formService';
import { trackFormStart, trackFormComplete, trackButtonClick } from '../../services/analyticsService';

type FormPropsType = {
    closeFormHandler:()=>void,
    showFormOfGratitudeHandler:()=>void,
}

const Form : React.FC<FormPropsType> = React.memo(({closeFormHandler, showFormOfGratitudeHandler}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gmail: '',
        number: '',
        describe: ''
    });
    
    // Отслеживаем начало заполнения формы
    React.useEffect(() => {
        trackFormStart('boost_request');
    }, []);
    
    const handleInputChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
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

        if (!formData.name || !formData.gmail || !formData.number || !formData.describe) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitForm({
                name: formData.name,
                email: formData.gmail,
                phone: formData.number,
                message: formData.describe
            });

            if (result.success) {
                trackFormComplete('boost_request', true);
                trackButtonClick('form_submit', 'form');
                
                // Очистка формы после успешной отправки
                setFormData({
                    name: '',
                    gmail: '',
                    number: '',
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
            trackFormComplete('boost_request', false);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onClickHandler = () => {
        closeFormHandler();
        showFormOfGratitudeHandler();
    }

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
                                        id='Form_Number' 
                                        type="tel" 
                                        label="Your number" 
                                        width={'230px'}
                                        value={formData.number}
                                        onChange={(e) => handleInputChange('Form_Number', e)}
                                    />
                                </div>
                            </div>
                            <div>
                                <InputField 
                                    id='Form_Gmail' 
                                    type="email" 
                                    label="Your mail" 
                                    width={'495px'}
                                    value={formData.gmail}
                                    onChange={(e) => handleInputChange('Form_Gmail', e)}
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
                                    onClick={onClickHandler}
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                    disabled={!formData.name || !formData.gmail || !formData.number || !formData.describe || !isChecked || isSubmitting}
                                    style={{
                                        opacity: (!formData.name || !formData.gmail || !formData.number || !formData.describe || !isChecked || isSubmitting) ? 0.5 : 1,
                                        cursor: (!formData.name || !formData.gmail || !formData.number || !formData.describe || !isChecked || isSubmitting) ? 'not-allowed' : 'pointer'
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