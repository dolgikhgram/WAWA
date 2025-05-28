import React from "react";
import styles from '../FAQ/FAQ.module.css'
import Question from "./Question/Question.tsx";
import RegistrationQuestion from "./RegistrationQuestion/RegistrationQuestion.tsx";

type FAQPropsType = {
    id: string
    showFormOfGratitudeHandler: () => void
}

const questionMap = [
    {
        title: "What payment methods do you accept?",
        answer:"We accept cryptocurrency payments or payments through trusted third-party platforms like EasyBusy."

    },
    {
        title: "How long does it take to complete a boost?",
        answer:"The duration depends on the specific task and game. Some boosts may take just a few hours, while others can take up to a week. We always write the order completion time on the service card aim to complete orders as quickly as possible without compromising quality."


    },
    {
        title: "How do I track my progress?",
        answer:"You can stay updated by directly communicating with your booster or manager. We provide regular updates throughout the process to keep you informed."



    },
    {
        title: "Can I communicate with my booster during the process?",
        answer:"Yes! You can contact your booster directly to ask questions or check in on your progress at any time."

    },
    {
        title: "On which platforms is the boosting service available",
        answer:"Our boosting services are available on all major platforms, including PC, PlayStation, and Xbox."
    },
]

const FAQ : React.FC<FAQPropsType>  = React.memo(({id, showFormOfGratitudeHandler}) => {
    return (
        <div id={id} style={{display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column", marginBottom:'85px', width:'100%'}}>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <div className={styles.MainTittle}> FAQ</div>
                        <div className={styles.title}>Find quick answers to the most common questions about our services
                        </div>
                    </div>
                    <div className={styles.FAQContainer}>
                        {
                            questionMap.map(el =>{
                                return (
                                    <Question title={el.title} answer={el.answer}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <RegistrationQuestion showFormHandler={showFormOfGratitudeHandler}/>
            </div>
        </div>

    );
});

export default FAQ;