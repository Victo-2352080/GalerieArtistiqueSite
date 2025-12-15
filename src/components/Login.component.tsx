import { useContext, useEffect, useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { LoginContext } from '../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Iridescence from './Emprunt/Iridescence';

function Login() {
  const intl = useIntl();
  const [courriel, setCourriel] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(LoginContext);

  // Pour empecher de refresh à chaque input
  // Montrer par Felix Dupras-Simard
  const iridescenceBackground = useMemo(() => <Iridescence />, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    setIsLoading(true);

    try {
      const reussi = await login(courriel, motDePasse);
      if (!reussi) {
        setErreur(
          intl.formatMessage({
            id: 'login.erreur.identifiants',
            defaultMessage: 'Identifiants incorrects.',
          }),
        );
      }
    } catch {
      setErreur(
        intl.formatMessage({
          id: 'login.erreur.connexion',
          defaultMessage: 'Erreur lors de la connexion.',
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'relative', width: 1000, maxWidth: '95%' }}>
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            left: -12,
            right: -12,
            bottom: -12,
            borderRadius: 6,
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          {iridescenceBackground}
        </Box>
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',

            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#111',
            }}
          >
            <Typography variant="h3" fontWeight={800} mb={2}>
              <FormattedMessage id="login.titre" defaultMessage="Galerie Art" />
            </Typography>

            <Typography align="center" maxWidth={400}>
              <FormattedMessage
                id="login.soustitre"
                defaultMessage="Connectez-vous pour gérer les oeuvres de la galerie"
              />
            </Typography>
          </Box>

          {/* FORM */}
          <Box
            sx={{
              flex: 1,
              p: 6,
              backgroundColor: 'rgba(255, 255, 255, 1)',
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              mb={4}
              textAlign="center"
              color="black"
            >
              <FormattedMessage
                id="login.connexion"
                defaultMessage="Connexion"
              />
            </Typography>

            <form onSubmit={handleSubmit}>
              {erreur && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {erreur}
                </Alert>
              )}

              <TextField
                fullWidth
                label={intl.formatMessage({
                  id: 'login.courriel',
                  defaultMessage: 'Courriel',
                })}
                type="email"
                value={courriel}
                onChange={(e) => setCourriel(e.target.value)}
                required
                disabled={isLoading}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label={intl.formatMessage({
                  id: 'login.motdepasse',
                  defaultMessage: 'Mot de passe',
                })}
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                disabled={isLoading}
                sx={{ mb: 4 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={!isLoading && <LoginIcon />}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <FormattedMessage
                    id="login.bouton"
                    defaultMessage="Se connecter"
                  />
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
