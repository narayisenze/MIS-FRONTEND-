export const financialStatementStatusData = {
  data: [
    {
      id: 1,
      institutionName: "SACCO Kacyiru",
      reportingPeriod: "2024-Q4",
      status: "Draft",
      excelItems: {
        data: [
          {
            id: 1001,
            worksheetName: "Balance Sheet",
            title: "Cash and Bank",
            amount: 500000,
          },
          {
            id: 1002,
            worksheetName: "Balance Sheet",
            title: "Loans Outstanding",
            amount: 1200000,
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
      mappings: [
        {
          id: 201,
          lineItemId: 1,
          lineItemTitle: "Cash",
          worksheetName: "Balance Sheet",
          matchedExcelTitle: "Cash and Bank",
        },
        {
          id: 202,
          lineItemId: 2,
          lineItemTitle: "Loans",
          worksheetName: "Balance Sheet",
          matchedExcelTitle: "Loans Outstanding",
        },
      ],
      lineItems: {
        data: [
          {
            id: 301,
            lineItemId: 1,
            title: "Cash",
            amount: 500000,
          },
          {
            id: 302,
            lineItemId: 2,
            title: "Loans",
            amount: 1200000,
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
      amountMatchStatus: "Matched",
      lastModifiedAt: "2025-01-10T09:00:00Z",
      createdAt: "2025-01-01T08:00:00Z",
    },
    {
      id: 2,
      institutionName: "MFI Karongi",
      reportingPeriod: "2024-Q4",
      status: "Submitted",
      excelItems: {
        data: [
          {
            id: 1003,
            worksheetName: "Income Statement",
            title: "Interest Income",
            amount: 200000,
          },
          {
            id: 1004,
            worksheetName: "Income Statement",
            title: "Service Charges",
            amount: 50000,
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
      mappings: [
        {
          id: 203,
          lineItemId: 3,
          lineItemTitle: "Interest Revenue",
          worksheetName: "Income Statement",
          matchedExcelTitle: "Interest Income",
        },
        {
          id: 204,
          lineItemId: 4,
          lineItemTitle: "Service Fees",
          worksheetName: "Income Statement",
          matchedExcelTitle: "Service Charges",
        },
      ],
      lineItems: {
        data: [
          {
            id: 303,
            lineItemId: 3,
            title: "Interest Revenue",
            amount: 200000,
          },
          {
            id: 304,
            lineItemId: 4,
            title: "Service Fees",
            amount: 50000,
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
      amountMatchStatus: "Matched",
      lastModifiedAt: "2025-01-15T10:00:00Z",
      createdAt: "2025-01-05T09:00:00Z",
    },
    {
      id: 3,
      institutionName: "SACCO Gisozi",
      reportingPeriod: "2024-Q4",
      status: "In Progress",
      excelItems: {
        data: [
          {
            id: 1005,
            worksheetName: "Balance Sheet",
            title: "Fixed Assets",
            amount: 900000,
          },
          {
            id: 1006,
            worksheetName: "Balance Sheet",
            title: "Equity",
            amount: 700000,
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
      mappings: [
        {
          id: 205,
          lineItemId: 5,
          lineItemTitle: "Assets",
          worksheetName: "Balance Sheet",
          matchedExcelTitle: "Fixed Assets",
        },
      ],
      lineItems: {
        data: [
          {
            id: 305,
            lineItemId: 5,
            title: "Assets",
            amount: 900000,
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
      amountMatchStatus: "Partial",
      lastModifiedAt: "2025-01-18T11:00:00Z",
      createdAt: "2025-01-08T07:00:00Z",
    },
  ],
  count: 3,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    paged: true,
    unpaged: false,
    last: true,
    totalPages: 1,
    totalElements: 3,
    size: 10,
    number: 0,
    numberOfElements: 3,
    first: true,
    empty: false,
  },
};
