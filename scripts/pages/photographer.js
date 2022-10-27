// Récupération de l'ID dans l'url
let urlcourante = document.location.href;
let url = new URL(urlcourante);
let id = url.searchParams.get("id");
// Récupération des données du photographe dans le localstorage
let donnees = JSON.parse(localStorage.getItem("photographersMedia"));

// Récupération des données des photographes
const photographers = donnees.photographers;

// Fonction de récupération des données du photographe sélectionné
export function donneesPhotographe() {
  for (let i = 0; i < photographers.length; i++) {
    // Injection dans le localStorage des informations concernant le photographe
    if (photographers[i].id == id) {
      let donneesDuPhotographe = {
        "name": photographers[i].name,
        "id": photographers[i].id,
        "city": photographers[i].city,
        "country": photographers[i].country,
        "tagline": photographers[i].tagline,
        "price": photographers[i].price,
        "portrait": photographers[i].portrait
      }
      localStorage.setItem("photographe", JSON.stringify(donneesDuPhotographe));
    }
  }
  // Création d'une variable pour récupérer les données du photographe
  let photographe = [JSON.parse(localStorage.getItem("photographe"))];
  // Retour du tableau photographe une fois
  return ({photographe: [...photographe]})
}

// Importation de la fonction "photographerFactory" depuis le fichier "factories/photographer.js" afin de créer le code html de l'en-tête et le menu de tri, le formulaire de contact ainsi que le bloc total likes et tarif journalier pour le photographe sélectionné
import {photographerFactory} from '../factories/photographer.js';

// Fonction d'affichage des données du photographe sélectionné
export async function displayData(photographe) {
  photographe.forEach((photographer) => {
    photographerFactory(photographer);
  });
}

// Fonction d'initialisation de la page index.html
export async function init() {
  // Récupère les données des photographes
  const { photographe } = donneesPhotographe();
  displayData(photographe);
}
// Appel de la fonction d'initialisation de la page index.html
init();

// Importation de la fonction "mediaFactory" depuis le fichier "factories/media.js" afin de créer le code html pour chaque media du photographe sélectionné
import {mediaFactory} from '../factories/media.js';
mediaFactory();