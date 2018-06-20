import React from 'react';
import { Smoothie, SmoothieTable } from '../components';
import smoothitLogo from '../assets/images/smoothit.png';
import { Link } from 'react-router-dom';

const Header = (props) => {

    let smoothies = props.smoothies.map(item => (
        <Link key={`smoothielink_${item.id}`} to={`/smoothie/${item.id}`}>
            <Smoothie
                smoothie={item}
                inactive={props.location.pathname.includes('/smoothie') && !props.location.pathname.includes('/smoothie/' + item.id)} />
        </Link>
    ));

    return (
        <header className="container">
            <div className="grid grid--between-xs">
                <Link to="/">
                    <img src={smoothitLogo} alt="SmoothIT" />
                </Link>
                <div className="col">
                    <SmoothieTable className="smoothietable--sm">
                        <Link to="/smoothie">
                            <Smoothie create smoothie={{}} inactive={props.location.pathname.includes('/smoothie/')} />
                        </Link>
                        {smoothies}
                    </SmoothieTable>
                </div>
            </div>
        </header>
    );
}

export default Header;