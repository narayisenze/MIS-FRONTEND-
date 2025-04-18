"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import FormField from "./components/FormField";
import { GroupBase, OptionsOrGroups } from "react-select";

interface PartnerFormProps {
  toggleModal: () => void;
}

const userTypeOptions = [
  { value: "premium", label: "Premium" },
  { value: "standard", label: "Standard" },
  { value: "basic", label: "Basic" },
];

const businessCategoryOptions = [
  { value: "financial", label: "Financial Services" },
  { value: "technology", label: "Technology" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
];

const PartnerForm = ({ toggleModal }: PartnerFormProps) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toggleModal();
  };

  return (
    <form onSubmit={onSubmit} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          fieldType="input"
          id="memberName"
          label="Member Name"
          inputType="text"
          placeholder="Enter member name"
        />
        <FormField
          fieldType="input"
          id="tin"
          label="TIN Number"
          inputType="text"
          placeholder="Enter TIN number"
        />
        <FormField
          fieldType="input"
          id="certificateRegistrationNumber"
          label="Certificate Registration Number"
          inputType="text"
          placeholder="Enter registration number"
        />
        <FormField
          fieldType="select"
          id="userType"
          label="User Type"
          placeholder="Select user type"
          selectItems={
            userTypeOptions as unknown as
              | OptionsOrGroups<string, GroupBase<string>>
              | undefined
          }
        />
        <FormField
          fieldType="input"
          id="numberOfCustomers"
          label="Number of Customers"
          inputType="number"
          placeholder="Enter number of customers"
        />
        <FormField
          fieldType="input"
          id="phoneNumber"
          label="Phone Number"
          inputType="tel"
          placeholder="Enter phone number"
        />
        <FormField
          fieldType="input"
          id="email"
          label="Email Address"
          inputType="email"
          placeholder="Enter email address"
        />
        <FormField
          fieldType="input"
          id="poBox"
          label="P.O. Box"
          inputType="text"
          placeholder="Enter P.O. Box"
        />
        <FormField
          fieldType="input"
          id="address"
          label="Address"
          inputType="text"
          placeholder="Enter address"
        />
        <FormField
          fieldType="select"
          id="businessCategory"
          label="Business Category"
          placeholder="Select business category"
          selectItems={
            businessCategoryOptions as unknown as
              | OptionsOrGroups<string, GroupBase<string>>
              | undefined
          }
        />
      </div>
      <div className="pt-5 flex justify-end">
        <Button type="submit">Save Information</Button>
      </div>
    </form>
  );
};

export default PartnerForm;
