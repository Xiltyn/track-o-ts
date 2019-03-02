type values = {
    encounter_name?:string,
}

export const validate = (values:values) => {
    const errors:values = {};

    if(!values.encounter_name) {
        errors.encounter_name = 'Required';
    }

    return errors;
};
