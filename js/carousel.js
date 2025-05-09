const isMine =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const base = isMine
  ? "assets/photos.json"
  : "/JSMediaGallery/assets/photos.json";

fetch(base)
  .then((response) => response.json())
  .then((photos) => {
    const selectedData = photos.carousel;
    const carouselInner = document.querySelector(".carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Clear existing carousel items and indicators
    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    // Loop through carousel photos
    selectedData.forEach((item, index) => {
      const activeClass = index === 0 ? "active" : "";

      // Create carousel item
      const carouselItem = `
        <div class="carousel-item ${activeClass}">
          <img src="${item.img}" class="img-fluid" alt="${item.title}">
          <div class="container">
            <div class="carousel-caption mb-5">
              <h1>${item.title}</h1>
              <p>${item.description}</p>
            </div>
          </div>
        </div>
      `;

      // Create carousel indicator
      const indicator = `
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" 
          class="${activeClass}" aria-label="Slide ${index + 1}"></button>
      `;
      // Append new elements
      carouselInner.innerHTML += carouselItem;
      carouselIndicators.innerHTML += indicator;
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));
