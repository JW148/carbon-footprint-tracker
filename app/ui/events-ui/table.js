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
import CarbonEmissionModal from "@/app/ui/events-ui/carbonEmissionModal";

import { useState } from "react";

import { FaRegEdit } from "react-icons/fa";

import { columns } from "@/app/lib/placeholder-data";
import { DeleteEvent, AddEmissions } from "@/app/ui/events-ui/buttons";

import { useSession } from "next-auth/react";

export default function EventsTable({ events, emissions }) {
  const { data: session, status } = useSession();

  const rows = events.map((event) => {
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

  const rowsCarbon = emissions?.map((emission) => {
    return {
      emissionKey: emission.id,
      key: emission.event_id,
      name: emission.driver_name,
      driver_id: emission.driver_id,
      miles: emission.miles_to_event,
      passengers: emission.passengers,
    };
  });

  const renderCell = (item, columnKey) => {
    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center">
          <AddEmissions onClick={() => handleEmissionsClick(item)} />

          {session?.user?.type === "admin" && (
            <>
              <Tooltip content="Edit">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    isIconOnly
                    className="bg-transparent"
                    onClick={() => handleButtonClick(item)}
                  >
                    <FaRegEdit size="1.5em" />
                  </Button>
                </span>
              </Tooltip>
              <DeleteEvent id={item.key} />
            </>
          )}
        </div>
      );
    } else if (columnKey === "length") {
      const val = getKeyValue(item, columnKey);
      return <p>{val}km</p>;
    } else if (columnKey === "climb") {
      const val = getKeyValue(item, columnKey);
      return <p>{val}m</p>;
    } else {
      return getKeyValue(item, columnKey);
    }
  };

  // states for the modal and its data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmissionModalOpen, setIsEmissionModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCarbon, setSelectedCarbon] = useState(null);

  // Function to handle row click
  // Open the modal and pass the data from that row into the modal
  const handleRowClick = (eventData) => {
    // Find the corresponding emission data for the clicked event
    const selectedEmission = rowsCarbon.filter(
      (emission) => emission.key === eventData.key
    );

    console.log("Emission Data: ", selectedEmission);

    setSelectedEvent(eventData);
    setSelectedCarbon(selectedEmission);
    setIsModalOpen(true);
  };

  // Function to handle edit button click
  // Open the modal and pass the data from that row into the modal
  const handleButtonClick = (eventData) => {
    setSelectedEvent(eventData);
    setIsEditModalOpen(true);
  };

  const handleEmissionsClick = (eventData) => {
    setSelectedEvent(eventData);
    setIsEmissionModalOpen(true);
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
        emissionsData={selectedCarbon}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        eventData={selectedEvent}
      />

      <CarbonEmissionModal
        isOpen={isEmissionModalOpen}
        onOpenChange={setIsEmissionModalOpen}
        eventData={selectedEvent}
      />
    </>
  );
}
