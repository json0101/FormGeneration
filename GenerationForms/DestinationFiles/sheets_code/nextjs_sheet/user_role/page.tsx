import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { Suspense } from "react";
import UserRoleComponent from "./ui/user_role-component";
import config_local from "../../commons/config-local";
import Loading from "../../commons/components/Loading";


export default async function UserRolePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const getUserRolePromise = fetch(`${config_local.backendUserAppUrl}/userRole/grid`, {
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
                <h1>Listado de asignaci├│n de roles a usuarios</h1>    
            </Box>
            <Box>
                <Suspense fallback={<Loading/>}>
                    <UserRoleComponent user_rolePromise={getUserRolePromise}/>
                </Suspense>
            </Box>
        </>
    );
}