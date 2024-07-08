

export const validName = new RegExp(
    /^[A-Za-z.]+$/
 );


export const validEmail = new RegExp(
    /^[a-z0-9.]+[@][a-z]+[.][a-z]+$/
 );


export const validPassword = new RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
 );

export const validSellerId = new RegExp(
    /^[a-z0-9]+$/
 );
export const validPrice = new RegExp(
    /^[0-9]+$/
 );
