'use client';

import { use } from "react";
import UserRoleGridDto from "../dtos/user_role-grid.dto";
import { Box, Link } from "@mui/material";
import UserRoleGrid from "./user_role-grid";

interface Params {
    user_rolePromise: Promise<UserRoleGridDto[]>;
}

export default function UserRoleComponent({user_rolePromise}: Params) {
    
    const user_role = use(user_rolePromise);

    return (
        <>
            <Box>
                <Link href={'/sec/user_role/new'}>New</Link>
            </Box>
            <Box>
                <UserRoleGrid user_roleGrid={user_role}/>
            </Box>
        </>
    );
}