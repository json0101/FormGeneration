'use client'

import { use, useCallback, useState } from "react";
import DownloadDataResumeDto from "../../../downloads/download-data/dtos/resume.dto";
import ElasticSizeFilter from "./filter";
import ElasticSizeFilterDto from "../dtos/filter.dto";
import { Box } from "@mui/material";
import handleApiError from "../../../../common/handleApiError";
import ElasticSizeDto from "../dtos/dto";
import ElasticSizeGrid from "./grid";

interface Params {
    downloadRecordsPromise: Promise<DownloadDataResumeDto[]>;
}

export default function ReportElasticSizeComponent({downloadRecordsPromise} : Params) {

    const downloadRecords = use(downloadRecordsPromise);
    const [elasticSize, setelasticSize] = useState<ElasticSizeDto[]>([]);

    const getData = useCallback(async (filter: ElasticSizeFilterDto) => {
            const response = await fetch(`./preparation/api`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filter)
                })
                .then(handleApiError)
                .then(res => res.json() as ElasticSizeDto[]);
    
            setelasticSize(response);
        }, []);
        
    return (
        <>
            <Box>
                <ElasticSizeFilter 
                    downloadRecords={downloadRecords} 
                    getData={getData}
                />
            </Box>

            <Box style={{
                    marginTop: 10
            }}>
                <ElasticSizeGrid
                    elasticSizeReport={elasticSizeReport}
                />
            </Box>
        </>
    );
}