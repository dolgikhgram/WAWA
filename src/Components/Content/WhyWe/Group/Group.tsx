import React from 'react';
import styles from "./Group.module.css";

type GroupPropsType = {
    mainTitle:string
    title:string
}

const Group:React.FC<GroupPropsType> = React.memo(({mainTitle,title}) => {
    return (
        <div>
            <div className={styles.group}>
                <div className={styles.content}>
                    <img className={styles.img} src='./iconGroup.png' alt={'Group'}/>
                    <div className={styles.mainTitle}>{mainTitle}</div>
                    <div className={styles.title}>{title}</div>
                </div>
            </div>
        </div>
    );
});

export default Group;