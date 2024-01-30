import { Tooltip, Button } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Spinner } from "@nextui-org/react";

import { deleteEvent } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";

export function DeleteEvent(id) {
  //using the js bind method to to pass additional args to the server function
  const deleteEventById = deleteEvent.bind(null, id.id);

  return (
    <form action={deleteEventById}>
      <DeleteBtn />
    </form>
  );
}

//NOTE: useFormStatus does not track the status of a <form> rendered in the same component
//      hence why the DeleteBtn is a seperate component
function DeleteBtn() {
  const status = useFormStatus();
  return (
    <>
      {status.pending ? (
        <Spinner />
      ) : (
        <Tooltip color="danger" content="Delete event">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Button isIconOnly className="bg-transparent" type="submit">
              <MdOutlineDelete />
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
}
