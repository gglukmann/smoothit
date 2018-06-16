import React from 'react';

import API from '../common/globals';
import SmoothieAddComponent from './SmoothieAddComponent';

class SmoothieAddForm extends React.Component {
    nameRef = React.createRef();
    descRef = React.createRef();
    weightRef = React.createRef();
    selectRef = React.createRef();

    state = {
        components: [],
        price: 0,
        weight: 0,
        cal: 0,
        componentsCount: 1,
    };

    componentDidMount() {
        fetch(API.components)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => {
                this.setState({
                    components: data.content,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    createSmoothie = event => {
        event.preventDefault();

        const smoothie = {
            name: this.nameRef.current.value,
            description: this.descRef.current.value,
            weight: this.weightRef.current.value,
            components: this.selectRef.current.value,
        };

        this.props.addSmoothie(smoothie);
        event.currentTarget.reset();
    };

    render() {
        return (
            <form onSubmit={this.createSmoothie}>
                <input
                    type="text"
                    ref={this.nameRef}
                    name="name"
                    placeholder="Nimi"
                />
                <input
                    type="text"
                    ref={this.descRef}
                    name="description"
                    placeholder="Kirjeldus"
                />
                <SmoothieAddComponent components={this.state.components} />
                <button type="button">+ Lisa komponent</button>
                <p>Hind: {this.state.price} €</p>
                <p>Kaal: {this.state.weight} kg</p>
                <p>Kalorsus: {this.state.cal} kcal</p>
                <button type="submit">Salvesta</button>
            </form>
        );
    }
}

export default SmoothieAddForm;
