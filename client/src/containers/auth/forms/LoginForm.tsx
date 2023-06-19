import {type FC, type FormEvent, useState} from 'react';
import {FormInput} from "@components/FormInput";
import {Anchor} from "@ui/Anchor";
import {useAuth} from "@hooks/useAuth";
import {Button} from "@ui/Button";
import {useRouter} from "next/router";
import type {ApiValidationReject, LoginBody} from "@types";
import {buildToast, useToast} from "@layout/../../components/common/toast/useToast";
import {Loader2} from "lucide-react";

import {useAppDispatch} from "@redux/store";
import {login} from "@redux/user/user.actions";

const LOGIN_FIELDS: Record<keyof LoginBody, string> = {
    pseudonym: '',
    password: '',
};

export const LoginForm: FC = () => {
    const [data, setData] = useState<LoginBody>(LOGIN_FIELDS);
    const [errors, setErrors] = useState<ApiValidationReject<LoginBody>['errors']>(LOGIN_FIELDS);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {toast} = useToast();
    const {isLoading} = useAuth();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(LOGIN_FIELDS);
        const result = await dispatch(login(data));

        if (login.fulfilled.match(result)) {
            return router.back();
        }

        if (login.rejected.match(result) && result.payload) {
            ('errors' in result.payload) ?
                setErrors(result.payload.errors) :
                toast(
                    buildToast("error")
                        .setDescription(result.payload.message)
                );
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput
                label="Email or username"
                onChange={({target}) => setData({...data, pseudonym: target.value})}
                value={data.pseudonym}
                minLength={2}
                maxLength={64}
                error={errors.pseudonym}
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
            >
                <Anchor href="#" className="text-sm">
                    Forgot your password?
                </Anchor>
            </FormInput>
            <Button className="mt-8 mb-2 w-full" disabled={isLoading} variant="outline">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Submit
            </Button>
            <p className="text-sm text-muted-foreground">
                Do not have an account yet?&nbsp;
                <Anchor href="/register">Register</Anchor>
            </p>
        </form>
    );
};