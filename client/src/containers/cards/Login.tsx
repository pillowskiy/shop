import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@components/common/Card';
import {LoginForm} from "@containers/forms/LoginForm";

export const Login: FC = () => {
    return (
        <Card className="w-[480px] py-20 px-6 animate-card-in">
            <CardHeader className="text-center mb-6">
                <CardTitle className="text-4xl">Welcome back</CardTitle>
                <CardDescription>We are really glad to see you again!</CardDescription>
            </CardHeader>

            <CardContent>
                <LoginForm/>
            </CardContent>
        </Card>
    );
};