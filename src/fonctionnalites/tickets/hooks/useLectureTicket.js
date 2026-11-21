// useLectureTicket.js - gère la lecture OCR d'une photo puis l'analyse du
// texte obtenu en ticket structuré.
import { useState } from 'react';

import { analyserTexteTicket } from '../../../domaine/analyse-ticket.js';
import { lireTexteTicket } from '../ocr/lecteur-ocr.js';

export function useLectureTicket() {
  const [enCours, setEnCours] = useState(false);
  const [progression, setProgression] = useState(0);
  const [erreur, setErreur] = useState('');

  async function lirePhoto(fichier) {
    setEnCours(true);
    setProgression(0);
    setErreur('');
    try {
      const texte = await lireTexteTicket(fichier, setProgression);
      return analyserTexteTicket(texte);
    } catch {
      setErreur('La lecture de la photo a échoué. Tu peux saisir le ticket à la main.');
      return null;
    } finally {
      setEnCours(false);
    }
  }

  return { lirePhoto, enCours, progression, erreur };
}
