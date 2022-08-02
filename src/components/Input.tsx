import { FC, InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister, DeepMap, FieldError } from "react-hook-form";
import { CustomType, handleValidationForm } from '../services/validation';

type InputProps = {
    name: string
    register?: UseFormRegister<any>
    validationType?: CustomType
    errors?: DeepMap<FieldValues, FieldError>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

const Input: FC<InputProps> = (({ register, name, validationType, errors, ...others }) => {

    const errorMessages = errors && errors[name];
    const hasError = errors && !!(errors && errorMessages);

    return (
        <div className='input-container'>
            <input {...others} {...(register && register(name, validationType && handleValidationForm(name, errors, validationType)))} />
            {hasError && <div className="input-error" >{errorMessages.message}</div>}
        </div>
    )
});

export default Input;