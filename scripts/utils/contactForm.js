/*import {init} from '../pages/photographers.js';
import {mediaFactory} from '../factories/media.js';
import {donneesPhotographe} from '../pages/photographers.js';
import {photographerFactory} from '../factories/photographer.js';
import {displayData} from '../pages/photographers.js';*/

//mediaFactory();

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  //let header = document.querySelector("#body > header");
  let header = document.querySelector("#body > header > a > img");
  header.setAttribute('disabled', '');

  let main = document.querySelector("#main > div > article > button");
  main.ariaHidden = "true";

  let nav = document.querySelector("#selectionTri > button");
  nav.ariaHidden = "true";

  let section = document.querySelector("#realisations");
  section.ariaHidden = "true";

  let blocliketarif = document.querySelector("#body > div.blocliketarif");
  blocliketarif.ariaHidden = "true";

  let lightbox = document.querySelector("#lightbox");
  lightbox.ariaHidden = "true";

  let formulaire = document.querySelector("#contact_modal");
  formulaire.ariaHidden = "false";

  controleFormulaire();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function controleFormulaire() {

  // Contrôle du champ "Prénom" en vérifiant qu'il ne comporte que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères
  document.getElementById('first').onchange = function prenom() {
    const firstName = document.getElementById('first').value;
    if (/^[a-zA-Z \-]{2,100}$/.test(firstName)) {
      // Masquage du coutour de couleur bleue du champ "Prénom"
      document.getElementById('first').style.border="0px solid blue";
      // Effacement du message d'erreur
      document.querySelector("#firstMessageErreur").innerHTML = "";
    } else {
      // Contour de couleur bleue du champ "Prénom"
      document.getElementById('first').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "Prénom"
      document.querySelector("#firstMessageErreur").innerHTML = "Veuillez renseigner un prénom valide (ne comportant que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères maximum).";
    }
  }

  // Contrôle du champ "Nom" en vérifiant qu'il ne comporte que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères
  document.getElementById('last').onchange = function nom() {
    const lastName = document.getElementById('last').value;
    if (/^[a-zA-Z \-]{2,100}$/.test(lastName)) {
      // Masquage du coutour de couleur bleue du champ "Nom"
      document.getElementById('last').style.border="0px solid blue";
      // Effacement du message d'erreur
      document.querySelector("#lastMessageErreur").innerHTML = "";
    } else {
      // Contour de couleur bleue du champ "Nom"
      document.getElementById('last').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "Nom"
      document.querySelector("#lastMessageErreur").innerHTML = "Veuillez renseigner qu'un E-mail valide (ne comportant que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères maximum).";
    }
  }

  // Contrôle du champ E-mail
  document.getElementById('email').onchange = function email() {
    const Email = document.getElementById('email').value;
    if (/^[\w\.]+@([\w]+\.)+[\w]{2,4}$/.test(Email)) {
      // Masquage du coutour de couleur bleue du champ "E-mail"
      document.getElementById('email').style.border="0px solid blue";
      // Effacement du message d'erreur
      document.querySelector("#emailMessageErreur").innerHTML = "";
    } else {
      // Contour de couleur bleue du champ "E-mail"
      document.getElementById('email').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "E-mail"
      document.querySelector("#emailMessageErreur").innerHTML = "Veuillez renseigner un email valide (respectant le format xxxx@xxx.xxx avec une terminaison de 2 à 4 caractères).";
    }
  }

  // Contrôle du champ Message
  document.getElementById('message').onchange = function message() {
    if (document.getElementById('message').value == "") {
      // Contour de couleur bleue du champ "Message"
      document.getElementById('message').style.border="2px solid blue";
    // Affichage du message d'erreur sous le champ "Message"
      document.querySelector("#messageMessageErreur").innerHTML = "Veuillez renseigner un message.";
    } else {
      // Contour de couleur bleue du champ "Message"
      document.getElementById('message').style.border="0px solid blue";
      // Affichage du message d'erreur sous le champ "Message"
      document.querySelector("#messageMessageErreur").innerHTML = "";
    }
  }
}

document.getElementById('envoyer').onclick = function (envoyer) {
  envoyer.preventDefault();
  console.log("envoyer ça marche");

  if (document.getElementById('first').value == "") {
    // Contour de couleur bleue du champ "Prénom"
    document.getElementById('first').style.border="2px solid blue";
    // Affichage du message d'erreur sous le champ "Prénom"
    document.querySelector("#firstMessageErreur").innerHTML = "Veuillez renseigner un prénom valide (ne comportant que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères maximum).";
  } else {
    document.getElementById('first').style.border="0px solid blue";
    // Effacement du message d'erreur
    document.querySelector("#firstMessageErreur").innerHTML = "";
  }    

  if (document.getElementById('last').value == "") {
    // Contour de couleur bleue du champ "nom"
    document.getElementById('last').style.border="2px solid blue";
    // Affichage du message d'erreur sous le champ "nom"
    document.querySelector("#lastMessageErreur").innerHTML = "Veuillez renseigner un nom valide (ne comportant que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères maximum).";
  } else {
    document.getElementById('last').style.border="0px solid blue";
    // Effacement du message d'erreur
    document.querySelector("#lastMessageErreur").innerHTML = "";
  }    

  // Contrôle du champ E-mail
  if (document.getElementById('email').value == "") {
    // Contour de couleur bleue du champ "E-mail"
    document.getElementById('email').style.border="2px solid blue";
    // Affichage du message d'erreur sous le champ "E-mail"
    document.querySelector("#emailMessageErreur").innerHTML = "Veuillez renseigner un email valide (respectant le format xxxx@xxx.xxx avec une terminaison de 2 à 4 caractères).";
  } else {
    // Masquage du coutour de couleur rouge du champ "E-mail"
    document.getElementById('email').style.border="0px solid blue";
    // Effacement du message d'erreur
    document.querySelector("#emailMessageErreur").innerHTML = "";
  }

  // Contrôle du champ Message
  if (document.getElementById('message').value == "") {
    // Contour de couleur bleue du champ "Message"
    document.getElementById('message').style.border="2px solid blue";
  // Affichage du message d'erreur sous le champ "Message"
    document.querySelector("#messageMessageErreur").innerHTML = "Veuillez renseigner un message.";
  }

  let formulaire = [];
  let donneesformulaire = {
    nom: document.querySelector("#first").value,
    prenom: document.querySelector("#last").value,
    email: document.querySelector("#email").value,
    message: document.querySelector("#message").value
  }
  formulaire.push(donneesformulaire);
  console.log(formulaire);
}
//)