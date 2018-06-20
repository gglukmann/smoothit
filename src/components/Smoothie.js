import React from 'react';
import PropTypes from 'prop-types';

import glassSvg from '../assets/images/glass.svg';
import { lightenDarkenColor } from '../common/utils';

const Smoothie = ({ smoothie, size, inactive, create }) => {
    let smoothieClass = 'smoothie ';
    if (size === 'lg') smoothieClass += 'smoothie--lg ';
    if (size === 'md') smoothieClass += 'smoothie--md ';
    if (inactive) smoothieClass += 'smoothie--inactive ';

    const getColorRows = components => {
        return components.map(component => {
            return (
                <div
                    key={`smoothie_${component.id}`}
                    className="smoothie__color"
                    style={{
                        flexGrow: component.amount,
                        background: `linear-gradient(to top, ${lightenDarkenColor(
                            component.colorHex,
                            25,
                        )}, ${component.colorHex}, ${component.colorHex})`,
                    }}
                />
            );
        });
    };

    return (
        <div className={smoothieClass}>
            <img
                className="smoothie__glass"
                src={glassSvg}
                alt="smoothie glass"
            />
            <div className="smoothie__colors">
                {smoothie && smoothie.components ? (
                    getColorRows(smoothie.components)
                ) : (
                    <div className="smoothie__color" />
                )}
            </div>
            {create && (
                <div className="btn btn--icon-md btn--pink smoothie__btn">
                    <i className="fa fa-plus" />
                </div>
            )}
        </div>
    );
};

Smoothie.propTypes = {
    smoothie: PropTypes.object,
    size: PropTypes.string,
    inactive: PropTypes.bool,
    create: PropTypes.bool,
};

Smoothie.defaultProps = {
    smoothies: {},
    size: null,
    inactive: false,
    create: false,
};

export default Smoothie;
