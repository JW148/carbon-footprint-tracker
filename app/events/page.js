import { fetchEvents, fetchEmissions } from "@/app/lib/data";
import EventsTable from "@/app/ui/events-ui/table";
import AddEventModal from "@/app/ui/events-ui/addEventModal";

export const metadata = {
  title: "MDC | Events",
  description: "MDC Carbon Footprint Tracker",
};

export default async function Page() {
  const events = await fetchEvents();
  const emissions = await fetchEmissions();

  return (
    <section className="flex min-h-screen flex-col items-center justify-between px-24 pt-10">

        <article className="lg:w-3/4 px-4 pb-12">
          <h1 className="main_header">Events</h1>
          <div className="flex justify-center">
            <p>
              Use the table below to log your travel mileage to Club runs and
              events
            </p>
          </div>
        </article>

        <EventsTable events={events} emissions={emissions} />

        <section className="px-4 py-8">
          <AddEventModal />
        </section>
    </section>
  );
}
