function startGame() {
  let cards = [];
  console.log(gameMode, mediumGame);
  if (gameMode === "easy") {
    cards = deckCards.slice(0, 4);
    deck.classList.add("easy");
  } else if (gameMode === "medium") {
    deck.classList.add("medium");
    cards = deckCards.slice(0, 8);
  } else {
    deck.classList.add("hard");
    cards = [...deckCards];
  }

  // Invoke shuffle function and store in variable
  const shuffledDeck = shuffle(cards);
  // Iterate over deck of cards array
  for (let i = 0; i < shuffledDeck.length; i++) {
    // Create the <li> tags
    const liTag = document.createElement("LI");
    // Give <li> class of card
    liTag.classList.add("card");
    // Create the <img> tags
    const addImage = document.createElement("IMG");
    // Append <img> to <li>
    liTag.appendChild(addImage);
    // Set the img src path with the shuffled deck
    addImage.setAttribute("src", "img/" + shuffledDeck[i]);
    // Add an alt tag to the image
    addImage.setAttribute("alt", "image of vault boy from fallout");
    // Update the new <li> to the deck <ul>

    const divTag = document.createElement("DIV");
    divTag.classList.add("tilt");
    divTag.appendChild(liTag);

    updateReflection(liTag, 100, 0);
    liTag.addEventListener("mousemove", (event) => {
      const scale = 0.03;
      const midX = (liTag.clientHeight / 2) * scale;
      const mouseXoffset = event.offsetX * scale;
      const mouseX = mouseXoffset - midX;

      const midY = (liTag.clientWidth / 2) * scale;
      const mouseYoffset = event.offsetY * scale;
      const mouseY = mouseYoffset - midY;
      updateReflection(liTag, mouseX * 50, mouseY * 50);
      const rotation = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
      liTag.style.transform = rotation;
    });

    liTag.addEventListener("mouseleave", (event) => {
      // liTag.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });

    // flip liTag on click
    liTag.addEventListener("click", (event) => {
      liTag.style.transform = `rotateX(0deg) rotateY(180deg)`;
    });

    deck.appendChild(divTag);
  }
}