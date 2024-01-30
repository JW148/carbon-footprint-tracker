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
import EditEventModal from "@/app/ui/events-ui/editEventModal";
import { useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { columns } from "@/app/lib/placeholder-data";
import { DeleteEvent } from "@/app/ui/events-ui/buttons";

export default function EventsTable(events) {
  const rows = events.events.map((event) => {
    return {
      key: event.id,
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
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => handleButtonClick(item)}
              >
                <FaRegEdit />
              </Button>
            </span>
          </Tooltip>
          <DeleteEvent id={item.key} />
        </div>
      );
    } else {
      return getKeyValue(item, columnKey);
    }
  };

  // states for the modal and its data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to handle row click
  // Open the modal and pass the data from that row into the modal
  const handleRowClick = (eventData) => {
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  // Function to handle edit button click
  // Open the modal and pass the data from that row into the modal
  const handleButtonClick = (eventData) => {
    setSelectedEvent(eventData);
    setIsEditModalOpen(true);
    console.log(eventData.key);
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
            <TableRow key={item.key} onClick={() => handleRowClick(item)}>
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

      <EditEventModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        eventData={selectedEvent}
      />
    </>
  );
}
