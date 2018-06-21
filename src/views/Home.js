import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import API from '../common/globals';
import { SmoothieDetails } from '../containers';
import { Header } from '../components';

class Home extends React.Component {
    // TODO: create state for smoothies

    // TODO: get smoothies when component mountes

    getSmoothies() {
        // TODO: return fetch promise to get smoothies
    }

    saveSmoothie = (id) => {
        // TODO: get smoothies and redirect to new id
    };

    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                {/* <Header location={location} smoothies={smoothies} /> */}
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
