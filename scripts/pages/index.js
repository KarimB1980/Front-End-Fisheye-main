export function fetchPhotographersMedia() {
  fetch('../../data/photographers.json')
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function(datas) {
    console.log(datas);
    // Récupération des données dans datas et injection dans le localstorage sous le nom de clef "photographersMedia"
    const photographersMedia = datas;
    localStorage.setItem("photographersMedia", JSON.stringify(photographersMedia));
    console.log(photographersMedia);
    return datas;
  })
}

export async function getPhotographers() {
  fetchPhotographersMedia();
  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));
  //console.log(donnees.photographers);

  // Penser à remplacer par les données récupérées dans le json
  const photographers = donnees.photographers;
  console.log(photographers);

    /*{
      "name": "Ma data test",
      "id": 1,
      "city": "Paris",
      "country": "France",
      "tagline": "Ceci est ma data test",
      "price": 400,
      "portrait": "account.png"
    },
    {
      "name": "Autre data test",
      "id": 2,
      "city": "Londres",
      "country": "UK",
      "tagline": "Ceci est ma data test 2",
      "price": 500,
      "portrait": "account.png"
    },*/
  //console.log(photographers);
  // et bien retourner le tableau photographers seulement une fois
  return ({
    //photographers: [...photographers, ...photographers, ...photographers]})
    photographers: [...photographers]})
  
}

//------------------------------------------------------------------------------------------------------------------------//

import {photographerFactory} from '../factories/photographer.js';

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  //console.log({ photographers });
  displayData(photographers);
}

init()