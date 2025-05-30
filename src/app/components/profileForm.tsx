"use client";

import React from "react";
import { Form, Formik } from "formik";
import Button from "@/app/components/button";
import { Role } from "../lib/api";
import InputField from "./inputField";
import { BarLoader } from "react-spinners";
import { useCurrentUser } from "../lib/queries";
import { useDeleteUser, useEditUser } from "../lib/mutations";

export type ProfileFieldValues = {
  name: string;
  role: Role;
};

export interface ProfileFormProps {
  onSubmit?: (values: ProfileFieldValues) => void | Promise<void>;
}
const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const { data: currentUser } = useCurrentUser();
  const { handleEdit, isEditUserPending } = useEditUser();
  const { handleDelete, isDeleteUserPending } = useDeleteUser();

  const initialName = currentUser ? currentUser.data.name : "";
  const initialRole = currentUser
    ? (currentUser.data.role as Role)
    : Role.CLIENT;

  const handleSubmit = async (values: ProfileFieldValues) => {
    await handleEdit({ id: currentUser.data._id, ...values });

    if (onSubmit) {
      onSubmit(values);
    }
  };

  const roleOptions = Object.values(Role) as Role[];
  return (
    <Formik
      initialValues={{ name: initialName, role: initialRole }}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-10">
        <p className="mb-0.5 text-xl">Edit profile</p>
        <div className="flex gap-6">
          <div className="flex flex-col flex-1 gap-5">
            <InputField required label="Name" placeholder="Name" name="name" />

            <InputField
              required
              label="Role"
              placeholder="Role"
              name="role"
              as="select"
            >
              {roleOptions?.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </InputField>
          </div>
        </div>

        <div className="flex gap-5 justify-between items-center">
          <Button type="submit" disabled={isEditUserPending}>
            {!isEditUserPending ? (
              "Edit user"
            ) : (
              <div className="flex items-center gap-1">
                <p>Editing </p>
                <BarLoader speedMultiplier={1} color="white" width={40} />
              </div>
            )}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => handleDelete(currentUser.data._id)}
            disabled={isDeleteUserPending}
          >
            {!isDeleteUserPending ? (
              "Delete user"
            ) : (
              <div className="flex items-center gap-1">
                <p>Deleting </p>
                <BarLoader speedMultiplier={1} color="white" width={40} />
              </div>
            )}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
