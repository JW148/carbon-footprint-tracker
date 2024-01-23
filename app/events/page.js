import { fetchEvents } from "@/app/lib/data";

export default async function Page() {
  const events = await fetchEvents();
  console.log(events);
  return (
    <p className="flex min-h-screen flex-col items-center justify-between p-24">
      Events Page
    </p>
  );
}
