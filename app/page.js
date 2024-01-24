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
          />

        </div>
      </section>

      <main className="flex flex-col items-center justify-between px-24 pt-8 pb-4">
        <article className="w-2/3 p-4">
          <h1 className="text_header">
            About
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
      </main>

    </>

    
  );
}
