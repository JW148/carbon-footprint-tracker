"use client"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { useState } from "react";

export default function EventDetailsModal({ isOpen, onOpenChange, eventData }) {

    //sizes of modals
    const [size, setSize] = useState("4xl")
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
    

    return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={() => onOpenChange(false)}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="pl-20 pt-10 main_header">Event Details</ModalHeader>
                    <ModalBody>
                        {eventData && (
                        <div className="pl-14">
                            {/* Display event details here using eventData */}

                            <div className="grid grid-cols-3 py-3">
                                <p>Date: {eventData.date}</p>
                                <p className="w-auto"></p>
                                <p>Area: {eventData.area}</p>
                            </div>

                            <div className="grid grid-cols-1 py-3">
                                <p>Run: {eventData.run}</p>
                            </div>

                            <div className="grid grid-cols-3 py-3">
                                <p>Near: {eventData.near}</p>
                                <p>Nearest Postcode: {eventData.nearest_pc}</p>
                                <p>W3W: {eventData.w3w}</p>
                            </div>
                            
                            <div className="grid grid-cols-3 py-3">
                                <p>GR: {eventData.gr}</p>
                                <p>Length: {eventData.length}</p>
                                <p>Climb: {eventData.climb}</p>
                            </div>
                        </div>
                        )}

                    </ModalBody>

                    {/* Add authentication to hide/unhide the button if thats not thier entry */}  
                    <ModalFooter>
                        <Button color="danger" onPress={onClose}>
                        Edit Event
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
      </Modal>
    </>
    );
  }