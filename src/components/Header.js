import React from 'react';
import { Smoothie, SmoothieTable } from '../components';
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
        <header className="container">
            <div className="grid grid--between-xs">
                <Link to="/">
                    <img src={smoothitLogo} alt="SmoothIT" />
                </Link>
                <div className="col">
                    <SmoothieTable className="smoothietable--sm">
                        <Link to="/smoothie">
                            <Smoothie smoothie={{}} />
                        </Link>
                        {smoothies}
                    </SmoothieTable>
                </div>
            </div>
        </header>
    );
}

export default Header;