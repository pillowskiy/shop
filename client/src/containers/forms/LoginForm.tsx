import {type FC, type FormEvent, useState} from 'react';
import {FormInput} from "@components/FormInput";
import {Anchor} from "@ui/Anchor";
import {useAuth} from "@hooks/useAuth";
import {Button} from "@ui/Button";
import {useRouter} from "next/router";
import type {LoginBody} from "@types";
import {useToast} from "@layout/toast/useToast";
import {Loader2} from "lucide-react";
import {cn} from "@lib/utils";

import {useAppDispatch} from "@redux/store";
import {login} from "@redux/user/user.actions";

export const LoginForm: FC = () => {
    const [data, setData] = useState<LoginBody>({
        pseudonym: '',
        password: '',
    });
    const [errors, setErrors] = useState<string[]>(Array.from({length: 2}, () => ''));

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {toast} = useToast();
    const {isLoading} = useAuth();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await dispatch(login(data));

        if (login.fulfilled.match(result)) {
            await router.replace('/');
        } else if (login.rejected.match(result) && result.payload) {
            const { message } = result.payload;
            if (Array.isArray(message)) {
                setErrors(message);
            } else {
                setErrors(
                    Array.from({length: 2}, () => message)
                );
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
                label="Email or username"
                onChange={(e) => setData({...data, pseudonym: e.target.value})}
                value={data.pseudonym}
                minLength={2}
                maxLength={64}
                error={errors[0]}
                required
            />
            <FormInput
                label="Password"
                type="password"
                onChange={(e) => setData({...data, password: e.target.value})}
                value={data.password}
                minLength={6}
                maxLength={32}
                error={errors[1]}
                required
            >
                <Anchor href="#" className="text-sm">
                    Forgot your password?
                </Anchor>
            </FormInput>
            <Button className={cn("mb-2 w-full", {
                'disabled': isLoading,
            })} variant="outline">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Submit
            </Button>
            <p className="text-sm text-muted-foreground">
                Do not have an account yet?&nbsp;
                <Anchor onClick={() => router.push('/register')}>Register</Anchor>
            </p>
        </form>
    );
};