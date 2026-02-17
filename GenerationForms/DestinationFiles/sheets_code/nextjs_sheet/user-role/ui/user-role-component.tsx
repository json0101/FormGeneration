'use client';

import { use } from "react";
import UserRoleGridDto from "../dtos/user-role-grid.dto";
import { Box, Link } from "@mui/material";
import UserRoleGrid from "./user-role-grid";

interface Params {
    user-rolePromise: Promise<UserRoleGridDto[]>;
}

export default function UserRoleComponent({user-rolePromise}: Params) {
    
    const user-role = use(user-rolePromise);

    return (
        <>
            <Box>
                <Link href={'/sec/user-role/new'}>New</Link>
            </Box>
            <Box>
                <UserRoleGrid user-roleGrid={user-role}/>
            </Box>
        </>
    );
}