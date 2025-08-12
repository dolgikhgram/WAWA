import React, { useState } from 'react';
import styles from './RegistrationQuestion.module.css'
import InputField from "./InputField/InputField.tsx";
import StatisticsComponents from "./StatisticsComponents/StatisticsComponents.tsx";
import { submitForm } from '../../../../services/formService.ts';

type RegistrationQuestionPropsType = {
    showFormHandler: () => void
}

const RegistrationQuestion: React.FC<RegistrationQuestionPropsType> = React.memo(({showFormHandler}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        game: '',
        question: ''
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const gameOptions = [
        { value: 'Destiny 2', label: 'Destiny 2' },
        { value: 'CoD MW2', label: 'CoD MW2' },
        { value: 'WARZONE', label: 'WARZONE' },
        { value: 'BLACK OPS 6', label: 'BLACK OPS 6' },
        { value: 'CoD MW 3', label: 'CoD MW 3' },
        { value: 'SPACE MARINE 2', label: 'SPACE MARINE 2' },
        { value: 'ZOMBIES', label: 'ZOMBIES' }
    ];

    const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [id.toLowerCase()]: event.target.value
        }));
    };

    const isFormValid = () => {
        return formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.game.trim() !== '' &&
            formData.question.trim() !== '' &&
            agreeToTerms;
    };

    const handleSendData = async () => {
        if (!isFormValid()) return;

        try {
            const result = await submitForm({
                name: formData.name,
                email: formData.email,
                game: formData.game,
                message: formData.question
            });

            if (result.success) {
                setFormData({
                    name: '',
                    email: '',
                    game: '',
                    question: ''
                });
                        // Очищаем все значения полей
    
        setAgreeToTerms(false);

        // Вызываем функцию из родительского компонента
        showFormHandler();
            } else {
                throw new Error('Failed to submit form');
            }
        }
        catch (error) {
            alert('Failed to submit form:');
            console.error('Error submitting form:', error);
        }

    };

    return (
        <div className={styles.container} id="question-form">
            <img className={styles.background} src='./RegistrationQuestionBackground.png'
                 alt='background'>
            </img>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1 className={styles.mainTitle}>Do you want to win?</h1>
                <StatisticsComponents />
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
                            id='email'
                            type="email"
                            label="email"
                            width='340px'
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <InputField
                            id='Game'
                            type="select"
                            label="Game"
                            width='340px'
                            value={formData.game}
                            onChange={(e) => handleInputChange('game', e)}
                            options={gameOptions}
                        />
                        <InputField
                            id='Question'
                            type="text"
                            label="Your question"
                            width='340px'
                            value={formData.question}
                            onChange={(e) => handleInputChange('question', e)}
                        />
                    </div>
                    <div>
                        <div className={styles.termsWrapper}>
                            <input 
                                type="checkbox" 
                                id="terms" 
                                className={styles.termsCheckbox}
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                            />
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
        </div>
    );
});

export default RegistrationQuestion;