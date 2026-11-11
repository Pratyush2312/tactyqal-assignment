import { sileo } from 'sileo';


export const generateToast = (status,title) => { 
    if (status === 'success') {
        sileo.success({ title, duration: 3000 });
    }
    else if (status === 'error') { 
        sileo.error({ title, duration: 3000 });
    }
}