import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchEvents() {
  //noStore() Next.js API used to opt out of static rendering (making the components dynamic)
  noStore();
  try {
    console.log("Fetching events data...");
    const data = await sql`SELECT * FROM events`;
    console.log("Data fetch completed.");
    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch events data.");
  }
}
