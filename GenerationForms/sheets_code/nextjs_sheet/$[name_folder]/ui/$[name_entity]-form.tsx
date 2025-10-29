import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Autocomplete, Button, FormControl, Grid, TextField } from "@mui/material";

export interface $[name_entity_class]FormHook {
    description: string;
}

interface $[name_entity_class]ScreenParams {
    formHook: UseFormReturn<$[name_entity_class]FormHook, any, $[name_entity_class]FormHook>;
    onSubmit: SubmitHandler<$[name_entity_class]FormHook>;
}


export default function $[name_entity_class]Form({formHook, onSubmit}: $[name_entity_class]ScreenParams) {
    const {register, control, handleSubmit, formState: { errors }} = formHook;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="description"
                                aria-describedby="description"
                                label="Nombre de Aplicación"
                                {...register("description", { required: true})}
                            />
                            {errors.description && errors.description.type === "required" && <span>Este Campo es Requerido</span>}
                        </FormControl>
                    </Grid>
                    

                    <Grid size={12}>
                        <FormControl>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Save
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}