import React from 'react';
import ReactTooltip from 'react-tooltip';

const ReactToolTip = ({ children = null, hoverText = '', classTxt }) => {
  return (
    <div>
      <header>
        <p className={classTxt ? classTxt : ''} data-htmlFor='test' data-tip={hoverText}>
          {children}
        </p>
        <ReactTooltip place='top' type='info' id='test' />
      </header>
    </div>
  );
};
export default ReactToolTip;
