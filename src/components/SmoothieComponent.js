import React from 'react';

const SmoothieComponent = props => {
    const { component, componentList, onSmoothieComponentUpdate } = props;

    return (
        <div className="component">
            <div>
                <div className="component__type">
                    <select
                        className="select"
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
                        type="button"
                        className="btn--icon"
                        onClick={() => onSmoothieComponentUpdate(null)}
                    >
                        <i className="fas fa-minus" />
                    </button>
                </div>
            </div>
            <div className="component__amount">
                <div className="textfield textfield--small textfield--center">
                    <input
                        className="textfield__input"
                        value={component.amount || ''}
                        placeholder="Kogus"
                        type="number"
                        onChange={e =>
                            onSmoothieComponentUpdate({
                                ...component,
                                amount: parseInt(e.target.value, 10),
                            })
                        }
                    />
                </div>
            </div>
            <span>{component.unit}</span>
        </div>
    );
};

export default SmoothieComponent;
