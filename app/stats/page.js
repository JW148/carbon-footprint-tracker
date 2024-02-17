"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { models } from "powerbi-client";

const PowerBIEmbed = dynamic(
  () => import("powerbi-client-react").then((mod) => mod.PowerBIEmbed),
  { ssr: false }
);

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <article className="w-2/3 px-4 pt-8 pb-12">
          <h1 className="main_header">Your Journey`s so far</h1>

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

        {isClient && (
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
              id: process.env.NEXT_PUBLIC_POWERBI_REPORT_ID,
              embedUrl: process.env.NEXT_PUBLIC_POWERBI_EMBED_URL,
              accessToken: process.env.NEXT_PUBLIC_POWERBI_ACCESS_TOKEN,
              tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function (event) {
                    console.log(event.detail);
                  },
                ],
                ["visualClicked", () => console.log("visual clicked")],
                ["pageChanged", (event) => console.log(event)],
              ])
            }
            cssClassName={"embedContainer embedContainerHeight"}
            getEmbeddedComponent={(embeddedReport) => {
              window.Report = embeddedReport;
            }}
          />
        )}
      </section>
    </>
  );
}
