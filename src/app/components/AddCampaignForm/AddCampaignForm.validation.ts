type values = {
    [key:string]:string|{email:string}[]|undefined,
    campaign_name?:string,
    players?:{email:string}[],
}

export const validate = (values:values) => {
    const errors:values = {};

    if(!values.campaign_name) {
        errors.campaign_name = 'Required';
    }

    //if(values.players) {
    //    values.players.map((player, index) => {
    //        if(!player.email.includes('@') && !player.email.includes('.')) {
    //            errors[`player_${index}`] = 'proper email required';
    //        }
    //    })
    //}

    return errors;
};
