{
  /* Code revu par ClaudeAI pour réparer les erreurs de Build*/
}

import { useContext, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { Add, CheckCircle } from '@mui/icons-material';
import { LoginContext } from '../Contexts/LoginContext';
import Iridescence from './Emprunt/Iridescence';

// Composant pour ajouter une nouvelle oeuvre
export default function AjouterOeuvre() {
  // États pour chaque champ du formulaire
  const [titre, setTitre] = useState('');
  const [artisteNom, setArtisteNom] = useState('');
  const [artistePrenom, setArtistePrenom] = useState('');
  const [artisteSurnom, setArtisteSurnom] = useState('');
  const [prix, setPrix] = useState(0);
  const [dateCreation, setDateCreation] = useState('');
  const [tags, setTags] = useState('');
  const [enVedette, setEnVedette] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // États pour les notifications
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Récupère le token d'authentification
  const { token } = useContext(LoginContext);

  // Pour empecher de refresh à chaque input
  // Montrer par Felix Dupras-Simard
  const iridescenceBackground = useMemo(() => <Iridescence />, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Active le chargement

    // Prépare les données à envoyer à l'API
    const payload = {
      oeuvre: {
        titre,
        artiste: {
          nom: artisteNom,
          prenom: artistePrenom,
          surnom: artisteSurnom || undefined, // Optionnel
        },
        prix: Number(prix),
        dateCreation,
        tags: tags // Sépare le texte avec les virgules pour faire un tableau
          ? tags
              .split(',')
              .map((t) => t.trim()) // trim les espaces vides
              .filter(Boolean) // filtre pour enlever les vides
          : [],
        enVedette,
        imageUrl,
      },
    };

    try {
      await fetch(
        'https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload), // Convertit JSON
        },
      );

      // Si succès, affiche la notification et réinitialise le formulaire
      setOpenSuccess(true);
      setTitre('');
      setArtisteNom('');
      setArtistePrenom('');
      setArtisteSurnom('');
      setPrix(0);
      setDateCreation('');
      setTags('');
      setEnVedette(false);
      setImageUrl('');
    } catch (err) {
      // Si erreur, affiche la notification d'erreur
      console.error(err);
      setOpenError(true);
    } finally {
      // toujours, désactive le chargement
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 16,
        px: 2,
      }}
    >
      <Box sx={{ position: 'relative', width: 1000, maxWidth: '95%' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: -10,
            borderRadius: 4,
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          {iridescenceBackground}
        </Box>

        {/* Carte principale */}
        <Card
          sx={{
            position: 'relative',
            zIndex: 1,
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <CardContent>
            {/* Titre de la page */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: 'black',
                  mb: 1,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                Ajouter une oeuvre
              </Typography>
              <Typography variant="h6" sx={{ color: 'black', fontWeight: 300 }}>
                Partagez votre création
              </Typography>
            </Box>

            {/* Formulaire */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {/* Champ titre */}
              <TextField
                label="Titre de l'oeuvre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '&:hover fieldset': { borderColor: '#667eea' },
                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                  },
                }}
              />

              {/* Champs prénom et nom de l'artiste */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  label="Prénom de l'artiste"
                  value={artistePrenom}
                  onChange={(e) => setArtistePrenom(e.target.value)}
                  required
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 33, 33, 0.1)',
                    },
                  }}
                />
                <TextField
                  label="Nom de l'artiste"
                  value={artisteNom}
                  onChange={(e) => setArtisteNom(e.target.value)}
                  required
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 33, 33, 0.1)',
                    },
                  }}
                />
              </Box>

              {/* Champ surnom (optionnel) */}
              <TextField
                label="Surnom (optionnel)"
                value={artisteSurnom}
                onChange={(e) => setArtisteSurnom(e.target.value)}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(33, 33, 33, 0.1)',
                  },
                }}
              />

              {/* prix et date sur la même ligne */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  label="Prix ($)"
                  type="number"
                  value={prix}
                  onChange={(e) => setPrix(Number(e.target.value))}
                  required
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 33, 33, 0.1)',
                    },
                  }}
                />
                <TextField
                  type="date"
                  value={dateCreation}
                  onChange={(e) => setDateCreation(e.target.value)}
                  required
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 33, 33, 0.1)',
                    },
                  }}
                />
              </Box>

              {/* tags avec plusieurs lignes */}
              <TextField
                label="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="abstrait, moderne, coloré"
                helperText="Séparez les tags par des virgules"
                multiline
                rows={2}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(33, 33, 33, 0.1)',
                  },
                }}
              />

              {/* URL de l'image */}
              <TextField
                label="URL de l'image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'rgba(33, 33, 33, 0.1)',
                  },
                }}
              />

              {/* Switch pour mettre en vedette ( pas utiliser finalement )*/}
              <FormControlLabel
                control={
                  <Switch
                    checked={enVedette}
                    onChange={(e) => setEnVedette(e.target.checked)}
                  />
                }
                label="Mettre en vedette"
              />

              {/* Bouton de soumission */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Add />
                  )
                }
                sx={{
                  mt: 2,
                  bgcolor: '#667eea',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    bgcolor: '#5568d3',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(102,126,234,0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Ajout en cours...' : "Ajouter l'oeuvre"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Notification de succès */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={4000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          icon={<CheckCircle />}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          oeuvre ajoutée avec succès
        </Alert>
      </Snackbar>

      {/* Notification d'erreur */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          Erreur lors de l'ajout.
        </Alert>
      </Snackbar>
    </Box>
  );
}
