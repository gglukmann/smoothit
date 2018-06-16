import React from 'react';

class SmoothieAddComponent extends React.Component {
    render() {
        return (
            <div>
                <select
                    name="components"
                    ref={el => {
                        this.select = el;
                    }}
                >
                    <option value="0">Vali komponent</option>
                    {this.props.components.map(item => {
                        return (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <input
                    type="text"
                    ref={this.weightRef}
                    name="weight"
                    placeholder="Kogus"
                />
            </div>
        );
    }
}

export default SmoothieAddComponent;