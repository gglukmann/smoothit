import React from 'react';

import { SmoothieEditForm, SmoothieAddForm } from './index';

class SmoothieDetails extends React.Component {
    state = {
        smoothie: {},
        pathname: null,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.pathname !== prevState.pathname) {
            return {
                smoothie: {},
                pathname: nextProps.location.pathname,
            }
        }

        return null;
    }

    componentDidMount() {
        this.getSmoothie();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.state.pathname) {
            this.getSmoothie();
        }
    }

    getSmoothie() {
        const smoothies = JSON.parse(localStorage.getItem('smoothies'));
        const smoothie = smoothies.filter(item => item.id === parseInt(this.props.match.params.id, 10));

        this.setState({
            smoothie: smoothie[0] || {},
        });
    }

    addSmoothie = (smoothie) => {
        console.log(smoothie)
    }

    render() {
        const { smoothie } = this.state;

        if (Object.keys(smoothie).length === 0) {
            return <SmoothieAddForm addSmoothie={this.addSmoothie} />;
        }

        return (
            <SmoothieEditForm smoothie={smoothie} />
        );
    }
}

export default SmoothieDetails;
