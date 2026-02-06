'use client'

import { use, useCallback, useState } from "react";
import DownloadDataResumeDto from "../../../downloads/download-data/dtos/resume.dto";
import $[name_entity_ft]Filter from "./filter";
import $[name_entity_ft]FilterDto from "../dtos/filter.dto";
import { Box } from "@mui/material";
import handleApiError from "../../../../common/handleApiError";
import $[name_entity_ft]Dto from "../dtos/dto";
import $[name_entity_ft]Grid from "./grid";

interface Params {
    downloadRecordsPromise: Promise<DownloadDataResumeDto[]>;
}

export default function Report$[name_entity_ft]Component({downloadRecordsPromise} : Params) {

    const downloadRecords = use(downloadRecordsPromise);
    const [$[name_variable_ft], set$[name_variable_ft]] = useState<$[name_entity_ft]Dto[]>([]);

    const getData = useCallback(async (filter: $[name_entity_ft]FilterDto) => {
            const response = await fetch(`./preparation/api`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filter)
                })
                .then(handleApiError)
                .then(res => res.json() as $[name_entity_ft]Dto[]);
    
            set$[name_variable_ft](response);
        }, []);
        
    return (
        <>
            <Box>
                <$[name_entity_ft]Filter 
                    downloadRecords={downloadRecords} 
                    getData={getData}
                />
            </Box>

            <Box style={{
                    marginTop: 10
            }}>
                <$[name_entity_ft]Grid
                    $[name_variable_ft]Report={$[name_variable_ft]Report}
                />
            </Box>
        </>
    );
}