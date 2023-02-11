'use client';
import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import { updateFields } from '@/data/formNewOrder';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import axios, { BASE_URL } from '@/axios';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
const DATE_FORMAT = 'YYYY-MM-DD';
// const today = moment().format(DATE_FORMAT);

const onlyDefault = (
  data = {},
  allows = [
    'order_no',
    'order_date',
    'delivery_date',
    'status',
    'quantity',
    'price',
    'discount',
    'due',
    'order_type',
    'delivery_details',
  ],
  dateTypes = ['order_date', 'delivery_date']
) => {
  return allows.reduce((a, c) => {
    if (dateTypes.includes(c)) {
      a[c] = moment(data[c]).format(DATE_FORMAT);
    } else {
      a[c] = data[c];
    }

    return a;
  }, {});
};

export default function EditOrder({ order }) {
  const [loading, setLoading] = React.useState(false);
  const [inputErrs, setInputErrs] = React.useState({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: onlyDefault(order),
  });

  const onUpdateSubmit = async (UpdateData) => {
    const copyUpdateDatas = { ...UpdateData };
    if (!copyUpdateDatas?.delivery_details)
      delete copyUpdateDatas?.delivery_details;
    const discount = copyUpdateDatas?.discount;
    if (discount === undefined || discount === null || discount === '')
      delete copyUpdateDatas?.discount;
    const due = copyUpdateDatas?.due;

    if (due === undefined || due === null || due === '')
      delete copyUpdateDatas?.due;

    setLoading(true);
    setInputErrs({});

    axios
      .put(`orders/${order._id}`, copyUpdateDatas)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((e) => {
        if (e?.response?.data?.errors) setInputErrs(e?.response?.data?.errors);
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  const onFocus = ({ target: { name } }) => {
    if (inputErrs[name]) {
      setInputErrs((p) => {
        const del = { ...p };
        delete del[name];
        return del;
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onUpdateSubmit)}>
        {updateFields?.map?.((item) => (
          <Controller
            key={item.name}
            {...item}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <TextField
                    type={item.type}
                    {...field}
                    onFocus={onFocus}
                    {...item.itemProps}
                    label={item.label}
                    variant="standard"
                    fullWidth
                    sx={{ marginY: 1 }}
                    inputProps={{ ...item.inputProps }}
                    error={error || inputErrs[item.name] ? true : false}
                    helperText={error?.message || inputErrs[item.name] || ''}
                  >
                    {item?.options?.map?.((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              );
            }}
          />
        ))}

        <Button
          type="submit"
          disabled={Object.keys(errors || {}).length || loading ? true : false}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </>
  );
}
