import axios from 'axios';
import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const DocumentList = ({ documentList = [], onCloseDocument= () => {} }) => {
    return (<>
        <div className='scrollable multi-file-scroll'>
            {(documentList || []).map((doc, index) => (
                <div>
                    <div className="multi-file-block">
                        {doc.file ? <img className='multi-file-image' src={doc.file} alt="" width={'40px'} height={'40px'} /> : null}
                        <div className='file-close-block cursor-pointer'>
                            <img className='file-close-block-img ' onClick={() => onCloseDocument(doc.id)} src="../../../../assets/icons/close.svg" width='20px' height='20px' />
                        </div>
                        <></>
                    </div>
                </div>
            ))}

        </div>
    </>);
}

export default DocumentList;