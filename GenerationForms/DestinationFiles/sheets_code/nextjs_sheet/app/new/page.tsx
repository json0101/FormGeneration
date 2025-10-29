import { cookies } from "next/headers";
import config_local from "../../../commons/config-local";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "../../../commons/components/Loading";
import NewApplicationComponent from "./ui/new-app.component";

export default async function NewApplicationPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    return (
        <>
            <Box>
                <h1>
                    New Application
                </h1>
            </Box>
            <Suspense fallback={<Loading/>}>
                <NewApplicationComponent/>
            </Suspense>
        </>
    )
}