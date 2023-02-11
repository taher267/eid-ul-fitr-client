import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import axios from '@/axios';

export default function OrderActions({ row }) {
  const delHandler = () => {
    if (!confirm(`Would you like to delete this`)) return;
    axios
      .delete(`orders/${row._id}`)
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
  };
  return (
    <Box>
      <Typography>
        <Link href={`/orders/${row._id}`} target="_blank">
          {/* <a rel="noopener noreferrer" >
        View
      </a> */}
          View
        </Link>
        <Button onClick={delHandler} sx={{ color: 'red' }}>
          Del
        </Button>
      </Typography>
    </Box>
  );
}
