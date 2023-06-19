import {useContext, type FC, useState} from 'react';
import type {UserUpdate} from "@/types/user.interface";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@common/Card";
import {FormInput, FormInputProps} from "@components/FormInput";
import {Button} from "@ui/Button";
import {EditAvatarPopover} from "@containers/user/layout/EditAvatarPopover";
import {Label} from "@ui/Label";
import {Textarea} from "@ui/Textarea";
import {RadioGroup, RadioGroupItem} from "@common/RadioGroup";
import {DialogClose} from "@radix-ui/react-dialog";
import {Gender} from "@/types/user.interface";
import {useMutation} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {PhoneInput} from "@components/PhoneInput";
import {AccountContext} from "@containers/screens/UserWorkshopScreen";

const INITIAL_ERRORS: Record<keyof Omit<UserUpdate, 'id'>, string> = {
    aboutMe: "",
    gender: "",
    phone: "",
    birthDate: "",
    name: "",
    email: "",
    avatarURL: "",
}

export const ProfileTab: FC = () => {
    const profile = useContext(AccountContext)!;
    const [newProfile, setNewProfile] = useState<UserUpdate>(profile);
    const [errors, setErrors] = useState(INITIAL_ERRORS);
    const {toast} = useToast();

    const getInputValues = (value: keyof Omit<UserUpdate, 'id'>): FormInputProps => {
        return {
            value: newProfile[value] || "",
            onChange: ({target}) => setNewProfile(prev => ({ ...prev, [value]: target.value })),
            error: errors[value],
        }
    }
    const onConfirm = () => {
        setErrors(INITIAL_ERRORS);
        const formData = new FormData();
        Object.entries(newProfile).forEach(([key, value]) => {
            if (value) formData.append(key, value + "");
        });
        mutate(formData);
    }

    const {mutate} = useMutation(['update profile'], (formData: FormData) => {
        return UserService.update(formData);
    }, {
        onSuccess: ({data}) => {
            toast({
                description: "✅ Your profile was successfully updated"
            });
            setNewProfile(data);
        },
        onError: (err) => {
            if (!isAxiosError(err)) return;
            const errors = err.response?.data?.errors;
            if (errors) {
                setErrors(errors);
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh Oh! Something went wrong.",
                    description: err.response?.data?.message || "Unhandled error occurred"
                });
            }
        }
    })

    return (
        <Card className="bg-popover animate-card-in px-1">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when you are done.
                </CardDescription>
            </CardHeader>
            <CardContent className="md:max-h-[600px] overflow-y-auto rounded-lg">
                <FormInput className="bg-white" label="Username" {...getInputValues("name")}/>
                <PhoneInput />
                <FormInput className="bg-white" label="Email" type="email" {...getInputValues("email")}/>

                <section className="flex gap-2 items-center mt-4">
                    <Button className="flex-1" variant="link">Remove Avatar</Button>
                    <EditAvatarPopover>
                        <Button className="flex-1 mt-2">Change Avatar</Button>
                    </EditAvatarPopover>
                </section>

                <hr className="my-4"/>

                <Label>About me</Label>
                <Textarea
                    className="bg-white mt-2"
                    placeholder="Write something.."
                    value={newProfile.aboutMe || ""}
                    onChange={({target}) => setNewProfile(prev => ({ ...prev, aboutMe: target.value }))}
                    maxLength={256}
                />

                <FormInput
                    className="bg-white cursor-pointer"
                    placeholder="Day"
                    type="date"
                    label="Date of birth"
                    {...getInputValues("birthDate")}
                    min="1950-0-1"
                    max="2014-0-1"
                />

                <section className="mt-4">
                    <Label>Gender</Label>
                    <RadioGroup
                        className="space-y-1 my-2"
                        value={newProfile.gender}
                        onValueChange={(newValue: Gender) => setNewProfile(prev => ({...prev, gender: newValue}))}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="bg-white" value={Gender.Male} id="male"/>
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="bg-white" value={Gender.Female} id="female"/>
                            <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem className="bg-white" value={Gender.Unknown} id="unknown"/>
                            <Label htmlFor="unknown">Not specified</Label>
                        </div>
                    </RadioGroup>
                </section>
            </CardContent>
            <CardFooter className="pt-2">
                <Button onClick={onConfirm}>Save changes</Button>
            </CardFooter>
        </Card>
    );
};