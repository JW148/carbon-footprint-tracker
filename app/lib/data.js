import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchEvents() {
  //noStore() Next.js API used to opt out of static rendering (making the components dynamic)
  noStore();
  try {
    console.log("Fetching events data...");
    //REMOVE FOR PRODUCTION: artificially delaying the response to demo the loading state skeleton
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql`SELECT * FROM events`;
    console.log("Data fetch completed.");
    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch events data.");
  }
}

//CHANGE IMPLEMENTATION TO RETURN A MAP
export async function fetchEmissions() {
  noStore();
  try {
    console.log("Fetchgin emissions data...");
    const data = await sql`SELECT * FROM emissions`;
    console.log("Data fetch complete.");
    return data.rows;
  } catch (err) {
    console.log("Database error: ", err);
    throw new Error("Failed to fetch emissions data.");
  }
}
