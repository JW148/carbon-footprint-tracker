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
import { useEffect, useState } from "react";
import { editEvent } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function EditEventModal({ isOpen, onOpenChange, eventData }) {
  // Create a state for each input field
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    run: "",
    area: "",
    near: "",
    nearest_pc: "",
    w3w: "",
    gr: "",
    length: "",
    climb: "",
  });

  // Update state when eventData changes
  useEffect(() => {
    if (eventData) {
      setFormData({
        ...formData,
        id: eventData.key || "",
        date: eventData.date || "",
        run: eventData.run || "",
        area: eventData.area || "",
        near: eventData.near || "",
        nearest_pc: eventData.nearest_pc || "",
        w3w: eventData.w3w || "",
        gr: eventData.gr || "",
        length: eventData.length || "",
        climb: eventData.climb || "",
      });
    }
  }, [eventData]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [state, formAction] = useFormState(editEvent, null);
  console.log(state);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            // CREATE EDIT EVENT SQL QUERY FOR FORM SUBMISSION
            <form action={formAction}>
              <>
                <ModalHeader className="flex flex-col gap-4">
                  Edit your Event
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="id"
                    label="ID"
                    labelPlacement="outside"
                    value={formData.id}
                    variant="faded"
                    isClearable={false}
                  />

                  <Input
                    autoFocus
                    name="date"
                    label="Date"
                    labelPlacement="outside"
                    placeholder="Enter the date"
                    value={formData.date}
                    onChange={handleInputChange}
                    variant="bordered"
                  />

                  <Input
                    label="Run"
                    name="run"
                    labelPlacement="outside"
                    placeholder="Enter your run name"
                    value={formData.run}
                    onChange={handleInputChange}
                    variant="bordered"
                  />

                  <Input
                    label="Area"
                    name="area"
                    labelPlacement="outside"
                    placeholder="Enter the run area"
                    value={formData.area}
                    onChange={handleInputChange}
                    variant="bordered"
                  />

                  <Select
                    label="Select Near"
                    name="near"
                    selectedKeys={[formData.near]}
                    onChange={handleInputChange}
                  >
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
                    value={formData.nearest_pc}
                    onChange={handleInputChange}
                    variant="bordered"
                  />

                  <Input
                    label="W3W"
                    name="w3w"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    value={formData.w3w}
                    onChange={handleInputChange}
                    variant="bordered"
                  />

                  <Input
                    label="GR"
                    name="gr"
                    labelPlacement="outside"
                    placeholder="Enter the GR"
                    value={formData.gr}
                    onChange={handleInputChange}
                    variant="bordered"
                  />

                  <Input
                    type="number"
                    label="Length"
                    name="length"
                    placeholder="0.0"
                    labelPlacement="outside"
                    value={formData.length}
                    onChange={handleInputChange}
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
                    value={formData.climb}
                    onChange={handleInputChange}
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
                    Confirm Edit
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
