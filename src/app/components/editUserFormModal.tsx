"use client";

import React from "react";

import Modal, { ModalProps } from "@/app/components/modal";
import ProfileForm from "./profileForm";

const EditUserFormModal = ({ onClose, ...rest }: ModalProps) => {
  return (
    <Modal {...rest} onClose={onClose}>
      <ProfileForm onSubmit={() => onClose()} />
    </Modal>
  );
};
export default EditUserFormModal;
