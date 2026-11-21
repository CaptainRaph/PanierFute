// preparation-image.js - réduit la taille d'une photo de ticket et la passe
// en niveaux de gris avant la lecture OCR, pour aller plus vite sur téléphone.

const LARGEUR_MAX = 1600;

export function preparerImage(fichier) {
  return new Promise((resoudre, rejeter) => {
    const url = URL.createObjectURL(fichier);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      const echelle = Math.min(1, LARGEUR_MAX / image.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * echelle);
      canvas.height = Math.round(image.height * echelle);

      const contexte = canvas.getContext('2d');
      contexte.filter = 'grayscale(100%) contrast(130%)';
      contexte.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          resoudre(blob);
        } else {
          rejeter(new Error("Impossible de préparer l'image."));
        }
      }, 'image/png');
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      rejeter(new Error("Impossible de lire ce fichier d'image."));
    };

    image.src = url;
  });
}
