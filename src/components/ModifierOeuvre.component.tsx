import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  CircularProgress,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material';
import { Save, Cancel, CheckCircle, Delete } from '@mui/icons-material';
import { LoginContext } from '../Contexts/LoginContext';
import type { IOeuvre } from '../models/iOeuvre.model';
import Iridescence from './Emprunt/Iridescence';
import { FavorisContext } from '../Contexts/favorisContext';

export default function ModifierOeuvre() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { isLoggedIn, token } = useContext(LoginContext);
  const { oeuvreFavoris, setFavorisOeuvre } = useContext(FavorisContext);

  const stateOeuvre = (location.state as { oeuvre?: IOeuvre } | undefined)
    ?.oeuvre;

  const [loading, setLoading] = useState<boolean>(!stateOeuvre && !!params.id);
  const [saving, setSaving] = useState(false);
  const [oeuvre, setOeuvre] = useState<IOeuvre | null>(stateOeuvre ?? null);

  const [titre, setTitre] = useState('');
  const [artistePrenom, setArtistePrenom] = useState('');
  const [artisteNom, setArtisteNom] = useState('');
  const [artisteSurnom, setArtisteSurnom] = useState('');
  const [prix, setPrix] = useState<number | ''>('');
  const [dateCreation, setDateCreation] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [enVedette, setEnVedette] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // Pour empecher de refresh à chaque input
  // Montrer par Felix Dupras-Simard
  const iridescenceBackground = useMemo(() => <Iridescence />, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/connexion');
      return;
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    let mounted = true;
    async function fetchOeuvre(id: string) {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/${id}`,
        );
        if (!mounted) return;
        const data = res.data?.oeuvre ?? res.data;
        setOeuvre(data);
      } catch (err) {
        console.error('Erreur récupération oeuvre', err);
        setError("Erreur lors de la récupération de l'œuvre.");
        setOpenError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (!oeuvre && params.id) {
      fetchOeuvre(params.id);
    } else {
      setLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [params.id]);

  useEffect(() => {
    if (!oeuvre) return;
    setTitre(oeuvre.titre ?? '');
    setArtistePrenom(oeuvre.artiste?.prenom ?? '');
    setArtisteNom(oeuvre.artiste?.nom ?? '');
    setArtisteSurnom(oeuvre.artiste?.surnom ?? '');
    setPrix(typeof oeuvre.prix === 'number' ? oeuvre.prix : '');
    try {
      const d = new Date(oeuvre.dateCreation);
      if (!Number.isNaN(d.getTime())) {
        setDateCreation(d.toISOString().slice(0, 10));
      } else {
        setDateCreation('');
      }
    } catch {
      setDateCreation('');
    }
    setTags((oeuvre.tags ?? []).join(', '));
    setEnVedette(Boolean(oeuvre.enVedette));
    setImageUrl(oeuvre.imageUrl ?? '');
  }, [oeuvre]);

  const validate = () => {
    if (!titre.trim()) {
      setError('Le titre est requis.');
      return false;
    }
    if (!artisteNom.trim() || !artistePrenom.trim()) {
      setError("Le prénom et le nom de l'artiste sont requis.");
      return false;
    }
    if (!imageUrl.trim()) {
      setError("L'URL de l'image est requise.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setOpenError(true);
      return;
    }
    if (!oeuvre?._id && !params.id) {
      setError("Identifiant de l'œuvre introuvable.");
      setOpenError(true);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        oeuvre: {
          id: oeuvre?._id ?? params.id,
          titre: titre.trim(),
          artiste: {
            nom: artisteNom.trim(),
            prenom: artistePrenom.trim(),
            surnom: artisteSurnom.trim() || undefined,
          },
          prix: Number(prix) || 0,
          dateCreation: dateCreation
            ? new Date(dateCreation).toISOString()
            : undefined,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          enVedette,
          imageUrl: imageUrl.trim(),
        },
      };

      await axios.put(
        `https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/${oeuvre?._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setOpenSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Erreur lors de la modification:', err);
      setError('Erreur lors de la sauvegarde. Voir console pour détails.');
      setOpenError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!oeuvre?._id && !params.id) return;
    if (!window.confirm('Voulez-vous vraiment supprimer cette œuvre ?')) return;

    try {
      setSaving(true);
      await axios.delete(
        `https://oeuvresapi-e8eta4csg9c2hpac.canadacentral-01.azurewebsites.net/api/oeuvres/${
          oeuvre?._id ?? params.id
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Suprimer de la liste de favoris
      setFavorisOeuvre(oeuvreFavoris.filter((o) => o._id !== oeuvre?._id));

      setOpenSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError("Erreur lors de la suppression de l'œuvre.");
      setOpenError(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#fafafa',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#667eea' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 14,
        px: 2,
      }}
    >
      <Box sx={{ position: 'relative', width: 1000, maxWidth: '95%' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: -6,
            borderRadius: 4,
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          {iridescenceBackground}
        </Box>

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
                Modifier l'œuvre
              </Typography>
              <Typography variant="h6" sx={{ color: 'black', fontWeight: 300 }}>
                Mettez à jour les informations
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {/* Champ titre */}
              <TextField
                label="Titre de l'œuvre"
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

              {/* Champs artiste */}
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
                  onChange={(e) =>
                    setPrix(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 33, 33, 0.1)',
                    },
                  }}
                />
                <TextField
                  label="Date de création"
                  type="date"
                  value={dateCreation}
                  onChange={(e) => setDateCreation(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(33, 33, 33, 0.1)',
                    },
                  }}
                />
              </Box>

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

              <FormControlLabel
                control={
                  <Switch
                    checked={enVedette}
                    onChange={(e) => setEnVedette(e.target.checked)}
                  />
                }
                label="Mettre en vedette"
              />

              {/* Boutons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                {/* Supprimer petit à gauche */}
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleDelete}
                  disabled={saving}
                  startIcon={<Delete />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    flex: '0 0 auto',
                  }}
                >
                  Supprimer
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(-1)}
                  disabled={saving}
                  startIcon={<Cancel />}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderColor: '#667eea',
                    color: '#667eea',
                    '&:hover': {
                      borderColor: '#5568d3',
                      backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    },
                  }}
                >
                  Annuler
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={saving}
                  startIcon={
                    saving ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Save />
                    )
                  }
                  sx={{
                    flex: 1,
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
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Snackbars */}
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
          Œuvre modifiée/supprimée avec succès !
        </Alert>
      </Snackbar>

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
          {error || "Erreur lors de l'action. Veuillez réessayer."}
        </Alert>
      </Snackbar>
    </Box>
  );
}
