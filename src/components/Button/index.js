import React from 'react';
import PropTypes from 'prop-types';

const styleDefault = {
    boxSizing: 'border-box',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const Button = ({ onClick, style, title }) => {

    const btnStyle = {
        ...styleDefault,
        ...style
    }

    return (
        <button onClick={onClick} style={btnStyle}>{title}</button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string
}

Button.defaultProps = {
    onClick: () => { },
    style: {},
    title: 'DEFAULT'
}

export default Button;