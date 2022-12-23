import axios from 'axios';
import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Requests from '../../Requests/index.js';
import DocumentList from './DocumentList.jsx';
import { getErrorMessage } from '../../utils/utils.js';

const { DocumentUpload } = Fields;

const UploadEvidence = ({ setStatusData = () => {}, disclosureIndex = '', getDisclosures = () => { }, question = {}, reportId = '', disclosureId = '', kpiId = '', imageUrl = '' }) => {
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [multiFile, setMultiFile] = useState([...question.evidence || []]);
    const [logoSizeError, setLogoSizeError] = useState(false);


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
        const fileSize = event.target.files[0].size / 1024 / 1024;
        if (fileSize < 5) {
            setLogo(URL.createObjectURL(imageUrl));
            if (imageUrl) {
                setUploadImage({ fileName, imageUrl });
            }
            setLogoSizeError(false);
        } else {
            setLogoSizeError(true);
        }
    }

    const onSaveUploadFile = async () => {
        if (!_isEmpty(logo)) {
            try {
                setStatusData({ type: 'loading', message: '' });
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
                    addedDocumentList(response);
                }
                setStatusData({ type: '', message: '' });
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
        }
    }

    const onCloseDocument = async (docId) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.delete(`${process.env.API_BASE_URL}/reports/${reportId}/disclosures/${disclosureId}/evidence/${docId}?organization=${orgDetails.name}`);
            if (response) {
                removeDeletedDocument(docId);
            }
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    };

    const addedDocumentList = (response) => {
        let cloneMultiFile = [...multiFile];
        setMultiFile([...[response], ...cloneMultiFile]);
    };

    const removeDeletedDocument = (docId) => {
        let cloneMultiFile = [...multiFile];
        cloneMultiFile = cloneMultiFile.filter(item => item.id !== docId);
        setMultiFile(cloneMultiFile);
    };

    const onChangeRemoveFile = () => {
        setLogo(null);
    }
    return (<>
        <div className="framework__row-wrapper bot1 answer_question-file_upload">
            <div> <DocumentUpload
                imgcls={'org-image-size'}
                fileUploadHandler={() => onSaveUploadFile()}
                label=''
                imageUrl={logo}
                onChangeFile={(e) => onChangeFile(e)}
                onChangeRemoveFile={onChangeRemoveFile}
                required={false} />
            </div>
            {logoSizeError && <div className="logo-size-error doc-size-error"><span>* File size should not exceed 5mb.</span>
            </div>}
        </div>

        <div>
            <DocumentList logoSizeError={logoSizeError} documentList={multiFile} onCloseDocument={(docId) => onCloseDocument(docId)} />
        </div>
    </>);
}

export default UploadEvidence;