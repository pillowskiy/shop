import type {FC} from 'react';
import {Card} from "@common/Card";
import {Textarea} from "@ui/Textarea";
import {useProfile} from "@hooks/useProfile";
import {UserAvatar} from "@components/UserAvatar";
import {Button} from "@ui/Button";

export const UserCommentCard: FC = () => {
    const {profile} = useProfile();

    if (!profile) return null;
    // TEMP: to form folder
    return (
        <Card id="feed-back" className="p-4 mt-4 bg-popover">
            <form className="w-full sm:flex">
                <UserAvatar className="hidden sm:block" src={profile.avatarURL}/>

                <section className="sm:ml-4 w-full">
                    <Textarea
                        className="bg-white"
                        placeholder="Write something"
                        maxLength={420}
                        required
                    />
                    <Button className="mt-2">Post a comment</Button>
                </section>
            </form>
        </Card>
    );
};