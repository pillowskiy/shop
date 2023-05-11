import type {FC} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@components/common/Card';
import {RegisterForm} from "@containers/forms/RegisterForm";

export const Register: FC = () => {
    return (
        <div className="h-screen flex justify-center items-center select-none">
            <Card className="w-[480px] py-6 px-6 animate-card-in">
                <CardHeader className="text-center mb-6">
                    <CardTitle className="text-4xl font-medium">Registration</CardTitle>
                    <CardDescription>Create your account right now!</CardDescription>
                </CardHeader>

                <CardContent>
                    <RegisterForm/>
                </CardContent>
            </Card>
        </div>
    );
};