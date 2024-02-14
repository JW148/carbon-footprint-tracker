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
  Spinner,
} from "@nextui-org/react";

import { Select, SelectItem } from "@nextui-org/react";
import { selectOptions } from "@/scripts/selectData";
import { createEvent } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

export default function AddEventModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [state, dispatch] = useFormState(createEvent, {
    data: null,
    errors: null,
    isError: false,
    isSuccess: false,
    message: null,
  });

  useEffect(() => {
    console.log(state);
    if (state.isSuccess === true) onOpenChange(false);
  }, [state]);

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Add Event
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={dispatch}>
              <>
                <ModalHeader className="flex flex-col gap-4">
                  Log an Event
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    type="date"
                    name="date"
                    label="Date"
                    labelPlacement="outside"
                    placeholder="Enter the date"
                    variant="bordered"
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.date && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.date[0]}
                      >
                        {state.errors.date[0]}
                      </p>
                    )}
                  </div>
                  <Input
                    label="Run"
                    name="run"
                    labelPlacement="outside"
                    placeholder="Enter your run name"
                    variant="bordered"
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.run && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.run[0]}
                      >
                        {state.errors.run[0]}
                      </p>
                    )}
                  </div>
                  <Input
                    label="Area"
                    name="area"
                    labelPlacement="outside"
                    placeholder="Enter the run area"
                    variant="bordered"
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.area && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.area[0]}
                      >
                        {state.errors.area[0]}
                      </p>
                    )}
                  </div>
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
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.near && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.near[0]}
                      >
                        {state.errors.near[0]}
                      </p>
                    )}
                  </div>
                  <Input
                    label="Nearest Postcode"
                    name="nearest_pc"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    variant="bordered"
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.nearest_pc && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.nearest_pc[0]}
                      >
                        {state.errors.nearest_pc[0]}
                      </p>
                    )}
                  </div>
                  <Input
                    label="W3W"
                    name="w3w"
                    labelPlacement="outside"
                    placeholder="Enter the Postcode"
                    variant="bordered"
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.w3w && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.w3w[0]}
                      >
                        {state.errors.w3w[0]}
                      </p>
                    )}
                  </div>
                  <Input
                    label="GR"
                    name="gr"
                    labelPlacement="outside"
                    placeholder="Enter the GR"
                    variant="bordered"
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.gr && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.gr[0]}
                      >
                        {state.errors.gr[0]}
                      </p>
                    )}
                  </div>
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
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.length && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.length[0]}
                      >
                        {state.errors.length[0]}
                      </p>
                    )}
                  </div>
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
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.climb && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.climb[0]}
                      >
                        {state.errors.climb[0]}
                      </p>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.db && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.db}
                      >
                        {state.errors.db}
                      </p>
                    )}
                  </div>
                  <SubmitBtn />
                </ModalFooter>
              </>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Spinner />
      ) : (
        <Button color="danger" type="submit">
          Submit
        </Button>
      )}
    </>
  );
}
