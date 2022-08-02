import { FieldValues} from 'react-hook-form';
export interface ValueInput { [key: string]: { value: string | boolean } }
export interface ValidationsInputObject { [key: string]: { id: string; error: boolean; errorMessage: string } }


var requiredHelp = "Champ Requis";

export type CustomType = 'email' | 'tel' | 'url' | 'password';

const PresetFormValidation: { [key in CustomType]: FieldValues } = {
    'email': {
        required: requiredHelp,
        pattern: {
            value: /^\w+([.\-+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
            message: 'Email non valide'
        } 
    },
    'tel': {
        required: requiredHelp,
        pattern: {
            value: /.*/,
            message: 'Please enter a valid phone number'
        } 
    },
    'url': {
        required: requiredHelp,
        pattern: {
            value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            message: 'Please enter a valid URL'
        } 
    },
    'password': {
        required: requiredHelp,
        minLength: {
            value: 6,
            message: 'Password must contain at least 6 characters'
        }   
    }
}

export const handleValidationForm = (id: string, data: any, type?: CustomType, register?: Function) => {
    if(id.indexOf('.') === -1) {
        let spreadProps: any =  {
            isError: data[id],
            help: data[id] && (data[id].message ? data[id].message : data[id].validate) ,
            name: id,
            ...(type && PresetFormValidation[type])
        }
        return spreadProps;
    } else {
        let deepness = id.split('.');
        let targetObject: any = false;
        for(var i = 0; i < deepness.length; i++) {
            targetObject = targetObject ? targetObject[deepness[i]] : data[deepness[i]]
        }
        let spreadProps: any =  {
            isError: targetObject,
            help: targetObject && (targetObject.message ? targetObject.message : targetObject.validate) ,
            name: id,
            ...(type && PresetFormValidation[type])
        }
        
        return spreadProps;
        
    }
    
}