export default [
  {
    name: 'order_no',
    label: 'Order No.',
    rules: {
      required: { value: true, message: `Order no is mandatory!` },
    },
    inputProps: {
      shouldFocus: true,
    },
  },
  {
    name: 'order_date',
    type: 'date',
    label: 'Order Date',
    rules: {
      required: { value: true, message: `Order date is mandatory!` },
    },
  },
  {
    name: 'delivery_date',
    type: 'date',
    label: 'Delivery Date',
    rules: {
      required: { value: true, message: `Delivery date is mandatory!` },
    },
  },
  {
    name: 'delivery_details',
    label: 'Delivery Details',
    inputProps: {
      multiline: true,
      minRows: 4,
    },
  },
  {
    name: 'quantity',
    type: 'number',
    label: 'Quantity',
    rules: {
      required: { value: true, message: `Quantity is mandatory!` },
    },
    valueAsNumber: true,
  },
  {
    name: 'price',
    type: 'number',
    label: 'Price',
    rules: {
      required: { value: true, message: `Price is mandatory!` },
    },
    valueAsNumber: true,
  },
  {
    name: 'discount',
    type: 'number',
    label: 'Discount',
    rules: {
      required: { value: true, message: `Discount is mandatory!` },
    },
    valueAsNumber: true,
  },
  {
    name: 'due',
    type: 'number',
    label: 'Due',
    rules: {
      required: { value: true, message: `Due is mandatory!` },
    },
    valueAsNumber: true,
  },
  {
    name: 'status',
    inputProps: {
      select: true,
    },
    label: 'Status',
    options: [
      'PROCESSING',
      'ALTER',
      'COMPLETED',
      'DELIVERED',
      'TRAIL',
      'RETURN',
    ],
    rules: {
      required: { value: true, message: `Status is mandatory!` },
    },
  },
  {
    name: 'order_type',
    inputProps: {
      select: true,
    },
    label: 'Order type',
    options: ['READYMADE', 'TAILORS'],
    rules: {
      required: { value: true, message: `Order type is mandatory!` },
    },
  },
];
