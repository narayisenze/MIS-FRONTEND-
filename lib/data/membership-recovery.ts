export const membershipRecoveryData = {
  data: [
    {
      id: 1,
      memberName: "SACCO Muhima",
      membershipFee: 500000,
      paymentStatus: "Partial",
      lastPayment: "2023-05-15",
      lastPaymentAmount: 200000,
      balance: 300000,
      paymentHistory: {
        data: [
          {
            date: "2023-05-15",
            amount: 200000,
            reference: "PAY001",
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
    },
    {
      id: 2,
      memberName: "MFI Bank",
      membershipFee: 750000,
      paymentStatus: "Paid",
      lastPayment: "2023-04-01",
      lastPaymentAmount: 750000,
      balance: 0,
      paymentHistory: {
        data: [
          {
            date: "2023-04-01",
            amount: 750000,
            reference: "PAY002",
          },
        ],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
    },
    {
      id: 3,
      memberName: "AMIR",
      membershipFee: 300000,
      paymentStatus: "Unpaid",
      lastPayment: null,
      lastPaymentAmount: 0,
      balance: 300000,
      paymentHistory: {
        data: [],
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
      },
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
