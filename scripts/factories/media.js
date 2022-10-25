// Fonction d'affichage des medias du photographe sélectionné
export function mediaFactory() {
  var p = window.location.pathname;

  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));

  if (p.match(/^\/?photographer.html/)) {
    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");
    let medias = donnees.media;

    let totalLikePhotos = [];
    let mediaPhotographer = [];

    for (let i = 0; i < medias.length; i++) {
      // Calcul de la somme des likes et création d'un tableau "mediaPhotographer" contenant les réalisations du photographe
      if (medias[i].photographerId == id) {

        // Calcul de la somme des likes
        totalLikePhotos.push(medias[i].likes);
        let reducers = (accumulator, currentValue) => accumulator + currentValue;
        let totalLike = totalLikePhotos.reduce(reducers);
        // Injection du résultat dans le DOM
        document.querySelector('.totalNombreLike').innerHTML = totalLike;

        // Récupération des données du photographe et injection dans le tableau "mediaPhotographer"
        let donneesmediaphotographer = {
          title: medias[i].title,
          likes: medias[i].likes,
          date: medias[i].date,
          video: medias[i].video,
          image: medias[i].image
        }
        mediaPhotographer.push(donneesmediaphotographer);
      }
    }

    // Tri des medias par popularité des réalisations du photographe (ordre décroissant de likes)
    mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    let listeMediaPopularite = '';
    let mediaLightBoxPopularite = '';

    for (let i = 0; i < mediaPhotographer.length; i++) {
      // Affichage des réalisations du photographe et création du contenu de la lightbox
      listeMediaPopularite +=   '<article>'

      if (mediaPhotographer[i].video) {
        listeMediaPopularite +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})"><video><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video></button>`
      }
      if (mediaPhotographer[i].image) {
        listeMediaPopularite +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true"><img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view"></button>`
      }
      listeMediaPopularite +=       `<div class="titrecoeur">`
      listeMediaPopularite +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`
      listeMediaPopularite +=           `<div class="like">`
      listeMediaPopularite +=             `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`
      listeMediaPopularite +=             `<button>`
      listeMediaPopularite +=               `<div class="coeur" aria-label="likes">`
      listeMediaPopularite +=                 `<em class="fa-solid fa-heart"></em>`
      listeMediaPopularite +=               `</div>`
      listeMediaPopularite +=             `</button>`
      listeMediaPopularite +=           `</div>`
      listeMediaPopularite +=       `</div>`
      listeMediaPopularite +=   `</article>`

      mediaLightBoxPopularite += `<div class="image-lightbox">`
      mediaLightBoxPopularite += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
      mediaLightBoxPopularite += `  <div class="imagetitre">`
      mediaLightBoxPopularite += `    <div class="imagePrecSuiv">`
      mediaLightBoxPopularite += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`
      if (mediaPhotographer[i].video) {
        mediaLightBoxPopularite +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`
      }
      if (mediaPhotographer[i].image) {
        mediaLightBoxPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`
      }
      mediaLightBoxPopularite += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
      mediaLightBoxPopularite += `    </div>`
      mediaLightBoxPopularite += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
      mediaLightBoxPopularite += `  </div>`
      mediaLightBoxPopularite += `</div>`
    }
    // Injection du nouveau code html dans le DOM
    let idRealisations = document.querySelector('#realisations')
    idRealisations.innerHTML = listeMediaPopularite;

    let contenuLightbox = document.querySelector(".contenu-lightbox")
    contenuLightbox.innerHTML= mediaLightBoxPopularite;

    // Fonction d'affichage du menu déroulant
    function clicMenuDeroulant() {
      let valeurSousMenu = document.querySelector(".valeur-sous-menu");

      valeurSousMenu.addEventListener("click", () =>
        {
          let sousMenuDeroulant = document.querySelector(".sous-menu")
          sousMenuDeroulant.style.display = "block";

          triPopularite();
          triTitre();
          triDate();
        }
      )
    }
    clicMenuDeroulant();

    // Fonction de tri des médias du photographe par popularité
    function triPopularite() {
      let popularite = document.querySelector("#boutonPopularite");
      // Lancement de la fonction au clic
      popularite.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));

          mediaLightbox();

          let clefTri = document.querySelector("#selectionTri");
          clefTri.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Popularité <i class="fa fa-angle-down"></i></p></button>`

          like();
          totallikes();

          let sousMenu = document.querySelector('.sous-menu');
          sousMenu.style.display = "none";

          clicMenuDeroulant();
        }
      )
    }
    triPopularite();

    // Fonction de tri des médias du photographe par Titre
    function triTitre() {
      let titre = document.querySelector("#boutonTitre");
      // Lancement de la fonction au clic
      titre.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.title > b.title ? 1 : -1));

          mediaLightbox();

          let clefTri = document.querySelector("#selectionTri");
          clefTri.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Titre <i class="fa fa-angle-down"></i></p></button>`

          let menuDeroulant1 = document.querySelector('.sous-menu');
          menuDeroulant1.style.display = "none";

          like();
          totallikes();

          let sousMenu = document.querySelector('.sous-menu');
          sousMenu.style.display = "none";

          clicMenuDeroulant();
        }
      )
    }
    triTitre();

    // Fonction de tri des médias du photographe par date
    function triDate() {
      let date = document.querySelector("#boutonDate");
      // Lancement de la fonction au clic
      date.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.date > b.date ? 1 : -1));

          mediaLightbox();

          let clefTri = document.querySelector("#selectionTri");
          clefTri.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Date <i class="fa fa-angle-down"></i></p></button>`

          let menuDeroulant1 = document.querySelector('.sous-menu');
          menuDeroulant1.style.display = "none";

          like();
          totallikes();

          let sousMenu = document.querySelector('.sous-menu');
          sousMenu.style.display = "none";

          clicMenuDeroulant();
        }
      )
    }
    triDate();

    // Fonction mediaLightbox pour l'affichage des medias et la création du contenu de la lightbox
    function mediaLightbox() {
      let listeMedia = '';
      let mediaLightBox = '';

      for (let i = 0; i < mediaPhotographer.length; i++) {
          // Affichage des réalisations du photographe triées par popularité et création du contenu de la lightbox
        listeMedia +=   '<article>';

        if (mediaPhotographer[i].video != undefined) {
          listeMedia +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})"><video><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video></button>`;
        }
        if (mediaPhotographer[i].image != undefined) {
          listeMedia +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true"><img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view"></button>`;
        }
        listeMedia +=       `<div class="titrecoeur">`;
        listeMedia +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
        listeMedia +=         `<div class="like">`;
        listeMedia +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
        listeMedia +=             `<button>`
        listeMedia +=               `<div class="coeur" aria-label="likes">`;
        listeMedia +=                 `<em class="fa-solid fa-heart"></em>`;
        listeMedia +=               `</div>`;
        listeMedia +=             `</button>`
        listeMedia +=         `</div>`
        listeMedia +=       `</div>`;
        listeMedia +=   `</article>`;

        mediaLightBox += `<div class="image-lightbox">`
        mediaLightBox += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
        mediaLightBox += `  <div class="imagetitre">`
        mediaLightBox += `    <div class="imagePrecSuiv">`
        mediaLightBox += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`

        if (mediaPhotographer[i].video) {
          mediaLightBox +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
        }
        if (mediaPhotographer[i].image) {
          mediaLightBox +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
        }

        mediaLightBox += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
        mediaLightBox += `    </div>`
        mediaLightBox += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
        mediaLightBox += `  </div>`
        mediaLightBox += `</div>`
      }
      // Injection du nouveau code html dans le DOM
      let idRealisations = document.querySelector('#realisations');
      idRealisations.innerHTML = listeMedia;

      let contenuLightbox = document.querySelector(".contenu-lightbox");
      contenuLightbox.innerHTML= mediaLightBox;
    }

    // Fonction d'incrémentation du nombre de likes des médias
    function like() {
      // Recherche de .like pour liker
      let coeur = document.querySelectorAll(".like");
      coeur.forEach((coeur) => 
        {
          coeur.addEventListener("click", () => 
            {
              let coeurlike = coeur.firstChild;
              let text = coeurlike.textContent;
              text = parseInt(text) + 1;
              coeurlike.textContent = text;

              // Incrémentation du nombre de like total
              let totallikes = document.querySelector('.totalNombreLike');
              totallikes.textContent = parseInt(totallikes.textContent) + 1;
            }
          )
        }
      )
    }
    like();

    // Fonction de calcul du nombre total de likes
    function totallikes() {
      let coeurs = document.querySelectorAll('.nombrelike');
      let totalLikeCoe = [];
      coeurs.forEach((coeur) => 
        {
          totalLikeCoe.push(parseInt(coeur.textContent));
          const reducers = (accumulator, currentValue) => accumulator + currentValue;
          let totalLikeCoeurs = totalLikeCoe.reduce(reducers);
          document.querySelector('.totalNombreLike').innerHTML = totalLikeCoeurs;
        }
      )
    }

    //Fonction de reconnaissance des touches flèche gauche, flèche droite et esc pour l'utilisation au clavier de la lightbox et du formulaire
    function clavierLightboxFormulaire() {
      document.onkeydown = (evenement) => {
        evenement = evenement || window.event;
        if (evenement.key === 'ArrowLeft') {
          plusImages(-1);
        } else if (evenement.key === 'ArrowRight') {
          plusImages(1);
        } else if (evenement.key === 'Escape') {
          fermerModal();
          closeModal();
        }
      }
    }
    clavierLightboxFormulaire();
  }    
}