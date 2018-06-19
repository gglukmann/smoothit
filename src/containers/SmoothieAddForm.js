import React from 'react';

import { SmoothieComponent } from '../components';

class SmoothieAddForm extends React.Component {
    state = {
        smoothie: {
            smoothieComponents: [],
        },
        price: 0,
        weight: 0,
        cal: 0,
    };

    updateSmoothieComponent(component, index) {
        let smoothie = this.state.smoothie;

        if (component) {
            smoothie.smoothieComponents[index] = component;
        } else {
            smoothie.smoothieComponents.splice(index, 1);
        }

        this.setState({ smoothie });
    }

    addSmoothieComponent = () => {
        let smoothie = this.state.smoothie;

        smoothie.smoothieComponents.push(this.props.smoothieComponents[0]);

        this.setState({ smoothie });
    };

    createSmoothie = event => {
        event.preventDefault();

        const smoothie = {
            // name: this.nameRef.current.value,
            // description: this.descRef.current.value,
        };

        this.props.addSmoothie(smoothie);
        event.currentTarget.reset();
    };

    render() {
        const { componentList } = this.props;
        const {
            smoothie: { smoothieComponents },
            price,
            weight,
            cal,
        } = this.state;

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
                {smoothieComponents.map((component, i) => {
                    return (
                        <SmoothieComponent
                            key={`smoothiecomponent_${i}`}
                            component={component}
                            componentList={componentList}
                            onSmoothieComponentUpdate={component =>
                                this.updateSmoothieComponent(component, i)
                            }
                        />
                    );
                })}
                <button
                    className="btn--icon-lg btn--pink"
                    onClick={this.addSmoothieComponent}
                >
                    <i className="fa fa-plus" />
                </button>
                <p>Hind: {price} €</p>
                <p>Kaal: {weight} kg</p>
                <p>Kalorsus: {cal} kcal</p>
                <button type="submit">Salvesta</button>
            </form>
        );
    }
}

export default SmoothieAddForm;
