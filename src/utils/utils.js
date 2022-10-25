import _toLower from 'lodash/toLower';
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

export const getColor = (status) => {
    switch (status) {
        case 'Disclosures': return 'color_blue';
        case 'Completed': return 'color_green';
        case 'Pending': return 'color_red';
    }
}