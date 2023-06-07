import type {FC} from 'react';
import {Card} from "@common/Card";
import {FormInput} from "@components/FormInput";

export const OrderDetailsCard: FC = () => {
    return (
        <Card className="bg-popover p-4 mt-4">
            <h2 className="font-medium text-xl">Customer info:</h2>

            <section className="overflow-y-hidden pt-0 px-2 -mt-2">
                <div className="flex gap-4">
                    <FormInput className="bg-white" label="Name"/>
                    <FormInput className="bg-white" label="Surname"/>
                </div>
                <FormInput className="bg-white" label="Phone number"/>

                <span className="mt-4 bg-white shadow-sm border border-blue-300 p-2 rounded-lg text-center hidden sm:block">
                    Add delivery details to your profile to automate ordering
                </span>
            </section>
        </Card>
    );
};