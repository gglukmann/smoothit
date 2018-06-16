import React from 'react';

const SmoothieComponent = (props) => {
    const { component, componentList, onSmoothieComponentUpdate } = props;

    return (
        <div>
            <select 
                value={component.id} 
                onChange={e => onSmoothieComponentUpdate(componentList.find(x => x.id === parseInt(e.target.value)))}
            >
                {componentList.map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })}
            </select>
            <input 
                value={component.amount || ''} 
                placeholder="Kogus" 
                type="number"
                onChange={e => onSmoothieComponentUpdate({...component, amount: e.target.value})}
            />
        </div>
    );
}

export default SmoothieComponent;