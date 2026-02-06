'use client';

import { useRouter } from "next/navigation";

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UserRoleForm, { UserRoleFormHook } from "../../ui/user_role-form";
import CreateUserRoleDto from "../../dtos/create-user_role.dto";
import handleApiError from "../../../../commons/handleApiError";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

interface Params {
    
}

export default function NewUserRoleComponent({}: Params) {
    const router = useRouter();
    
    const formHook = useForm<UserRoleFormHook>();

    const onSubmit: SubmitHandler<UserRoleFormHook> = async (value) => {
            
        const create: CreateUserRoleDto = {
            description: value.description
        }

        try {
            await fetch(`/sec/user_role/api/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(create)
            })
            .then(handleApiError)
            .then(res => res.json());
            
            toast("Creado");
            router.push("/sec/user_role")
        } catch(error) {
            const e = error as Error;            
            toast(e.message);
        }
    }

    return (
        <>
            <Box sx={{
                height: '100vh'
            }}>

            
            <UserRoleForm
                formHook={formHook}
                onSubmit={onSubmit}
            />
            </Box>
        </>
    );
}