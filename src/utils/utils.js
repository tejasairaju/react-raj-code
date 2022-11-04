import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import moment from 'moment';
export const checkValidation = (inputValue) => {
    let cloneInputValue = { ...inputValue };
    let errors = {};
    if (!(_get(cloneInputValue, 'name', '')).trim()) {
        errors['name'] = "GRI is required";
    } else if (!(_get(cloneInputValue, 'name', '')).trim()) {
        errors['name'] = "Disclosures is required";
    } else {
        errors['name'] = "";
    }

    if (!_get(cloneInputValue, 'description', '').trim()) {
        errors['description'] = "Description is required";
    } else {
        errors['description'] = "";
    }
    if (!_get(cloneInputValue, 'guidance', '').trim()) {
        errors['guidance'] = "Guidance is required";
    } else {
        errors['guidance'] = "";
    }
    return errors;
}

export const getTaskCount =(response) => {
    let cloneCount = {pending: 0, completed: 0, disclosures: 0};
    cloneCount.disclosures = response.count;
     (response.results || []).map((item) => {
        if (_toLower(item.status) === 'pending') {
            cloneCount.pending += 1;
        }
        if (_toLower(item.status) === 'completed') {
            cloneCount.completed += 1;
        }
    });

    return {...cloneCount};
}

export const getDataFormat = (date, formate = 'DD/MM/YYYY') => {
    if(_isEmpty(date)) return moment.format(formate);
    else return moment(date).format(formate);
}

export const getColor = (status) => {
    switch (status) {
        case 'Disclosures': return 'color_blue';
        case 'Completed': return 'color_green';
        case 'Pending': return 'color_red';
    }
}

export const getErrorMessage = (error) => {
    let errorObject = { type: 'error'};
    if(_get(error, 'response.status', 400) === 400) {
        const data = _get(error, 'response.data', {});
        const flatData = Object.values(data).flat();
        if(flatData.length > 0) {
            errorObject['message'] = flatData[0];
        } 
    } else {
        errorObject['message'] = error.message;
    }
    return {...errorObject};
}