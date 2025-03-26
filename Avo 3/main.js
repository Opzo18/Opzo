// Current year with Polish timezone
document.getElementById("current-year").textContent = new Date().toLocaleString("pl-PL", {
  timeZone: "Europe/Warsaw",
  year: "numeric",
});

// Mobile menu toggle
document.querySelector(".burger").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".burger i").classList.toggle("fa-times");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("active");
    document.querySelector(".burger i").classList.remove("fa-times");
  });
});

// Back to top button
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  if (window.pageYOffset > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

document.querySelector(".back-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
  testimonials[index].classList.add("active");
  currentTestimonial = index;
}

document.querySelector(".next-testimonial").addEventListener("click", function () {
  let nextIndex = currentTestimonial + 1;
  if (nextIndex >= testimonials.length) nextIndex = 0;
  showTestimonial(nextIndex);
});

document.querySelector(".prev-testimonial").addEventListener("click", function () {
  let prevIndex = currentTestimonial - 1;
  if (prevIndex < 0) prevIndex = testimonials.length - 1;
  showTestimonial(prevIndex);
});

// Auto-rotate testimonials
setInterval(() => {
  let nextIndex = currentTestimonial + 1;
  if (nextIndex >= testimonials.length) nextIndex = 0;
  showTestimonial(nextIndex);
}, 5000);

// Cookie consent
if (!localStorage.getItem("cookieConsent")) {
  setTimeout(() => {
    document.querySelector(".cookie-consent").classList.add("active");
  }, 2000);
}

document.querySelector(".cookie-btn").addEventListener("click", function () {
  localStorage.setItem("cookieConsent", "true");
  document.querySelector(".cookie-consent").classList.remove("active");
});

// Gallery functionality
const imageData = [
  { src: "./assets/galleryImg/Zdjecie1.png", description: "Julia podczas sesji fizjoterapeutycznej" },
  { src: "./assets/galleryImg/Zdjecie2.png", description: "Dawid demonstruje ćwiczenie gimnastyczne" },
  { src: "./assets/galleryImg/Zdjecie3.png", description: "Wspólny trening funkcjonalny" },
  { src: "./assets/galleryImg/Zdjecie1.png", description: "Julia podczas sesji fizjoterapeutycznej" },
  { src: "./assets/galleryImg/Zdjecie2.png", description: "Dawid demonstruje ćwiczenie gimnastyczne" },
  { src: "./assets/galleryImg/Zdjecie3.png", description: "Wspólny trening funkcjonalny" },
  { src: "./assets/galleryImg/Zdjecie1.png", description: "Julia podczas sesji fizjoterapeutycznej" },
  { src: "./assets/galleryImg/Zdjecie2.png", description: "Dawid demonstruje ćwiczenie gimnastyczne" },
  { src: "./assets/galleryImg/Zdjecie3.png", description: "Wspólny trening funkcjonalny" },
  { src: "./assets/galleryImg/Zdjecie1.png", description: "Julia podczas sesji fizjoterapeutycznej" },
  { src: "./assets/galleryImg/Zdjecie2.png", description: "Dawid demonstruje ćwiczenie gimnastyczne" },
  { src: "./assets/galleryImg/Zdjecie3.png", description: "Wspólny trening funkcjonalny" },
  { src: "./assets/galleryImg/Zdjecie1.png", description: "Julia podczas sesji fizjoterapeutycznej" },
  { src: "./assets/galleryImg/Zdjecie2.png", description: "Dawid demonstruje ćwiczenie gimnastyczne" },
  { src: "./assets/galleryImg/Zdjecie3.png", description: "Wspólny trening funkcjonalny" },
  { src: "./assets/galleryImg/Zdjecie1.png", description: "Julia podczas sesji fizjoterapeutycznej" },
  { src: "./assets/galleryImg/Zdjecie2.png", description: "Dawid demonstruje ćwiczenie gimnastyczne" },
  { src: "./assets/galleryImg/Zdjecie3.png", description: "Wspólny trening funkcjonalny" },
];

let currentPage = 0;
let itemsPerPage = calculateItemsPerPage();
let isLoading = false;
let currentIndex = 0;
let images = [];
let touchStartX = 0;

function calculateItemsPerPage() {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return 15;
  const galleryWidth = gallery.offsetWidth;
  return Math.floor(galleryWidth / 160) * 5;
}

async function renderGallery(reset = false) {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  if (reset) {
    document.querySelector(".gallery").innerHTML = "";
    currentPage = 0;
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const batch = imageData.slice(start, end);

  batch.forEach((item) => {
    const img = document.createElement("img");
    img.className = "gallery-item";
    img.src = item.src;
    img.alt = "Zdjęcie galerii";
    img.dataset.description = item.description;
    img.loading = "lazy";
    document.querySelector(".gallery").appendChild(img);
  });

  currentPage++;
  updateLightboxItems();
  hideLoader();
  isLoading = false;
}

function showLoader() {
  document.querySelector(".loading-container").style.display = "flex";
}

function hideLoader() {
  document.querySelector(".loading-container").style.display = "none";
}

function handleScroll() {
  const scrollThreshold = 500;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
    const remaining = imageData.length - currentPage * itemsPerPage;
    if (remaining > 0) renderGallery();
  }
}

function updateLightboxItems() {
  images = Array.from(document.querySelectorAll(".gallery-item"));
}

function openLightbox() {
  $("#lightbox").addClass("active");
  $(document).on("keyup", handleKeyboard);
  updateLightbox();
}

function prevImage(event) {
  event?.stopPropagation();
  if (currentIndex > 0) {
    currentIndex--;
    updateLightbox();
  }
}

function nextImage(event) {
  event?.stopPropagation();
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateLightbox();
  }
}

function closeLightbox() {
  $("#lightbox").removeClass("active");
  $(document).off("keyup", handleKeyboard);
}

function handleKeyboard(e) {
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    prevImage(e);
  } else if (e.key === "ArrowRight") {
    nextImage(e);
  }
}

function updateLightbox() {
  const img = $(images[currentIndex]);
  $("#lightbox-img").attr({
    src: img.attr("src"),
    alt: img.attr("alt"),
  });
  $("#image-description").text(img.data("description"));
  $("#image-counter").text(`${currentIndex + 1}/${images.length}`);
}

// Touch event handling
document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

document.addEventListener(
  "touchend",
  (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) nextImage();
      else prevImage();
    }
  },
  false
);

// Orientation change handling
window.addEventListener("orientationchange", () => {
  itemsPerPage = calculateItemsPerPage();
  renderGallery(true);
});

// Initial setup
window.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", () => {
    itemsPerPage = calculateItemsPerPage();
  });

  document.querySelector(".gallery").addEventListener("click", function (e) {
    if (e.target.classList.contains("gallery-item")) {
      currentIndex = images.indexOf(e.target);
      openLightbox();
    }
  });

  window.scrollTo(0, 0);
});

// Page loader
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("page-loader").style.opacity = "0";
      setTimeout(function () {
        document.getElementById("page-loader").style.display = "none";
      }, 500);
    }, 500);
  });
});
