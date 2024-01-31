"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod"; //for type checking and coercion
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  console.log("Inserting event");

  //inserting data into the db
  try {
    await sql`
    INSERT INTO events (date, run, area, near, nearest_pc, w3w, gr, length, climb)
    VALUES (${rawFormData.date}, ${rawFormData.run}, ${rawFormData.area}, ${
      rawFormData.near
    }, ${rawFormData.nearest_pc}, ${rawFormData.w3w}, ${rawFormData.gr}, ${
      rawFormData.length + "km"
    }, ${rawFormData.climb + "m"})
  `;
    console.log("Events added successfully");
  } catch (err) {
    console.log("Database Error: " + err);
  }

  revalidatePath("/events"); //clears the cache and triggers a new request to the server
  redirect("/events");
}

export async function deleteEvent(id) {
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
  } catch (err) {
    console.log("Database error: " + err);
  }

  revalidatePath("/events");
}

export async function editEvent(formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  console.log("Inserting event");
  try {
    await sql`
    UPDATE events
    SET date = ${rawFormData.date}, run = ${rawFormData.run}, area = ${rawFormData.area}, near = ${rawFormData.near}, nearest_pc =  ${rawFormData.nearest_pc}, w3w = ${rawFormData.w3w}, gr = ${rawFormData.gr}, length = ${rawFormData.length}, climb = ${rawFormData.climb}
    WHERE id = ${rawFormData.id}
    `;
    console.log("Event updated successfully");
  } catch (err) {
    console.log("Database Error: " + err);
  }

  revalidatePath("/events");
}
