import db from "../../../db";
import { advocates } from "@/db/schema";

export async function GET() {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  if (!data){
      throw new Error("No advocate date found");
  }

  return Response.json({ data });
}
