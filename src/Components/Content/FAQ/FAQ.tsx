import React from "react";
import styles from '../FAQ/FAQ.module.css'
import Question from "./Question/Question.tsx";
import RegistrationQuestion from "./RegistrationQuestion/RegistrationQuestion.tsx";

type FAQPropsType = {
    id: string
    showFormHandler: () => void
}

const questionMap = [
    {
        title: "What payment methods do you accept?",
        answer:"We accept various payment methods, including credit/debit cards, PayPal, and cryptocurrencies. You’ll see all available options at checkout."
    },
    {
        title: "How long does it take to complete a boost?",
        answer:"Boosting platform WAWA invites you to play in the team of the best and become a part of a great gaming community. Gain leadership imroving level and rating."
    },
    {
        title: "How do I track the progress of my boost?",
        answer:"Boosting platform WAWA invites you to play in the team of the best and become a part of a great gaming community. Gain leadership imroving level and rating."
    },
    {
        title: "Can I communicate with my booster during the process?",
        answer:"Boosting platform WAWA invites you to play in the team of the best and become a part of a great gaming community. Gain leadership imroving level and rating."
    },
    {
        title: "On which platforms is the boosting service available",
        answer:"Boosting platform WAWA invites you to play in the team of the best and become a part of a great gaming community. Gain leadership imroving level and rating."
    },
]

const FAQ : React.FC<FAQPropsType>  = ({id, showFormHandler}) => {
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
                <RegistrationQuestion showFormHandler={showFormHandler}/>
            </div>
        </div>

    );
};

export default FAQ;