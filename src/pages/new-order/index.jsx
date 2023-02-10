import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import formNewOrder from '@/data/formNewOrder';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

const NewOrder = () => {
  const [loading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    status: '',
    order_type: '',
  });
  const onSubmit = async (data) => {
    console.log(data);
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
                render={({
                  field: { value, ...field },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <TextField
                        id={item.name}
                        type={item.type}
                        {...item.inputProps}
                        placeholder={item.label}
                        label={item.label}
                        // defaultValue={}
                        variant="standard"
                        sx={{ marginY: 1 }}
                        error={error ? true : false}
                        helperText={error?.message || ''}
                        fullWidth
                        {...field}
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
