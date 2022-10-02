import { Button, Modal } from "native-base";
import React from "react";

function UploadProfilePic({ showUpload, setShowUpload }) {
  return (
    <Modal
      isOpen={showUpload}
      onClose={() => {
        setShowUpload(false);
      }}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          Sit nulla est ex deserunt exercitation anim occaecat.
        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space="2">
            <Button>LEARN MORE</Button>
            <Button>Accept</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default UploadProfilePic;
