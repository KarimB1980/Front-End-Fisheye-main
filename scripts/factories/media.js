export function mediaFactory() {
  var p = window.location.pathname;

  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));
  //---------------------------------------------------------------------------------------------------------//

  function htmlMedia() {
    if (p.match(/^\/?photographer.html/)) {

      let listeMedia = '';

      let likesTarif = '';

      //----------------------------------------------------------------------//
      // Récupération de l'ID dans l'url
      let urlcourante = document.location.href;
      let url = new URL(urlcourante);
      let id = url.searchParams.get("id");
      const medias = donnees.media;

      let totalLikePhotos = []

      for (let i = 0; i < medias.length; i++) {
        // Affichage des réalisations du photographe
        if (medias[i].photographerId == id) {
          //listeMedia += `<a href="./photographer.html?id=${medias[i].id}">`;
          listeMedia +=   '<article>';

          if (medias[i].video) {
            listeMedia +=       `<video controls><source src="assets/images/${medias[i].video}" type="video/mp4"></video>`;
          }
          if (medias[i].image) {
            listeMedia +=       `<img src="assets/images/${medias[i].image}" alt="Lilac breasted roller, closeup view">`;
          }

          listeMedia +=       `<div class="titrecoeur">`;
          listeMedia +=         `<h3 class="productName">${medias[i].title}</h3>`;
          listeMedia +=         `<div class="like">`;
          listeMedia +=           `<h3 class="nombrelike">${medias[i].likes}</h3>`;
          listeMedia +=           `<div class="coeur" aria-label="likes">`;
          listeMedia +=             `<i class="fa-solid fa-heart"></i>`;
          listeMedia +=           `</div>`;
          listeMedia +=         `</div>`
          listeMedia +=       `</div>`;
          listeMedia +=   `</article>`;
          //listeMedia += `</a>`;

          // Calcul de la somme des like et injection du résultat dans le DOM
          totalLikePhotos.push(medias[i].likes);
          const reducers = (accumulator, currentValue) => accumulator + currentValue;
          let totalLike = totalLikePhotos.reduce(reducers);
          console.log(totalLike);

          document.querySelector('.nombreLike').innerHTML = totalLike;

        }
      }
      // Injection du nouveau code html dans le DOM
      const a = document.querySelector('#realisations')
      a.insertAdjacentHTML('beforeend', listeMedia);


      // Recherche du nombrelike cliqué pour liker
      let coeur = document.querySelectorAll(".like");
      //console.log(coeur);

      // Sélection de la zone de texte "Quantité" mise à "0"
      coeur.forEach((coeur) => 
        {
          coeur.addEventListener("click", () => 
            {
              //console.log("ça marche !");
              let coeurlike = coeur.firstChild;
              //console.log(test);
              var text = coeurlike.textContent;
              //console.log(text);
              text = parseInt(text) + 1;
              //console.log(text);
              coeurlike.textContent = text;

              let totallikes = document.querySelector('.nombreLike');
              //console.log(totallikes);
              totallikes.textContent = parseInt(totallikes.textContent) + 1;
            }
          )
        }
      )
    }
  }
  htmlMedia();
}