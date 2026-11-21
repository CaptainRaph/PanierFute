// Bouton.jsx - bouton commun. variante : « principal » (vert),
// « secondaire » (contour) ou « danger » (suppression).
import './Bouton.css';

function Bouton({ variante = 'principal', type = 'button', ...proprietes }) {
  return <button type={type} className={`bouton bouton--${variante}`} {...proprietes} />;
}

export default Bouton;
