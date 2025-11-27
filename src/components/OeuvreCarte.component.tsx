import { useContext } from 'react';
import type { IOeuvre } from '../models/iOeuvre.model';
import { FavorisContext } from '../Contexts/favoris.context';
import { Card, CardMedia, IconButton, Box, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ICarteProps {
  oeuvre: IOeuvre;
  dansfavoris: boolean;
}

export default function OeuvreCarte(props: ICarteProps) {
  const { oeuvreFavoris, setFavorisOeuvre } = useContext(FavorisContext);

  const toggleFavoris = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (props.dansfavoris) {
      const nouvelleListe = oeuvreFavoris.filter(
        (item) => item._id !== props.oeuvre._id,
      );
      setFavorisOeuvre(nouvelleListe);
    } else {
      setFavorisOeuvre([...oeuvreFavoris, props.oeuvre]);
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.3s ease',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      {/* Bouton cœur */}
      <IconButton
        onClick={toggleFavoris}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: props.dansfavoris ? '#ff4081' : 'white',
        }}
      >
        {props.dansfavoris ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      {/* Image */}
      <CardMedia
        component="img"
        image={props.oeuvre.imageUrl}
        alt={props.oeuvre.titre}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          backgroundColor: 'transparent',
        }}
      />

      {/* Overlay tags en bas */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
        }}
      >
        {props.oeuvre.tags?.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
            }}
          />
        ))}
      </Box>
    </Card>
  );
}
