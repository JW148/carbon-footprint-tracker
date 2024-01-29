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

import EventDetailsModal from "@/app/ui/events-ui/eventDetailsModal";
import { useState } from "react";

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

  // states for the modal and its data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to handle row click
  // Open the modal and pass the data from that row into the modal
  const handleRowClick = (eventData) => {
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table aria-label="Events table">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow 
              key={item.date}
              onClick={() => handleRowClick(item)}
            >
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <EventDetailsModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        eventData={selectedEvent}
      />
    </>
  );
}
