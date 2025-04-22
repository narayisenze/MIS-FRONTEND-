"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";
import { GroupBase, OptionsOrGroups } from "react-select";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

const idTypeOptions = [
  { value: "national_id", label: "National ID" },
  { value: "passport", label: "Passport" },
  { value: "driving_license", label: "Driving License" },
];

const departmentOptions = [
  { value: "finance", label: "Finance" },
  { value: "operations", label: "Operations" },
  { value: "it", label: "IT" },
  { value: "hr", label: "Human Resources" },
];

interface UserFormProps {
  userId?: number | string;
}

const UserForm = ({ userId }: UserFormProps) => {
  const router = useRouter();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/users");
  };

  return (
    <form onSubmit={onSubmit} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          fieldType="select"
          id="salutation"
          label="Salutation"
          placeholder="Select salutation"
          selectItems={
            [
              { value: "mr", label: "Mr." },
              { value: "mrs", label: "Mrs." },
              { value: "ms", label: "Ms." },
              { value: "dr", label: "Dr." },
            ] as unknown as OptionsOrGroups<string, GroupBase<string>>
          }
        />
        <FormField
          fieldType="input"
          id="firstName"
          label="First Name"
          inputType="text"
          placeholder="Enter first name"
        />
        <FormField
          fieldType="input"
          id="middleName"
          label="Middle Name"
          inputType="text"
          placeholder="Enter middle name"
        />
        <FormField
          fieldType="input"
          id="lastName"
          label="Last Name"
          inputType="text"
          placeholder="Enter last name"
        />
        <FormField
          fieldType="input"
          id="mobilePhone"
          label="Mobile Phone"
          inputType="tel"
          placeholder="Enter mobile phone"
        />
        <FormField
          fieldType="input"
          id="email"
          label="Email"
          inputType="email"
          placeholder="Enter email"
        />
        <FormField
          fieldType="input"
          id="profession"
          label="Profession"
          inputType="text"
          placeholder="Enter profession"
        />
        <FormField
          fieldType="select"
          id="idType"
          label="ID Type"
          placeholder="Select ID type"
          selectItems={
            idTypeOptions as unknown as OptionsOrGroups<
              string,
              GroupBase<string>
            >
          }
        />
        <FormField
          fieldType="input"
          id="idNumber"
          label="ID Number"
          inputType="text"
          placeholder="Enter ID number"
        />
        <FormField
          fieldType="input"
          id="dateOfBirth"
          label="Date of Birth"
          inputType="date"
          placeholder="Select date of birth"
        />
        <FormField
          fieldType="input"
          id="placeOfBirth"
          label="Place of Birth"
          inputType="text"
          placeholder="Enter place of birth"
        />
        <FormField
          fieldType="input"
          id="placeOfResidence"
          label="Place of Residence"
          inputType="text"
          placeholder="Enter place of residence"
        />
        <FormField
          fieldType="select"
          id="maritalStatus"
          label="Marital Status"
          placeholder="Select marital status"
          selectItems={
            maritalStatusOptions as unknown as OptionsOrGroups<
              string,
              GroupBase<string>
            >
          }
        />
        <FormField
          fieldType="select"
          id="gender"
          label="Gender"
          placeholder="Select gender"
          selectItems={
            genderOptions as unknown as OptionsOrGroups<
              string,
              GroupBase<string>
            >
          }
        />
        <FormField
          fieldType="input"
          id="entryDate"
          label="Entry Date"
          inputType="date"
          placeholder="Select entry date"
        />
        <FormField
          fieldType="input"
          id="nationality"
          label="Nationality"
          inputType="text"
          placeholder="Enter nationality"
        />
        <FormField
          fieldType="select"
          id="department"
          label="Department"
          placeholder="Select department"
          selectItems={
            departmentOptions as unknown as OptionsOrGroups<
              string,
              GroupBase<string>
            >
          }
        />
        <FormField
          fieldType="input"
          id="organization"
          label="Organization"
          inputType="text"
          placeholder="Enter organization"
        />
      </div>
      <div className="pt-5 flex justify-end">
        <Button type="submit">
          {userId ? "Update Information" : "Save Information"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
