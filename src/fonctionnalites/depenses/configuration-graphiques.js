// configuration-graphiques.js - enregistrement des modules Chart.js et
// palette de couleurs partagée par les graphiques.
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const COULEURS_CATEGORIES = [
  '#5c7314',
  '#8aa32d',
  '#b5c95b',
  '#3d4d0d',
  '#d9822b',
  '#4a7c59',
  '#6b8e78',
  '#c0392b',
  '#7b8474',
  '#2c5f7c',
  '#a68a64',
];
