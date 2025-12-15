import { Box, Typography } from '@mui/material';
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
        backgroundColor: '#fafafa',
      }}
    >
      <Box
        sx={{
          width: '60vw',
          height: '35vh',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Iridescence en fond */}
        <Iridescence
          color={[0.8, 0.8, 0.8]}
          mouseReact={false}
          amplitude={0.7}
          speed={0.3}
        />

        {/* Glass blanc semi-transparent */}
        <Box
          sx={{
            position: 'absolute',
            inset: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(10px)',
          }}
        />

        {/* Titre flottant au-dessus du glass */}
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#Fafafa',
            fontWeight: 900,
            fontSize: '8rem',
            textAlign: 'center',
          }}
        >
          BIENVENUE
        </Typography>
      </Box>
    </Box>
  );
}
