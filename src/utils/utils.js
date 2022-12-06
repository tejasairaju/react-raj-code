import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import _toUpper from 'lodash/toUpper';
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

export const getTaskCount = (response) => {
    let cloneCount = { pending: 0, completed: 0, disclosures: 0 };
    cloneCount.disclosures = response.count;
    (response.results || []).map((item) => {
        if (_toLower(item.status) === 'pending') {
            cloneCount.pending += 1;
        }
        if (_toLower(item.status) === 'completed') {
            cloneCount.completed += 1;
        }
    });

    return { ...cloneCount };
}

export const getProfilePhoto = (val, classVal= {width:'40px', height:'40px'}) => {
    if (!_isEmpty(val.profile_picture)) return <img src={val.profile_picture} {...classVal} alt="" />;
    else {
        return <div className="profile-image-icon">{_toUpper((val&&val.first_name).charAt(0))} {_toUpper((val&&val.last_name).charAt(0))}</div>}

}

export const getLogo = (val, classVal= {width:'40px', height:'40px'}) => {
    if (!_isEmpty(val.logo)) return <img src={val.logo} {...classVal} alt="" />;
    else {
        return <div  className="profile-image-icon">{_toUpper((val&&val.name).charAt(0))} {_toUpper((val&&val.name).charAt(1))}</div>}

}

export const getDataFormat = (date, formate = 'Do MMM YYYY') => {
    if (_isEmpty(date)) return moment.format(formate);
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
    let errorObject = { type: 'error' };
    if (_get(error, 'response.status', 400) === 400) {
        const data = _get(error, 'response.data', {});
        const flatData = Object.values(data).flat();
        if (flatData.length > 0) {
            errorObject['message'] = flatData[0];
        }
    } else if(_get(error, 'response.status', 400) === 409){
        errorObject['message'] = _get(error, 'response.data.message', 'Request failed with status code 409');
    } else {
        
        errorObject['message'] = error.message;
    }
    return { ...errorObject };
}

export const constractURLQueryStr = (data = {}) => {
    let str = '?';
    if(_isEmpty(data)) {
        return ''
    }
    console.log('>>>>>>>>', data);
    var dataKey = Object.keys(data) || null;
    var dataValue = Object.values(data) || null;
    (dataKey || []).forEach((item, i) => {
        if ((dataKey.length === 0) || (i === dataKey.length - 1)) {
            str += item + "=" + encodeURIComponent(dataValue[i]);
        } else {
            str += item + '=' + encodeURIComponent(dataValue[i]) + '&';
        }

    });
    return str;
}

