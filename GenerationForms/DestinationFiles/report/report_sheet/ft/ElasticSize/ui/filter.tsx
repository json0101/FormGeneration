'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DownloadDataResumeDto from "../../../downloads/download-data/dtos/resume.dto";
import { RefObject, useEffect, useState, useTransition } from "react";
import ElasticSizeFilterDto from "../dtos/filter.dto";
import { Autocomplete, Button, FormControl, Grid, TextField } from "@mui/material";

interface Params {
    downloadRecords: DownloadDataResumeDto[];
    getData: (filter: ElasticSizeFilterDto) => void;
    buttonFilterRef?: RefObject<HTMLButtonElement> | undefined;
}

interface ElasticSizeFilterForm {
    download: DownloadDataResumeDto | null;
}

export default function ElasticSizeFilter({downloadRecords, getData, buttonFilterRef}: Params) {

    const {control, handleSubmit, formState: { errors }} = useForm<ElasticSizeFilterForm>({
        defaultValues: {
            download: null
        }
    });
    const [isPending, startTransition] = useTransition();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);
    
    const onSubmit: SubmitHandler<ElasticSizeFilterForm> = async (value) => {
        const filter: ElasticSizeFilterDto = {
            downloadId: value.download?.id ?? 0
        };

        startTransition(async() => {
            getData(filter);
        });
    };

    return (
        <>
            {
                isClient === false || isPending === true ? <h1>Loading...</h1> :
                <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={1}>
                            
                            <Grid 
                                size = {{
                                    xs:12,
                                    md:6,
                                    lg: 4
                                }}
                            >
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name="download"
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Autocomplete
                                                options={downloadRecords}
                                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                                getOptionLabel={(option: DownloadDataResumeDto) => option.description}
                                                value={value ?? null}
                                                renderInput={(params) => <TextField {...params} name="downloadData" label="Download Record" />}
                                                renderOption={(props, option) => {
                                                    return (
                                                        <li
                                                            {...props}
                                                            key={option.id}
                                                        >
                                                            {option.description}
                                                        </li>
                                                    );
                                                }}
                                                onChange={(_, value) => onChange(value)}
                                                ref={ref}
                                            />
                                        )}
                                    />
                                    {
                                        errors.download?.message ?
                                            <p>{errors.download?.message}</p>
                                            : null
                                    }
                                </FormControl>
                            </Grid>
                            <Grid size={
                                {
                                    xs: 12
                                }
                            }>
                                <Button 
                                    type="submit"                                    
                                    variant="contained"
                                    ref={buttonFilterRef}
                                >
                                        Obtener Data
                                </Button>
                            </Grid>                    
                        </Grid>
                        
                    </form>
            }
        </>
    )
}