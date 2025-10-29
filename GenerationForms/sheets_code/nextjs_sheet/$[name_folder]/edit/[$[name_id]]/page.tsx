import { cookies } from "next/headers";
import config_local from "../../../../commons/config-local";
import { Box } from "@mui/material";
import { Suspense } from "react";
import Loading from "../../../../commons/components/Loading";
import $[name_entity_class]ToEditDto from "../../dtos/$[name_entity]-to-edit.dto";
import $[name_entity_class]EditComponent from "./ui/$[name_entity]-edit.component";

export default async function $[name_entity_class]EditPage({params} : {params: Promise<{$[name_id]: string}>}) {
    const {$[name_id]} = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("session-bk")?.value;
    
    const $[name_entity]Promise = fetch(`${config_local.backendUserAppUrl}/$[url_backend]/to-edit/${$[name_id]}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => res as $[name_entity_class]ToEditDto);
    

    return(
        <>
            <Box>
                <h1>$[title_page_edit]</h1>
            </Box>
            <Suspense fallback={<Loading/>}>
                <Box sx={{height: '100vh'}}>
                    <$[name_entity_class]EditComponent 
                        $[name_entity]Promise={$[name_entity]Promise}
                    />
                </Box>
            </Suspense>
            
        </>
    );
}