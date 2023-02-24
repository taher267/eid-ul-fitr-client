import React from 'react';
import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import axios, { BASE_URL } from '@/axios';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import CircularProgress from '@mui/material/CircularProgress';
import EditOrder from '../../components/edit';
import useSWR from 'swr';

const fetcher = (path = '') =>
  fetch(`${BASE_URL}/${path}`).then((res) => res.json());

export default function SingleOrder() {
  const [order, setOrder] = React.useState({});
  const [loading, setloading] = React.useState(false);
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.isReady && router.query.orderId
      ? `/orders/${router.query.orderId}`
      : null,
    fetcher
  );
  console.log(data);
  // React.useEffect(() => {
  //   if (!router.isReady) return;
  //   if (!Object.keys(order || {}).length) {
  //     const { orderId } = router.query;
  //     const { error, data, isLoading } = useSwr(
  //       `orders/${orderId}`,
  //       null,
  //       fetcher
  //     );
  //     // setloading(isLoading);
  //     // if (error) {
  //     //   console.log(error);
  //     //   return;
  //     // }
  //     fetcher(`orders/${orderId}`).then((d) => console.log(d));
  //     // axios
  //     //   .get(`/orders/${orderId}`)
  //     //   .then(({ data }) => setOrder(data || {}))
  //     //   .catch((e) => {
  //     //     alert(e?.response?.data?.message || e?.message);
  //     //     constole.log(e);
  //     //   });
  //   }
  // }, [router.isReady]);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '90vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <MainLayout>
        <Box sx={{ padding: 2 }}>
          {(Object.keys(data || {}).length && <EditOrder order={data} />) || ''}
        </Box>
      </MainLayout>
    </>
  );
}
