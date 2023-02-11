import Header from '@/components/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Nav from '../Nav';
import Head from 'next/head';
// import csses from './layout.module.css';
// import styles from '@/styles/MainLayout.module.css';
import csses from '@/styles/MainLayout.module.css';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Orders | Panzabi.com</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Box className="layoutContainer">
          <Box className="layoutHeader">
            <Nav />
          </Box>
          <Box className="layoutMenu">MENU</Box>
          <Box className="layoutContent">{children}</Box>
          <Box className="layoutFooter">FOOTER</Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
