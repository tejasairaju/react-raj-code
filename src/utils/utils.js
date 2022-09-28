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