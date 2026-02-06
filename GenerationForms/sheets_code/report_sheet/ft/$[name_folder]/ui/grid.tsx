import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { useMemo } from "react";
import config_local from "../../../../common/config-local";
import PreparationDto from "../../../work-group/preparation/preparation/dtos/dto";
import { Box, Grid } from "@mui/material";
import $[name_entity_ft]Dto from "../dtos/dto";

interface Params {
    $[name_variable_ft]Report: $[name_entity_ft]Dto[]
}

export default function PreparationReportGrid({$[name_variable_ft]Report}: Params) {
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
                        rows={$[name_variable_ft]Report}
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