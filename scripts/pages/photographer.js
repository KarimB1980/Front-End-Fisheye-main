//Mettre le code JavaScript lié à la page photographer.html

// Récupération de l'ID dans l'url
let urlcourante = document.location.href;
let url = new URL(urlcourante);
let id = url.searchParams.get("id");

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
  let photographe = [JSON.parse(localStorage.getItem("photographe"))];
  return ({
    photographe: [...photographe]})
}

import {photographerFactory} from '../factories/photographer.js';

// Fonction d'affichage des photographes
export async function displayData(photographe) {
  photographe.forEach((photographer) => {
    photographerFactory(photographer);
  });
}

// Fonction d'initialisation
export async function init() {
  // Récupère les données des photographes
  const { photographe } = donneesPhotographe();
  displayData(photographe);
}

init()

import {mediaFactory} from '../factories/media.js';
mediaFactory();