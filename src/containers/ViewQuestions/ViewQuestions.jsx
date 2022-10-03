import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import './ViewQuestions.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import QuestionHeader from "../../Components/QuestionHeader/QuestionHeader.jsx";
import QuestionsTable from "../../Components/QuestionsTable/QuestionsTable.jsx";
import listQuestions from '../../../__mocks__/listQuestions.json';
import MoreAction from "../../Components/MoreAction/MoreAction.jsx";
const { RadioButton } = Fields;

const { Get } = Request;

const ViewQuestions = () => {
    const isEditable = false;
    const location = useLocation();
    const state = _get(location, 'state', {});
    const { code = "4343", name = "GRI",  framework_id= '',
    disclosure_id='' } = state || {};
    // const { dataType, inputType, unitType } = questions;
    const [frameworkData, setFrameworkData] = useState({});
    const [statusData, setStatusData] = useState({});
    const initialRow = { order: null, code: '', label: "", type: '', field_type: '', field_unit_values: '', evidence: null, value: null };
    const initialFieldOptions = { selectedDropDownVal: null, setFieldIndex: null }
    const [inputList, setInputList] = useState([...listQuestions.children]);
    const [isError, setIsError] = useState(false);
    const [fieldOptions, setFieldOptions] = useState(initialFieldOptions);

    // useEffect(() => {
    //     setInputList({})
    // }, [])

    // handle input change
    const handleInputChange = (e, index) => {

        const { name, value } = e.target;
        const list = [...inputList];
        if (name !== 'field_unit_values') {
            list[index][name] = value;
        } else {
            list[index][name] = [value];
        }
        list[index]['order'] = index;
        setInputList(list);
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf(value) > -1) {
            setFieldOptions({ selectedDropDownVal: value, setFieldIndex: index });
        }

    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = (index) => {
        if (!_isEmpty(inputList[index].code) && !_isEmpty(inputList[index].label) && !_isEmpty(inputList[index].type) && !_isEmpty(inputList[index].field_type) && !_isEmpty(inputList[index].field_unit_values)) {
            setInputList([...inputList, initialRow]);
            setIsError(false);
        } else {
            setIsError(true);
        }
        // setInputList([...inputList, initialRow]);
    };

    const onCreateQuestions = async () => {
        let list = [...inputList];
        const newInputList = list.map(({ Dropdown, Multiselect, ...rest }) => {
            delete rest["Radio button"];
            return rest;
        });
        const payload = {
            ...location.state,
            parent: null,
            children: newInputList
        }

        let lastInputList = newInputList[newInputList.length - 1];
        console.log(':::::::lastInputList:::::', lastInputList);
        if (!_isEmpty(lastInputList.code) && !_isEmpty(lastInputList.label) && !_isEmpty(lastInputList.type) && !_isEmpty(lastInputList.field_type) && !_isEmpty(lastInputList.field_unit_values)) {

            try {
                const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework}/disclosures/${id}`, payload).then(({ data }) => data);
                setStatusData({ type: 'success', message: 'Thanks! Your questions has been successfully created' });
                setInputList([initialRow]);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
            setIsError(false);
        } else {
            setIsError(true)
        }
    }

    const onGetQuestionOptions = (e) => {
        const { value } = e.target;
        const list = [...inputList];
        list[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal] = value;
        setInputList(list);
    }

    const onSetFieldOptions = () => {
        let list = [...inputList];
        let optionStringValue = list[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal];
        if (!_isEmpty(optionStringValue)) {
            list[fieldOptions.setFieldIndex]['field_choices'] = optionStringValue.split(',');
            setInputList(list);
            setFieldOptions(initialFieldOptions);
        }
    }

    const listChoices = (i) => {
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf((inputList[i].field_type || '')) > -1) {
            return <>{(inputList[i]['field_choices'] || []).map((choice) => <li>{choice}</li>)}</>;
        }
        return null;

    }


    const closePopupModal = () => {
        setFieldOptions(initialFieldOptions);
    }

    const tableHeaders = ['Code', 'Question Title', 'Data Type', 'Input Type', 'Choices', 'Unit'];


    useEffect(() => {
        const getDisclosures = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setApiData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }
        getframeworkDetails();
        // getDisclosures();
    }, []);

    const getframeworkDetails = async (id = "aa0fda2d-4f43-41b9-a35e-483016b225e1") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}`).then(({ data }) => data);
            setFrameworkData(frameDetails);
        } catch (e) {
            setFrameworkData({});
        }
    }

    const onCloseHandler = () => {
    }
    const radioChangeHandler = (e) => {
        setCatagoryType(e.target.value);
    };

    const headers = ['Name', 'Action'];
    const radioButton = ['Environmental', 'Social', 'Goverance', 'General'];

    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title">
                    Edit Framework {'->'} List Frameworks {'->'} View Disclosures {'->'} List Disclosures {'->'}  List Questions
                </h1>
            </div>
            {/* <div className="disc-framework-details"> */}
                <table className="default-flex-table disc-framework-details">
                    <tr>
                        <td>{frameworkData && <img src={frameworkData.logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWtyOgOolwSFP4ICk81ehw87GzUkAywrbjcZoB9ReOA&s'} alt="GRI" width={'28px'} height={'28px'} />}</td>
                        <td>{frameworkData.name}</td>
                        <td>{frameworkData.description}</td>
                    </tr>
                </table>
            {/* </div> */}
            <div id="viewDisclosures" className="view-diclosuer-container">
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                {fieldOptions.selectedDropDownVal && <Modal isShow={!!fieldOptions.selectedDropDownVal} closeModal={closePopupModal}>
                    <div className='create-options-title'>Please enter the options with comma separated value</div>
                    <div className='get-textarea-input-container'>
                        <TextArea rows="6" cols="50" label='' name='optionString' value={inputList[fieldOptions.setFieldIndex][fieldOptions.selectedDropDownVal] || ''} className="" placeholder="" required={true} onChangeHandler={onGetQuestionOptions} />
                        <div className='add-question-option'><Button label="Submit" className='add-btn submit-btn' onClickHandler={() => onSetFieldOptions()} /></div>
                    </div>
                </Modal>}
                <table className="default-flex-table">
                    <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="">
                                <QuestionHeader code={code} name={name} />
                                <QuestionsTable
                                isEditable={false}
                                    tableData={inputList}
                                    tableHeader={tableHeaders}
                                    handleInputChange={handleInputChange}
                                    handleRemoveClick={handleRemoveClick}
                                    handleAddClick={handleAddClick}
                                    isError={isError} />
                            </td>
                            
                        </tr>

                    </tbody>
                </table>
            </div>
        </>)
}

export default ViewQuestions;