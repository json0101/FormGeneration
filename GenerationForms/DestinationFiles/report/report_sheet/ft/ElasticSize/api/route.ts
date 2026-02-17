import { NextRequest, NextResponse } from "next/server";
import config_local from "../../../../common/config-local";
import handleApiError from "../../../../common/handleApiError";

export async function POST(req: NextRequest) {
    const filters = await req.json();
    
    try {
        const token = req.cookies.get("session_bk")?.value;
        const downloadRecords = await fetch(`${config_local.backendBaseUrl}/reportpreparation`,{
            method: 'POST',
            body: JSON.stringify(filters),
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(handleApiError)
        .then(res => res.json());
        
        return NextResponse.json(downloadRecords, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {        
        return NextResponse.json({message: error.message}, { status: error.cause.status });
    }
}