import { cookies } from "next/headers";
import config_local from "../../../../commons/config-local";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "../../../../commons/components/Loading";
import ApplicationToEditDto from "../../dtos/role-to-edit.dto";
import ApplicationEditComponent from "./ui/app-edit.component";

export default async function ApplicationEditPage({params} : {params: Promise<{appId: string}>}) {
    const {appId} = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    // const rolePromise = fetch(`${config_local.backendUserAppUrl}/app/to-edit/${appId}`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //     }
    // })
    // .then(res => res.json())
    // .then(res => res as RoleToEditDto);

    // const applicationsPromise = fetch(`${config_local.backendUserAppUrl}/application`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //     }
    // })
    // .then(res => res.json());
    

    return(
        <>
            <Box>
                <h1>Edit Application</h1>
            </Box>
            <Suspense fallback={<Loading/>}>
                <Box sx={{height: '100vh'}}>
                    <ApplicationEditComponent 
                        
                    />
                </Box>
            </Suspense>
            
        </>
    );
}