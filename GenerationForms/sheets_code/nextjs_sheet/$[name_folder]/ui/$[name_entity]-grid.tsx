import { useCallback, useMemo, useState, useTransition } from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, useGridApiRef } from "@mui/x-data-grid";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { FcDeleteRow } from "react-icons/fc";
import { toast } from "react-toastify";
import handleApiError from "@/app/commons/handleApiError";
import useMessageDialog from "@/app/commons/hooks/useMessageDialog";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import { DateTime } from "luxon";
import config_local from "@/app/commons/config-local";
import $[name_entity_class]GridDto from "../dtos/$[name_entity]-grid.dto";

interface Params {
    $[name_entity]Grid: $[name_entity_class]GridDto[];
}

export default function RoleGrid({$[name_entity]Grid}: Params) {

        const router = useRouter();
        const {confirmationMessage, closeDialog} = useMessageDialog();
        const apiRef = useGridApiRef();
        const [isPending, startTransition] = useTransition();        
    
        const handleDelete = useCallback((params: GridRowParams) => {
        //   confirmationMessage('¿Seguro que desea eliminar esta información?', '', async () => {
            startTransition(async () => {
              try {
                const response = await fetch(`/sec/$[name_folder]/api/${params?.row.id}`, {
                  method: 'DELETE',
                  headers: {
                    "Content-Type": "application/json"
                  }
                })
                .then(handleApiError)
                .then(res => res.json());
                
                toast('Eliminado. ID: ' + params?.row.id);
                
                const ids = apiRef.current?.getAllRowIds().map(x => x as number);
            
                const roleFiltered = 
                  $[name_entity]Grid.filter(s => s.id !== params?.row.id)
                          .filter(x => ids?.find( id => id === x.id));

                apiRef?.current?.setRows(roleFiltered);
                closeDialog();
              } catch (error) {
                toast('Error al eliminar el rol: ' + error);
              }
            });        
        //   });        
        }, [apiRef, closeDialog, $[name_entity]Grid]);
              
        const columns = useMemo<GridColDef[]>(
            () => [
            {
              field: "action",
              headerName: "Acciones",
              type: 'actions',
              getActions: (params: any) => [
                <GridActionsCellItem
                  key={0}
                  icon={
                    <Link 
                      href={`/sec/$[name_folder]/edit/${params.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <MdEdit size={20} />
                    </Link>
                  }
                  label="Edit"
                />,
                <GridActionsCellItem
                    key={1}
                    icon={
                        <FcDeleteRow size={20}/>
                    }
                    color={"primary"}
                    label="Delete"
                    onClick={() => {handleDelete(params)}}
                />
              ],
            },
            { field: 'id', headerName: 'ID' },
            { field: 'description', headerName: 'Descripción', width: 200 },            
            {
                field: 'createdAt',
                valueFormatter: (value: string) => {
                  if (value == null) {
                    return '';
                  }
        
                  return DateTime.fromISO(value).toFormat(config_local.format_date_time);
                },
                type: 'dateTime',
                headerName: 'Date Created',
                width: 200,
                editable: false,
            },
            {
                field: 'createdBy',
                headerName: 'Created By',
                width: 200,
                editable: false,
            },
            {
                field: 'updatedAt',
                valueFormatter: (value: string) => {
                  if (value == null) {
                    return '';
                  }
        
                  return DateTime.fromISO(value).toFormat(config_local.format_date_time);
                },
                type: 'dateTime',
                headerName: 'Date Updated',
                width: 160,
                editable: false,
            },
            {
                field: 'updatedBy',
                headerName: 'Updated By',
                width: 200,
                editable: false,
            },
        ], [handleDelete]);
        
    return (
        <>
            <Grid container>
                <div style={{ height: "85vh", width: '100%' }}>
                    <DataGrid
                      apiRef={apiRef}
                      rows={$[name_entity]Grid}
                      columns={columns}
                      loading={isPending}
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
                      onRowDoubleClick={(params: GridRowParams)=> {
                        router.push(`/sec/$[name_folder]/edit/${params.id}`);
                      }}
                      autoPageSize
                      getRowId={(row) => row.id}
                    />
                </div>
            </Grid>
        </>
    );
}