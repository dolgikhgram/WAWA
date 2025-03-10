import React from 'react';
import styles from './RegistrationQuestion.module.css'
import InputField from "./InputField/InputField.tsx";
import StatisticsComponents from "./StatisticsComponents/StatisticsComponents.tsx";

type RegistrationQuestionPropsType = {
    showFormHandler: () => void
}

const RegistrationQuestion: React.FC<RegistrationQuestionPropsType> = ({showFormHandler}) => {
    return (
        <div className={styles.container}>
            <img className={styles.background} src='../../../../../public/RegistrationQuestionBackground.png'
                 alt='background'>
            </img>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1 className={styles.mainTitle}>Do you want to win?</h1>
                <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                        <InputField id='Name' type="text" label="Name" width='340px'/>
                        <InputField id='Gmail' type="email" label="Gmail" width='340px'/>
                    </div>
                    <div className={styles.inputContainer}>
                        <InputField id='Number' type="tel" label="Number" width='340px'/>
                        <InputField id='Your question' type="text" label="Your question" width='340px'/>
                    </div>
                    <div>
                        <button className={styles.btn} onClick={()=>showFormHandler()}>
                            <div className={styles.textBtn}>Send data</div>
                            <img src='../../../../../public/VectorBtnQuestion.png' alt='vector'/>
                        </button>
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
                    </div>
                </div>
            </div>
            <StatisticsComponents/>
        </div>
    );
};

export default RegistrationQuestion;