import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteComponent(props: any) {
  return (
    <Modal
      show={props.isOpen}
      onHide={props.onClose}
      // size="xs"
      // aria-labelledby="contained-modal-title-vcenter"
      aria-labelledby="swal2-title"
      aria-describedby="swal2-html-container"
      centered
    >
      <Modal.Header onClick={props.onClose}>
        <Modal.Title
          className="swal2-title"
          style={{ textAlign: "center", border: "none" }}
        >
          Confirm {props.title} Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ justifyItems: "center" }}
        className="swal2-html-container"
      >
        Warning! This action will delete {props.title} permanently
        {/* <p></p> */}
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center", border: "none" }}>
        <Button onClick={props.onClose} className="swal2-cancel swal2-styled">
          Cancel
        </Button>
        <Button
          onClick={props.onConfirm}
          className="swal2-confirm swal2-styled"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DeleteComponent;
