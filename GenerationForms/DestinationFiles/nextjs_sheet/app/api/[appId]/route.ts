import config_local from "@/app/commons/config-local";
import handleApiError from "@/app/commons/handleApiError";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, props: { params: Promise<{ appId: string }>}) {
    const params = await props.params;

    try{
        const token = req.cookies.get('session_bk')?.value;
        
        const res2 = await fetch(`${config_local.backendUserAppUrl}/Application/${params.appId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(handleApiError)
        .then(res => res.json());

        return NextResponse.json(res2, { status: 200 })
    } catch(error: any) {
        return NextResponse.json({message: error.message}, { status: error.cause.status });
    }
}