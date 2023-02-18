import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MainLayout from '@/layouts/mainLayout';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import axios, { BASE_URL } from '@/axios';
import { useRouter } from 'next/router';
import React from 'react';
import OrderActions from '@/components/header/OrdersActions';
import useSWR from 'swr';
import moment from 'moment';

const fetcher = (path = '') =>
  fetch(`${BASE_URL}/${path}`).then((res) => res.json());

export default function Order() {
  // const [orders, setOrders] = React.useState([]);
  const [rowId, setRowId] = React.useState();
  const { data, error, isLoading } = useSWR(`orders`, fetcher);
  // console.log();
  // const { isFallback } = useRouter();
  // React.useEffect(() => {
  //   axios
  //     .get('orders')
  //     .then(({ data }) => setOrders(data))
  //     .catch((e) => {
  //       alert(e?.data?.response?.message);
  //       console.log(e);
  //     });
  // }, []);
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
  const columns = [
    { field: '_id', flex: 0.35, headerName: 'ID', hide: true },
    {
      field: 'order_no',
      flex: 0.3,
      headerName: 'Order No',
      editable: true,
    },
    {
      field: 'delivery_date',
      type: 'dateTime',
      flex: 0.35,
      headerName: 'Delivery Date',
      valueGetter: ({ row }) => moment(row.delivery_date).format('YYYY-MM-DD'),
    },
    {
      field: 'quantity',
      type: 'number',
      flex: 0.25,
      headerName: 'Quantity',
      editable: true,
    },
    {
      field: 'price',
      type: 'number',
      flex: 0.2,
      headerName: 'Price',
      editable: true,
    },
    {
      field: 'discount',
      type: 'number',
      flex: 0.25,
      headerName: 'Discount',
      editable: true,
    },
    {
      field: 'due',
      type: 'number',
      flex: 0.2,
      headerName: 'Due',
      editable: true,
    },
    {
      field: 'status',
      flex: 0.45,
      headerName: 'Status',
      headerAlign: 'center',
      type: 'singleSelect',
      editable: true,
      valueOptions: [
        'PROCESSING',
        'ALTER',
        'COMPLETED',
        'DELIVERED',
        'TRAIL',
        'RETURN',
      ],
    },
    {
      field: 'order_type',
      flex: 0.35,
      headerName: 'Order Type',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['READYMADE', 'TAILORS'],
    },
    {
      field: 'delivery_details',
      flex: 1,
      headerName: 'Customer/Delivery Details',
      editable: true,
    },
    {
      field: 'order_date',
      type: 'dateTime',
      flex: 0.45,
      headerName: 'Order Date',
      valueGetter: ({ row }) => moment(row.order_date).format('YYYY-MM-DD'),
    },

    {
      field: 'Actions',
      flex: 0.4,
      headerName: 'Actions',
      editable: true,
      renderCell: ({ row }) => {
        return <OrderActions {...{ row, rowId, setRowId }} />;
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Panzabi.com | Orders</title>
        <meta
          name="description"
          content="Readymade and tailering for panzabi.com specially Eid Ul Fitr"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <MainLayout>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ marginY: 2, display: 'flex', gap: 2 }}>
              <Typography component="div" sx={{ display: 'flex' }}>
                <Typography>Tomorrow&rsquo;s Orders </Typography>
                <Typography
                  sx={{
                    width: '80px',
                    background: 'var(--TOMORROW)',
                    marginLeft: 2,
                  }}
                />
              </Typography>
              <Typography component="div" sx={{ display: 'flex' }}>
                <Typography>2 days before Orders </Typography>
                <Typography
                  sx={{
                    width: '80px',
                    background: 'var(--TOMORROW_S_NEXT)',
                    marginLeft: 2,
                  }}
                />
              </Typography>
              <Typography component="div" sx={{ display: 'flex' }}>
                <Typography>Today&rsquo;s Orders </Typography>
                <Typography
                  sx={{
                    width: '80px',
                    background:
                      'linear-gradient(84deg, var(--TOMORROW_S_NEXT),var(--TOMORROW))',
                    marginLeft: 2,
                  }}
                />
              </Typography>
            </Box>
            <DataGrid
              loading={isLoading}
              autoHeight
              rows={Array.isArray(data) ? data : []}
              columns={columns}
              getRowId={(row) => row._id}
              components={{
                Toolbar: GridToolbar,
              }}
              getRowClassName={(params) => {
                const status = params.row.status;
                const delivery = params.row.delivery_date;
                const success = ['DELIVERED', 'COMPLETED'];
                if (!success.includes(status)) {
                  if (
                    moment(delivery).isSame(moment().add(-1, 'days'), 'day')
                  ) {
                    return `DATE_CROSSED`;
                  } else if (
                    moment(delivery).isSame(moment().add(2, 'days'), 'day')
                  ) {
                    return `TOMORROW_S_NEXT`;
                  } else if (
                    moment(delivery).isSame(moment().add(1, 'day'), 'day')
                  ) {
                    return `TOMORROW`;
                  } else if (moment(delivery).isSame(moment(), 'day')) {
                    return `TODAY`;
                  }
                }

                return status;
              }}
            />
          </Box>
        </Box>
      </MainLayout>
    </>
  );
}

// export const getStaticProps = async () => {
//   const { data } = await axios.get('orders');
//   return {
//     props: { orders: data },
//   };
// };
