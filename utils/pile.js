


const createPile = () => {
    const COULEURS = ['\u2663', '\u2660'];
    const VALEURS = ['As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'D', 'R'];
    let deck = [];
    for (let suit of COULEURS) {
        for (let value of VALEURS) {
            deck.push({ suit, value });
        }
    }
    return deck;
};

export default createPile;