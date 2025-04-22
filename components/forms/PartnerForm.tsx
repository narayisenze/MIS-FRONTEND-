"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import FormField from "./components/FormField";
import { GroupBase, OptionsOrGroups } from "react-select";
import { useRouter } from "next/navigation";

interface PartnerFormProps {
  partnerId?: string | number;
}

const memberTypeOptions = [
  { value: "sacco", label: "SACCO/MFI" },
  { value: "bank", label: "Bank" },
  { value: "limited_company", label: "Limited Company" },
  { value: "other", label: "Other Partners" },
];

const businessCategoryOptions = [
  { value: "financial_services", label: "Financial Services" },
  { value: "financing", label: "Financing" },
  { value: "capacity", label: "Capacity" },
];

const PartnerForm = ({ partnerId }: PartnerFormProps) => {
  const router = useRouter();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/partners");
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
          id="registrationNumber"
          label="Certificate Registration Number"
          inputType="text"
          placeholder="Enter registration number (RDB, RCA, RGB)"
        />
        <FormField
          fieldType="select"
          id="memberType"
          label="Member Based Type"
          placeholder="Select member type"
          selectItems={
            memberTypeOptions as unknown as OptionsOrGroups<
              string,
              GroupBase<string>
            >
          }
        />
        <FormField
          fieldType="input"
          id="numberOfCustomers"
          label="Number of Customers"
          inputType="number"
          placeholder="Enter number of AMIR members"
        />
        <FormField
          fieldType="date"
          id="entryDate"
          label="Entry Date"
          placeholder="Select entry date"
        />
        <FormField
          fieldType="input"
          id="mobilePhone"
          label="Mobile Phone Number"
          inputType="tel"
          placeholder="Enter mobile phone number"
        />
        <FormField
          fieldType="input"
          id="email"
          label="Email"
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
          id="province"
          label="Province"
          inputType="text"
          placeholder="Enter province"
        />
        <FormField
          fieldType="input"
          id="district"
          label="District"
          inputType="text"
          placeholder="Enter district"
        />
        <FormField
          fieldType="input"
          id="sector"
          label="Sector"
          inputType="text"
          placeholder="Enter sector"
        />
        <FormField
          fieldType="input"
          id="cell"
          label="Cell"
          inputType="text"
          placeholder="Enter cell"
        />
        <FormField
          fieldType="select"
          id="businessCategory"
          label="Business Category"
          placeholder="Select business category"
          selectItems={
            businessCategoryOptions as unknown as OptionsOrGroups<
              string,
              GroupBase<string>
            >
          }
        />
      </div>
      <div className="pt-5 flex justify-end">
        <Button type="submit">
          {partnerId ? "Update Information" : "Save Information"}
        </Button>
      </div>
    </form>
  );
};

export default PartnerForm;
