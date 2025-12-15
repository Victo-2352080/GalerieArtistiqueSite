import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        backgroundColor: '#1a202c',
        color: '#fff',
      }}
    >
      <Typography variant="body2">Nathan Grondin</Typography>
    </Box>
  );
}
