import React from 'react';
import PropTypes from 'prop-types';

import { ShoppingList, SmoothieComponent } from '../components';
import API from '../common/globals';

class SmoothieForm extends React.Component {
    state = {
        smoothie: {},
        shoppingList: null,
        weight: 0,
        price: 0,
        cal: 0,
    };

    static getDerivedStateFromProps(props, state) {
        if (Object.keys(state.smoothie).length === 0 || Object.keys(props.smoothie).length === 0) {
            return {
                smoothie: props.smoothie,
            };
        }

        return null;
    }

    handleValueUpdate = (e, key) => {
        let smoothie = this.state.smoothie;

        smoothie[key] = e.target.value;

        this.setState({ smoothie });
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

        smoothie.smoothieComponents.push(this.props.componentList[0]);

        this.setState({ smoothie });
    };

    createShoppingList = () => {
        // Create order + load shopping list
        let data = {
            servings: 1,
            components: this.state.smoothie.smoothieComponents.map(
                ({ name, amount }) => {
                    return { name, quantity: amount };
                },
            ),
        };

        fetch(API.order, {
            body: JSON.stringify(data),
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
                console.log('Order created, ID: ', data.id);
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSmoothieSave(this.state.smoothie);
    }

    render() {
        const {
            smoothie: { name, smoothieComponents },
            smoothie,
            componentList,
        } = this.props;

        const { shoppingList, weight, price, cal } = this.state;

        if (!smoothie) return;

        return (
            <form onSubmit={this.handleSubmit} method="post" className="smoothieform">
                <input
                    className="smoothieform__header form-text"
                    value={name}
                    type="text"
                    placeholder="Nimi"
                    onChange={e => this.handleValueUpdate(e, 'name')}
                />
                {smoothieComponents &&
                    smoothieComponents.map((component, i) => {
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

                <p>Hind: {price} €</p>
                <p>Kaal: {weight} kg</p>
                <p>Kalorsus: {cal} kcal</p>

                <button
                    className="btn--icon-lg btn--pink"
                    onClick={this.addSmoothieComponent}
                >
                    <i className="fa fa-plus" />
                </button>
                <button type="submit" className="btn">
                    Salvesta
                </button>
                <button className="btn" onClick={this.createShoppingList}>
                    Loo ostunimekiri
                </button>

                {shoppingList && <ShoppingList shoppingList={shoppingList} />}
            </form>
        );
    }
}

SmoothieForm.propTypes = {
    smoothie: PropTypes.object,
};

SmoothieForm.defaultProps = {
    smoothie: {},
};

export default SmoothieForm;
