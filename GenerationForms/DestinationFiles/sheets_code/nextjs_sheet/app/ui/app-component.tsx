'use client';

import { use } from "react";
import ApplicationGridDto from "../dtos/app-grid.dto";
import { Box, Link } from "@mui/material";
import ApplicationGrid from "./app-grid";

interface Params {
    appPromise: Promise<ApplicationGridDto[]>;
}

export default function ApplicationComponent({appPromise}: Params) {
    
    const app = use(appPromise);

    return (
        <>
            <Box>
                <Link href={'/sec/app/new'}>New</Link>
            </Box>
            <Box>
                <ApplicationGrid appGrid={app}/>
            </Box>
        </>
    );
}