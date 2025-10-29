'use client';

import { useRouter } from "next/navigation";

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ApplicationForm, { ApplicationFormHook } from "../../ui/app-form";
import CreateApplicationDto from "../../dtos/create-app.dto";
import handleApiError from "../../../../commons/handleApiError";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

interface Params {
    
}

export default function NewApplicationComponent({}: Params) {
    const router = useRouter();
    
    const formHook = useForm<ApplicationFormHook>();

    const onSubmit: SubmitHandler<ApplicationFormHook> = async (value) => {
            
        const create: CreateApplicationDto = {
            description: value.description
        }

        try {
            await fetch(`/sec/app/api/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(create)
            })
            .then(handleApiError)
            .then(res => res.json());
            
            toast("Creado");
            router.push("/sec/app")
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

            
            <ApplicationForm
                formHook={formHook}
                onSubmit={onSubmit}
            />
            </Box>
        </>
    );
}