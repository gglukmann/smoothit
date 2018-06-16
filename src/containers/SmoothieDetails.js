import React from 'react';

import { SmoothieEditForm, SmoothieAddForm, SmoothieOrderForm } from './index';
import API from '../common/globals';

class SmoothieDetails extends React.Component {
  state = {
    smoothie: {},
    pathname: null,
    smoothieComponents: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.pathname) {
      return {
        smoothie: {},
        pathname: nextProps.location.pathname,
      };
    }

    return null;
  }

  componentDidMount() {
    this.getSmoothie();
    this.getSmoothieComponents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.state.pathname) {
      this.getSmoothie();
    }
  }

  getSmoothie() {
    const smoothies = JSON.parse(localStorage.getItem("smoothies"));
    const smoothie = smoothies.filter(
      item => item.id === parseInt(this.props.match.params.id, 10)
    );

    this.setState({
      smoothie: smoothie[0] || {}
    });
  }

  getSmoothieComponents() {
    fetch(API.components)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }

        return response.json();
      })
      .then(data => {
        this.setState({
          smoothieComponents: data.content
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addSmoothie = smoothie => {
    console.log(smoothie);
  }

  saveSmoothie(smoothie) {
    console.log(smoothie);
  }

  render() {
    const { smoothie, smoothieComponents } = this.state;

    if (Object.keys(smoothie).length === 0) {
      return (
        <SmoothieAddForm
          addSmoothie={this.addSmoothie}
          smoothieComponents={smoothieComponents}
        />
      );
    }

    return (
      <React.Fragment>
        <SmoothieEditForm
          smoothie={smoothie}
          onSmoothieSave={this.saveSmoothie}
          smoothieComponents={smoothieComponents}
        />
        <SmoothieOrderForm smoothie={smoothie} />
      </React.Fragment>
    );
  }
}

export default SmoothieDetails;
