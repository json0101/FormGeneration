import { Suspense } from "react";
import Loading from "../../../common/components/loading";
import config_local from "../../../common/config-local";
import { cookies } from "next/headers";
import { Box, Typography } from "@mui/material";
import ElasticSizeComponent from "./ui/component";
import DownloadDataResumeDto from "../../downloads/download-data/dtos/resume.dto";

export default async function ElasticSizePage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("session_bk")?.value;

    const downloadRecords = fetch(`${config_local.backendBaseUrl}/downloadrecord/resume`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(x => x as DownloadDataResumeDto[]);
    
    return (
        <>
            <Box sx={{
                marginBottom: 3
            }}>
                <Typography variant="h3" component={"div"}>Reporte de Preparación</Typography>
            </Box>
            
            <Suspense fallback={<Loading/>}>
                <Box>
                    <ElasticSizeComponent 
                        downloadRecordsPromise={downloadRecords}
                    />
                </Box>
            </Suspense>
        </>
    )
}