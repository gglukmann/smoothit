import React from 'react';
import PropTypes from 'prop-types';

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

SmoothieTable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
}

export default SmoothieTable;