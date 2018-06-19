import React from 'react';

const SmoothieComponent = props => {
    const { component, componentList, onSmoothieComponentUpdate } = props;

    return (
        <div className="component">
            <div className="component__type">
                <select
                    className="form-select"
                    value={component.id}
                    onChange={e =>
                        onSmoothieComponentUpdate(
                            componentList.find(
                                x => x.id === parseInt(e.target.value, 10),
                            ),
                        )
                    }
                >
                    {componentList.map(option => {
                        return (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        );
                    })}
                </select>
                <button
                    className="btn--icon"
                    onClick={() => onSmoothieComponentUpdate(null)}
                >
                    <i className="fa fa-minus" />
                </button>
            </div>
            <div className="component__amount">
                <input
                    className="form-text"
                    value={component.amount || ''}
                    placeholder="Kogus"
                    type="number"
                    onChange={e =>
                        onSmoothieComponentUpdate({
                            ...component,
                            amount: e.target.value,
                        })
                    }
                />
                <span>{component.unit}</span>
            </div>
        </div>
    );
};

export default SmoothieComponent;
