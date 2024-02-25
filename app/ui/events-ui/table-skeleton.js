"use client";

import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/react";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function TableSkeleton() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between px-24 pt-10">
      <main
        className={`${shimmer} flex flex-col items-center justify-between px-24 pt-8 pb-4`}
      >
        <article className="lg:w-2/3 px-4 pb-12">
          <h1 className="main_header">Events</h1>

          <p>
            Use the table below to log your travel mileage to Club runs and
            events
          </p>
        </article>

        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>DATE</TableColumn>
            <TableColumn>AREA</TableColumn>
            <TableColumn>NEAR</TableColumn>
            <TableColumn>NEAREST POSTCODE</TableColumn>
            <TableColumn>W3W</TableColumn>
            <TableColumn>GR</TableColumn>
            <TableColumn>LENGTH</TableColumn>
            <TableColumn>CLIMB</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Loading data..."}>{[]}</TableBody>
        </Table>
      </main>
    </section>
  );
}
