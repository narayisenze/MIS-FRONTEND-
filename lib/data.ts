export const dashboardData = {
  statistics: [
    { name: "Total Users", quantity: 1259, description: "Total number of users" },
    { name: "Active Loans", quantity: "159.5 M", description: "Total amount of active loans" },
    { name: "Portfolios at Risk", quantity: "29.5%", description: "Percentage of portfolios at risk" },
    { name: "Pending Approvals", quantity: 19, description: "Total number of pending approvals" },
  ],
};

export const overviewColors = (name: string) => {
  switch (name) {
    case "Total Users":
      return "primary";
    case "Active Loans":
      return "success";
    case "Portfolio at Risk":
      return "warning";
    case "Pending Approvals":
      return "info";
    default:
      return "destructive";
  }
};

export const overviewIcon = (name: string) => {
  switch (name) {
    case "Total Users":
      return "heroicons:users";
    case "Active Loans":
      return "heroicons:currency-dollar";
    case "Portfolio at Risk":
      return "heroicons:chart-bar";
    case "Pending Approvals":
      return "heroicons:clock";
    default:
      return "heroicons:question-mark-circle";
  }
};
