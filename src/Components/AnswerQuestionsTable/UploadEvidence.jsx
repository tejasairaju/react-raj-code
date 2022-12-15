import axios from 'axios';
import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
// import Fields from '../Fields/Fields.jsx';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Requests from '../../Requests/index.js';
import DocumentList from './DocumentList.jsx';

const { DocumentUpload } = Fields;

const UploadEvidence = ({ disclosureIndex = '', getDisclosures = () => { }, question = {}, reportId = '', disclosureId = '', kpiId = '', imageUrl = '' }) => {
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [multiFile, setMultiFile] = useState([]);

    useEffect(() => {
        // if (!_isEmpty(_get(question, "evidence[0].file", ''))) {
        //     setUploadImage({ imageUrl: _get(question, `evidence[${(question.evidence || []).length -1}].file`, ''), fileName: _get(question, `evidence[${(question.evidence || []).length -1}].file_name`, '') });
        //     // setLogo(_get(question, "evidence[0].file", ''));
        //     setIsEdit(true);
        // }
        setMultiFile([...question.evidence]);
    }, [question.evidence]);

    // useEffect(() => {
    //     getDisclosures1();
    // }, []);

    const getDisclosures1 = async () => {
        try {
            // setStatusData({ type: 'loading', message: '' });
            const response = await Requests.Get(`/reports/${reportId}/disclosures/${disclosureId}/data`, { organization: orgDetails.name });
            setMultiFile([...response[disclosureIndex].children[questionIndex].evidence]);
            // setMultiFile();
        } catch (e) {
            // setStatusData({ type: '', message: '' });
        }
    }
    const onChangeFile = (event) => {
        const imageUrl = event.target.files[0];
        const fileName = event.target.files[0].name;
        setLogo(URL.createObjectURL(imageUrl));
        if (imageUrl) {
            setUploadImage({ fileName, imageUrl });
        }
    }

    const onSaveUploadFile = async () => {
        if (!_isEmpty(logo)) {
            try {
                const form = new FormData();
                if (!_isEmpty(uploadImage && uploadImage.fileName) && (isEdit == false)) {
                    form.append('file', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
                } else if (isEdit && logo) {
                    if (typeof (uploadImage.imageUrl) == 'object') {
                        form.append('file', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
                    }
                }
                form.append('disclosure_kpi_id', kpiId);
                form.append('disclosure_id', disclosureId);
                form.append('id', reportId);

                const response = await axios.post(`${process.env.API_BASE_URL}/reports/${reportId}/disclosures/${disclosureId}/evidence?organization=${orgDetails.name}`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(({ data }) => data);
                if (response) {
                    getDisclosures();
                    // getDisclosures1();
                }

            } catch (e) {
                console.log('>>>>>>>>>>Error', e);
            }
        }
    }

    const onCloseDocument = async (docId) => {
            try {
                const response = await axios.delete(`${process.env.API_BASE_URL}/reports/${reportId}/disclosures/${disclosureId}/evidence/${docId}?organization=${orgDetails.name}`);
                getDisclosures();
            } catch (e) {
                console.log('>>>>>>>>>>Error', e);
            }
        }
    

    // const onCloseDocument =() => {

    // }

    const onChangeRemoveFile = () => {
        setLogo(null);
    }
    return (<>
        <div class="framework__row-wrapper bot1 answer_question-file_upload">
            <DocumentUpload
                imgcls={'org-image-size'}
                fileUploadHandler={() => onSaveUploadFile()}
                label=''
                imageUrl={logo}
                onChangeFile={(e) => onChangeFile(e)}
                onChangeRemoveFile={onChangeRemoveFile}
                required={false} />
        </div>
        <div>
            <DocumentList documentList={question.evidence} onCloseDocument={(docId) => onCloseDocument(docId)} />
            {/* <div className="scrollable multi-file-scroll">

                {(question.evidence || []).map((doc, index) => (
                    <div>
                        <div className="multi-file-block">
                            {doc.file ? <img className='multi-file-image' src={doc.file} alt="" width={'40px'} height={'40px'} /> : null}
                            <div className='file-close-block'>
                                <img className='file-close-block-img ' onClick={() => { }} src="../../../../assets/icons/close.svg" width='20px' height='20px' />
                            </div>
                            <></>
                        </div>
                    </div>
                ))}

            </div> */}
        </div>
    </>);
}

export default UploadEvidence;