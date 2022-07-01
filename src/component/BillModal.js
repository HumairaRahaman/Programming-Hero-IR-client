import { Button, Modal, Text, useModal } from "@nextui-org/react";
import React from "react";
import { EditIcon } from "./EditIcon";
import ModalForm from "./Form";

export default function BillModal({ type, data }) {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      {type === "create" ? (
        <Button auto shadow color="secondary" onClick={() => setVisible(true)}>
          Add New Bill
        </Button>
      ) : (
        <EditIcon size={25} fill="#979797" onClick={() => setVisible(true)} />
      )}
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <h1 className="text-xl font-bold">{type === 'create' ? "Add New Bill" : "Update New Bill"}</h1>
        </Modal.Header>
        <Modal.Body>
          <ModalForm setVisible={setVisible} type={type} data={data} />
        </Modal.Body>
        
      </Modal>
    </div>
  );
}
