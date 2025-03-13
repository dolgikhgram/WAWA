import React from 'react';
import styles from "./WhyWe.module.css";
import Group from "./Group/Group.tsx";

const arrVector = [
    './Vector1.png',
    './Vector2.png',
    './Vector3.png',
    './Vector4.png',
    './Vector5.png',
    './Vector6.png',
    './Vector7.png',
    './Vector8.png',
    './Vector9.png',
    './Vector10.png',
    './Vector11.png',
    './Vector12.png',
    './Vector13.png',
    './Vector14.png',
    './Vector15.png',
    './Vector16.png',
    './Vector17.png',
    './Vector18.png',
    './Vector19.png',
    './Vector20.png',
    './Vector21.png',
    './Vector22.png',
]

type WhyWePropsType ={
    id:string;
}

const WhyWe:React.FC<WhyWePropsType> = React.memo(({id}) => {
    return (
        <div id={id} className={styles.container}>
            <div className={styles.containerText}>
                <div className={styles.sectionTitle}>CORE ADVANTAGES</div>
                <div style={{display:"flex", alignItems:"center", justifyContent: "center", gap:'10px'}}>
                    <div className={styles.mainHeading}>Why gamers choose </div>
                    <div className={styles.us}>us</div>
                </div>
            </div>
            <div className={styles.content}>
                <div>
                    <div className={styles.rectangleCommunity}>
                        <div className={styles.imageWrapper}>
                            {
                                arrVector.map((src, index) => {
                                    return (
                                        <img
                                            src={src}
                                            alt={`Vector ${index + 1}`}
                                            className={styles.responsiveImage}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className={styles.avatarWrapper}>
                            <img className={styles.imgAvatars} src='./Users.png' alt='Ellipse 10'/>
                            <div className={styles.titleAvatars}>
                                <div>Over 1,000 people have</div>
                                <div>already joined us</div>
                            </div>
                        </div>
                        <div className={styles.secondaryHeading}>Big community</div>
                        <div className={styles.heading}>We offer competitive prices for top-quality game boosting. Get
                            the
                            best results without overpaying
                        </div>
                    </div>
                </div>
                <div className={styles.groups}>
                    <div  className={styles.containerGroup1}>
                        <Group mainTitle={'Fast and Reliable Results'} title={'We deliver results quickly, ensuring you spend less time '}/>
                        <Group mainTitle={'Expert Boosters'} title={'Professional players who deliver high-quality results'}/>
                    </div>
                    <div className={styles.containerGroup2}>
                        <Group mainTitle={'High-level \n' +
                            'of security'} title={'Your account and personal data are fully protected '} />
                        <Group mainTitle={'Transparent Process'} title={'Clear communication and regular updates '}/>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default WhyWe;