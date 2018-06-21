import React from 'react';
import PropTypes from 'prop-types'

const ShoppingList = props => {
    const { shoppingList } = props;

    return (
        <div className="note">
            <ul className="note__list">
                {shoppingList.items.map((row, i) => {
                    return (
                        <li
                            className="note__list-item"
                            key={`${row.name}_${i}`}
                        >
                            <h3>
                                <span className="text-highlight">
                                    {row.brand}
                                </span>{' '}
                                {row.name}
                            </h3>
                            <p>
                                {row.packages} x {row.packagePriceEur} &euro;/{
                                    row.salesUnit
                                }{' '}
                                = {row.totalPriceEur} &euro;
                            </p>
                        </li>
                    );
                })}
            </ul>
            <h2>
                Kokku:{' '}
                <span className="text-highlight">
                    {shoppingList.totalEur} &euro;
                </span>
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
