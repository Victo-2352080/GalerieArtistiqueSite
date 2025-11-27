import { useContext } from 'react';
import { Box } from '@mui/material';

import Galerie from '../components/Galerie.component';
import Navbar from '../components/NavBar.component';
import FavorisListe from '../components/FavorisListe.component';

import { FavorisContext } from '../Contexts/favoris.context';
import Accueil from '../components/Accueil.component';
import Footer from '../components/Footer.component';

function App() {
  const { favorisOuvert } = useContext(FavorisContext);

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        bgcolor: '#fafafa',
        width: '100%',
      }}
    >
      <Navbar />
      <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
        {favorisOuvert ? (
          <>
            <FavorisListe />
          </>
        ) : (
          <>
            <Accueil />
            <Galerie />
          </>
        )}
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
