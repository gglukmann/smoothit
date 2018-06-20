import React from 'react';
import glassSvg from '../assets/images/glass.svg';

const Smoothie = ({ smoothie, size, inactive, create }) => {
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

    const getColorRows = components => {
        if (!components) return <div className="smoothie__color"></div>;

        function LightenDarkenColor(col, amt) {
  
            var usePound = false;
          
            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }
         
            var num = parseInt(col,16);
         
            var r = (num >> 16) + amt;
         
            if (r > 255) r = 255;
            else if  (r < 0) r = 0;
         
            var b = ((num >> 8) & 0x00FF) + amt;
         
            if (b > 255) b = 255;
            else if  (b < 0) b = 0;
         
            var g = (num & 0x0000FF) + amt;
         
            if (g > 255) g = 255;
            else if (g < 0) g = 0;
         
            return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
          
        }

        const colorRowData = components.map(item => { 
            return { color: item.colorHex, amount: item.amount || 1, id: item.id };
        });

        return colorRowData.map(row => {
            return (<div key={`smoothie_${row.id}`} className="smoothie__color" style={{flexGrow: row.amount, background: `linear-gradient(to top, ${LightenDarkenColor(row.color, 25)}, ${row.color}, ${row.color})`}}></div>)
        });
    }

    let smoothieClass = 'smoothie ';
    if(size === 'lg') smoothieClass += 'smoothie--lg ';
    if(inactive) smoothieClass += 'smoothie--inactive ';

    return (
        <div className={smoothieClass}>
            <img className="smoothie__glass" src={glassSvg} alt="smoothie glass" />
            <div
                className="smoothie__colors"
                /*style={getColors(smoothie.smoothieComponents)}*/
            >
                {getColorRows(smoothie.components)}
            </div>
            { create &&
                <div className="btn btn--icon-md btn--pink smoothie__btn" >
                    <i className="fa fa-plus" />
                </div>
            }
        </div>
    );
};

export default Smoothie;
