import { Box } from '@mui/material';
import Link from 'next/link';
const styles = {
  background: '#009dea',
  padding: '15px 20px',
  marginRight: '5px',
};
export default function Nav() {
  return (
    <nav>
      <Box sx={{ paddingTop: 1.5 }}>
        <Box sx={{ justifyContent: 'center' }}>
          <Link href="/" style={styles}>
            Home
          </Link>
          <Link href="/orders" style={styles}>
            Orders
          </Link>
          <Link href="/new-order" style={styles}>
            New Order
          </Link>
        </Box>
      </Box>
    </nav>
  );
}
