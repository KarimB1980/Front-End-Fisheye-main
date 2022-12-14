// Fonction fetch du fichier photographers.json
function fetchPhotographersMedia() {
  fetch('../../data/photographers.json')
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  // Récupération des données dans datas et injection dans le localstorage sous le nom de clef "photographersMedia"
  .then(function datasPhoto(datas) {
    localStorage.setItem("photographersMedia", JSON.stringify(datas));
    console.log(datas);
    return datas;
  })
}

// Fonction de récupération des données de chaque photographe
async function getPhotographers() {
  // Rappel de la fonction fetch du fichier photographers.json
  fetchPhotographersMedia();
  // Récupération des données dans le localstorage sous le nom de clef "photographersMedia"
  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));

  // Création d'une variable pour récupérer les données des photographes
  let photographers = donnees.photographers;

  // Retour du tableau photographers une fois
  return ({photographers: [...photographers]})
}

// Importation de la fonction "photographerFactory" depuis le fichier "factories/photographer.js" afin de créer le code html pour chaque carte photographe
import {photographerFactory} from '../factories/photographer.js';

// Fonction d'affichage des photographes en modifiant le DOM
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction d'initialisation de la page index.html
async function init() {
  //Création de l'en-tête de la page index.html
  let enteteindex = "";

  enteteindex += `<header>`
  enteteindex += `  <a href="index.html"><img src="assets/images/logo.png" class="logo" alt="Fisheye Home page"></a>`
  enteteindex += `  <h1>Nos photographes</h1>`
  enteteindex += `</header>`
  enteteindex += `<main id="main">`
  enteteindex += `  <div class="photographer_section"></div>`
  enteteindex += `</main>`

  // Injection du code html dans le body
  document.querySelector("#body").innerHTML = enteteindex;
  
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
// Appel de la fonction d'initialisation de la page index.html
init()