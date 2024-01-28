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

import { Select, SelectItem } from "@nextui-org/react";
import { selectOptions } from "@/scripts/selectData";
import { createEvent } from "@/app/lib/actions";

export default function AddEventModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Add Event
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={createEvent}>
              <>
                <ModalHeader className="flex flex-col gap-4">
                  Log an Event
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    name="date"
                    label="Date"
                    labelPlacement="outside"
                    placeholder="Enter the date"
                    variant="bordered"
                  />
                  <Input
                    label="Run"
                    name="run"
                    labelPlacement="outside"
                    placeholder="Enter your run name"
                    variant="bordered"
                  />

                  <Input
                    label="Area"
                    name="area"
                    labelPlacement="outside"
                    placeholder="Enter the run area"
                    variant="bordered"
                  />

                  <Select label="Select Near" name="near">
                    {selectOptions.map((selectOption) => (
                      <SelectItem
                        key={selectOption.value}
                        value={selectOption.value}
                      >
                        {selectOption.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Nearest Postcode"
                    name="nearest_pc"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    variant="bordered"
                  />

                  <Input
                    label="W3W"
                    name="w3w"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    variant="bordered"
                  />

                  <Input
                    label="GR"
                    name="gr"
                    labelPlacement="outside"
                    placeholder="Enter the GR"
                    variant="bordered"
                  />

                  <Input
                    type="number"
                    label="Length"
                    name="length"
                    placeholder="0.0"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">km</span>
                      </div>
                    }
                  />

                  <Input
                    type="number"
                    label="Climb"
                    name="climb"
                    placeholder="0.0"
                    labelPlacement="outside"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">m</span>
                      </div>
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose} type="submit">
                    Add Event
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
