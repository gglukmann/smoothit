import React from 'react';

const SmoothieTable = (props) => {
    return (
        <div className={`smoothietable ${props.className}`}>
            <div className="smoothietable__content">
                {props.children}
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