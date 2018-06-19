import React from 'react';
import PropTypes from 'prop-types';

import { SmoothieForm } from './index';
import API from '../common/globals';

class SmoothieDetails extends React.Component {
    state = {
        smoothie: {},
        pathname: null,
        componentList: [],
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
        this.getSmoothie();
        this.getSmoothieComponents();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.state.pathname) {
            this.getSmoothie();
        }
    }

    getSmoothie() {
        const smoothies = JSON.parse(localStorage.getItem('smoothies'));
        const smoothie = smoothies.filter(
            item => item.id === parseInt(this.props.match.params.id, 10),
        );

        this.setState({
            smoothie: smoothie[0] || {},
        });
    }

    getSmoothieComponents() {
        fetch(API.components)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => {
                this.setState({
                    componentList: data.content,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    saveSmoothie = smoothie => {
        const newSmoothie = {
            ...smoothie,
            file: null,
        };

        if (!newSmoothie.id) {
            newSmoothie.id = 0;
        }

        fetch(API.smoothies, {
            body: JSON.stringify(newSmoothie),
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => {
                const smoothies = JSON.parse(localStorage.getItem('smoothies'));
                const index = smoothies.findIndex(item => item.id === data.id);
                if (index !== -1) {
                    smoothies[index] = data;
                } else {
                    smoothies.push(data);
                }
                localStorage.setItem('smoothies', JSON.stringify(smoothies));
                if (typeof this.props.onAddSmoothie === 'function') {
                    this.props.onAddSmoothie();
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { smoothie, componentList } = this.state;

        return (
            <React.Fragment>
                <SmoothieForm
                    smoothie={smoothie}
                    onSmoothieSave={this.saveSmoothie}
                    componentList={componentList}
                    isNew={Object.keys(smoothie).length === 0}
                />
            </React.Fragment>
        );
    }
}

SmoothieDetails.propTypes = {
    smoothie: PropTypes.object,
    pathname: PropTypes.string,
    componentList: PropTypes.array,
}

SmoothieDetails.defaultProps = {
    smoothie: {},
    pathname: null,
    componentList: [],
}

export default SmoothieDetails;
