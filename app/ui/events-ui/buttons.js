import { Tooltip, Button } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { Spinner } from "@nextui-org/react";

import { deleteEvent, deleteEmission } from "@/app/lib/actions";
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

export function DeleteEmission(id) {
  const deleteEmissionById = deleteEmission.bind(null, id.id);

  return (
    <form action={deleteEmissionById}>
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
        <Spinner size="sm" />
      ) : (
        <Tooltip color="danger" content="Delete">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <Button isIconOnly className="bg-transparent" type="submit">
              <MdOutlineDelete size="1.5em" color="red" />
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
}

export function AddEmissions({ onClick }) {
  return (
    <form>
      <EmissionsBtn onClick={onClick} />
    </form>
  );
}

function EmissionsBtn({ onClick }) {
  return (
    <Tooltip content="Add Emission Data" color="success">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <Button
          isIconOnly
          className="bg-transparent"
          color="success"
          onClick={onClick}
        >
          <IoAddCircleOutline color="green" size="1.5em" />
        </Button>
      </span>
    </Tooltip>
  );
}
