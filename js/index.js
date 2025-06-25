document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen(); // Paksa keluar fullscreen
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const subnav = document.getElementById("subnav");
  const scrollLeftBtn = document.querySelector(".scroll-left");
  const scrollRightBtn = document.querySelector(".scroll-right");

  let scrollInterval;

  function updateScrollButtonVisibility() {
    // Sembunyikan tombol kiri jika posisi scroll 0
    if (subnav.scrollLeft <= 0) {
      scrollLeftBtn.style.display = "none";
    } else {
      scrollLeftBtn.style.display = "block";
    }

    // Sembunyikan tombol kanan jika sudah di akhir scroll
    const maxScrollLeft = subnav.scrollWidth - subnav.clientWidth;
    if (subnav.scrollLeft >= maxScrollLeft) {
      scrollRightBtn.style.display = "none";
    } else {
      scrollRightBtn.style.display = "block";
    }
  }

  function startScroll(direction) {
    scrollInterval = setInterval(() => {
      subnav.scrollBy({ left: direction * 8, behavior: "instant" });
      updateScrollButtonVisibility();
    }, 8);
  }

  function stopScroll() {
    clearInterval(scrollInterval);
  }

  // Event scroll ke kiri
  scrollLeftBtn.addEventListener("mousedown", () => startScroll(-1));
  scrollLeftBtn.addEventListener("mouseup", stopScroll);
  scrollLeftBtn.addEventListener("mouseleave", stopScroll);
  scrollLeftBtn.addEventListener("touchstart", () => startScroll(-1));
  scrollLeftBtn.addEventListener("touchend", stopScroll);

  // Event scroll ke kanan
  scrollRightBtn.addEventListener("mousedown", () => startScroll(1));
  scrollRightBtn.addEventListener("mouseup", stopScroll);
  scrollRightBtn.addEventListener("mouseleave", stopScroll);
  scrollRightBtn.addEventListener("touchstart", () => startScroll(1));
  scrollRightBtn.addEventListener("touchend", stopScroll);

  // Update saat scroll manual
  subnav.addEventListener("scroll", updateScrollButtonVisibility);

  // Inisialisasi tampilan tombol saat load
  updateScrollButtonVisibility();
});

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  document.getElementById("star-small").style.transform = `translateY(${
    scrollY * 0.925
  }px)`;
  document.getElementById("star-big").style.transform = `translateY(${
    scrollY * 0.9
  }px)`;
  document.getElementById("bg-section").style.transform = `translateY(${
    scrollY * 0.6
  }px)`;
  document.getElementById(
    "content_section_tentang"
  ).style.transform = `translateY(${scrollY * 0.6}px)`;
  document.getElementById("mosque-section").style.transform = `translateY(${
    scrollY * 0.25
  }px)`;

  // document.getElementById("cloud-left").style.transform = `translateX(${scrollY * 0.8}px)`;
  // document.getElementById("cloud-right").style.transform = `translateX(${-scrollY * 0.8}px)`;
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleMateri");
  const grid = document.getElementById("materiGrid");
  const materiCards = document.querySelectorAll(".materi-card");

  let expanded = false;

function getCardsPerRow() {
  const cardWidth = 549 + 20; // width + gap
  return Math.max(1, Math.floor(grid.clientWidth / cardWidth));
}


  function updateVisibility() {
    const cardsPerRow = getCardsPerRow();
    const maxVisible = cardsPerRow * 2;

    materiCards.forEach((card, index) => {
      const shouldBeVisible = expanded || index < maxVisible;

      if (shouldBeVisible) {
        card.style.display = "flex";
        requestAnimationFrame(() => {
          card.classList.add("revealed");
          card.style.opacity = "1";
        });
      } else {
        card.classList.remove("revealed", "just-revealed");
        card.style.opacity = "0";
        card.style.display = "none";
      }
    });
  }

  function revealOnScroll() {
    materiCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;

      if (isVisible && card.style.display !== "none") {
        if (!card.classList.contains("revealed")) {
          card.style.transitionDelay = `${index * 30}ms`;
          card.classList.add("revealed");
          card.classList.add("just-revealed");
        }
      } else if (!expanded) {
        card.classList.remove("revealed");
        card.classList.remove("just-revealed");
        card.style.transitionDelay = "0ms";
      }
    });
  }

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    toggleBtn.textContent = expanded ? "Lebih Sedikit" : "Lebih Banyak";

    materiCards.forEach(card => {
      card.classList.remove("just-revealed");
    });

    updateVisibility();
    revealOnScroll();
  });

  window.addEventListener("resize", () => {
    if (!expanded) {
      updateVisibility();
    }
  });

  window.addEventListener("scroll", revealOnScroll);

  // Init
  updateVisibility();
  revealOnScroll();

  // Paksa reveal saat belum scroll
  if (window.scrollY === 0) {
    setTimeout(() => revealOnScroll(), 150);
  }
});
