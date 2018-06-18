import React from "react";
import PropTypes from "prop-types";

import SmoothieComponent from '../components/SmoothieComponent';
import ShoppingList from '../components/ShoppingList';

import API from '../common/globals';

class SmoothieForm extends React.Component {
  state = {
    smoothie: null,
    shoppingList: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.smoothie) {
      return {
        smoothie: props.smoothie
      };
    }

    return null;
  }

  handleValueUpdate = (e, key) => {
    let smoothie = this.state.smoothie;

    smoothie[key] = e.target.value;

    this.setState({smoothie})
  }

  updateSmoothieComponent(component, index) {
    let smoothie = this.state.smoothie;

    if(component) {
      smoothie.smoothieComponents[index] = component;
    } else {
      smoothie.smoothieComponents.splice(index, 1);
    }
     
    this.setState({ smoothie });
  }

  addSmoothieComponent() {
    let smoothie = this.state.smoothie;

    smoothie.smoothieComponents.push(this.props.smoothieComponents[0]);

    this.setState({ smoothie });
  }

  createShoppingList() {
    // Create order + load shopping list
    let data = {
      servings: 1,
      components: this.state.smoothie.smoothieComponents.map(({name, amount}) => {
        return { name, quantity: amount };
      }),
    };

    fetch(API.order, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    }).then(response => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    }).then(data => {
      
      console.log('Order created, ID: ', data.id);

    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const {
      smoothie: { name, smoothieComponents, description },
      smoothie,
    } = this.props;

    const { shoppingList } = this.state;

    if(!smoothie) return;

    return (
      <div className="smoothieform">
        <input 
          className="smoothieform__header form-text"
          value={name} 
          type="text"
          placeholder="Nimi"
          onChange={e => this.handleValueUpdate(e, 'name')} />
        {smoothieComponents.map((component, i) => {
          return (
            <SmoothieComponent 
                key={`smoothiecomponent_${i}`}
                component={component} 
                componentList={this.props.smoothieComponents}
                onSmoothieComponentUpdate={component => this.updateSmoothieComponent(component, i)} />
          );
        })}

        <button 
          className="btn--icon-lg btn--pink" 
          onClick={this.addSmoothieComponent.bind(this)}><i class="fas fa-plus"></i></button>
        <button 
          className="btn"
          onClick={e => this.props.onSmoothieSave(this.state.smoothie)}>Salvesta</button>
        <button 
          className="btn"
          onClick={this.createShoppingList.bind(this)}>Loo ostunimekiri</button>

        {shoppingList && <ShoppingList shoppingList={shoppingList} />}
      </div>
    );
  }
}

SmoothieForm.propTypes = {
  smoothie: PropTypes.object
};

SmoothieForm.defaultProps = {
  smoothie: {}
};

export default SmoothieForm;
