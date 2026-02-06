import { cookies } from "next/headers";
import config_local from "../../../../commons/config-local";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "../../../../commons/components/Loading";
import UserRoleToEditDto from "../../dtos/user_role-to-edit.dto";
import UserRoleEditComponent from "./ui/user_role-edit.component";

export default async function UserRoleEditPage({params} : {params: Promise<{userRoleId: string}>}) {
    const {userRoleId} = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const user_rolePromise = fetch(`${config_local.backendUserAppUrl}/userRole/to-edit/${userRoleId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => res as UserRoleToEditDto);
    

    return(
        <>
            <Box>
                <h1>Edici├│n de roles de usuarios</h1>
            </Box>
            <Suspense fallback={<Loading/>}>
                <Box sx={{height: '100vh'}}>
                    <UserRoleEditComponent 
                        user_rolePromise={user_rolePromise}
                    />
                </Box>
            </Suspense>
            
        </>
    );
}