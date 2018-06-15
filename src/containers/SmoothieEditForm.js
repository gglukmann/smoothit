import React from 'react';
import PropTypes from 'prop-types';

class SmoothieForm extends React.Component {
    handleChange = event => {
        console.log(event.currentTarget.value)
    }

    render() {
        const { smoothie: { name }} = this.props;

        return (
            <form>
                <input type="text" onChange={this.handleChange} value={name} />
                <button type="submit">Salvesta</button>
            </form>
        );
    }
}

SmoothieForm.propTypes = {
    smoothie: PropTypes.object,
}

SmoothieForm.defaultProps = {
    smoothie: {},
}

export default SmoothieForm;