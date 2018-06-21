import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Smoothie, SmoothieTable } from '../components';
import smoothitLogo from '../assets/images/smoothit.png';

const Header = ({ location: { pathname }, smoothies }) => {
    const isSmoothieInactive = (path, smoothieId) => {
        if (!smoothieId) return path.includes('/smoothie/');

        return (
            path.includes('/smoothie') &&
            !(path.localeCompare(`/smoothie/${smoothieId}`) === 0)
        );
    };

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <header className="container">
            <div
                className={`grid grid--between-xs ${
                    pathname === '/' ? 'grid--direction-column' : ''
                }`}
            >
                <Link to="/">
                    <img src={smoothitLogo} alt="SmoothIT" />
                </Link>
                <div className="col">
                    <SmoothieTable
                        className={pathname !== '/' ? 'smoothietable--sm' : ''}
                    >
                        <Link onClick={scrollTop} to="/smoothie">
                            <Smoothie
                                size={pathname === '/' ? 'md' : ''}
                                create
                                inactive={isSmoothieInactive(pathname)}
                            />
                        </Link>
                        {smoothies.map(item => (
                            <Link
                                onClick={scrollTop}
                                key={item.id}
                                to={`/smoothie/${item.id}`}
                            >
                                <Smoothie
                                    size={pathname === '/' ? 'md' : ''}
                                    smoothie={item}
                                    inactive={isSmoothieInactive(
                                        pathname,
                                        item.id,
                                    )}
                                />
                            </Link>
                        ))}
                    </SmoothieTable>
                </div>
            </div>
        </header>
    );
};

Smoothie.propTypes = {
    smoothies: PropTypes.array,
    location: PropTypes.object,
};

Smoothie.defaultProps = {
    smoothies: [],
    location: {},
};

export default Header;
