import React, { useState, ChangeEvent } from 'react';
import styles from './RegistrationQuestion.module.css'
import InputField from "./InputField/InputField.tsx";
import StatisticsComponents from "./StatisticsComponents/StatisticsComponents.tsx";

type RegistrationQuestionPropsType = {
    showFormHandler: () => void
}

const RegistrationQuestion: React.FC<RegistrationQuestionPropsType> = React.memo(({showFormHandler}) => {
    const [formData, setFormData] = useState({
        name: '',
        gmail: '',
        number: '',
        question: ''
    });

    const handleInputChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [id.toLowerCase()]: event.target.value
        }));
    };

    const isFormValid = () => {
        return formData.name.trim() !== '' && 
               formData.gmail.trim() !== '' && 
               formData.number.trim() !== '' && 
               formData.question.trim() !== '';
    };

    const handleSendData = () => {
        if (!isFormValid()) return;
        
        // Очищаем все значения полей
        setFormData({
            name: '',
            gmail: '',
            number: '',
            question: ''
        });
        
        // Вызываем функцию из родительского компонента
        showFormHandler();
    };

    return (
        <div className={styles.container}>
            <img className={styles.background} src='./RegistrationQuestionBackground.png'
                 alt='background'>
            </img>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1 className={styles.mainTitle}>Do you want to win?</h1>
                <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                        <InputField 
                            id='Name' 
                            type="text" 
                            label="Name" 
                            width='340px'
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e)}
                        />
                        <InputField 
                            id='Gmail' 
                            type="email" 
                            label="Gmail" 
                            width='340px'
                            value={formData.gmail}
                            onChange={(e) => handleInputChange('gmail', e)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <InputField 
                            id='Number' 
                            type="tel" 
                            label="Number" 
                            width='340px'
                            value={formData.number}
                            onChange={(e) => handleInputChange('number', e)}
                        />
                        <InputField 
                            id='Your question' 
                            type="text" 
                            label="Your question" 
                            width='340px'
                            value={formData.question}
                            onChange={(e) => handleInputChange('question', e)}
                        />
                    </div>
                    <div>
                        <div className={styles.termsWrapper}>
                            <input type="checkbox" id="terms" className={styles.termsCheckbox}/>
                            <div className={styles.labelContainer}>
                                <label htmlFor="terms" className={styles.termsText}>
                                    I confirm that the information provided
                                </label>
                                <label htmlFor="terms" className={styles.termsText}>
                                    is accurate and agree to the
                                </label>
                                <label htmlFor="terms" className={styles.termsText}>
                                    terms and conditions
                                </label>
                            </div>
                        </div>
                        <button 
                            className={`${styles.btn} ${!isFormValid() ? styles.disabled : ''}`} 
                            onClick={handleSendData}
                            disabled={!isFormValid()}
                        >
                            <div className={styles.textBtn}>Send data</div>
                            <img src='./VectorBtnQuestion.png' alt='vector'/>
                        </button>
                    </div>
                </div>
            </div>
            <StatisticsComponents/>
        </div>
    );
});

export default RegistrationQuestion;