import ReactTooltip from 'react-tooltip';
import React from 'react';

const ReactToolTip = ({children = null, hoverText = ''}) => {
    return(
    <div>
        <header>
        <p data-for="test" data-tip={hoverText} >{children}</p>
        <ReactTooltip place="top" type="info" id="test"/>
        </header>
    </div>)
}
export default ReactToolTip;