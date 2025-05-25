"use client";

import React from "react";
import RegistrationForm from "./registrationForm";
import Modal, { ModalProps } from "@/app/components/modal";

export default function CompanyFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <RegistrationForm />
    </Modal>
  );
}
