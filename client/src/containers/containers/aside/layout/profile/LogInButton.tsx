import type {FC} from 'react';
import {Item} from "../";
import {LogIn} from 'lucide-react';

export const LogInButton: FC = () => {
    return (
        <Item href="/login" Icon={LogIn} title="Log in" className="md:mt-auto" />
    );
};