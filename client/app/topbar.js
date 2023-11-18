import {UserButton} from '@clerk/nextjs';
import {Box} from '@mui/material';
export default function TopBar() {
  return (
    <Box>
      <UserButton afterSignOutUrl='/' />
    </Box>
  );
}
