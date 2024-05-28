import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");


export const isLoggedIn = async (request: any) => {

    const authHeader = request.headers.get('Authorization');

    const processedToken = authHeader ? authHeader.split("Bearer ") : "";
    if (!authHeader) {

        return NextResponse.json({ error: "Unauthorized access - Token not provided" }, { status: 401 });

    }
    try {
        const user =
            processedToken && processedToken[1]
                ? jwt.verify(processedToken[1], "khaair")
                : null;


        request.user = user;
        return true;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Unauthorized access - Invalid token" }, { status: 401 });

    }
};


