import { cookies } from "next/headers";
import config_local from "../../../commons/config-local";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "../../../commons/components/Loading";
import New$[name_entity_class]Component from "./ui/new-role.component";

export default async function NewRolePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    return (
        <>
            <Box>
                <h1>
                    $[title_page_new]
                </h1>
            </Box>
            <Suspense fallback={<Loading/>}>
                <New$[name_entity_class]Component/>
            </Suspense>
        </>
    )
}