import { Box } from '@mui/material';
import Iridescence from './Emprunt/Iridescence';

export default function Accueil() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        py: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '60vw',
          height: '35vh',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        }}
      >
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.7}
          speed={0.3}
        />
      </Box>
    </Box>
  );
}
