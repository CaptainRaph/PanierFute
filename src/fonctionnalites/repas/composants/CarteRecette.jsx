// CarteRecette.jsx - carte d'une recette : ingrédients disponibles
// et manquants.
function CarteRecette({ recette }) {
  return (
    <article className="carte">
      <h2>{recette.nom}</h2>
      <p>
        <strong>Tu as :</strong> {recette.disponibles.join(', ')}
      </p>
      {recette.manquants.length === 0 ? (
        <p className="message-succes">Tu as tous les ingrédients !</p>
      ) : (
        <p className="texte-discret">
          <strong>Il manque :</strong> {recette.manquants.join(', ')}
        </p>
      )}
      <p>{recette.etapes}</p>
    </article>
  );
}

export default CarteRecette;
