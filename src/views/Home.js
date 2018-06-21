import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import API from '../common/globals';
import { SmoothieDetails } from '../containers';
import { Header } from '../components';

class Home extends React.Component {
    state = {
        // get smooties from localstorage or use empty array
        smoothies: JSON.parse(localStorage.getItem('smoothies')) || [],
    };

    componentDidMount() {
        this.getSmoothies();
    }

    getSmoothies() {
        return fetch(API.smoothies)
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

    saveSmoothie = (id) => {
        this.getSmoothies().then(() => {
            this.props.history.push(`/smoothie/${id}`);
        });
    };

    render() {
        const { location } = this.props;
        const { smoothies } = this.state;

        return (
            <React.Fragment>
                <Header location={location} smoothies={smoothies} />
                <Switch>
                    <Route
                        exact
                        path="/smoothie"
                        render={props => (
                            <SmoothieDetails
                                {...props}
                                onSaveSmoothie={this.saveSmoothie}
                            />
                        )}
                    />
                    <Route
                        path="/smoothie/:id"
                        render={props => (
                            <SmoothieDetails
                                {...props}
                                onSaveSmoothie={this.saveSmoothie}
                            />
                        )}
                    />
                </Switch>
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    smoothies: PropTypes.array,
};

Home.defaultProps = {
    smoothies: [],
};

export default Home;
