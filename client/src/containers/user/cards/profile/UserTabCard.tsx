import type {FC} from 'react';
import {Card} from "@common/Card";

export const UserTabCard: FC = () => {
    return (
        <Card className="p-4 bg-popover text-center mt-4">
            <h2 className="text-xl sm:text-2xl font-medium py-4 select-none">🙅 There are not items yet.</h2>
        </Card>
    );
};