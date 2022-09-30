//Mettre le code JavaScript lié à la page photographer.html

// Récupération de l'ID dans l'url
let urlcourante = document.location.href;
let url = new URL(urlcourante);
let id = url.searchParams.get("id");

//console.log(id);

let donnees = JSON.parse(localStorage.getItem("photographersMedia"));
//console.log(donnees.photographers);

const photographers = donnees.photographers;
console.log(photographers);

function donneesPhotographe() {
  for (let i = 0; i < photographers.length; i++) {
    // Affichage des informations concernant le photographe
    if (photographers[i].id == id) {
      //console.log("ça marche");
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
      //console.log(donneesDuPhotographe);
    }
  }
  let donneesphoto = JSON.parse(localStorage.getItem("photographe"));
  const photographe = [donneesphoto];
  //console.log(photographe);
  return ({
    photographe: [...photographe]})
}

import {photographerFactory} from '../factories/photographer.js';

async function displayData(photographe) {
  const photographersSection = document.querySelector(".photograph-header");

  photographe.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    //const userCardDOM = photographerModel.getUserCardDOM();
    //photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographe } = donneesPhotographe();
  console.log({ photographe });
  displayData(photographe);

}

init()

import {mediaFactory} from '../factories/media.js';
mediaFactory();