import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Typography,
  Button,
  Card,
  CardContent,
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
import { FavorisContext } from '../Contexts/favorisContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Person } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Iridescence from './Emprunt/Iridescence';

export default function FavorisListe() {
  const navigate = useNavigate();
  const { oeuvreFavoris, setFavorisOeuvre } = useContext(FavorisContext);

  const retirerDepuisListe = (id: string) => {
    const nouvelleListe = oeuvreFavoris.filter((o) => o._id !== id);
    setFavorisOeuvre(nouvelleListe);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 18,
        px: 2,
      }}
    >
      {/* Conteneur centré */}
      <Box sx={{ position: 'relative', width: 1000, maxWidth: '95%' }}>
        {/* Iridescence autour */}
        <Box
          sx={{
            position: 'absolute',
            inset: -6,
            borderRadius: 4,
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          <Iridescence />
        </Box>

        {/* Carte principale */}
        <Card
          sx={{
            position: 'relative',
            zIndex: 1,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <FavoriteIcon
                sx={{
                  fontSize: '4rem',
                  color: '#ff4081',
                  mb: 2,
                  textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: 'black',
                  mb: 1,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                <FormattedMessage
                  id="favoris.titre"
                  defaultMessage="Votre selection"
                />
              </Typography>
              <Typography variant="h6" sx={{ color: 'black', fontWeight: 300 }}>
                <FormattedMessage
                  id="favoris.soustitre"
                  defaultMessage="{count} oeuvres dans votre collection"
                  values={{ count: oeuvreFavoris.length }}
                />
              </Typography>
            </Box>

            {oeuvreFavoris.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                  variant="h5"
                  sx={{ mb: 3, color: 'black', fontWeight: 600 }}
                >
                  <FormattedMessage
                    id="favoris.vide"
                    defaultMessage="Votre liste est vide"
                  />
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ArrowBack />}
                  sx={{
                    bgcolor: '#667eea',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      bgcolor: '#5568d3',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => navigate('/')}
                >
                  <FormattedMessage
                    id="favoris.bouton.galerie"
                    defaultMessage="Aller dans la gallerie"
                  />
                </Button>
              </Box>
            ) : (
              <>
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
                          py: 2,
                          px: 2,
                          transition: 'all 0.3s ease',
                          borderRadius: 2,
                          color: 'black',
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          },
                          backgroundColor: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(10px)',
                        }}
                        secondaryAction={
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* Modifier */}
                            <IconButton
                              aria-label="modifier"
                              onClick={() =>
                                navigate(`/modifier-oeuvre/${fav._id}`, {
                                  state: { oeuvre: fav },
                                })
                              }
                              sx={{
                                color: '#667eea',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                  color: '#5568d3',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <EditIcon />
                            </IconButton>

                            {/* Retirer des favoris */}
                            <IconButton
                              aria-label="retirer"
                              onClick={() => retirerDepuisListe(fav._id)}
                              sx={{
                                color: '#ff4081',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
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
                              borderRadius: 2,
                              border: '2px solid rgba(102, 126, 234, 0.2)',
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: 'black' }}
                            >
                              {fav.titre}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  mb: 1,
                                }}
                              >
                                <Person
                                  sx={{ fontSize: '1.1rem', color: 'black' }}
                                />
                                <Typography
                                  sx={{ color: 'black', fontWeight: 500 }}
                                >
                                  {fav.artiste.prenom} {fav.artiste.nom}
                                </Typography>
                              </Box>
                              <Chip
                                label={`${fav.prix.toLocaleString()} $`}
                                size="small"
                                sx={{
                                  backgroundColor: '#333333',
                                  color: 'white',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/')}
                    sx={{
                      bgcolor: '#667eea',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        bgcolor: '#5568d3',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <FormattedMessage
                      id="favoris.bouton.retour"
                      defaultMessage="Retourner dans la gallerie"
                    />
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
