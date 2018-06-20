import React from 'react';
import { Smoothie, SmoothieTable } from '../components';
import smoothitLogo from '../assets/images/smoothit.png';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const path = props.location.pathname;
    const isSmoothieInactive = (path, smoothieId) => {
        if(!smoothieId) return path.includes('/smoothie/');
        return path.includes('/smoothie') && !(path.localeCompare(`/smoothie/${smoothieId}`) === 0);
    }

    let smoothies = props.smoothies.map(item => (
        <Link key={`smoothielink_${item.id}`} to={`/smoothie/${item.id}`}>
            <Smoothie
                size={path === '/' && 'md'}
                smoothie={item}
                inactive={isSmoothieInactive(path, item.id)} />
        </Link>
    ));

    return (
        <header className="container">
            <div className={`grid grid--between-xs ${path === '/' ? 'grid--direction-column' : ''}`}>
                <Link to="/">
                    <img src={smoothitLogo} alt="SmoothIT" />
                </Link>
                <div className="col">
                    <SmoothieTable className={ path !== '/' ? 'smoothietable--sm' : '' }>
                        <Link to="/smoothie">
                            <Smoothie size={path === '/' && 'md'} create smoothie={{}} inactive={isSmoothieInactive(path)} />
                        </Link>
                        {smoothies}
                    </SmoothieTable>
                </div>
            </div>
        </header>
    );
}

export default Header;