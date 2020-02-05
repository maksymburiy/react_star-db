import React, { Component } from 'react';

import './error-indicator.css';
import icon from './star-death.jpg';

const ErrorIndicator = () => {
    return (
        <React.Fragment>
            <img className="error__img" src={icon}  />
            <div className="error__text">Some ERROR! Sory</div>
        </React.Fragment>
    )
};

export default ErrorIndicator;