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
import { useFormState, useFormStatus } from "react-dom";
import { carbonEvent } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

  const { data: session, status } = useSession();
  //bind the authenticated user's id to the carbonEvent server action
  const carbonEventWithUserID = carbonEvent.bind(null, session.user.id);

  const [state, dispatch] = useFormState(carbonEventWithUserID, {
    data: null,
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
      <Modal
        isOpen={isOpen}
        size={size}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            // CREATE ADD EVENT SQL QUERY FOR FORM SUBMISSION
            <form action={dispatch}>
              <>
                <ModalHeader className="flex flex-col gap-4">
                  {"MDC Carbon Footprint Survey - This weeks' run: " +
                    eventData.date}
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
                    name="name"
                    label="Driver's name"
                    labelPlacement="outside"
                    value={session.user?.name}
                    isClearable={true}
                  />

                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.name && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.name[0]}
                      >
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>

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

                  <div id="miles-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.miles && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.miles[0]}
                      >
                        {state.errors.miles[0]}
                      </p>
                    )}
                  </div>

                  <Input
                    type="number"
                    label="How many other passengers (not including the driver) were in your vehicle?"
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

                  <div
                    id="passenger-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.passengers && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        key={state.errors.passengers[0]}
                      >
                        {state.errors.passengers[0]}
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
