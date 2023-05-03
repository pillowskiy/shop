import {FC, useState} from 'react';
import {FormInput} from "@components/FormInput";
import {Anchor} from "@ui/Anchor";
import {useAuth} from "@hooks/useAuth";
import {useActions} from "@hooks/useActions";
import {Button} from "@ui/Button";
import {useRouter} from "next/router";
import type {LoginBody} from "@types";
import { login as loginAction } from '@redux/user/user.actions';
import {useToast} from "@layout/toast/useToast";
import {Loader2} from "lucide-react";
import {cn} from "@lib/utils";

export const LoginForm: FC = () => {
    const [data, setData] = useState<LoginBody>({
        pseudonym: '',
        password: '',
    });
    const [errors, setErrors] = useState<string[]>(Array.from({length: 2}, () => ''));

    const { toast } = useToast();

    const router = useRouter();
    const { isLoading } = useAuth();
    const { login } = useActions();

    const onSubmit = async (event) => {
        event.preventDefault();
        const { payload, error } = await login(data);

        if (payload?.user) {
            await router.replace('/');
        } else if (payload?.message) {
            if (Array.isArray(payload.message)) {
                setErrors(payload.message);
            } else {
                setErrors(
                    Array.from({length: 2}, () => payload.message)
                );
            }
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message
            });
            console.log('Unhandled error', error.message);
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
                { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                Submit
            </Button>
            <p className="text-sm text-muted-foreground">
                Do not have an account yet?&nbsp;
                <Anchor onClick={() => router.push('/register')}>Register</Anchor>
            </p>
        </form>
    );
};