import react, {useState} from 'react';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { questions } from '../../utils/constants.js';
import Modal from '../Common/Modal/Modal.jsx';
import _isEmpty from 'lodash/isEmpty';

const { Button, Input, TextArea, Dropdown } = Fields;
const { dataType, inputType, unitType } = questions;

const ViewQuestionsList = ({ guidance='', description = '', code = "", name = "", createQuestions = true, tableHeaders = [], inputList = [], isError = false,
    handleInputChange = () => { }, onClickAddQuestion = () => { }, handleEditClick = () => { }, handleRemoveClick = () => { } }) => {
        const [isShowGuidance, setIsShowGuidance] = useState(false);
    const listChoices = (i) => {
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf((inputList[i].field_type || '')) > -1) {
            return <>{(inputList[i]['field_choices'] || []).map((choice) => <li>{choice}</li>)}</>;
        }
        return null;

    }

    return (<>
        <div>
        {isShowGuidance && <Modal isShow={!!isShowGuidance} isDisclosureDec={true} closeModal={() =>setIsShowGuidance(false) }>
            <div className='create-options-title'>Guidance:</div>
            <div className='get-textarea-input-container'>
                <div className="create-framework__textarea disclosure-description-screen">{ _isEmpty(guidance) ? <p dangerouslySetInnerHTML={{ __html: description }}></p> : <p dangerouslySetInnerHTML={{ __html: guidance }}></p> }</div>
            </div>
        </Modal>}
            <div className="create-framework__row-wrapper">
                {<><div className="fz-14 fw-700">
                    Ref No
                </div>
                    <input type="text" min="" step="" className="refno_create_question" value={code}
                        required disabled></input></>
                }
                <div className="fz-14 fw-700 disclosure">
                    Disclosure :
                    {<img onClick={() => setIsShowGuidance(true)} src='../../../../assets/images/questions.svg' alt='?' width='15px' height='15px' />}
                </div>
                <input type="text" className="create-framework__input"
                    value={name} required disabled></input>
                <div class="add-question-btn">
                    {createQuestions ? <button onClick={() => onClickAddQuestion()} className="main__button m-l-1">Add Question</button> : null}
                </div>
            </div>

        </div>
        <div className="create_questions_table__container">
            <table className="default-table">
                <thead><tr>{tableHeaders.map((header) => <th>{header}</th>)}</tr></thead>
                <tbody>
                    {(inputList || []).filter( i => {return i.active === true || i.active ===undefined}).map((x, i) => <tr>
                        {<td>
                            <Input isEditable={true} label='' type="text" name='code' value={x.code} className="create-framework__input question-ref-code" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} />
                        </td>
                        }
                        <td>
                            <TextArea isEditable={true} label='' name='label' value={x.label} className="create-framework__input question-title create-framework__textarea" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} />
                        </td>
                        <td>
                            <Dropdown isEditable={true} className_1={'questions__select select1'} className_2={'questions__select-item'} options={dataType} name='type' value={x.type} onChangeHandler={(e) => handleInputChange(e, i)} />
                        </td>
                        <td>
                            <Dropdown isEditable={true} className_1={'questions__select select1'} className_2={'questions__select-item'} options={inputType} name='field_type' value={x.field_type} onChangeHandler={(e) => handleInputChange(e, i)} />
                        </td>
                        <td>
                            <div className='preview-choices'>
                                {listChoices(i)}
                            </div>
                        </td>
                        <td>
                            <Dropdown isEditable={true} className_1={'questions__select select1'} className_2={'questions__select-item'} options={unitType} name='field_unit_values' value={x.field_unit_values} onChangeHandler={(e) => handleInputChange(e, i)} />

                        </td>
                         <td>
                            <div className='flex'>
                                {inputList.length > 0 && <Button label="Edit" className='add-btn' onClickHandler={() => handleEditClick(i)} />}
                                {inputList.length > 0 && <Button label="Remove" className='remove-btn' onClickHandler={() => handleRemoveClick(i)} />}

                            </div>
                        </td>
                        
                    </tr>)
                    }
                </tbody>

            </table>

            {isError&&(inputList || [].length > 0) && <div className='overall-error-container color-red question-disclosure-error'>*Please add atleast one question.</div>}
        </div>
    </>)
}

export default ViewQuestionsList;