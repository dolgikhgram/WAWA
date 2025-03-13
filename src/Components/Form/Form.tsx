import React from 'react';
import styles from './Form.module.css'
import InputField from "../Content/FAQ/RegistrationQuestion/InputField/InputField.tsx";

type FormPropsType = {
    closeFormHandler:()=>void,
}

const Form : React.FC<FormPropsType> =React.memo(({closeFormHandler}) => {
    return (
        <div>
            <div onClick={closeFormHandler} className={styles.overlay}/>
            <div className={styles.container}>
                <div className={styles.form}>
                    <form>
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
                                    <InputField id='Name' type="text" label="Your name" width={'230px'}/>
                                </div>
                                <div className={styles.inputNumber}>
                                    <InputField id='Number' type="tel" label="Your number" width={'230px'}/>
                                </div>
                            </div>
                            <div>
                                <InputField id='Gmail' type="email" label="Your mail" width={'495px'}/>
                            </div>
                            <div>
                                <InputField id='Describe' type="text" label="Describe your question" width={'495px'}/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                                <input 
                                    className={styles.checkBox} 
                                    type='checkbox'
                                    style={{ 
                                        backgroundColor: 'transparent',
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        border: '1px solid #ccc',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.border = '1px solid #ccc';
                                            e.target.style.setProperty('--check-display', 'block');
                                        } else {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.setProperty('--check-display', 'none');
                                        }
                                    }}
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
                                <div className={styles.checkBoxTitle}>I confirm that the information provided is
                                    accurate and agree to the terms and conditions
                                </div>
                            </div>
                            <button className={styles.btn} onClick={closeFormHandler}>
                                <div className={styles.btnTitle}>
                                    Send data
                                </div>
                                <img className={styles.img} src='./VectorBtnQuestion.png' alt='vector'/>
                            </button>
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