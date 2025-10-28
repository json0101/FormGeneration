'use client';

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import handleApiError from "@/app/commons/handleApiError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import $[name_entity_class]ToEditDto from "../../../dtos/role-to-edit.dto";
import $[name_entity_class]Form, { RoleFormHook } from "../../../ui/$[name_entity]-form";
import Update$[name_entity_class]Dto from "../../../dtos/update-$[name_entity].dto";

interface Params {
    
}

export default function RoleEditComponent({}: Params) {

    const router = useRouter();
    
    const formHook = useForm<RoleFormHook>({
        defaultValues: {
            
        }
    });

    const onSubmit: SubmitHandler<RoleFormHook> = async (value) => {
        const update: UpdateRoleDto = {
        }

        console.log("value", value, update);

        try {
            await fetch(`/sec/$[name_folder]/api/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update)
            })
            .then(handleApiError)
            .then(res => res.json());
            
            toast("Actualizado");
            router.push("/sec/$[name_folder]");
        } catch(error) {
            const e = error as Error;
            toast(e.message);
        }
    }

    return (
        <>
            <RoleForm
                formHook={formHook}
                onSubmit={onSubmit}
                applications={applications}
            />
        </>
    );
}