import {useRouter} from "next/router";
import {getStringFromQuery} from "@lib/utils";

import {WorkshopScreen} from "@containers/screens/WorkshopScreen";

export default function Page() {
    const router = useRouter();
    const id = getStringFromQuery(router.query.id);

    return (
        <WorkshopScreen id={id}/>
    );
}