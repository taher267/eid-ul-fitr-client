import Box from '@mui/material/Box';

export default () => {
  return (
    <header
      style={{
        display: 'flex',
        position: 'fixed2',
        width: '100%',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', minHeight: '48px' }}>
        <Box>One</Box>
        <Box>One</Box>
        <Box>One</Box>
      </Box>
    </header>
  );
};
