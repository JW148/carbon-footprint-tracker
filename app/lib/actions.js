"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod"; //for type checking and coercion
import { revalidatePath } from "next/cache";

export async function createEvent(formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  console.log("Inserting event");
  await sql`
    INSERT INTO events (date, run, area, near, nearest_pc, w3w, gr, length, climb)
    VALUES (${rawFormData.date}, ${rawFormData.run}, ${rawFormData.area}, ${rawFormData.near}, ${rawFormData.nearest_pc}, ${rawFormData.w3w}, ${rawFormData.gr}, ${rawFormData.length}, ${rawFormData.climb})
  `;
  console.log("Events added successfully");
  revalidatePath("/events");
}
