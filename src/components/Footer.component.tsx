import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import { Favorite, Palette } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Description */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
            }}
          >
            <Palette sx={{ fontSize: '2rem', color: '#667eea' }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              Galerie Art
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            Découvrez et partagez des œuvres d'art extraordinaires du monde
            entier
          </Typography>
        </Box>

        {/* Social Media Icons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <IconButton
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#667eea',
                transform: 'translateY(-3px)',
              },
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#667eea',
                transform: 'translateY(-3px)',
              },
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#667eea',
                transform: 'translateY(-3px)',
              },
            }}
          >
            <TwitterIcon />
          </IconButton>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
            }}
          >
            © {currentYear} Galerie Art. Tous droits réservés.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              Fait avec
            </Typography>
            <Favorite sx={{ fontSize: '1rem', color: '#ff4081' }} />
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              pour l'art
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
