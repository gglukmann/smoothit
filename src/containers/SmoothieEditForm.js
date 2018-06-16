import React from "react";
import PropTypes from "prop-types";

import SmoothieComponent from '../components/SmoothieComponent';

class SmoothieForm extends React.Component {
  state = {
    smoothie: null
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

    smoothie.smoothieComponents[index] = component;

    this.setState({ smoothie });
  }

  addSmoothieComponent() {
    let smoothie = this.state.smoothie;

    smoothie.smoothieComponents.push(this.props.smoothieComponents[0]);

    this.setState({ smoothie });
  }

  render() {
    const {
      smoothie: { name, smoothieComponents, description },
      smoothie,
    } = this.props;

    if(!smoothie) return;

    return (
      <div>
        <input value={name} onChange={e => this.handleValueUpdate(e, 'name')} />
        <input value={description} onChange={e => this.handleValueUpdate(e, 'description')} />
        {smoothieComponents.map((component, i) => {
          return (
            <div key={`smoothiecomponent_${i}`}>
              <SmoothieComponent 
                component={component} 
                componentList={this.props.smoothieComponents}
                onSmoothieComponentUpdate={component => this.updateSmoothieComponent(component, i)} />
            </div>
          );
        })}
        <button onClick={this.addSmoothieComponent.bind(this)}>
          Lisa komponent
        </button>
        <button onClick={e => this.props.onSmoothieSave(this.state.smoothie)}>Salvesta</button>
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
