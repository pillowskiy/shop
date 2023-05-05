import type {FC} from 'react';
import {FormInput} from "@components/FormInput";
import {FormCheckbox} from "@components/FormCheckbox";
import {Anchor} from "@ui/Anchor";
import {Button} from "@ui/Button";
import {useRouter} from "next/router";
import {useToast} from "@layout/toast/useToast";
import {useAuth} from "@hooks/useAuth";
import {cn} from "@lib/utils";
import {Loader2} from "lucide-react";
import {FormEvent, useState} from "react";
import {RegisterBody} from "@types";

import {useAppDispatch} from "@redux/store";
import {register} from "@redux/user/user.actions";

export const RegisterForm: FC = () => {
    const [data, setData] = useState<RegisterBody>({
        email: '',
        name: '',
        password: '',
    });
    const [errors, setErrors] = useState<string[]>(Array.from({length: 3}, () => ''));

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {toast} = useToast();
    const {isLoading} = useAuth();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await dispatch(register(data));

        if (register.fulfilled.match(result)) {
            await router.replace('/');
        } else if (register.rejected.match(result) && result.payload) {
            const { message } = result.payload;
            if (Array.isArray(message)) {
                setErrors(message);
            } else {
                setErrors(Array.from({length: 3}, () => message));
            }
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result.error.message,
            });
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput
                label="Email"
                type="email"
                onChange={({target}) => setData({...data, email: target.value})}
                value={data.email}
                error={errors[0]}
            />
            <FormInput
                label="Username"
                onChange={({target}) => setData({...data, name: target.value})}
                value={data.name}
                maxLength={24}
                error={errors[1]}
            />
            <FormInput
                label="Password"
                type="password"
                onChange={({target}) => setData({...data, password: target.value})}
                value={data.password}
                minLength={6}
                maxLength={32}
                error={errors[2]}
            />
            <FormCheckbox className="opacity-70">
                Send me emails with information about promotions and interesting offers (optional)
            </FormCheckbox>
            <FormCheckbox required>
                I have read the&nbsp;
                <Anchor href="#">Conditions of Use</Anchor>&nbsp;and&nbsp;
                <Anchor href="#">Privacy notice</Anchor>&nbsp;and agree to them.
            </FormCheckbox>
            <Button className={cn("mb-2 w-full", {
                'disabled': isLoading,
            })} variant="outline">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Continue
            </Button>
            <p className="text-sm text-muted-foreground mb-4">
                Already have an account?&nbsp;
                <Anchor onClick={() => router.push('/login')}>Login</Anchor>
            </p>
        </form>
    );
};