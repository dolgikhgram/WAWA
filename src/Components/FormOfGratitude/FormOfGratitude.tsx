import React from 'react';
import styles from "./FormOfGratitude.module.css";

type FormOfGratitudePropsType = {
    showFormOfGratitudeHandler:()=>void,
    closeFormOfGratitudeHandler:()=>void,
}

const FormOfGratitude : React.FC<FormOfGratitudePropsType> = ({showFormOfGratitudeHandler,closeFormOfGratitudeHandler}) => {
    return (
        <div>
            <div onClick={showFormOfGratitudeHandler} className={styles.overlay}/>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <img onClick={closeFormOfGratitudeHandler} className={styles.x} src={'./xForm.svg'}/>
                    <div className={styles.content}>
                        <img src={'./fromNewIcon.svg'} className={styles.img}/>
                        <div className={styles.mainTitle}>
                            <div className={styles.text}>
                                Thanks
                            </div>
                            <div className={styles.text}>
                                for your request!
                            </div>
                        </div>
                        <div className={styles.title}>
                            We will come back to you soon
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormOfGratitude;