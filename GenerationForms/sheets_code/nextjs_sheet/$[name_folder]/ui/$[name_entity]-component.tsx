'use client';

import { use } from "react";
import $[name_entity_class]GridDto from "../dtos/role-grid.dto";
import { Box, Link } from "@mui/material";
import $[name_entity_class]Grid from "./$[name_entity]-grid";

interface Params {
    $[name_entity]Promise: Promise<$[name_entity_class]GridDto[]>;
}

export default function $[name_entity_class]Component({$[name_entity]Promise}: Params) {
    
    const $[name_entity] = use($[name_entity]Promise);

    return (
        <>
            <Box>
                <Link href={'/sec/$[name_folder]/new'}>New</Link>
            </Box>
            <Box>
                <$[name_entity_class]Grid $[name_entity]Grid={$[name_entity]}/>
            </Box>
        </>
    );
}