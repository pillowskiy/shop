import {useRouter} from "next/router";
import {getStringFromQuery} from "@lib/utils";

import {UserProfileScreen} from "@containers/screens/UserProfileScreen";

export default function AuthLogin() {
    const router = useRouter();
    const userId = getStringFromQuery(router.query.id);

    return (
        <UserProfileScreen userId={+userId}/>
    );
}