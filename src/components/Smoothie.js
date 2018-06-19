import React from 'react';

const Smoothie = ({ smoothie }) => {
    const getColors = components => {
        if (!components) return;

        // const amount = components.reduce((previous, item) => {
        //     return previous + (item.amount || 1);
        // }, 0);
        // const colors = components.map(item => {
        //     const percent = parseInt(((item.amount || 1) * 100) / amount);
        //     return `${item.colorHex} ${percent}%`;
        // });

        // get all colors from components and create new array
        const colors = components.map(item => item.colorHex);
        // if smoothie has only one component then add same color twice to use linear-gradient correctly
        if (colors.length <= 1) {
            colors.push(colors[0]);
        }
        return { background: `linear-gradient(to top, ${colors.join(', ')})` };
    };

    return (
        <div
            className="smoothie"
            style={getColors(smoothie.smoothieComponents)}
        >
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Smoothie;
