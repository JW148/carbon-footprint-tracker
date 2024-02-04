"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { carbonEvent } from "@/app/lib/actions";
import { useState } from "react";

export default function CarbonEmissionModal({
  isOpen,
  onOpenChange,
  eventData,
}) {
  //sizes of modals
  const [size, setSize] = useState("4xl");
  const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "full",
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        size={size}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            // CREATE ADD EVENT SQL QUERY FOR FORM SUBMISSION
            <form action={carbonEvent}>
              <>
                <ModalHeader className="flex flex-col gap-4">
                  MDC Carbon Footprint Survey - This weeks' run:{" "}
                  {eventData.date}
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="event_id"
                    label="Event ID"
                    labelPlacement="outside"
                    value={eventData.key}
                    variant="faded"
                    isReadOnly
                  />

                  <Input
                    label="Drivers Name"
                    name="name"
                    labelPlacement="outside"
                    placeholder="Enter the drivers name"
                    variant="bordered"
                  />

                  <Input
                    type="number"
                    label="How many miles in total did you drive to todays run (there & back)"
                    name="miles"
                    placeholder={0}
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">mi</span>
                      </div>
                    }
                  />

                  <Input
                    type="number"
                    label="How many other passengers (not including the driver) were in your vehicle"
                    name="passengers"
                    placeholder={0}
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          passengers
                        </span>
                      </div>
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose} type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
