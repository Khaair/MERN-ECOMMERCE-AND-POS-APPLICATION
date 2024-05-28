import { Category } from "@/lib/models/todo";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";



export const GET = async (request: any) => {
    // const authCheck = await isLoggedIn(request);
    // if (authCheck instanceof NextResponse) return authCheck; 
  
    try {
      await connectToDb();
      const categories = await Category.find();
      return NextResponse.json(categories);
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: "Failed to fetch posts!" }, { status: 500 });
    }
  };

export const POST = async (request: any) => {

    // const authCheck = await isLoggedIn(request);
    // if (authCheck instanceof NextResponse) return authCheck; 

    try {
      await connectToDb(); 
  
      const body = await request.json(); 
      const { name, description } = body; 
  
      if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
      }
  
      const newCategory = new Category({ name, description });
      
      const savedCategory = await newCategory.save();
  
      return NextResponse.json(savedCategory, { status: 201 });
    } catch (err) {
      console.log(err);
    }
  };

  