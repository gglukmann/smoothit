import React from 'react';

const ShoppingList = props => {
    const { shoppingList } = props;

    return (
        <ul>
            {shoppingList.map((row, i) => {
                return (
                    <li key={`${row.id}_${i}`}>
                        <p>Nimi: {row.name}</p>
                        <p>Kogus: {row.quantity}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default ShoppingList;
