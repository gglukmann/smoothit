import React from 'react';
import PropTypes from 'prop-types';

class SmoothieForm extends React.Component {
    render() {
        const { smoothie: { name }} = this.props;

        return (
            <form>
                <input type="text" value={name} />
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