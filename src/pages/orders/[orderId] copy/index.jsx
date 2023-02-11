import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import formNewOrder from '@/data/formNewOrder';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import axios, { BASE_URL } from '../../../axios';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';

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
export default function SingleOrder() {
  const [loading, setLoading] = React.useState(false);
  const [inputErrs, setInputErrs] = React.useState({});
  const { isFallback, query } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: async () =>
      await fetch(`${BASE_URL}/orders/${query.orderId}`).then((d) => d.json()),
  });
  if (isFallback) {
    return <h3>Loading</h3>;
  }

  const onSubmit = async (UpdateData) => {
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
      .post('orders', copyUpdateDatas)
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
}

// export async function getStaticPaths() {
//   return {
//     // paths,
//     paths: [
//       {
//         params: { orderId: '63e2c70fad80f0412c8db8a6' },
//       },
//     ],
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   console.log(params.id);
//   const { data: order } = await axios.get(`/orders/${params.orderId}`);
//   if (!Object.keys(order || {})?.length)
//     return {
//       notFound: true,
//     };
//   return {
//     props: { order },
//   };
// }
