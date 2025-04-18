"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";

interface UserFormProps {
  toggleModal: () => void;
}
const UserForm = ({ toggleModal }: UserFormProps) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toggleModal();
  };

  return (
    <form onSubmit={onSubmit} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          fieldType="input"
          id="title"
          label="Title"
          inputType="text"
          placeholder="Enter your title (Mr./Mrs./Ms.)"
        />
        <FormField
          fieldType="input"
          id="phoneNumber"
          label="Phone Number"
          inputType="tel"
          placeholder="Enter your phone number"
        />
        <FormField
          fieldType="input"
          id="email"
          label="Email Address"
          inputType="email"
          placeholder="Enter your email address"
        />
        <FormField
          fieldType="input"
          id="address"
          label="Address"
          inputType="text"
          placeholder="Enter your street address"
        />
        <FormField
          fieldType="input"
          id="city"
          label="City"
          inputType="text"
          placeholder="Enter your city"
        />
        <FormField
          fieldType="input"
          id="stateCountry"
          label="State/Country"
          inputType="text"
          placeholder="Enter your state or country"
        />
        <FormField
          fieldType="input"
          id="tin"
          label="TIN Number"
          inputType="text"
          placeholder="Enter your TIN number"
        />
      </div>
      <div className="pt-5 flex justify-end">
        <Button type="submit">Save Information</Button>
      </div>
    </form>
  );
};

export default UserForm;
