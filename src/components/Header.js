import React from 'react';
import { Smoothie } from '../components';
import smoothitLogo from '../assets/images/smoothit.png';
import { Link } from 'react-router-dom';

const Header = (props) => {
    console.log(props.smoothies);

    let smoothies = props.smoothies.map(item => (
        <Link key={`smoothielink_${item.id}`} to={`/smoothie/${item.id}`}>
            <Smoothie smoothie={item} />
        </Link>
    ));

    return (
        <header className="row">
            <Link to="/">
                <img src={smoothitLogo} alt="SmoothIT" />
            </Link>
            <div className="col">
                <Link to="/smoothie">
                    <Smoothie smoothie={{}} />
                </Link>
                {smoothies}
            </div>
        </header>
    );
}

export default Header;