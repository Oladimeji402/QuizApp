document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress-bar");
  const preloader = document.getElementById("preloader");

  let progress = 0;

  // Simulate progress
  const simulateProgress = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(simulateProgress);
      setTimeout(() => {
        preloader.style.display = "none"; // Hide preloader when done
      }, 500); // Wait a bit before hiding
    }
  }, 300); // Update progress every 300ms

  // Your existing card interaction logic here...
});




document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const completedContainer = document.getElementById("completed-cards-container");
  
    // Track the current card to avoid overlapping animations
    let isAnimating = false;
  
    cards.forEach((card) => {
      const task = card.getAttribute("data-task");
  
      // Create the card faces
      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");
  
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      const backImage = document.createElement("img");
      backImage.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBSWFm1CuPasogLQK2BGHkW0ET6pZK7ZBIA&s";
      cardBack.appendChild(backImage);
  
      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");
      cardFront.textContent = task;
  
      cardInner.appendChild(cardBack);
      cardInner.appendChild(cardFront);
      card.appendChild(cardInner);
  
      // Add the flipping and movement logic
      card.addEventListener("click", () => {
        if (isAnimating || card.classList.contains("flipped")) return;
  
        isAnimating = true;
  
        // Move card to center of the screen
        const rect = card.getBoundingClientRect();
        const centerX = window.innerWidth / 2 - rect.width / 2;
        const centerY = window.innerHeight / 2 - rect.height / 2;
  
        card.style.position = "fixed";
        card.style.zIndex = "1000";
        card.style.left = `${rect.left}px`;
        card.style.top = `${rect.top}px`;
  
        // Animate card to the center
        setTimeout(() => {
          card.style.transform = `translate(${centerX - rect.left}px, ${
            centerY - rect.top
          }px) scale(1.5)`;
        }, 10);
  
        // Flip the card and move to "Completed Tasks"
        setTimeout(() => {
          card.classList.add("flipped");
  
          // Move card to the completed section
          setTimeout(() => {
            card.style.position = "relative";
            card.style.zIndex = "1";
            card.style.transform = "none";
            card.style.margin = "10px auto";
            card.style.left = "0";
            card.style.top = "0";
  
            completedContainer.appendChild(card);
            isAnimating = false;
          }, 800); // Matches flip duration
        }, 1200); // Delay before flip
      });
    });
  });
  