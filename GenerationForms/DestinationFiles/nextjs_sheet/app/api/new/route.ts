import config_local from "@/app/commons/config-local";
import handleApiError from "@/app/commons/handleApiError";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const create = await req.json();

    try{
        const token = req.cookies.get('session-bk')?.value;
        console.log('Creating', create);
        
        const res2 = await fetch(`${config_local.backendUserAppUrl}/Application`, {
            method: 'POST',
            body: JSON.stringify(create),
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