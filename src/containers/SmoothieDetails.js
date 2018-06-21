import React from 'react';
import PropTypes from 'prop-types';

import { SmoothieForm } from './index';
import { Smoothie, Loader } from '../components';
import API from '../common/globals';

class SmoothieDetails extends React.Component {
    state = {
        smoothie: {},
        pathname: null,
        componentList: [],
        isLoading: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            return {
                smoothie: {},
                pathname: nextProps.location.pathname,
            };
        }

        return null;
    }

    componentDidMount() {
        // TODO: get smoothies and components
    }

    componentDidUpdate(prevProps) {
        // TODO: update smoothies
    }

    getSmoothie() {
        // TODO: get smoothie from localStorage array and add to state
    }

    getSmoothieComponents() {
        // TODO: get all components
    }

    saveSmoothie = smoothie => {
        // TODO: start loader

        // TODO: save smoothie and send id to parent component with onSaveSmoothies
    };

    render() {
        const { smoothie, componentList, isLoading } = this.state;

        return (
            <div className="container">
                <div className="grid">
                    <div className="grid__col--sm-5 grid--center-xs">
                        <Smoothie size="lg" smoothie={smoothie} />
                    </div>
                    <div className="grid__col--sm-7">
                        <SmoothieForm
                            smoothie={smoothie}
                            onSmoothieSave={this.saveSmoothie}
                            componentList={componentList}
                            isNew={Object.keys(smoothie).length === 0}
                        />
                    </div>
                </div>
                {isLoading && <Loader />}
            </div>
        );
    }
}

SmoothieDetails.propTypes = {
    onSaveSmoothie: PropTypes.func.isRequired,
}

SmoothieDetails.defaultProps = {
    onSaveSmoothie: () => {},
}

export default SmoothieDetails;
