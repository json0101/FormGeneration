import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { Suspense } from "react";
import RoleComponent from "./ui/role-component";
import config_local from "../../commons/config-local";
import Loading from "../../commons/components/Loading";


export default async function $[name_entity_class]Page() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const getRolesPromise = fetch(`${config_local.backendUserAppUrl}/$[name_folder]/grid`, {
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
                <h1>[title_menu_name]</h1>    
            </Box>
            <Box>
                <Suspense fallback={<Loading/>}>
                    <$[name_entity_class]Component rolePromise={getRolesPromise}/>
                </Suspense>
            </Box>
        </>
    );
}