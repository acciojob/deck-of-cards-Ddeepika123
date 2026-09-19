//your code here
const cards = document.querySelectorAll(".whitebox2");
const holders = document.querySelectorAll(".placed");
const deck = document.getElementById("deck");
const shuffleButton = document.getElementById("shuffle");
const resetButton = document.getElementById("reset");
const won = document.getElementById("won");


// Get suit from card image name
function getSuit(card) {
    const image = card.querySelector("img");
    const src = image.src;

    if (src.includes("C.jpg")) {
        return "club";
    }

    if (src.includes("D.jpg")) {
        return "diamond";
    }

    if (src.includes("H.jpg")) {
        return "heart";
    }

    if (src.includes("S.jpg")) {
        return "spade";
    }
}


// Get holder suit from holder image
function getHolderSuit(holder) {
    const image = holder.querySelector("img");

    if (image.src.includes("club")) {
        return "club";
    }

    if (image.src.includes("diamond")) {
        return "diamond";
    }

    if (image.src.includes("heart")) {
        return "heart";
    }

    if (image.src.includes("spade")) {
        return "spade";
    }
}


// Drag start
cards.forEach(card => {

    card.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("cardId", this.id);
    });

});


// Allow dropping
holders.forEach(holder => {

    holder.addEventListener("dragover", function (e) {
        e.preventDefault();
    });


    holder.addEventListener("drop", function (e) {

        e.preventDefault();

        const cardId = e.dataTransfer.getData("cardId");
        const card = document.getElementById(cardId);

        const cardSuit = getSuit(card);
        const holderSuit = getHolderSuit(this);

        // Only allow correct suit
        if (cardSuit === holderSuit) {

            this.appendChild(card);

            card.classList.add("whitebox21");

            // Save card position
            localStorage.setItem(
                "card-" + cardId,
                holderSuit
            );

            checkWin();

        }

    });

});


// Check whether all cards are placed
function checkWin() {

    let placedCards = 0;

    holders.forEach(holder => {

        placedCards += holder.querySelectorAll(".whitebox2").length;

    });

    if (placedCards === cards.length) {
        won.style.display = "flex";
        shuffleButton.style.display = "none";
    }
}


// Restore previous game
function restoreGame() {

    cards.forEach(card => {

        const savedSuit = localStorage.getItem("card-" + card.id);

        if (savedSuit) {

            holders.forEach(holder => {

                if (getHolderSuit(holder) === savedSuit) {

                    holder.appendChild(card);

                }

            });

        }

    });

    checkWin();
}


// Shuffle cards
function shuffleCards() {

    // Move cards back to deck
    cards.forEach(card => {
        deck.appendChild(card.parentElement);
    });

    // Clear saved data
    cards.forEach(card => {
        localStorage.removeItem("card-" + card.id);
    });

    won.style.display = "none";
    shuffleButton.style.display = "block";

    // Random order
    const cardBoxes = Array.from(deck.children);

    cardBoxes.sort(() => Math.random() - 0.5);

    cardBoxes.forEach(box => {
        deck.appendChild(box);
    });
}


// Reset button
resetButton.addEventListener("click", function () {
    shuffleCards();
});


// Shuffle button
shuffleButton.addEventListener("click", function () {
    shuffleCards();
});


// Start game
restoreGame();
