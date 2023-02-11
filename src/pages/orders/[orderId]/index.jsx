import MainLayout from '@/layouts/mainLayout';
import Box from '@mui/material/Box';
import axios from '@/axios';
import moment from 'moment';
import { useRouter } from 'next/dist/client/router';
import CircularProgress from '@mui/material/CircularProgress';
import EditOrder from './edit';

export default function SingleOrder({ order }) {
  const { isFallback } = useRouter();
  if (isFallback) {
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
          <EditOrder order={order} />
        </Box>
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    // paths,
    paths: [
      {
        params: { orderId: '21e3f479369f78de7d9aaf02' },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(`/orders/${params.orderId}`);
  if (!Object.keys(data || {})?.length)
    return {
      notFound: true,
    };
  const order = { ...data };
  order.order_date = moment(order.order_date).format('YYYY-MM-DD');
  order.delivery_date = moment(order.delivery_date).format('YYYY-MM-DD');
  return {
    props: { order },
  };
}
