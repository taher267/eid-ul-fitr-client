import React from 'react';
import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import axios from '@/axios';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import CircularProgress from '@mui/material/CircularProgress';
import EditOrder from '../../components/edit';

export default function SingleOrder() {
  const [order, setOrder] = React.useState({});
  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) return;
    if (!Object.keys(order || {}).length) {
      const { orderId } = router.query;
      axios
        .get(`/orders/${orderId}`)
        .then(({ data }) => setOrder(data || {}))
        .catch((e) => {
          alert(e?.response?.data?.message || e?.message);
          constole.log(e);
        });
    }
  }, [router.isReady]);
  // if (isFallback) {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         height: '90vh',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <>
      <MainLayout>
        <Box sx={{ padding: 2 }}>
          {' '}
          {(Object.keys(order || {}).length && <EditOrder order={order} />) ||
            ''}
        </Box>
      </MainLayout>
    </>
  );
}
