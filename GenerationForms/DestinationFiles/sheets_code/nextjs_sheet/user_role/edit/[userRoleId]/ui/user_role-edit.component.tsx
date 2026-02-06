'use client';

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import handleApiError from "@/app/commons/handleApiError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import UserRoleToEditDto from "../../../dtos/user_role-to-edit.dto";
import UserRoleForm, { UserRoleFormHook } from "../../../ui/user_role-form";
import UpdateUserRoleDto from "../../../dtos/update-user_role.dto";

interface Params {
    user_rolePromise: Promise<UserRoleToEditDto>;    
}

export default function UserRoleEditComponent({user_rolePromise}: Params) {

    const router = useRouter();
    const app = use(user_rolePromise);
    
    const formHook = useForm<UserRoleFormHook>({
        defaultValues: {
            description: user_role.description
        }
    });

    const onSubmit: SubmitHandler<UserRoleFormHook> = async (value) => {
        const update: UpdateUserRoleDto = {
            userRoleId: user_role.userRoleId,
            description: value.description
        }

        try {
            await fetch(`/sec/user_role/api/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update)
            })
            .then(handleApiError)
            .then(res => res.json());
            
            toast("Actualizado");
            router.push("/sec/user_role");
        } catch(error) {
            const e = error as Error;
            toast(e.message);
        }
    }

    return (
        <>
            <UserRoleForm
                formHook={formHook}
                onSubmit={onSubmit}
            />
        </>
    );
}