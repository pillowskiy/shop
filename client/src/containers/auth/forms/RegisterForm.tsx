import type {FC} from 'react';
import {FormInput} from "@components/FormInput";
import {FormCheckbox} from "@components/FormCheckbox";
import {Anchor} from "@ui/Anchor";
import {Button} from "@ui/Button";
import {useRouter} from "next/router";
import {buildToast, useToast} from "@layout/../../components/common/toast/useToast";
import {useAuth} from "@hooks/useAuth";
import {Loader2} from "lucide-react";
import {FormEvent, useState} from "react";
import {ApiValidationReject, RegisterBody} from "@types";

import {useAppDispatch} from "@redux/store";
import {register} from "@redux/user/user.actions";

const REGISTER_FIELDS: Record<keyof RegisterBody, string> = {
    email: '',
    name: '',
    password: '',
}

export const RegisterForm: FC = () => {
    const [data, setData] = useState<RegisterBody>(REGISTER_FIELDS);
    const [errors, setErrors] = useState<ApiValidationReject<RegisterBody>['errors']>(REGISTER_FIELDS);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {toast} = useToast();
    const {isLoading} = useAuth();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(REGISTER_FIELDS);
        const result = await dispatch(register(data));

        if (register.fulfilled.match(result)) {
            return router.back();
        }

        if (register.rejected.match(result) && result.payload) {
            ('errors' in result.payload) ?
                setErrors(result.payload.errors) :
                toast(buildToast("error", {
                    error: result.payload.message
                }).toast);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput
                label="Email"
                type="email"
                onChange={({target}) => setData({...data, email: target.value})}
                value={data.email}
                error={errors.email}
                required
            />
            <FormInput
                label="Username"
                onChange={({target}) => setData({...data, name: target.value})}
                value={data.name}
                maxLength={24}
                error={errors.name}
                required
            />
            <FormInput
                label="Password"
                type="password"
                onChange={({target}) => setData({...data, password: target.value})}
                value={data.password}
                minLength={6}
                maxLength={32}
                error={errors.password}
                required
            />
            <section className="mt-4">
                <FormCheckbox className="opacity-70 mb-2">
                    Send me emails with information about promotions and interesting offers (optional)
                </FormCheckbox>
                <FormCheckbox required>
                    I have read the&nbsp;
                    <Anchor href="#">Conditions of Use</Anchor>&nbsp;and&nbsp;
                    <Anchor href="#">Privacy notice</Anchor>&nbsp;and agree to them.
                </FormCheckbox>
            </section>
            <Button className="mt-4 mb-2 w-full" disabled={isLoading} variant="outline">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Continue
            </Button>
            <p className="text-sm text-muted-foreground mb-4">
                Already have an account?&nbsp;
                <Anchor href="/login">Login</Anchor>
            </p>
        </form>
    );
};