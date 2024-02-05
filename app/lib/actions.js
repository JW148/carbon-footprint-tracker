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

const FormDataSchema = z.object({
  id: z.string().min(1, "ID not provided"),
  date: z.string().min(1, "Date is required."),
  run: z.string().min(1, "Run is required."),
  area: z.string().min(1, "Area is required."),
  near: z.string().min(1, "Near is required."),
  nearest_pc: z.string().min(1, "Nearest Post Code is required."),
  w3w: z.string().min(1, "W3W is required."),
  gr: z.string().min(1, "GR is required"),
  length: z.string().min(1, "Length is required."),
  climb: z.string().min(1, "Climb is required."),
});

export async function editEvent(state, formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const result = FormDataSchema.safeParse(rawFormData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Failed",
    };
  }
  console.log("Inserting event");

  try {
    await sql`
    UPDATE events
    SET date = ${rawFormData.date}, run = ${rawFormData.run}, area = ${rawFormData.area}, near = ${rawFormData.near}, nearest_pc =  ${rawFormData.nearest_pc}, w3w = ${rawFormData.w3w}, gr = ${rawFormData.gr}, length = ${rawFormData.length}, climb = ${rawFormData.climb}
    WHERE id = ${rawFormData.id}
    `;
    console.log("Event updated successfully");
  } catch (err) {
    return {
      message: "Database Error: Failed to Update Event: " + err,
    };
  }
  revalidatePath("/events");

  if (result.success) {
    return {
      data: result.data,
      message: "Success",
    };
  }
}

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(state, formData) {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw err;
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
export async function carbonEvent(state, formData) {
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
    INSERT INTO emissions (event_id, driver_name, miles_to_event, passengers)
    VALUES (${event_id}, ${name}, ${miles}, ${passengers})
    `;
    console.log("Emission data added successfully");
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

  revalidatePath("/events"); //clears the cache and triggers a new request to the server
  redirect("/events");
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
      INSERT INTO users (name, email, password)
      VALUES (${rawFormData.name}, ${rawFormData.email}, ${hashedPassword})
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
