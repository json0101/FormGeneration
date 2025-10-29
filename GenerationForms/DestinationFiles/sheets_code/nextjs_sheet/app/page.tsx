import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ApplicationComponent from "./ui/app-component";
import config_local from "../../commons/config-local";
import Loading from "../../commons/components/Loading";


export default async function ApplicationPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const getApplicationPromise = fetch(`${config_local.backendUserAppUrl}/Application/grid`, {
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
                <h1>Listado de Aplicaciones</h1>    
            </Box>
            <Box>
                <Suspense fallback={<Loading/>}>
                    <ApplicationComponent appPromise={getApplicationPromise}/>
                </Suspense>
            </Box>
        </>
    );
}