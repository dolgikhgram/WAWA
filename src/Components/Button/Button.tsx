import s from './Button.module.css'
import React from "react";

type ButtonPropsType = {
    children: React.ReactNode;
    showFormHandler?:()=>void;
    size?:"medium" | "large" | "small";
    color ?: "primary" | "secondary";
}


const Button :React.FC<ButtonPropsType>  = React.memo( ({children,showFormHandler,size= "medium", color='primary'}) => {

    const sizeMapWidth = {
        small: '191px',
        medium: '246px',
        large: '274px',
    }
    const sizeMapHeight = {
        small: '42px',
        medium: '55px',
        large: '60px',
    }
    const circleMap={
        small:'39px',
        medium: '52px',
        large: '57px',
    }

    const textSizeMap = {
        small: '14px',
        medium: '18px',
        large: '20px',
    }
    return (
        <div>
            <button style={{width: sizeMapWidth[size] , height: sizeMapHeight[size] }} className={s.btn} onClick={showFormHandler}>
                <div style={{fontSize:textSizeMap[size]}}  className={s.text}>
                    {children}
                </div>
                <div style={{width: circleMap[size], height: circleMap[size]}} className={s.circle}>
                    {color === 'primary' ?
                        <img className={s.vector} src='./VectorBtn.png' alt={'Vector'}/>
                        : <img style={{width: circleMap[size], height: circleMap[size]}}  className={s.vector} src='./кругСоСтрелкой.png' alt={'Vector'}/>
                    }
                </div>
            </button>
        </div>
    );
});

export default Button;