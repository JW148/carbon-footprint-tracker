"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "run",
    label: "RUN",
  },
  {
    key: "area",
    label: "AREA",
  },
  {
    key: "near",
    label: "NEAR",
  },
  {
    key: "nearest_pc",
    label: "NEAREST POSTCODE",
  },
  {
    key: "w3w",
    label: "W3W",
  },
  {
    key: "gr",
    label: "GR",
  },
  {
    key: "length",
    label: "LENGTH",
  },
  {
    key: "climb",
    label: "CLIMB",
  },
];

export default function EventsTable(events) {
  console.log(events);

  const rows = events.events.map((event) => {
    return {
      date: event.date,
      run: event.run,
      area: event.area,
      near: event.near,
      nearest_pc: event.nearest_pc,
      w3w: event.w3w,
      gr: event.gr,
      length: event.length,
      climb: event.climb,
    };
  });

  console.log(rows);

  return (
    <Table aria-label="Events table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.date}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
