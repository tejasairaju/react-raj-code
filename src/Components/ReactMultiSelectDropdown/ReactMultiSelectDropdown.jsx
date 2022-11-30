import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';



const ReactMultiSelectDropdown = ({ data = [], onChangeCallback = () => {}, selectedOptionVal = []}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        if ((data || []).length > 0) {
             let filterData = constractArrayValue([...data]);
            setOptions([...filterData]);
        }
    
        // if(selectedOptionVal.length > 0) {
        //     let filterData_1 = constractArrayValue([...selectedOptionVal]);
        //     console.log('>>>>>>>>>>>>>>>dom_3', filterData_1);
        //     setSelectedOption([...filterData_1 ]);
        // }
    }, []);

    useMemo(() => {
        if(selectedOptionVal.length > 0) {
            console.log('>>>use>>', selectedOption);
            setSelectedOption(selectedOptionVal);
        }
    }, [selectedOptionVal]);


    const constractArrayValue = (val) => {
        let cloneData = [...val];
        cloneData = cloneData.map((item) => {
            item['label'] = item.name;
            item['value'] = item.id;
            return item;
        });
        return cloneData;
    }

    const onHandleChange = (value) => {
        onChangeCallback(value);
    }
console.log('>>>>>', selectedOption);
    return (
    
        <div className="App">
            {((options ||[]).length || (selectedOption|| []).length) && <Select
                defaultValue={selectedOption}
                onChange={onHandleChange}
                options={options}
                isMulti={true}
            />
}
        </div>
    );
}

export default ReactMultiSelectDropdown