import {useRouter} from "next/router";
import {getStringFromQuery} from "@lib/utils";

import {ProfileScreen} from "@containers/screens/ProfileScreen";

export default function AuthLogin() {
    const router = useRouter();
    const userId = getStringFromQuery(router.query.id);

    return (
        <ProfileScreen userId={+userId}/>
    );
}