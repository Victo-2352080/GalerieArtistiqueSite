import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Palette } from '@mui/icons-material';
import { FavorisContext } from '../Contexts/favorisContext';
import { LoginContext } from '../Contexts/LoginContext';

export default function Navbar() {
  const { oeuvreFavoris } = useContext(FavorisContext);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: '20px',
        left: 0,
        right: 0,
        margin: '0 auto',
        maxWidth: { xs: '95%', sm: '900px' },
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: 4,
        padding: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: { xs: '56px', sm: '64px' },
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Logo/Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.9)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'white',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          }}
          onClick={() => navigate('/')}
        >
          <Palette sx={{ color: '#667eea', fontSize: '1.8rem' }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: '#2d3748',
              letterSpacing: '-0.5px',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Galerie Art
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Favorites Button */}
          <IconButton
            onClick={() => navigate('/favoris')}
            sx={{
              color: '#ff4081',
              bgcolor: 'rgba(255,255,255,0.9)',
              borderRadius: 3,
              padding: { xs: '10px', sm: '12px' },
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(255, 64, 129, 0.3)',
              },
            }}
          >
            <Badge
              badgeContent={oeuvreFavoris.length}
              color="secondary"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  fontWeight: 700,
                  fontSize: '0.7rem',
                },
              }}
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>

          {/* Add Button */}
          <IconButton
            onClick={() => {
              if (isLoggedIn) {
                navigate('/ajouter');
              } else {
                navigate('/login');
              }
            }}
            sx={{
              color: '#667eea',
              bgcolor: 'rgba(255,255,255,0.9)',
              borderRadius: 3,
              padding: { xs: '10px', sm: '12px' },
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              },
            }}
            title={
              isLoggedIn ? 'Ajouter une œuvre' : 'Connectez-vous pour ajouter'
            }
          >
            <AddIcon />
          </IconButton>

          {/* Login Button */}
          <Button
            component={Link}
            to="/login"
            startIcon={
              isLoggedIn ? (
                <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />
              ) : (
                <LoginIcon sx={{ fontSize: '1.2rem' }} />
              )
            }
            sx={{
              bgcolor: isLoggedIn
                ? 'rgba(76, 175, 80, 0.9)'
                : 'rgba(255,255,255,0.9)',
              color: isLoggedIn ? 'white' : '#2d3748',
              borderRadius: 3,
              px: { xs: 2, sm: 3 },
              py: 1,
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: isLoggedIn ? 'rgba(76, 175, 80, 1)' : 'white',
                transform: 'translateY(-2px)',
                boxShadow: isLoggedIn
                  ? '0 4px 12px rgba(76, 175, 80, 0.4)'
                  : '0 4px 12px rgba(0,0,0,0.15)',
              },
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {isLoggedIn ? 'Connecté' : 'Se connecter'}
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
