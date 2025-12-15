import { useEffect, useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import axios from 'axios';
import OeuvreCarte from './OeuvreCarte.component';
import type { IOeuvre } from '../models/iOeuvre.model';
import { FavorisContext } from '../Contexts/favorisContext';
import {
  Container,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';

// affiche oeuvre
export default function Galerie() {
  const intl = useIntl();
  const [oeuvres, setOeuvres] = useState<IOeuvre[]>([]);
  const [loading, setLoading] = useState(true);
  const [tagSelect, setTagSelect] = useState<string>('');

  const { oeuvreFavoris } = useContext(FavorisContext); // Récupère les favoris

  const tags = ['Abstrait', 'Art', 'Populaire', 'Extra', 'Educatif', 'Meme'];

  // Récupère les oeuvres
  useEffect(() => {
    const fetchOeuvres = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/',
        );

        // verif que la liste contient un tableau d'oeuvre
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

  // Vérifie si une oeuvre est dans les favoris
  const estDansLesFavoris = (idVerify: string | undefined) => {
    if (!idVerify) return false;
    return oeuvreFavoris.some((fav) => fav._id === idVerify);
  };

  // Filtre les oeuvres selon le tag sélectionné
  const oeuvresFiltrees = tagSelect
    ? oeuvres.filter((o) => (o.tags ?? []).includes(tagSelect))
    : oeuvres; // Si aucun tag n'est sélectionné, affiche tout

  // Affiche un spinner pendant le chargement
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
          py: 4,
          position: 'relative',
          backgroundColor: '#fafafa',
          zIndex: 1,
        }}
      >
        {/* Menu déroulant */}
        <Box sx={{ mb: 4, width: 250 }}>
          <FormControl fullWidth>
            <InputLabel>
              <FormattedMessage
                id="galerie.filtrer"
                defaultMessage="Filtrer par tag"
              />
            </InputLabel>
            <Select
              value={tagSelect}
              label={intl.formatMessage({
                id: 'galerie.filtrer',
                defaultMessage: 'Filtrer par tag',
              })}
              onChange={(e) => setTagSelect(e.target.value)}
            >
              <MenuItem value="">
                <FormattedMessage
                  id="galerie.filtrer.tous"
                  defaultMessage="Tous"
                />
              </MenuItem>
              {/* Une option pour chaque tag */}
              {tags.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Grille Masonry pour afficher les oeuvres */}
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={3}
          sx={{ backgroundColor: 'transparent' }}
        >
          {oeuvresFiltrees.map((item) => (
            <OeuvreCarte
              key={item._id}
              oeuvre={item}
              dansfavoris={estDansLesFavoris(item._id)} // Indique si c'est un favori
            />
          ))}
        </Masonry>
      </Container>
    </div>
  );
}
