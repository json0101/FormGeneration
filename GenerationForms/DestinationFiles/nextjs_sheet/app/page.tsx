import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ApplicationComponent from "./ui/role-component";
import config_local from "../../commons/config-local";
import Loading from "../../commons/components/Loading";


export default async function ApplicationPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const getRolesPromise = fetch(`${config_local.backendUserAppUrl}/app/grid`, {
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
                <h1>$[title_menu_name]</h1>    
            </Box>
            <Box>
                <Suspense fallback={<Loading/>}>
                    <ApplicationComponent rolePromise={getRolesPromise}/>
                </Suspense>
            </Box>
        </>
    );
}