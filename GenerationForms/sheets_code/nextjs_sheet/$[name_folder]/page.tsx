import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { Suspense } from "react";
import $[name_entity_class]Component from "./ui/$[name_entity]-component";
import config_local from "../../commons/config-local";
import Loading from "../../commons/components/Loading";


export default async function $[name_entity_class]Page() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const get$[name_entity_class]Promise = fetch(`${config_local.backendUserAppUrl}/$[url_backend]/grid`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json());

    return (
        <>
            <Box>
                <h1>$[title_list_name]</h1>    
            </Box>
            <Box>
                <Suspense fallback={<Loading/>}>
                    <$[name_entity_class]Component $[name_entity]Promise={get$[name_entity_class]Promise}/>
                </Suspense>
            </Box>
        </>
    );
}