"use client";

import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DeleteEmission } from "./buttons";

export default function EventDetailsModal({
  isOpen,
  onOpenChange,
  eventData,
  emissionsData,
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

  return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={() => onOpenChange(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="pl-20 pt-10 main_header">
                Event Details
              </ModalHeader>
              <ModalBody>
                {eventData && (
                  <div className="pl-14">
                    {/* Display event details here using eventData */}

                    <div className="grid grid-cols-3 py-3">
                      <p className="font-medium">
                        Date:
                        <p className="font-normal">{eventData.date}</p>
                      </p>
                      <p className="font-medium">
                        Run:
                        <p className="font-normal">{eventData.run}</p>
                      </p>
                      <p className="font-medium">
                        Area:
                        <p className="font-normal">{eventData.area}</p>
                      </p>
                    </div>

                    <div className="grid grid-cols-3 py-3">
                      <p className="font-medium">
                        Near:
                        <p className="font-normal">{eventData.near}</p>
                      </p>
                      <p className="font-medium">
                        Nearest Postcode:
                        <p className="font-normal">{eventData.nearest_pc}</p>
                      </p>
                      <p className="font-medium">
                        W3W:<p className="font-normal">{eventData.w3w}</p>
                      </p>
                    </div>

                    <div className="grid grid-cols-3 py-3">
                      <p className="font-medium">
                        GR:<p className="font-normal">{eventData.gr}</p>
                      </p>
                      <p className="font-medium">
                        Length:<p className="font-normal">{eventData.length}</p>
                      </p>
                      <p className="font-medium">
                        Climb:<p className="font-normal">{eventData.climb}</p>
                      </p>
                    </div>
                  </div>
                )}
              </ModalBody>

              {emissionsData && emissionsData.length > 0 && isOpen && (
                <>
                  <ModalHeader className="pl-20 pt-10 main_header">
                    Carbon Emissions Details
                  </ModalHeader>
                  <ModalBody>
                    {emissionsData.map((emission, index) => (
                      <div className="pl-14" key={index}>
                        {/* Display event details here using emission */}
                        <div className="grid grid-cols-2 py-3">
                          <p className="font-medium">
                            Name: <p className="font-normal">{emission.name}</p>
                          </p>
                          {session.user.id === emission.driver_id && (
                            <div className="justify-self-end">
                              <DeleteEmission id={emission.emissionKey} />
                            </div>
                          )}
                        </div>
                        <Divider />
                        <div className="grid grid-cols-2 py-3">
                          <p className="font-medium">
                            Number of Miles Driven:{" "}
                            <p className="font-normal">{emission.miles}</p>
                          </p>
                          <p className="font-medium">
                            Number of Passengers:{" "}
                            <p className="font-normal">{emission.passengers}</p>
                          </p>
                        </div>
                      </div>
                    ))}
                  </ModalBody>
                </>
              )}

              {/* Add authentication to hide/unhide the button if thats not thier entry */}
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
