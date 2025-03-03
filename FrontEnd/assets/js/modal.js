export function setupModal() {
  const openModal = document.querySelector(".edit__portfolio");
  const modal = document.querySelector("#modal");
  const closeModalElements = document.querySelectorAll(
    ".modal__border, .modal__content i"
  );

  openModal.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalElements.forEach((element) => {
    element.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });
}

export function fetchWorksModal(projets) {
  const gallery2 = document.querySelector(".gallery2");
  gallery2.innerHTML = "";

  projets.forEach((projet) => {
    const figure = document.createElement("figure");
    // figure.setAttribute("data-id", `${projet.id}`);
    figure.innerHTML = `
        <img src ="${projet.imageUrl}" alt = "${projet.title}">
        <i class="fa-solid fa-trash" data-id="${projet.id}"></i>
        `;
    gallery2.appendChild(figure);
  });

  gallery2.querySelectorAll(".fa-trash").forEach((trashIcon) => {
    trashIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      const id = event.target.dataset.id;
      deleteWork(id);
    });
  });
}

export function deleteWork(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
      return response.text();
    })
    .then(() => {
        const trashIcon = document.querySelector(`.fa-trash[data-id="${id}"]`);
        if (trashIcon) {
          trashIcon.parentElement.remove(); 
        }
        // Supprime l'élément parent (figure)
    //   document
    //     .querySelector(`.fa-trash[data-id="${id}"]`)
    //     .parentElement.remove();
    })
    .catch((error) => console.error(error));
}

fetch("http://localhost:5678/api/works")
  // On va chercher les valeurs de l'api et on les lit en json
  .then((response) => response.json())
  .then((projets) => {
    fetchWorksModal(projets);
  })
  .catch((error) => console.log(error));
