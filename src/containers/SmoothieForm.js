import React from 'react';
import PropTypes from 'prop-types';

import { ShoppingList, SmoothieComponent, Loader } from '../components';
import API from '../common/globals';

class SmoothieForm extends React.Component {
    state = {
        smoothie: {},
        shoppingList: null,
        weight: 0,
        price: 0,
        kcal: 0,
        isNew: false,
        isLoading: false,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.isNew !== state.isNew) {
            return {
                smoothie: props.smoothie,
                isNew: props.isNew,
                weight: 0,
                price: 0,
                kcal: 0,
                shoppingList: null,
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
        // TODO: calculate smoothies kcal, weight and price
    }

    handleValueUpdate = (e, key) => {
        // TODO: update input values
    };

    updateSmoothieComponent(component, index) {
        // TODO: update smoothie components
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
        // TODO: start loader

        const data = {
            servings: this.state.smoothie.servings,
            components: this.state.smoothie.components.map(
                ({ name, amount }) => {
                    return { name, quantity: amount };
                },
            ),
        };

        // TODO: POST order, get order id and get shopping list
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSmoothieSave(this.state.smoothie);
    };

    render() {
        const { componentList, isNew } = this.props;

        const {
            shoppingList,
            price,
            kcal,
            smoothie,
            smoothie: { name, components, description, instructions },
            isLoading,
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
                        <div
                            className={`textfield textfield--large ${
                                isNew ? 'is-focused' : ''
                            }`}
                        >
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
                    <div className="grid__col--md-6">
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
                    <div className="grid__col--md-6 grid--center-xs">
                        <h1>{price} &euro;</h1>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn--icon-lg btn--pink smoothiefrom__add-button"
                    onClick={this.addSmoothieComponent}
                    title="Lisa komponent"
                >
                    <i className="fas fa-plus" />
                </button>
                <div>
                    <div className={`textfield ${isNew ? 'is-focused' : ''}`}>
                        <label
                            className="textfield__label"
                            htmlFor="description"
                        >
                            Kirjeldus
                        </label>
                        <input
                            id="description"
                            className="textfield__input"
                            value={description || ''}
                            type="text"
                            onChange={e =>
                                this.handleValueUpdate(e, 'description')
                            }
                        />
                    </div>
                    <div className={`textfield ${isNew ? 'is-focused' : ''}`}>
                        <label
                            className="textfield__label"
                            htmlFor="instructions"
                        >
                            Valmistamise õpetus
                        </label>
                        <input
                            id="instructions"
                            className="textfield__input"
                            value={instructions || ''}
                            type="text"
                            onChange={e =>
                                this.handleValueUpdate(e, 'instructions')
                            }
                        />
                    </div>
                </div>
                <button type="submit" className="btn">
                    Salvesta
                </button>
                {!isNew && (
                    <React.Fragment>
                        <hr className="separator" />
                        <div className="grid grid--middle-xs">
                            <div className="grid__col--xs">
                                <div className="grid grid--middle-xs">
                                    <div className="grid__col--xs">
                                        <div
                                            className={`textfield textfield--small ${
                                                isNew ? 'is-focused' : ''
                                            }`}
                                        >
                                            <label
                                                className="textfield__label"
                                                htmlFor="tk"
                                            >
                                                Smuuti kogus
                                            </label>
                                            <input
                                                id="tk"
                                                className="textfield__input"
                                                type="text"
                                                placeholder="tk"
                                                onChange={e =>
                                                    this.handleValueUpdate(
                                                        e,
                                                        'servings',
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid__col--xs">tk</div>
                                </div>
                            </div>
                            <div className="grid__col--xs">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={this.createShoppingList}
                                >
                                    Loo ostunimekiri
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                )}
                {shoppingList &&
                    !isNew && (
                        <div className="grid">
                            <div className="grid__col--md-6">
                                {/* <ShoppingList shoppingList={shoppingList} /> */}
                            </div>
                        </div>
                    )}
                {isLoading && <Loader />}
            </form>
        );
    }
}

SmoothieForm.propTypes = {
    smoothie: PropTypes.object.isRequired,
    componentList: PropTypes.array.isRequired,
    isNew: PropTypes.bool.isRequired,
    onSmoothieSave: PropTypes.func.isRequired,
};

SmoothieForm.defaultProps = {
    smoothie: {},
    componentList: null,
    isNew: false,
    onSmoothieSave: () => {},
};

export default SmoothieForm;
