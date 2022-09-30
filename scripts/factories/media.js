export function mediaFactory(data) {
  var p = window.location.pathname;

  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));
  //  console.log(donnees.media);

  //const photographers = donnees.photographers;
  //  console.log(photographers);

  //const medias = donnees.media;
  //console.log(media);


  //---------------------------------------------------------------------------------------------------------//
  /*function mediaPhotographe() {
    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");
    const medias = donnees.media;

    console.log(medias);
    console.log(id);

    for (let i = 0; i < medias.length; i++) {
      //console.log(medias[i].photographerId);
      //console.log(id);
      //console.log("ça marche");
      // Affichage des informations concernant le photographe
      if (medias[i].photographerId == id) {
        //console.log("ça marche");
        console.log("L'égalité des id fonctionne.");
        let donneesMedia = {
          "id": medias[i].id,
          "photographerId": medias[i].photographerId,
          "title": medias[i].title,
          "image": medias[i].image,
          "likes": medias[i].likes,
          "date": medias[i].date,
          "price": medias[i].price
        }

      var mediasphotos = [];
      mediasphotos.push(donneesMedia);
      console.log(mediasphotos);

      //localStorage.setItem("media", JSON.stringify(donneesMedia));
      //console.log(donneesMedia);
      }
    }

    /*var mediasphotos = [];
    mediasphotos.push(donneesMedia);
    console.log(mediasphotos);*/

  /*  let donneesmedia = JSON.parse(localStorage.getItem("media"));
    //const media = [donneesMedia];
    //console.log(media);
    return ({
      medias: [...medias]})
  }
  mediaPhotographe();*/
  //---------------------------------------------------------------------------------------------------------//

  function htmlMedia(medias) {
    if (p.match(/^\/?photographer/)) {

      let listeMedia = '';

        //----------------------------------------------------------------------//
                // Récupération de l'ID dans l'url
        let urlcourante = document.location.href;
        let url = new URL(urlcourante);
        let id = url.searchParams.get("id");
        const medias = donnees.media;

        //console.log(medias);
        //console.log(id);

        for (let i = 0; i < medias.length; i++) {
          // Affichage des réalisations du photographe
          if (medias[i].photographerId == id) {
            listeMedia += `<a href="./photographer.html?id=${medias[i].id}">`;
            listeMedia +=   '<article>';

            if (medias[i].video) {
              //listeMedia +=       `<video src="assets/images/${medias[i].video}" alt="Lilac breasted roller, closeup view">`;
              listeMedia +=       `<video controls width="500"><source src="assets/images/${medias[i].video}" type="video/mp4">`;
            }
            if (medias[i].image) {
              listeMedia +=       `<img src="assets/images/${medias[i].image}" alt="Lilac breasted roller, closeup view">`;
            }

            listeMedia +=       `<h3 class="productName">${medias[i].title}</h3>`;
            listeMedia +=   '</article>';
            listeMedia += '</a>';
          }
        }

        // Injection du nouveau code html dans le DOM
        const a = document.querySelector('#realisations')
        a.insertAdjacentHTML('beforeend', listeMedia);
    }
  }
htmlMedia();

}