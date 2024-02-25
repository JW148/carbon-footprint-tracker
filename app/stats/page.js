import dynamic from "next/dynamic";

export const metadata = {
  title: "MDC | Stats",
  description: "MDC Carbon Footprint Tracker",
};

export default function Page() {
  const DynamicDashboard = dynamic(
    () =>
      import("@/app/ui/stats-ui/dashboard").then(
        (dashboard) => dashboard.default
      ),
    { ssr: false }
  );

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <article className="lg:w-2/3 px-4 pb-12">
          <h1 className="main_header">Your Journey`s so far</h1>

          <p>
            Alright, so check it out! Here's a snapshot of your adventures up till now, neatly organized on this dashboard. 
            We've got all the juicy event data from your journeys, like where you went, what you did, you name it. 
            Plus, to top it off, we've also crunched the numbers on carbon emissions, so you can see the environmental impact of your travels.
          </p>
        </article>

        <>
          <DynamicDashboard />
        </>
      </section>
    </>
  );
}
