import React from 'react';

import API from '../common/globals';

class SmoothieForm extends React.Component {
    nameRef = React.createRef();

    componentDidMount() {
        fetch(API.components)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    createSmoothie = event => {
        event.preventDefault();

        const smoothie = {
            name: this.nameRef.current.value,
        };

        this.props.addSmoothie(smoothie);
        event.currentTarget.reset();
    }

    render() {
        return (
            <form onSubmit={this.createSmoothie}>
                <input type="text" ref={this.nameRef} name="name" placeholder="Nimi" />
                <button type="submit">Salvesta</button>
            </form>
        );
    }
}

export default SmoothieForm;