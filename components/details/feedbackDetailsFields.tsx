import { Data } from "@/types/apiData";
import { Badge } from "../ui/badge";

export const feedbackDetailsFields: Data = {
  staffName: {
    label: "Staff Name",
  },
  feedbackChannel: {
    label: "Feedback Channel",
    formatValue: (channel: string) => (
      <Badge color="info" variant="soft">
        {channel}
      </Badge>
    ),
  },
  description: {
    label: "Description",
  },
  category: {
    label: "Category",
  },
  resolution: {
    label: "Resolution Status",
    formatValue: (resolution: string) => (
      <Badge
        color={
          resolution === "Resolved"
            ? "success"
            : resolution === "Under Review"
            ? "warning"
            : "info"
        }
        variant="soft"
      >
        {resolution}
      </Badge>
    ),
  },
  ageGroup: {
    label: "Provider Age Group",
  },
  providerEmail: {
    label: "Provider Email",
  },
  fullName: {
    label: "Provider Full Name",
  },
  hasDisability: {
    label: "Has Disability (Provider)",
    formatValue: (hasDisability: boolean) => (
      <Badge color={hasDisability ? "warning" : "success"} variant="soft">
        {hasDisability ? "Yes" : "No"}
      </Badge>
    ),
  },
  institution: {
    label: "Provider Institution",
  },
  phoneNumber: {
    label: "Provider Phone Number",
  },
};
