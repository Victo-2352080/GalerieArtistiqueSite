import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/NavBar.component';
import Footer from '../components/Footer.component';
import Accueil from '../components/Accueil.component';
import Galerie from '../components/Galerie.component';
import FavorisListe from '../components/FavorisListe.component';
import AjouterOeuvre from '../components/AjouterOeuvre.component';
import Login from '../components/Login.component';
import ProtectedRoute from '../components/ProtectionRoute';
import FavorisProvider from '../Contexts/favorisContext';
import LoginProvider from '../Contexts/LoginContext';
import ModifierOeuvre from '../components/ModifierOeuvre.component';

function App() {
  return (
    <LoginProvider>
      <FavorisProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />

            <Box sx={{ flex: 1 }}>
              <Routes>
                {/* Routes publiques */}
                <Route
                  path="/"
                  element={
                    <>
                      <Accueil />
                      <Galerie />
                    </>
                  }
                />
                <Route path="/favoris" element={<FavorisListe />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/ajouter"
                  element={
                    <ProtectedRoute>
                      <AjouterOeuvre />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/modifier-oeuvre/:id"
                  element={<ModifierOeuvre />}
                />

                <Route
                  path="*"
                  element={
                    <>
                      <Accueil />
                      <Galerie />
                    </>
                  }
                />
              </Routes>
            </Box>

            <Footer />
          </Box>
        </Router>
      </FavorisProvider>
    </LoginProvider>
  );
}

export default App;
