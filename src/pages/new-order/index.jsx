import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import formNewOrder from '@/data/formNewOrder';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import axios from '../axios';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const today = moment().format(DATE_FORMAT);

const defaultValues = {
  order_no: '01',
  order_date: today,
  delivery_date: moment().add(10, 'd').format(DATE_FORMAT),
  status: 'PROCESSING',
  quantity: 0,
  price: 0,
  due: 0,
  order_type: '',
};
const NewOrder = () => {
  const [loading, setLoading] = React.useState(false);
  const [inputErrs, setInputErrs] = React.useState({});
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues,
  });
  const onSubmit = async (newData) => {
    const copyNewDatas = { ...newData };
    if (!copyNewDatas?.delivery_details) delete copyNewDatas?.delivery_details;
    const discount = copyNewDatas?.discount;
    if (discount === undefined || discount === null || discount === '')
      delete copyNewDatas?.discount;
    const due = copyNewDatas?.due;

    if (due === undefined || due === null || due === '')
      delete copyNewDatas?.due;

    setLoading(true);
    setInputErrs({});

    axios
      .post('orders', copyNewDatas)
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
      <MainLayout>
        <Box sx={{ padding: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formNewOrder?.map?.((item) => (
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
                        {...item.itemProps}
                        label={item.label}
                        variant="standard"
                        fullWidth
                        sx={{ marginY: 1 }}
                        inputProps={{ ...item.inputProps }}
                        error={error || inputErrs[item.name] ? true : false}
                        helperText={
                          error?.message || inputErrs[item.name] || ''
                        }
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
            {/* {formNewOrder?.map?.((item) => (
              <Controller
                key={item.name}
                {...item}
                control={control}
                render={({
                  field: { value, ...field },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <TextField
                        id={item.name}
                        {...field}
                        type={item.type}
                        {...item.itemProps}
                        defaultValue={item?.defaultValue}
                        inputProps={item.inputProps}
                        placeholder={item.label}
                        label={item.label}
                        // defaultValue={}
                        variant="standard"
                        sx={{ marginY: 1 }}
                        error={error || inputErrs[item.name] ? true : false}
                        helperText={
                          error?.message || inputErrs[item.name] || ''
                        }
                        onFocus={onFocus}
                        fullWidth
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
            ))} */}
            <Button
              type="submit"
              disabled={
                Object.keys(errors || {}).length || loading ? true : false
              }
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Box>
      </MainLayout>
    </>
  );
};

export default NewOrder;
