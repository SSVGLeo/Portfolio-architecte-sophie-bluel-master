export function fetchWorks(projets) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    projets.forEach((projet) => {
        const figure = document.createElement("figure");
        figure.innerHTML = `
        <img src ="${projet.imageUrl}" alt = "${projet.title}">
        <figcaption>${projet.title}</figcaption>
        `
        gallery.appendChild(figure);
    });
}

fetch("http://localhost:5678/api/works")
  // On va chercher les valeurs de l'api et on les lit en json
  .then((response) => response.json())
  .then((projets) => {
    fetchWorks(projets);
  })
  .catch((error) => console.log(error));