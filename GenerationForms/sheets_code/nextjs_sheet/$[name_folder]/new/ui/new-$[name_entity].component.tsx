'use client';

import { useRouter } from "next/navigation";

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import $[name_entity_class]Form, { $[name_entity_class]FormHook } from "../../ui/$[name_entity]-form";
import Create$[name_entity_class]Dto from "../../dtos/create-$[name_entity].dto";
import handleApiError from "../../../../commons/handleApiError";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

interface Params {
    
}

export default function New$[name_entity_class]Component({}: Params) {
    const router = useRouter();
    
    const formHook = useForm<$[name_entity_class]FormHook>();

    const onSubmit: SubmitHandler<$[name_entity_class]FormHook> = async (value) => {
            
        const create: Create$[name_entity_class]Dto = {
            description: value.description
        }

        try {
            await fetch(`/sec/$[name_folder]/api/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(create)
            })
            .then(handleApiError)
            .then(res => res.json());
            
            toast("Creado");
            router.push("/sec/$[name_folder]")
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

            
            <$[name_entity_class]Form
                formHook={formHook}
                onSubmit={onSubmit}
            />
            </Box>
        </>
    );
}