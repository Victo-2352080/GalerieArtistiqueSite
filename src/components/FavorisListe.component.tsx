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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FavorisContext } from '../Contexts/favoris.context';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavorisListe() {
  const { oeuvreFavoris, setFavorisOuvert, setFavorisOeuvre } =
    useContext(FavorisContext);

  const retirerDepuisListe = (id: string) => {
    const nouvelleListe = oeuvreFavoris.filter((o) => o._id !== id);
    setFavorisOeuvre(nouvelleListe);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          textAlign: 'center',
          maxWidth: 'sm',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            mt: 25,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'black',
          }}
        >
          <FavoriteIcon sx={{ color: '#ff4081' }} />
          Vos Coups de COEUR
          <FavoriteIcon sx={{ color: '#ff4081' }} />
        </Typography>

        {oeuvreFavoris.length === 0 ? (
          <Paper sx={{ p: 4 }}>
            <Typography color="text.secondary">Votre Liste est vide</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: '#212121' }}
              onClick={() => setFavorisOuvert(false)}
            >
              Découvrir les oeuvres
            </Button>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {oeuvreFavoris.map((fav) => (
                <ListItem
                  key={fav._id}
                  alignItems="center"
                  divider
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => retirerDepuisListe(fav._id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={fav.imageUrl}
                      alt={fav.titre}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h6">{fav.titre}</Typography>}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {fav.artiste.prenom} {fav.artiste.nom}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          fontWeight="bold"
                        >
                          {fav.prix} €
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {oeuvreFavoris.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => setFavorisOuvert(false)}
              sx={{ color: '#212121', borderColor: '#212121' }}
            >
              Retourner explorer l'art
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
