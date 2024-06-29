// ADD LINKS TO PAGE
function addLinks() {
  fetch("opzo18.github.io/Opzo/ok/assets/json/galleryPagesList.json") // Zmienic na link https:// jeżeli jest na serwerze
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      const galleryMenu = document.querySelector(".galleryMenu ul");
      galleryMenu.innerHTML = "";
      const currentPath = window.location.pathname;

      jsonData.forEach((item) => {
        const list = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.name;

        // CHECK IF ACTIVE PAGE
        if (item.url === currentPath) {
          link.id = "galleryActivePage";
          link.href = "#";
        }

        list.appendChild(link);
        galleryMenu.appendChild(list);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
}

addLinks();
