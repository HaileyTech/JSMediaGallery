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
    const { img, title, description, modal } = photo;
    const cardDiv = document.createElement("div");

    // Create card
    cardDiv.innerHTML = `
      <div class="card">
        <img style="border-top-left-radius: inherit; border-top-right-radius: inherit;" src="${img}" alt="${title}" />
        <div class="card-content">
          <h4 class="card-title">${title}</h4>
          <p class="card-text">${description}</p>
          <button data-modal="${modal}" class="card-more button">View</button>
          <button> </button>
        </div>
      </div><!--end .main-grid-item -->
    `;
    //     <div id="09" class="modal">
    //   <div class="modal-content">
    //     <span class="close">&times;</span>
    // 		<div class="modal-body">
    //       <img src="https://picsum.photos/800/450/?image=0" alt="example" />
    // 			<div class="eg-text">
    // 				<h3>Tea + Devices = Fun</h3>
    // 				<p>I always keep a cup of tea next to my expensive electronics, just in case I need to ruin them quickly . . . Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    // 			</div>
    // 		</div><!--end .modal-body-->
    //   </div><!--end .modal-content-->
    // </div><!--end .modal-->

    // Append new photo card
    container.appendChild(cardDiv);
  });
}

// Fetch and display photos when the page loads
document.addEventListener("DOMContentLoaded", loadPhotoCards);
