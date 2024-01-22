const { db } = require("@vercel/postgres");
const { events } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedEvents(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    //create the events table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS events (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                date VARCHAR(255) NOT NULL,
                run VARCHAR(255) NOT NULL,
                area VARCHAR(255) NOT NULL,
                near VARCHAR(255) NOT NULL,
                nearest_pc VARCHAR(255) NOT NULL,
                w3w VARCHAR(255) NOT NULL,
                gr VARCHAR(255) NOT NULL,
                length VARCHAR(255) NOT NULL,
                climb VARCHAR(255) NOT NULL

            );
        `;

    console.log(`Created events table`);

    //imsert data into the events table
    const insertedEvents = await Promise.all(
      events.map(
        (event) => client.sql`
                INSERT INTO events (date, run, area, near, nearest_pc, w3w, gr, length, climb)
                VALUES (${event.date}, ${event.run}, ${event.area}, ${event.near}, ${event.nearest_pc}, ${event.w3w}, ${event.gr}, ${event.length}, ${event.climb})
                ON CONFLICT (id) DO NOTHING;
            `
      )
    );

    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.log("Error seeding events: ", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedEvents(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database: ",
    err
  );
});
