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
        kcal: 0,
        isNew: false,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.isNew !== state.isNew) {
            return {
                smoothie: props.smoothie,
                isNew: props.isNew,
                weight: 0,
                price: 0,
                kcal: 0,
            };
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isNew !== this.state.isNew) {
            this.calculateSmoothie();
        }
    }

    calculateSmoothie() {
        const components = this.state.smoothie.smoothieComponents;

        if (!components) return;

        const kcal = Object.keys(components).reduce((previous, key) => {
            return previous + (components[key].kcalPerUnit * (components[key].amount || 1));
        }, 0);
        const price = Object.keys(components).reduce((previous, key) => {
            return previous + components[key].unitPriceEur;
        }, 0);
        const weight = Object.keys(components).reduce((previous, key) => {
            return previous + components[key].amount;
        }, 0);

        this.setState({
            kcal,
            price,
            weight,
            smoothie: {
                ...this.state.smoothie,
                calories: kcal,
            }
        });
    }

    handleValueUpdate = (e, key) => {
        const smoothie = { ...this.state.smoothie };

        smoothie[key] = e.target.value;

        this.setState({ smoothie });
    };

    updateSmoothieComponent(component, index) {
        const smoothie = { ...this.state.smoothie };

        if (component) {
            smoothie.smoothieComponents[index] = component;
        } else {
            smoothie.smoothieComponents.splice(index, 1);
        }

        this.setState({ smoothie }, () => this.calculateSmoothie());
    }

    addSmoothieComponent = () => {
        const smoothie = { ...this.state.smoothie };

        if (!smoothie.smoothieComponents) {
            smoothie.smoothieComponents = [];
        }

        smoothie.smoothieComponents.push(this.props.componentList[0]);

        this.setState({ smoothie }, () => this.calculateSmoothie());
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
    };

    render() {
        const { componentList } = this.props;

        const {
            shoppingList,
            weight,
            price,
            kcal,
            smoothie,
            smoothie: { name, smoothieComponents, description, instruction },
        } = this.state;

        if (!smoothie) return;

        return (
            <form
                onSubmit={this.handleSubmit}
                method="post"
                className="smoothieform"
            >
                <input
                    className="smoothieform__header form-text"
                    value={name || ''}
                    type="text"
                    placeholder="Nimi"
                    onChange={e => this.handleValueUpdate(e, 'name')}
                />
                <input
                    className="smoothieform__header form-text"
                    value={description || ''}
                    type="text"
                    placeholder="Kirjeldus"
                    onChange={e => this.handleValueUpdate(e, 'description')}
                />
                <input
                    className="smoothieform__header form-text"
                    value={instruction || ''}
                    type="text"
                    placeholder="Valmistamise õpetus"
                    onChange={e => this.handleValueUpdate(e, 'instruction')}
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
                <p>Kogus: {weight} kg</p>
                <p>Kalorsus: {kcal} kcal</p>

                <button
                    type="button"
                    className="btn--icon-lg btn--pink"
                    onClick={this.addSmoothieComponent}
                >
                    <i className="fa fa-plus" />
                </button>
                <button type="submit" className="btn">
                    Salvesta
                </button>
                <button
                    type="button"
                    className="btn"
                    onClick={this.createShoppingList}
                >
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
