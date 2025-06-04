import React, { useState } from "react";

const fullDeck = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
];

const getRandomHand = () => {
  const deck = [...fullDeck, ...fullDeck, ...fullDeck, ...fullDeck];
  const hand = [];
  for (let i = 0; i < 8; i++) {
    const index = Math.floor(Math.random() * deck.length);
    hand.push(deck[index]);
    deck.splice(index, 1);
  }
  return hand;
};

const getCardValue = (card) => {
  if (card === "A") return 1;
  if (card === "J") return 11;
  if (card === "Q") return 12;
  if (card === "K") return 13;
  return parseInt(card);
};

const isWin = (yourCard, opponentCard) => {
  const you = getCardValue(yourCard);
  const opp = getCardValue(opponentCard);
  if ([1, 2, 3].includes(you)) return [11, 12, 13].includes(opp);
  if ([11, 12, 13].includes(you)) return opp >= 4 && opp <= 10;
  if (you >= 4 && you <= 10) return [1, 2, 3].includes(opp);
  return false;
};

export default function App() {
  const [yourHand, setYourHand] = useState(getRandomHand());
  const [aiHand, setAiHand] = useState(getRandomHand());
  const [log, setLog] = useState([]);

  const handlePlay = (yourCard, index) => {
    const aiIndex = Math.floor(Math.random() * aiHand.length);
    const aiCard = aiHand[aiIndex];
    const win = isWin(yourCard, aiCard);
    const newLog = [
      `${yourCard} vs ${aiCard} → ${win ? "Win" : "Lose"}`,
      ...log
    ];

    const newYourHand = [...yourHand];
    const newAiHand = [...aiHand];

    if (win) newAiHand.splice(aiIndex, 1);
    else newYourHand.splice(index, 1);

    setYourHand(newYourHand);
    setAiHand(newAiHand);
    setLog(newLog);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>🧍 Your Hand</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {yourHand.map((card, i) => (
          <button
            key={i}
            onClick={() => handlePlay(card, i)}
            style={{ padding: "10px 20px", fontSize: 18 }}
          >
            {card}
          </button>
        ))}
      </div>

      <h2>🤖 AI has {aiHand.length} cards</h2>

      {yourHand.length === 0 && <p style={{ color: "
