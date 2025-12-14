import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Container,
  Paper,
  Fade,
  Alert,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import { Add, CheckCircle } from '@mui/icons-material';

export default function AjouterOeuvre() {
  const [titre, setTitre] = useState('');
  const [artisteNom, setArtisteNom] = useState('');
  const [artistePrenom, setArtistePrenom] = useState('');
  const [artisteSurnom, setArtisteSurnom] = useState('');
  const [prix, setPrix] = useState(0);
  const [dateCreation, setDateCreation] = useState('');
  const [tags, setTags] = useState('');
  const [enVedette, setEnVedette] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      oeuvre: {
        titre,
        artiste: {
          nom: artisteNom,
          prenom: artistePrenom,
          surnom: artisteSurnom || undefined,
        },
        prix: Number(prix),
        dateCreation,
        tags: tags
          ? tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        enVedette,
        imageUrl,
      },
    };

    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setOpenSuccess(true);
      // Reset form
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
      console.error(err);
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        py: 12,
        px: 2,
      }}
    >
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Add sx={{ fontSize: '3rem', color: '#667eea', mb: 2 }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#2d3748',
                mb: 2,
              }}
            >
              Ajouter une Œuvre
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#718096',
                fontWeight: 300,
              }}
            >
              Partagez une nouvelle création avec notre galerie
            </Typography>
          </Box>
        </Fade>

        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: 4,
              backgroundColor: 'white',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {/* Title */}
              <TextField
                label="Titre de l'œuvre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />

              {/* Artist Info */}
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2, color: '#2d3748' }}
                >
                  Informations sur l'artiste
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <TextField
                      label="Prénom"
                      value={artistePrenom}
                      onChange={(e) => setArtistePrenom(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      label="Nom"
                      value={artisteNom}
                      onChange={(e) => setArtisteNom(e.target.value)}
                      required
                      fullWidth
                    />
                  </Box>
                  <TextField
                    label="Surnom (optionnel)"
                    value={artisteSurnom}
                    onChange={(e) => setArtisteSurnom(e.target.value)}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Price and Date */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  label="Prix (€)"
                  type="number"
                  value={prix}
                  onChange={(e) => setPrix(Number(e.target.value))}
                  required
                  fullWidth
                />
                <TextField
                  label="Date de création"
                  type="date"
                  value={dateCreation}
                  onChange={(e) => setDateCreation(e.target.value)}
                  required
                  fullWidth
                />
              </Box>

              {/* Tags */}
              <TextField
                label="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
                helperText="Séparez les tags par des virgules (ex: abstrait, moderne, coloré)"
                multiline
                rows={2}
              />

              {/* Image URL */}
              <TextField
                label="URL de l'image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                fullWidth
                helperText="Entrez l'URL complète de l'image de l'œuvre"
              />

              {/* Featured Switch */}
              <FormControlLabel
                control={
                  <Switch
                    checked={enVedette}
                    onChange={(e) => setEnVedette(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#667eea',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                        {
                          backgroundColor: '#667eea',
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Mettre en vedette
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Cette œuvre sera mise en avant dans la galerie
                    </Typography>
                  </Box>
                }
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<Add />}
                sx={{
                  mt: 2,
                  bgcolor: '#667eea',
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#5568d3',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Ajout en cours...' : "Ajouter l'œuvre"}
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* Success Snackbar */}
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
            sx={{ width: '100%' }}
          >
            Œuvre ajoutée avec succès à la galerie !
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={openError}
          autoHideDuration={4000}
          onClose={() => setOpenError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenError(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            Erreur lors de l'ajout de l'œuvre. Veuillez réessayer.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
