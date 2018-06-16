import React from 'react';

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
        const { smoothieComponents } = this.props;

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
                <SmoothieAddComponent components={smoothieComponents} />
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