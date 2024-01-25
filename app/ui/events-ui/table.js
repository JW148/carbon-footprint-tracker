"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { columns } from "@/app/lib/placeholder-data";
import { render } from "react-dom";

export default function EventsTable(events) {
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

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Edit event">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <FaRegEdit />
            </span>
          </Tooltip>
          <Tooltip content="Delete event">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <MdDeleteOutline />
            </span>
          </Tooltip>
        </div>
      );
    } else {
      return <p>{cellValue}</p>;
    }
  };

  return (
    <Table aria-label="Events table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.date}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
