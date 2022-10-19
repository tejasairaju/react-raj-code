import React from "react";
import Fields from '../Common/Fields/Fields.jsx';
import './CategoryFilter.css';
const { RadioButton } = Fields;

const CategoryFilter = (props) => {

    const {filterList = null, filterKey = '', radioChangeHandler = () => {} }  = props;

    return (<><h1 className="assign__title">
        Categories:
    </h1>
        <ul className="assign__categories">
            {(filterList || []).map((radioVal, i) => (<RadioButton
                changed={radioChangeHandler}
                id={i}
                isSelected={filterKey === radioVal}
                label={radioVal}
                value={radioVal}
            />))}
        </ul></>);
}

export default CategoryFilter;