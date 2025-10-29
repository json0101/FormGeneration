'use client';

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import handleApiError from "@/app/commons/handleApiError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import ApplicationToEditDto from "../../../dtos/app-to-edit.dto";
import ApplicationForm, { ApplicationFormHook } from "../../../ui/app-form";
import UpdateApplicationDto from "../../../dtos/update-app.dto";

interface Params {
    appPromise: Promise<ApplicationToEditDto>;    
}

export default function ApplicationEditComponent({appPromise}: Params) {

    const router = useRouter();
    const app = use(appPromise);
    
    const formHook = useForm<ApplicationFormHook>({
        defaultValues: {
            description: app.description
        }
    });

    const onSubmit: SubmitHandler<ApplicationFormHook> = async (value) => {
        const update: UpdateApplicationDto = {
            appId: app.appId,
            description: value.description
        }

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