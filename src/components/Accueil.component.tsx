import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
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
      {/* Box pour le titre avec iridescence */}
      <Box
        sx={{
          width: '60vw',
          height: '35vh',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Code emprunter de https://reactbits.dev/ */}
        <Iridescence
          color={[0.8, 0.8, 0.8]}
          mouseReact={false}
          amplitude={0.7}
          speed={0.3}
        />

        {/* Floue */}
        <Box
          sx={{
            position: 'absolute',
            inset: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(10px)',
          }}
        />

        {/* Texte */}
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
          <FormattedMessage id="accueil.bienvenue" defaultMessage="BIENVENUE" />
        </Typography>
      </Box>
    </Box>
  );
}
