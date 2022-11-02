import React from "react";
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import { useSelector } from "react-redux";
import Fields from '../Common/Fields/Fields.jsx';
import './CategoryFilter.css';
const { RadioButton } = Fields;

const CategoryFilter = (props) => {
    const categories = useSelector(state => _get(state, 'appWizard.categories', []));

    const {filterList = null, filterKey = '', radioChangeHandler = () => {} }  = props;

    return (<><h1 className="assign__title">
        Categories:
    </h1>
        <ul className="assign__categories">
            {(categories || []).map((radioVal, i) => (<RadioButton
                changed={radioChangeHandler}
                id={i}
                isSelected={_toLower(filterKey) === _toLower(radioVal.name)}
                label={radioVal.name}
                value={radioVal.name}
            />))}
        </ul></>);
}

export default CategoryFilter;