import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import OeuvreCarte from './OeuvreCarte.component';
import type { IOeuvre } from '../models/iOeuvre.model';
import { FavorisContext } from '../Contexts/favorisContext';
import { Container, CircularProgress, Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

export default function Galerie() {
  const [oeuvres, setOeuvres] = useState<IOeuvre[]>([]);
  const [loading, setLoading] = useState(true);
  const { oeuvreFavoris } = useContext(FavorisContext);

  useEffect(() => {
    const fetchOeuvres = async () => {
      try {
        const response = await axios.get(
          'https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/',
        );
        if (response.data.oeuvres && Array.isArray(response.data.oeuvres)) {
          setOeuvres(response.data.oeuvres);
        } else {
          setOeuvres([]);
        }
      } catch (err) {
        console.error(err);
        setOeuvres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOeuvres();
  }, []);

  const estDansLesFavoris = (idVerify: string | undefined) => {
    if (!idVerify) return false;
    return oeuvreFavoris.some((fav) => fav._id === idVerify);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <Container
        maxWidth="xl"
        sx={{
          py: 6,
          position: 'relative',
          backgroundColor: '#fafafa',
          zIndex: 1,
        }}
      >
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={3}
          sx={{ backgroundColor: 'transparent' }}
        >
          {oeuvres.map((item) => (
            <OeuvreCarte
              key={item._id}
              oeuvre={item}
              dansfavoris={estDansLesFavoris(item._id)}
            />
          ))}
        </Masonry>
      </Container>
    </div>
  );
}
