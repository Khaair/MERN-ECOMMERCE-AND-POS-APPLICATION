import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const POST = async (request: any) => {

    try {

        const body = await request.json();
        const { username, password } = body;

        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "User name not found" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Wrong password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, "khaair", {
            expiresIn: "1h",
        });

        return NextResponse.json({ role: user.role, token }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }

};

