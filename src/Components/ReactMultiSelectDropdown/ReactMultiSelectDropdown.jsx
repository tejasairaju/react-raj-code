import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import './ReactMultiSelectDropdown.css';

const ReactMultiSelectDropdown = ({ data = [], required = false, isEditable = false, onChangeCallback = () => {}, selectedOptionVal = [] }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if ((data || []).length > 0) {
      let filterData = constractArrayValue([...data]);
      setOptions([...filterData]);
      // setSelectedOption([{'label': "INDIA", "value": "INDIA"}]);
      // setSelectedOption(selectedOptionVal);
    }

    // if(selectedOptionVal.length > 0) {
    //     let filterData_1 = constractArrayValue([...selectedOptionVal]);
    //     console.log('>>>>>>>>>>>>>>>dom_3', filterData_1);
    //     setSelectedOption([...filterData_1 ]);
    // }
  }, [data]);

  useEffect(() => {
    if (isEditable && (selectedOptionVal || []).length) {
      let filterData_1 = constractArrayValue([...selectedOptionVal]);
      setSelectedOption(filterData_1);
    }
  }, [selectedOptionVal]);

  // useEffect(() => {
  //     console.log('>>>>11');
  //     if(selectedOptionVal.length > 0) {
  //         console.log('>>>>11');
  //         setSelectedOption(selectedOptionVal);
  //     }
  // }, [selectedOptionVal]);

  const constractArrayValue = (val) => {
    let cloneData = [...val];
    cloneData = (cloneData || []).map((item) => {
      item['label'] = item.name;
      item['value'] = item.id;
      return item;
    });
    return cloneData;
  };

  const onHandleChange = (value, event) => {
    setSelectedOption(value);
    onChangeCallback(value, event);
  };

  const onremove = (val) => {
    console.log(val);
  };

  return (
    <div>
      {required && <span className='text-red-500'>*</span>}
      <div className='App multi-select-dropdown'>
        {((options || []).length || (selectedOption || []).length) && (
          <Select
            value={selectedOption}
            // defaultInputValue={selectedOption}
            onChange={onHandleChange}
            onMenuClose={onremove}
            options={options}
            isMulti={true}
          />
        )}
      </div>
    </div>
  );
};

export default ReactMultiSelectDropdown;
