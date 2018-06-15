import React from 'react';
import { Route, Link } from 'react-router-dom';

import API from '../common/globals';
import { SmoothieDetails } from '../containers';
import Switch from 'react-router-dom/Switch';

class Home extends React.Component {
    state = {
        // get smooties from localstorage or use empty array
        smoothies: JSON.parse(localStorage.getItem('smoothies')) || [],
    };

    componentDidMount() {
        fetch(API.smoothies)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
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
            smoothies = (<li>Smuutid said otsa. Palun proovige hiljem uuesti või lisage uus smuuti.</li>);
        }

        return (
            <React.Fragment>
                <h1>SmoothIT</h1>
                <ul>
                    {smoothies}
                    <li>
                        <Link to="/smoothie">Uus</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path="/smoothie" component={SmoothieDetails} />
                    <Route path="/smoothie/:id" component={SmoothieDetails} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Home;
