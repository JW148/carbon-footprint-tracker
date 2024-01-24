import { fetchEvents } from "@/app/lib/data";
import { Button } from "@nextui-org/button";

export default async function Page() {
  const events = await fetchEvents();
  console.log(events);
  return (
    <div>
      <p className="flex min-h-screen flex-col items-center justify-between p-24">
        Events Page
      </p>
      <Button>Click Me</Button>
    </div>
  );
}
