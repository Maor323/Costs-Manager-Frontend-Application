import React, { useState } from "react";
import './App.css'
import { Link } from 'react-router-dom'
import './buttonstyle.css'



const STYLE = ['btn--primary', 'btn--outline'];
const SIZE = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
    const checkButtonSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];

    return (
        <Link to='/sign-up' className="btn-mobile">
            <button className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
                {children}
            </button>
        </Link>

    )
};