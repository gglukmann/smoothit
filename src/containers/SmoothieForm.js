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
        const components = this.state.smoothie.components;

        if (!components) return;

        const kcal = components.reduce((previous, item) => {
            return previous + item.kcalPerUnit * item.amount;
        }, 0);
        const price = components.reduce((previous, item) => {
            return previous + item.unitPriceEur * item.amount;
        }, 0);
        const weight = components.reduce((previous, item) => {
            return previous + item.amount;
        }, 0);

        this.setState({
            kcal,
            price,
            weight,
            smoothie: {
                ...this.state.smoothie,
                calories: kcal,
            },
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
            smoothie.components[index] = component;
        } else {
            smoothie.components.splice(index, 1);
        }

        this.setState({ smoothie }, () => this.calculateSmoothie());
    }

    addSmoothieComponent = () => {
        const smoothie = { ...this.state.smoothie };

        if (!smoothie.components) {
            smoothie.components = [];
        }

        smoothie.components.push(this.props.componentList[0]);

        this.setState({ smoothie }, () => this.calculateSmoothie());
    };

    createShoppingList = () => {
        // Create order + load shopping list
        let data = {
            servings: this.state.smoothie.servings,
            components: this.state.smoothie.components.map(
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
                fetch(`${API.shoppingList}/${data.id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw Error(response.status);
                        }

                        return response.json();
                    })
                    .then(order => {
                        this.setState({
                            shoppingList: order,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
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
            smoothie: { name, components, description, instructions },
        } = this.state;

        if (!smoothie) return;

        return (
            <form
                onSubmit={this.handleSubmit}
                method="post"
                className="smoothieform margin"
            >
                <div className="grid grid--middle-sm">
                    <div className="grid__col--sm-8">
                        <div className="textfield textfield--large">
                            <input
                                className="textfield__input"
                                value={name || ''}
                                type="text"
                                placeholder="Nimi"
                                onChange={e =>
                                    this.handleValueUpdate(e, 'name')
                                }
                            />
                        </div>
                    </div>
                    <div className="grid__col--sm-4">
                        <h3>{kcal} kCal</h3>
                    </div>
                </div>
                <div className="grid grid--bottom-sm smoothieform__relative">
                    <hr className="smoothieform__separator" />
                    <div className="grid__col--sm-6">
                        {components &&
                            components.map((component, i) => {
                                return (
                                    <SmoothieComponent
                                        key={`smoothiecomponent_${i}`}
                                        component={component}
                                        componentList={componentList}
                                        onSmoothieComponentUpdate={component =>
                                            this.updateSmoothieComponent(
                                                component,
                                                i,
                                            )
                                        }
                                    />
                                );
                            })}
                    </div>
                    <div className="grid__col--sm-6 grid--center-sm">
                        <h1>{price} &euro;</h1>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn--icon-lg btn--pink smoothiefrom__add-button"
                    onClick={this.addSmoothieComponent}
                >
                    <i className="fa fa-plus" />
                </button>
                {/* <p>Kogus: {weight} kg</p> */}
                <div>
                    <div className="textfield">
                        <label
                            className="textfield__label"
                            htmlFor="description"
                        >
                            Kirjeldus:
                        </label>
                        <input
                            id="description"
                            className="textfield__input"
                            value={description || ''}
                            type="text"
                            placeholder="Kirjeldus"
                            onChange={e =>
                                this.handleValueUpdate(e, 'description')
                            }
                        />
                    </div>
                    <div className="textfield">
                        <label
                            className="textfield__label"
                            htmlFor="instructions"
                        >
                            Valmistamise õpetus:
                        </label>
                        <input
                            id="instructions"
                            className="textfield__input"
                            value={instructions || ''}
                            type="text"
                            placeholder="Valmistamise õpetus"
                            onChange={e =>
                                this.handleValueUpdate(e, 'instructions')
                            }
                        />
                    </div>
                </div>
                <button type="submit" className="btn">
                    Salvesta
                </button>
                <div className="textfield textfield--small">
                    <input
                        className="textfield__input"
                        type="text"
                        placeholder="tk"
                        onChange={e => this.handleValueUpdate(e, 'servings')}
                    />
                </div>
                tk
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
    shoppingList: PropTypes.array,
    weight: PropTypes.number,
    price: PropTypes.number,
    kcal: PropTypes.number,
    isNew: PropTypes.bool,
};

SmoothieForm.defaultProps = {
    smoothie: {},
    shoppingList: null,
    weight: 0,
    price: 0,
    kcal: 0,
    isNew: false,
};

export default SmoothieForm;
