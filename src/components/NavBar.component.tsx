import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FavorisContext } from '../Contexts/favoris.context';

export default function Navbar() {
  const { oeuvreFavoris, favorisOuvert, setFavorisOuvert } =
    useContext(FavorisContext);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: '20px',
        left: 0,
        right: 0,
        margin: '0 auto',
        maxWidth: '900px',

        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(10px) saturate(200%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',

        borderRadius: 4,
        padding: '4px',
        overflow: 'hidden',

        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: '64px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            padding: '0 8px',
            borderRadius: 5,
            color: 'black',
            py: 1,
            px: 1,
            bgcolor: 'rgba(240,240,240,0.6)',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Galerie Art
        </Typography>

        {/* Icône favoris */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => setFavorisOuvert(!favorisOuvert)}
            sx={{
              color: '#ff4081',
              bgcolor: 'rgba(240,240,240,0.5)',
              borderRadius: 3,
              padding: 1.2,
              transition: '0.25s',
              '&:hover': {
                bgcolor: 'rgba(220,220,220,0.5)',
              },
            }}
          >
            {favorisOuvert ? (
              <ArrowBackIcon />
            ) : (
              <Badge
                badgeContent={oeuvreFavoris.length}
                color="info"
                overlap="circular"
              >
                <FavoriteIcon />
              </Badge>
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
