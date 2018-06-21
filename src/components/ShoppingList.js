import React from 'react';
import PropTypes from 'prop-types'

const ShoppingList = props => {
    const { shoppingList } = props;

    return (
        <div className="note">
            <ul className="note__list">
                {/* TODO: add shopping list items */}
            </ul>
            <h2>
                {/* TODO: add shopping list total */}
            </h2>
        </div>
    );
};

ShoppingList.propTypes = {
    shoppingList: PropTypes.object.isRequired,
}

ShoppingList.defaultProps = {
    shoppingList: null,
}

export default ShoppingList;
