"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var data = fs_1["default"].readFileSync('./input.txt', 'utf-8').split('\r\n');
var cardsStrength = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
var handTypes = { highCard: 1, onePair: 2, twoPair: 3, threeOfAKind: 4, fullHouse: 5, fourOfAKind: 6, fiveOfAKind: 7 };
var hands = data.map(function (e) {
    var _a = e.split(" "), hand = _a[0], bid = _a[1];
    return { hand: hand, bid: +bid };
});
// Generic in Function
function getType(hand) {
    var cardsCount = {};
    for (var _i = 0, hand_1 = hand; _i < hand_1.length; _i++) {
        var c = hand_1[_i];
        cardsCount[c] = cardsCount[c] ? cardsCount[c] + 1 : 1;
    }
    var eachCardsCount = Object.values(cardsCount).sort(function (a, b) { return b - a; });
    var uniqueCardsCount = eachCardsCount.length;
    // Five of a kind
    if (uniqueCardsCount === 1) {
        return handTypes.fiveOfAKind;
    }
    // Four of a kind
    else if (uniqueCardsCount === 2 && eachCardsCount[0] === 4) {
        return handTypes.fourOfAKind;
    }
    // Full house
    else if (uniqueCardsCount === 2 && eachCardsCount[0] === 3) {
        return handTypes.fullHouse;
    }
    // Three of a kind
    else if (uniqueCardsCount === 3 && eachCardsCount[0] === 3) {
        return handTypes.threeOfAKind;
    }
    // Two pair
    else if (uniqueCardsCount === 3 && eachCardsCount[0] === 2) {
        return handTypes.twoPair;
    }
    // One pair
    else if (uniqueCardsCount === 4 && eachCardsCount[0] === 2) {
        return handTypes.onePair;
    }
    // High card
    else {
        return handTypes.highCard;
    }
}
hands.sort(function (h1, h2) {
    var h1Type = getType(h1.hand);
    var h2Type = getType(h2.hand);
    // if same type then compare cards
    if (h1Type === h2Type) {
        for (var i = 0; i < 5; i++) {
            var card1Strength = cardsStrength.indexOf(h1.hand[i]);
            var card2Strength = cardsStrength.indexOf(h2.hand[i]);
            if (card1Strength === card2Strength) {
                continue;
            }
            else {
                return card1Strength - card2Strength;
            }
        }
        return 0;
    }
    else {
        return h1Type - h2Type;
    }
});
var totalWinnings = 0;
for (var i = 0; i < hands.length; i++) {
    totalWinnings += hands[i].bid * (i + 1);
}
console.log(totalWinnings);
