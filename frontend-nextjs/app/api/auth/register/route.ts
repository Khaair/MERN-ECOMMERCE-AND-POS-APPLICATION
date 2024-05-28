import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");


export const POST = async (request: any) => {
    try {

        const body = await request.json();
        const { username, email, password, role } = body;


        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUser) {

            return NextResponse.json({ error: "Username already exists" }, { status: 400 });

        }
        if (existingEmail) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        return NextResponse.json({ error: "User registered successfully" }, { status: 200 });


    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};