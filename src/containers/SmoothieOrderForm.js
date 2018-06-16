import React, { Component } from 'react';

class SmoothieOrder extends Component {
    state = {
        shoppingList: null,
    }

    get(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            });
    }

    post(url, body) {
        const conf = {
            body,
        };

        return fetch(url, conf)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }

                return response.json();
            });
    }

    componentDidMount() {
        //this.post(API.order, {}).then(res => console.log(res));
        //console.log(this.props.smoothie);
    }

    render() {
        let { shoppingList } = this.state;
        
        if(!shoppingList) return null;
        
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
}

export default SmoothieOrder;