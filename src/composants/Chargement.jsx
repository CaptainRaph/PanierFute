// Chargement.jsx - indicateur affiché pendant le chargement des
// données.
function Chargement() {
  // role="status" : les lecteurs d'écran annoncent le texte sans interrompre.
  return (
    <p className="texte-discret" role="status">
      Chargement…
    </p>
  );
}

export default Chargement;
