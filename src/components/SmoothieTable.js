import React from 'react';

const SmoothieTable = ({ className, children }) => {
    return (
        <div className={`smoothietable ${className}`}>
            <h2 className="smoothietable__header">Vali oma smuuti!</h2>
            <div className="smoothietable__content">
                {children}
            </div>
            <div className="smoothietable__shadow-container">
                <div className="smoothietable__shadow smoothietable__shadow--left"></div>
                <div className="smoothietable__shadow smoothietable__shadow--center"></div>
                <div className="smoothietable__shadow smoothietable__shadow--right"></div>
            </div>
        </div>
    );
}

export default SmoothieTable;