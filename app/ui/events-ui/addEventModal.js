"use client";

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure, 
    Input
} from "@nextui-org/react";

import {Select, SelectItem} from "@nextui-org/react";
import { selectOptions } from "@/scripts/selectData";


export default function AddEventModal() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <Button onPress={onOpen} color="danger">Add Event</Button>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-4">Log an Event</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    
                    label="Date"
                    labelPlacement="outside"
                    placeholder="Enter the date"
                    variant="bordered"
                  />
                  <Input
                    label="Run"
                    labelPlacement="outside"
                    placeholder="Enter your run name"
                    variant="bordered"
                  />
                  
                  <Input
                    label="Area"
                    labelPlacement="outside"
                    placeholder="Enter the run area"
                    variant="bordered"
                  />
                  
                  <Select 
                    label="Select Near"
                  >
                    {selectOptions.map((selectOption) => (
                      <SelectItem key={selectOption.value} value={selectOption.value}>
                        {selectOption.label}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  
                  <Input
                    label="Nearest Postcode"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    variant="bordered"
                  />

                  <Input
                    label= "W3W"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    variant="bordered"
                  />

                  <Input
                    label="GR"
                    labelPlacement="outside"
                    placeholder="Enter the GR"
                    variant="bordered"
                  />

                  <Input
                    type="number"
                    label="Length"
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
                  <Button color="danger" onPress={onClose}>
                    Add Event
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  