import React from 'react';
import Fields from '../Common/Fields/Fields.jsx';
import {questions} from '../../utils/constants.js';
import MoreAction from '../MoreAction/MoreAction.jsx';

const { Button, Input, TextArea, Dropdown } = Fields;

const QuestionsTable = ({ tableData= null, tableHeader = null, handleInputChange=() => {}, handleRemoveClick = () => {}, handleAddClick =() => {}, isError=false}) => {
    const { dataType, inputType, unitType } = questions;

    const listChoices = (i) => {
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf((tableData[i].field_type || '')) > -1) {
            return <>{(tableData[i]['field_choices'] || []).map((choice) => <li>{choice}</li>)}</>;
        }
        return null;
    }

    return (<div className="create_questions_table__container">
    <table className="default-table">
        <thead><tr>{tableHeader.map((header) => <th style={{background: 'none !important' }}>{header}</th>)}</tr></thead>
        <tbody>
            {(tableData || []).map((x, i) => {
                return (<tr>
                    <td>
                        <Input isEditable={true} label='' type="text" name='code' value={x.code} className="create-framework__input question-ref-code" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} />
                    </td>
                    <td>
                        <TextArea isEditable={true} label='' name='label' value={x.label} className="create-framework__input question-title" placeholder="" required={true} onChangeHandler={(e) => handleInputChange(e, i)} />
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
                        {/* {<MoreAction viewQuestions={true} index={i} state={x} />} */}
                    </td>
                    {false&&<td>
                        <div className='flex'>
                            {tableData.length !== 1 && <Button label="Remove" className='remove-btn' onClickHandler={(i) => handleRemoveClick(i)} />}
                            {tableData.length - 1 === i && <Button label="Add" className='add-btn' onClickHandler={() =>handleAddClick(i)} />}
                        </div>
                    </td>
            }
                </tr>
                )
            })
            }
        </tbody>

    </table>
{isError && <div className='overall-error-container color-red question-disclosure-error'>*Please fill all the columns</div>}

</div>)
}

export default QuestionsTable;