'use client';

import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import handleApiError from "@/app/commons/handleApiError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import $[name_entity_class]ToEditDto from "../../../dtos/$[name_entity]-to-edit.dto";
import $[name_entity_class]Form, { $[name_entity_class]FormHook } from "../../../ui/$[name_entity]-form";
import Update$[name_entity_class]Dto from "../../../dtos/update-$[name_entity].dto";

interface Params {
    $[name_entity]Promise: Promise<$[name_entity_class]ToEditDto>;    
}

export default function $[name_entity_class]EditComponent({$[name_entity]Promise}: Params) {

    const router = useRouter();
    const app = use($[name_entity]Promise);
    
    const formHook = useForm<$[name_entity_class]FormHook>({
        defaultValues: {
            description: $[name_entity].description
        }
    });

    const onSubmit: SubmitHandler<$[name_entity_class]FormHook> = async (value) => {
        const update: Update$[name_entity_class]Dto = {
            $[name_id]: $[name_entity].$[name_id],
            description: value.description
        }

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
            <$[name_entity_class]Form
                formHook={formHook}
                onSubmit={onSubmit}
            />
        </>
    );
}