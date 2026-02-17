import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { useMemo } from "react";
import config_local from "../../../../common/config-local";
import PreparationDto from "../../../work-group/preparation/preparation/dtos/dto";
import { Box, Grid } from "@mui/material";
import GroupReportDto from "../dtos/dto";

interface Params {
    groupReportReport: GroupReportDto[]
}

export default function PreparationReportGrid({groupReportReport}: Params) {
    // const customToolbar = useCallback(() => {
    //     return (
    //       <Toolbar >
    //         <ToolbarButton csvOptions={{ fileName: "Reporte de Preparación" }}/>
    //       </Toolbar>
    //     );
    //   }, []);
      
    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: 'ID' },
        ], []);

    return (
        <>
            <Grid container>
                <Box 
                    style={{ height: "70vh", width: '100%' }}
                >
                    <DataGrid
                        rows={groupReportReport}
                        columns={columns}
                        slotProps={{
                            toolbar: {
                            csvOptions: {
                                fileName: 'customerDataBase',
                                delimiter: ';',
                                utf8WithBom: true,
                            },
                            },
                        }}
                        showToolbar={true}
                        rowHeight={30}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                }
                            },
                            sorting: {
                                sortModel: [
                                    {
                                        field: 'created_at',
                                        sort: 'desc',
                                    },
                                ]
                            }
                        }}
                        autoPageSize
                        getRowId={(row) => row.id}
                    />
                </Box>
            </Grid>
        </>
    );
}