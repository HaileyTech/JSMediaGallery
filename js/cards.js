async function loadPhotoCards() {
  try {
    const response = await fetch("../assets/photos.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    loadPhotos(data.photoCards);
  } catch (error) {
    console.error("Failed to load photo data:", error);
  }
}

function loadPhotos(photoCards) {
  const container = document.getElementById("photo-card-list");
  // Clear existing content
  container.innerHTML = "";

  // Show message if empty
  if (!photoCards || photoCards.length === 0) {
    container.innerHTML = "<p>No photos found.</p>";
    return;
  }

  // Loop through json of photos
  photoCards.forEach((photo) => {
    const { id, img, title, description, modal } = photo;
    const cardDiv = document.createElement("div");

    // Create card
    cardDiv.innerHTML = `
      <div class="card">
        <img style="border-top-left-radius: inherit; border-top-right-radius: inherit;" src="${img}" alt="${title}" />
        <div class="card-content ps-4 pe-4">
          <h4 class="card-title mt-4 mb-2">${title}</h4>
          <p class="card-text">${description}</p>
          <button type="button" class="card-more button" data-bs-toggle="modal" data-bs-target="#${id}">View</button>
        </div>
      </div>

      <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="${img}" alt="${title}" />
              <div class="eg-text">
                <h3>${title}</h3>
                <p>${description} ${modal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Overriding Bootstrap to prevent the page from jumping to original position after closing a modal
    var modals = document.querySelectorAll(".modal");
    modals.forEach(function (modal) {
      modal.addEventListener("hidden.bs.modal", function () {
        var currentPosition = window.scrollY;
        setTimeout(function () {
          window.scrollTo(0, currentPosition);
        }, 5);
      });
    });

    // Append new photo card
    container.appendChild(cardDiv);
  });
}

// Fetch and display photos when the page loads
document.addEventListener("DOMContentLoaded", loadPhotoCards);
