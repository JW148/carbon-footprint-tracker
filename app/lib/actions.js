"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod"; //for type checking and coercion
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreateSchema = z.object({
  date: z.string().min(1, "Date is required."),
  run: z.string().min(1, "Run is required."),
  area: z.string().min(1, "Area is required."),
  near: z.string().min(1, "Near is required."),
  nearest_pc: z.string().min(1, "Nearest Post Code is required."),
  w3w: z.string().min(1, "W3W is required."),
  gr: z.string().min(1, "GR is required"),
  length: z.coerce.number().gt(1, "Length is required."),
  climb: z.coerce.number().gt(1, "Climb is required."),
});

export async function createEvent(state, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(typeof rawFormData.date);
  const result = CreateSchema.safeParse(rawFormData);
  console.log(result);

  //if form data does not match the schema definition, return errors early to be displayed to the user
  if (!result.success) {
    return {
      isError: true,
      isSuccess: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
      message: "Failed",
    };
  }

  console.log("Inserting event");

  const { date, run, area, near, nearest_pc, w3w, gr, length, climb } =
    result.data;

  //inserting data into the db
  try {
    await sql`
    INSERT INTO events (date, run, area, near, nearest_pc, w3w, gr, length, climb)
    VALUES (${date}, ${run}, ${area}, ${near}, ${nearest_pc}, ${w3w}, ${gr}, ${length}, ${climb})
  `;
    console.log("Event added successfully");
    revalidatePath("/events");
    return {
      isError: false,
      isSuccess: true,
      message: "Success!",
      data: result.data,
      errors: null,
    };
  } catch (err) {
    console.log(err);
    return {
      isError: true,
      isSuccess: false,
      message: "Database error.",
      data: null,
      errors: { db: "Database error." },
    };
  }
}

export async function deleteEvent(id) {
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
  } catch (err) {
    console.log("Database error: " + err);
  }

  revalidatePath("/events");
}

export async function deleteEmission(id) {
  try {
    await sql`DELETE FROM emissions WHERE id = ${id}`;
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/events");
}

const EditSchema = z.object({
  id: z.string().min(1, "Error fetching ID"),
  date: z.string().min(1, "Date is required."),
  run: z.string().min(1, "Run is required."),
  area: z.string().min(1, "Area is required."),
  near: z.string().min(1, "Near is required."),
  nearest_pc: z.string().min(1, "Nearest Post Code is required."),
  w3w: z.string().min(1, "W3W is required."),
  gr: z.string().min(1, "GR is required"),
  length: z.coerce.number().gt(1, "Length is required."),
  climb: z.coerce.number().gt(1, "Climb is required."),
});

export async function editEvent(state, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const result = EditSchema.safeParse(rawFormData);

  //if form data does not match the schema definition, return errors early to be displayed to the user
  if (!result.success) {
    return {
      isError: true,
      isSuccess: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
      message: "Failed",
    };
  }

  const { id, date, run, area, near, nearest_pc, w3w, gr, length, climb } =
    result.data;

  console.log("Inserting event");

  try {
    await sql`
    UPDATE events
    SET date = ${date}, run = ${run}, area = ${area}, near = ${near}, nearest_pc =  ${nearest_pc}, w3w = ${w3w}, gr = ${gr}, length = ${length}, climb = ${climb}
    WHERE id = ${id}
    `;
    revalidatePath("/events");
    console.log("Event updated successfully");
    return {
      isError: false,
      isSuccess: true,
      message: "Success!",
      data: result.data,
      errors: null,
    };
  } catch (err) {
    console.log(err);
    return {
      isError: true,
      isSuccess: false,
      message: "Database error.",
      data: null,
      errors: { db: "Database error." },
    };
  }
}

//type checking for emission data (so that relevant errors can be returned to the user)
const EmissionSchema = z.object({
  event_id: z.string().min(1, "Event ID error. Please refresh the page."),
  name: z.string().min(1, "Name is required."),
  miles: z.coerce.number().gt(0, "Distance should be greater than 0"),
  passengers: z.coerce.number(),
});

//CREATE CARBON EVENT TO ADD THE CARBON FOOTPRINT TRACKER DATA
export async function carbonEvent(driver_id, state, formData) {
  console.log(driver_id);
  console.log(formData);
  const rawFormData = Object.fromEntries(formData.entries());
  const result = EmissionSchema.safeParse(rawFormData);
  console.log(result);

  if (!result.success) {
    return {
      isError: true,
      isSuccess: false,
      data: null,
      errors: result.error.flatten().fieldErrors,
      message: "Failed",
    };
  }
  console.log("Inserting emission data");

  const { event_id, name, miles, passengers } = result.data;

  try {
    await sql`
    INSERT INTO emissions (event_id, driver_name, driver_id, miles_to_event, passengers)
    VALUES (${event_id}, ${name}, ${driver_id}, ${miles}, ${passengers})
    `;
    console.log("Emission data added successfully");
    revalidatePath("/events");
    return {
      isError: false,
      isSuccess: true,
      message: "Success!",
      data: {
        event_id: rawFormData.event_id,
        driver_name: rawFormData.name,
        miles_to_event: rawFormData.miles,
        passengers: rawFormData.passengers,
      },
      errors: null,
    };
  } catch (err) {
    console.log(err);
    return {
      isError: true,
      isSuccess: false,
      message: "Database error.",
      data: null,
      errors: { db: "Database error." },
    };
  }
}

import bcrypt from "bcrypt";

export async function signUp(state, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);

  //check that passwords match
  //if they don't return an error early
  if (rawFormData.password1 !== rawFormData.password2) {
    return {
      isError: true,
      isSuccess: false,
      message: "Passwords must match!",
      data: null,
    };
  }
  //otherwise create the new user in the db, hashing the password before storing it
  try {
    const hashedPassword = await bcrypt.hash(rawFormData.password1, 10);
    await sql`
      INSERT INTO users (name, email, password, type)
      VALUES (${rawFormData.name}, ${
      rawFormData.email
    }, ${hashedPassword}, ${"user"})
      ON CONFLICT (id) DO NOTHING;
    `;
    return {
      isError: false,
      isSuccess: true,
      message: "Success!",
      data: { name: rawFormData.name, email: rawFormData.email },
    };
  } catch (err) {
    console.error("Database error: ", err);
    return {
      isError: true,
      isSuccess: false,
      message: "User already exists. Please enter another email.",
      data: null,
    };
  }
}
