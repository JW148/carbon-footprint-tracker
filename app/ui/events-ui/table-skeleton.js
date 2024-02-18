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
