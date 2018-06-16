import React from 'react';

const ShoppingList = (props) => {
    const { shoppingList } = props;

    return (
        <div>
            <ul>
                {shoppingList.items.map((row, i) => {
                    return (
                        <li key={`${row.name}_${i}`}>
                            <p>Brand: {row.brand}</p>
                            <p>Name: {row.name}</p>
                            <p>Package Price: {row.packagePriceEur}</p>
                            <p>Package Size: {row.packageSize}</p>
                            <p>Packages: {row.packages}</p>
                            <p>Sales unit: {row.salesUnit}</p>
                            <p>Total price: {row.totalPriceEur}</p>
                        </li>
                    );
                })}
            </ul>
            <h3>Total price: {shoppingList.totalEur}</h3>
        </div>
    );
}

export default ShoppingList;