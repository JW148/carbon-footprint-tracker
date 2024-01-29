"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";

import EventDetailsModal from "@/app/ui/events-ui/eventDetailsModal";
import { useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

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
  {
    key: "actions",
    label: "ACTIONS",
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

  const renderCell = (item, columnKey) => {
    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Edit Event">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Button isIconOnly className="bg-transparent">
                <FaRegEdit />
              </Button>
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete event">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Button isIconOnly className="bg-transparent">
                <MdOutlineDelete />
              </Button>
            </span>
          </Tooltip>
        </div>
      );
    } else {
      return getKeyValue(item, columnKey);
    }
  };

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
      <Table aria-label="Events table" selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.date} onClick={() => handleRowClick(item)}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
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
