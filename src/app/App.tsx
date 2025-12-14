import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';

import Navbar from '../components/NavBar.component';
import Accueil from '../components/Accueil.component';
import Galerie from '../components/Galerie.component';
import FavorisListe from '../components/FavorisListe.component';
import AjouterOeuvre from '../components/AjouterOeuvre.component';
import Login from '../components/Login.component';
import Footer from '../components/Footer.component';

function Modele() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Modele />}>
          {/* Accueil */}
          <Route
            index
            element={
              <>
                <Accueil />
                <Galerie />
              </>
            }
          />

          {/* Pages */}
          <Route path="favoris" element={<FavorisListe />} />
          <Route path="ajouter" element={<AjouterOeuvre />} />
          <Route path="connexion" element={<Login />} />

          {/* Sécurité */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
