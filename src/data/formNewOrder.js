import moment from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD';
const today = moment().format(DATE_FORMAT);
const fields = [
  {
    name: 'order_no',
    label: 'Order No.',
    rules: {
      required: { value: true, message: `Order no is mandatory!` },
    },
  },
  {
    name: 'order_date',
    type: 'date',
    label: 'Order Date',

    rules: {
      required: { value: true, message: `Order date is mandatory!` },
      max: {
        value: today,
        message: `Order date can't be after today!`,
      },
    },
    // defaultValue: today,
    // itemProps: {  },
    inputProps: {
      max: today,
    },
  },
  {
    name: 'delivery_date',
    type: 'date',
    label: 'Delivery Date',
    rules: {
      required: { value: true, message: `Delivery date is mandatory!` },
      min: {
        value: today,
        message: `Delivery date can't be before today!`,
      },
    },
    // defaultValue: moment().add(10, 'd').format(DATE_FORMAT),
    // itemProps: {  },
    inputProps: {
      min: today,
    },
  },
  {
    name: 'delivery_details',
    label: 'Customer/Delivery Details',
    itemProps: {
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
    inputProps: {
      min: 0,
    },
  },
  {
    name: 'price',
    type: 'number',
    label: 'Price',
    rules: {
      required: { value: true, message: `Price is mandatory!` },
      min: { value: 0, message: `Price can't less than 0` },
    },
    inputProps: {
      min: 0,
    },
    valueAsNumber: true,
  },
  {
    name: 'discount',
    type: 'number',
    label: 'Discount',
    rules: {
      min: { value: 0, message: `Discount can't less than 0` },
    },
    inputProps: {
      min: 0,
    },
    valueAsNumber: true,
  },
  {
    name: 'due',
    type: 'number',
    label: 'Due',
    rules: {
      required: { value: true, message: `Due is mandatory!` },
      min: { value: 0, message: `Due can't less than 0` },
    },
    valueAsNumber: true,
    inputProps: {
      min: 0,
    },
  },
  {
    name: 'status',
    itemProps: {
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
    itemProps: {
      select: true,
    },
    label: 'Order type',
    options: ['READYMADE', 'TAILORS'],
    rules: {
      required: { value: true, message: `Order type is mandatory!` },
    },
  },
];

export default fields;
