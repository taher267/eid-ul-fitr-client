import Header from '@/components/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Nav from '../Nav';
import Head from 'next/head';
import csses from './layout.module.css';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="./layout.css" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box className={csses.layoutContainer}>
          <Box className={csses.layoutHeader}>HEADER</Box>
          <Box className={csses.layoutMenu}>MENU</Box>
          <Box className={csses.layoutContent}>{children}</Box>
          <Box className={csses.layoutFooter}>FOOTER</Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
