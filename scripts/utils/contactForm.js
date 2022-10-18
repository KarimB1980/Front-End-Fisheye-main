function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
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
      // Masquage du coutour de couleur rouge du champ "Prénom"
      document.getElementById('first').style.border="0px solid blue";
      // Effacement du message d'erreur
      document.querySelector("#firstMessageErreur").innerHTML = "";
    } else {
      // Contour de couleur rouge du champ "Prénom"
      document.getElementById('first').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "Prénom"
      document.querySelector("#firstMessageErreur").innerHTML = "Veuillez renseigner un prénom valide (ne comportant que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères maximum).";
    }
  }

  // Contrôle du champ "Nom" en vérifiant qu'il ne comporte que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères
  document.getElementById('last').onchange = function nom() {
    const lastName = document.getElementById('last').value;
    if (/^[a-zA-Z \-]{2,100}$/.test(lastName)) {
      // Masquage du coutour de couleur rouge du champ "Nom"
      document.getElementById('last').style.border="0px solid blue";
      // Effacement du message d'erreur
      document.querySelector("#lastMessageErreur").innerHTML = "";
    } else {
      // Contour de couleur rouge du champ "Nom"
      document.getElementById('last').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "Nom"
      document.querySelector("#lastMessageErreur").innerHTML = "Veuillez renseigner qu'un E-mail valide (ne comportant que des minuscules, majuscules, tirets, espaces et 2 à 100 caractères maximum).";
    }
  }

  // Contrôle du champ E-mail
  document.getElementById('email').onchange = function email() {
    const Email = document.getElementById('email').value;
    if (/^[\w\.]+@([\w]+\.)+[\w]{2,4}$/.test(Email)) {
      // Masquage du coutour de couleur rouge du champ "E-mail"
      document.getElementById('email').style.border="0px solid blue";
      // Effacement du message d'erreur
      document.querySelector("#emailMessageErreur").innerHTML = "";
    } else {
      // Contour de couleur rouge du champ "E-mail"
      document.getElementById('email').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "E-mail"
      document.querySelector("#emailMessageErreur").innerHTML = "Veuillez renseigner un email valide (respectant le format xxxx@xxx.xxx avec une terminaison de 2 à 4 caractères).";
    }
  }

    // Contrôle du champ E-mail
    document.getElementById('message').onchange = function message() {
      if (document.getElementById('message').value == "") {
        // Contour de couleur rouge du champ "E-mail"
        document.getElementById('message').style.border="2px solid blue";
      // Affichage du message d'erreur sous le champ "Message"
        document.querySelector("#messageMessageErreur").innerHTML = "Veuillez renseigner un message.).";
      }
    }

}
//controleFormulaire();

function envoyerFormulaire() {
//document.getElementById('envoyer').onclick = function (envoyer) {
  //envoyer.preventDefault();
  console.log("ça marche");
  //window.location = `${window.location.origin}/front/html/confirmation.html?orderId=${orderIdCommande}`
  
  controleFormulaire();

  let formulaire = [];
  let donneesformulaire = {
    nom: document.querySelector("#first").value,
    prenom: document.querySelector("#last").value,
    email: document.querySelector("#email").value,
    message: document.querySelector("#message").value
  }
  console.log(donneesformulaire);
  formulaire.push(donneesformulaire);
  console.log(formulaire);

  if (document.querySelector("#first").value && document.querySelector("#last").value && document.querySelector("#email").value && document.querySelector("#message").value && document.querySelector("#firstMessageErreur") == "" && document.querySelector("#lastMessageErreur") == "" &&  document.querySelector("#emailMessageErreur") == "") { 
    closeModal()

  }
//}
}