import React from 'react';
import styles from "./WhyWe.module.css";
import Group from "./Group/Group.tsx";

const arrVector = [
    '../../../../public/Vector1.png',
    '../../../../public/Vector2.png',
    '../../../../public/Vector3.png',
    '../../../../public/Vector4.png',
    '../../../../public/Vector5.png',
    '../../../../public/Vector6.png',
    '../../../../public/Vector7.png',
    '../../../../public/Vector8.png',
    '../../../../public/Vector9.png',
    '../../../../public/Vector10.png',
    '../../../../public/Vector11.png',
    '../../../../public/Vector12.png',
    '../../../../public/Vector13.png',
    '../../../../public/Vector14.png',
    '../../../../public/Vector15.png',
    '../../../../public/Vector16.png',
    '../../../../public/Vector17.png',
    '../../../../public/Vector18.png',
    '../../../../public/Vector19.png',
    '../../../../public/Vector20.png',
    '../../../../public/Vector21.png',
    '../../../../public/Vector22.png',
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
                            <img className={styles.imgAvatars} src='../../../../public/Users.png' alt='Ellipse 10'/>
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