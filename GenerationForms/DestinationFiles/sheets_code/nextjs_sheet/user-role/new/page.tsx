import { cookies } from "next/headers";
import config_local from "../../../commons/config-local";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "../../../commons/components/Loading";
import NewUserRoleComponent from "./ui/new-user-role.component";

export default async function NewUserRolePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    return (
        <>
            <Box>
                <h1>
                    Nuevo Usuario - Rol
                </h1>
            </Box>
            <Suspense fallback={<Loading/>}>
                <NewUserRoleComponent/>
            </Suspense>
        </>
    )
}