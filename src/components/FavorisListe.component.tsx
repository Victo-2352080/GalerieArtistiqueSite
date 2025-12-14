import { useContext } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Box,
  Fade,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FavorisContext } from '../Contexts/favorisContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';

export default function FavorisListe() {
  const navigate = useNavigate();
  const { oeuvreFavoris, setFavorisOeuvre } = useContext(FavorisContext);

  const retirerDepuisListe = (id: string) => {
    const nouvelleListe = oeuvreFavoris.filter((o) => o._id !== id);
    setFavorisOeuvre(nouvelleListe);
  };

  const totalPrix = oeuvreFavoris.reduce((sum, oeuvre) => sum + oeuvre.prix, 0);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 12,
        px: 2,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
        }}
      >
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <FavoriteIcon sx={{ color: '#ff4081', fontSize: '3rem' }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: 'white',
                  textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                Vos Coups de Cœur
              </Typography>
              <FavoriteIcon sx={{ color: '#ff4081', fontSize: '3rem' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 300,
              }}
            >
              {oeuvreFavoris.length} œuvre{oeuvreFavoris.length > 1 ? 's' : ''}{' '}
              dans votre collection
            </Typography>
          </Box>
        </Fade>

        {oeuvreFavoris.length === 0 ? (
          <Fade in timeout={800}>
            <Paper
              elevation={8}
              sx={{
                p: 6,
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <FavoriteIcon
                sx={{ fontSize: '5rem', color: '#e0e0e0', mb: 2 }}
              />
              <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                Votre liste est vide
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Commencez à ajouter vos œuvres préférées pour créer votre
                collection personnelle
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowBack />}
                sx={{
                  bgcolor: '#667eea',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#5568d3',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate('/')}
              >
                Découvrir les œuvres
              </Button>
            </Paper>
          </Fade>
        ) : (
          <>
            <Fade in timeout={800}>
              <Paper
                elevation={8}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <List sx={{ width: '100%', p: 0 }}>
                  {oeuvreFavoris.map((fav, index) => (
                    <Fade
                      in
                      timeout={600}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      key={fav._id}
                    >
                      <ListItem
                        alignItems="center"
                        divider={index < oeuvreFavoris.length - 1}
                        sx={{
                          py: 3,
                          px: 3,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.05)',
                          },
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => retirerDepuisListe(fav._id)}
                            sx={{
                              color: '#ff4081',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 64, 129, 0.1)',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={fav.imageUrl}
                            alt={fav.titre}
                            sx={{
                              width: 100,
                              height: 100,
                              mr: 3,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              borderRadius: 2,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {fav.titre}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography
                                component="span"
                                variant="body1"
                                color="text.primary"
                                sx={{ display: 'block', mb: 1 }}
                              >
                                {fav.artiste.prenom} {fav.artiste.nom}
                              </Typography>
                              <Chip
                                icon={<ShoppingCart />}
                                label={`${fav.prix.toLocaleString()} €`}
                                size="small"
                                sx={{
                                  backgroundColor: '#667eea',
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>

                {/* Total Section */}
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderTop: '2px solid rgba(102, 126, 234, 0.2)',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Valeur totale
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: '#667eea' }}
                    >
                      {totalPrix.toLocaleString()} €
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Fade>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowBack />}
                onClick={() => navigate('/')}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  color: '#667eea',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(255, 255, 255, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Continuer à explorer
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
