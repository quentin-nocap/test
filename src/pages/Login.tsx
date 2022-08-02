import { FC, useState } from 'react';
import { useForm } from "react-hook-form";
import Input from '../components/Input';

type RegistrationFormFields = {
    email: string;
};

const Login: FC = () => {

    const [name, setName] = useState<string>("")

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<RegistrationFormFields>({ mode: "onChange" });

    const onSubmit = handleSubmit((data) => {
        //Set name to what's before the '@'
        setName(data.email.split('@')[0])

        // Watch if value update after submitted, if yes set name back to empty and unsub 
        const subscription = watch((value) => {
            setName("");
            subscription.unsubscribe();
        });

    });

    return (
        <>
            <div className='info-text'>Entrez votre e-mail pour que nous puissions vous reconnaitre</div>
            <div>Votre e-mail de compte</div>
            <form className='form' onSubmit={onSubmit} noValidate >
                <Input
                    register={register}
                    errors={errors}
                    id="email"
                    type="email"
                    validationType="email"
                    name="email"
                    placeholder="Email" />
                <Input disabled={!isDirty || !isValid} value="Hello" name="submit" type="submit" />
            </form>
            {name.length > 0 && <div className='hello'>Welcome back <b>{name}</b> !</div>}
        </>

    )
};

export default Login;