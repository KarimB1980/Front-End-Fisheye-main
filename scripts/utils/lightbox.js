// Fonction ouverture de la Modal
function ouvrirModal() {
  document.getElementById("lightbox").style.display = "block";
  document.querySelector(".contenu-lightbox").style.display = "block";
}

// Fonction fermeture de la Modal
function fermerModal() {
  document.getElementById("lightbox").style.display = "none";
}

let imageIndex = 1;

// Fonction image précédente/suivante
function plusImages(n) {
  visualiserImage(imageIndex += n);
}

// Fonction image actuelle
function imageActuelle(n) {
  visualiserImage(imageIndex = n);
}

// Fonction visualisation de l'image
function visualiserImage(n) {
  let i;
  let images = document.getElementsByClassName("image-lightbox");
  if (n > images.length) {imageIndex = 1}
  if (n < 1) {imageIndex = images.length}
  for (i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  images[imageIndex-1].style.display = "block";
}