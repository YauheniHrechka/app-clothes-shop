import React from 'react';

const styleDefault = {
    boxSizing: 'border-box',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const Button = ({ onClick = () => { }, style = {}, title = '' }) => {

    const btnStyle = {
        ...styleDefault,
        ...style
    }

    return (
        <button onClick={onClick} style={btnStyle}>{title}</button>
    )
}

export default Button;