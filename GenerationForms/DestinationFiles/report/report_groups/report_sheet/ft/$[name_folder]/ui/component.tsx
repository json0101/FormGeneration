'use client'

import { use, useCallback, useState } from "react";
import DownloadDataResumeDto from "../../../downloads/download-data/dtos/resume.dto";
import GroupReportFilter from "./filter";
import GroupReportFilterDto from "../dtos/filter.dto";
import { Box } from "@mui/material";
import handleApiError from "../../../../common/handleApiError";
import GroupReportDto from "../dtos/dto";
import GroupReportGrid from "./grid";

interface Params {
    downloadRecordsPromise: Promise<DownloadDataResumeDto[]>;
}

export default function ReportGroupReportComponent({downloadRecordsPromise} : Params) {

    const downloadRecords = use(downloadRecordsPromise);
    const [groupReport, setgroupReport] = useState<GroupReportDto[]>([]);

    const getData = useCallback(async (filter: GroupReportFilterDto) => {
            const response = await fetch(`./preparation/api`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filter)
                })
                .then(handleApiError)
                .then(res => res.json() as GroupReportDto[]);
    
            setgroupReport(response);
        }, []);
        
    return (
        <>
            <Box>
                <GroupReportFilter 
                    downloadRecords={downloadRecords} 
                    getData={getData}
                />
            </Box>

            <Box style={{
                    marginTop: 10
            }}>
                <GroupReportGrid
                    groupReportReport={groupReportReport}
                />
            </Box>
        </>
    );
}