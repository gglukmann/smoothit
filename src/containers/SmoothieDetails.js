import React from 'react';

import { SmoothieEditForm, SmoothieAddForm } from './index';
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

    addSmoothie = smoothie => {
        console.log(smoothie);
    };

    saveSmoothie(smoothie) {
        console.log(smoothie);
    }

    render() {
        const { smoothie, componentList } = this.state;

        if (Object.keys(smoothie).length === 0) {
            return (
                <SmoothieAddForm
                    addSmoothie={this.addSmoothie}
                    componentList={componentList}
                />
            );
        }

        return (
            <React.Fragment>
                <SmoothieEditForm
                    smoothie={smoothie}
                    onSmoothieSave={this.saveSmoothie}
                    componentList={componentList}
                />
            </React.Fragment>
        );
    }
}

export default SmoothieDetails;
