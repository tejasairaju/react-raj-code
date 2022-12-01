import React, { useState } from "react";
import _toLower from 'lodash/toLower'
import { useEffect } from "react";


const AddMoreSubSectorOption = (props) => {
    const { sectorName ="", isEdit = false, placeholder = '', label = '', value = '', status = '', updateMoreOption = () => { } } = props;
    const [inputValue, setInputValue] = useState('');

    const addMoreoptions = async (e) => {
        const { value } = e.target;
        setInputValue(value)
    }
    useEffect(() => {
        setInputValue(value)
    }, [value]);

    useEffect(() => {

        if (status === 'success') {
            setInputValue('');
        }
    }, [status])
    return (

        <div class="main__top-wrapper">
            <div class="user_input_text flex flex-column">
                <h1 class="main__title">
                    {'Sector'} :
                </h1>
                <input type="text" name='sector' class="country__text__box"
                    placeholder={'Enter the sector'}
                    value={sectorName}
                    readOnly={true}
                    onChange={addMoreoptions}
                />
            </div>
            <div class="user_input_text flex flex-column">
                <h1 class="main__title white-space">
                    {'SubSector'} :
                </h1>
                <input type="text" name={_toLower(label)} class="country__text__box"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={addMoreoptions}
                />
            </div>
            <button class="main__button" onClick={() => updateMoreOption(inputValue)}>
                {isEdit ? "EDIT" : "ADD"}
            </button>
        </div>
    )
}

export default AddMoreSubSectorOption;