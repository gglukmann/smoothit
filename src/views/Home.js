import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import API from '../common/globals';
import { SmoothieDetails } from '../containers';
import { SmoothieTable } from '../components';
import smoothitLogo from '../assets/images/smoothit.png';

class Home extends React.Component {
    state = {
        // get smooties from localstorage or use empty array
        smoothies: JSON.parse(localStorage.getItem('smoothies')) || [],
    };

    componentDidMount() {
        this.getSmoothies();
    }

    getSmoothies() {
        fetch(API.smoothies)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => {
                // add to localstorage to get them really fast on page load
                localStorage.setItem('smoothies', JSON.stringify(data.content));
                // update current state with new smoothies
                this.setState({
                    smoothies: data.content,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    addSmoothie() {
        this.getSmoothies();
    };

    render() {
        let smoothies = this.state.smoothies.map(item => (
            <li key={item.id}>
                <Link to={`/smoothie/${item.id}`}>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <div>Kaloreid: {item.calories}</div>
                </Link>
            </li>
        ));

        if (!smoothies.length) {
            smoothies = (
                <li>
                    Smuutid said otsa. Palun proovige hiljem uuesti või lisage
                    uus smuuti.
                </li>
            );
        }

        return (
            <React.Fragment>
                <header>
                    <Link to="/">
                        <img src={smoothitLogo} alt="SmoothIT" />
                    </Link>
                    <SmoothieTable></SmoothieTable>
                    <SmoothieTable className="smoothietable--sm"></SmoothieTable>
                    {this.props.location.pathname === '/' && (
                        <h1>Get your smoothie</h1>
                    )}
                </header>
                <ul>
                    <li>
                        <Link to="/smoothie">Uus</Link>
                    </li>
                    {smoothies}
                </ul>

                <Switch>
                    <Route
                        exact
                        path="/smoothie"
                        render={props => (
                            <SmoothieDetails
                                {...props}
                                onAddSmoothie={this.addSmoothie}
                            />
                        )}
                    />
                    <Route path="/smoothie/:id" component={SmoothieDetails} />
                </Switch>
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    smoothies: PropTypes.array,
}

Home.defaultProps = {
    smoothies: [],
}

export default Home;
