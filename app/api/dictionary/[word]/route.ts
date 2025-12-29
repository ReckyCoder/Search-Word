import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: RouteContext<'/api/dictionary/[word]'>){

    const { word } = await ctx.params;

    if(word.includes(" ")) word.trim();

    try {
        const res = await fetch(`${process.env.DICTIONARY_API_BASE_URL}/${word}`);

        if (!res.ok) {
            return NextResponse.json(
            { error: 'Word not found' },
            { status: 404 }
            )
        };

        const data = await res.json();
        
        return NextResponse.json({
            success: true,
            result: data[0]
        });
    } catch (error) {
        throw new Error("Failed to fetch word: " + error);
    }
};