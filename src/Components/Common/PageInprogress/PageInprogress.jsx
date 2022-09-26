import React, { useState } from 'react';
// import PageLoader from '../PageLoader/PageLoader.jsx';
import './PageInprogress.css'

const PageInprogress = (props) => {
    return (<div className='pageinprogress-container'>
        <div className='pageinprogress_inner'>
            <div className='pageinprogress-block'>
                <div className='pageinprogress-body'>
                   <div className='flex flex-center'><img src="assets/icons/spinner-loader.svg" alt="loading..." width={'100px'} /></div>
                    <div className={`inprogress-message`}>Please wait while we set things up for you... this might take a few seconds.</div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default PageInprogress;