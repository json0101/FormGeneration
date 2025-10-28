'use client';

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import handleApiError from "@/app/commons/handleApiError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import ApplicationToEditDto from "../../../dtos/role-to-edit.dto";
import ApplicationForm, { ApplicationFormHook } from "../../../ui/app-form";
import UpdateApplicationDto from "../../../dtos/update-app.dto";

interface Params {
    
}

export default function RoleEditComponent({}: Params) {

    const router = useRouter();
    
    const formHook = useForm<ApplicationFormHook>({
        defaultValues: {
            
        }
    });

    const onSubmit: SubmitHandler<ApplicationFormHook> = async (value) => {
        const update: UpdateApplicationDto = {
        }

        console.log("value", value, update);

        try {
            await fetch(`/sec/app/api/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update)
            })
            .then(handleApiError)
            .then(res => res.json());
            
            toast("Actualizado");
            router.push("/sec/app");
        } catch(error) {
            const e = error as Error;
            toast(e.message);
        }
    }

    return (
        <>
            <ApplicationForm
                formHook={formHook}
                onSubmit={onSubmit}
            />
        </>
    );
}