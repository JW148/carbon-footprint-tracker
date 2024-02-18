import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-between">
        <div>
          <Image
            src="https://runmdc.org.uk/wp-content/uploads/2016/11/20150919-IMG_7124sm-e1479912560949.jpeg"
            width={1995}
            height={665}
            alt="Landing Page Image"
          />
        </div>
      </section>

      <main className="flex flex-col items-center justify-between px-24 pt-8 pb-4">
        <article className="w-2/3 p-4">
          <h1 className="text_header">About</h1>

          <p>
            In an effort to mitigate our Carbon Footprint, first it is important
            to understand what our current situation is. This page will provide
            a way of logging members’ travel mileage to Club runs and events,
            and keep a running tally. Once we have an idea of monthly/yearly
            travel we can take steps to reduce our carbon footprint. We
            encourage members to car-share where possible to reduce our impact
            on the climate.
          </p>
        </article>
      </main>
    </>
  );
}
