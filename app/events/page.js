import { fetchEvents, fetchEmissions } from "@/app/lib/data";
import EventsTable from "@/app/ui/events-ui/table";
import AddEventModal from "@/app/ui/events-ui/addEventModal";

export default async function Page() {
  const events = await fetchEvents();
  const emissions = await fetchEmissions();

  return (
    <section className="flex min-h-screen flex-col items-center justify-between px-24 pt-10">
      <main className="flex flex-col items-center justify-between px-24 pt-8 pb-4">
        <article className="w-2/3 px-4 py-8">
          <h1 className="main_header">Events</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>

        <EventsTable events={events} emissions={emissions} />

        <section className=" px-4 py-8">
          <AddEventModal />
        </section>
      </main>
    </section>
  );
}
