// lecteur-ocr.js - lit le texte d'une photo de ticket dans le navigateur
// grâce à Tesseract.js. La photo ne quitte jamais l'appareil.
import { createWorker } from 'tesseract.js';

import { preparerImage } from './preparation-image.js';

// Appelle surProgression(pourcentage) pendant la lecture et renvoie le texte.
export async function lireTexteTicket(fichier, surProgression) {
  const imagePrete = await preparerImage(fichier);
  const worker = await createWorker('fra', 1, {
    logger: (info) => {
      if (info.status === 'recognizing text' && surProgression) {
        surProgression(Math.round(info.progress * 100));
      }
    },
  });

  try {
    const { data } = await worker.recognize(imagePrete);
    return data.text;
  } finally {
    await worker.terminate();
  }
}
