"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var data = fs_1["default"].readFileSync('./input.txt', 'utf-8').split('\r\n');
var cardsStrength = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
var handTypes = { highCard: 1, onePair: 2, twoPair: 3, threeOfAKind: 4, fullHouse: 5, fourOfAKind: 6, fiveOfAKind: 7 };
var hands = data.map(function (e) {
    var _a = e.split(" "), hand = _a[0], bid = _a[1];
    return { hand: hand, bid: +bid };
});
function getType(hand) {
    var cardsCount = {};
    var countJokers = hand.split("").filter(function (e) { return e === 'J'; }).length;
    for (var _i = 0, hand_1 = hand; _i < hand_1.length; _i++) {
        var c = hand_1[_i];
        if (c === 'J') {
            continue;
        }
        cardsCount[c] = cardsCount[c] ? cardsCount[c] + 1 : 1;
    }
    var eachCardsCount = Object.values(cardsCount).sort(function (a, b) { return b - a; });
    var uniqueCardsCount = eachCardsCount.length;
    // Five of a kind (JJJJJ) (2JJJJ) (22JJJ) (222JJ) (2222J) (22222)
    if (uniqueCardsCount === 1 || countJokers === 5) {
        return handTypes.fiveOfAKind;
    }
    else if (uniqueCardsCount === 2) {
        // Full house (2233J) (22333)
        if ((countJokers === 0 && eachCardsCount[0] === 3) || (eachCardsCount[0] === 2 && eachCardsCount[1] === 2)) {
            return handTypes.fullHouse;
        }
        // Four of a kind (23JJJ) (233JJ) (2333J) (23333)
        return handTypes.fourOfAKind;
    }
    else if (uniqueCardsCount === 3) {
        // Two pair (23344)
        if (countJokers === 0 && eachCardsCount[0] === 2) {
            return handTypes.twoPair;
        }
        // Three of a kind (234JJ) (2344J) (23444)
        return handTypes.threeOfAKind;
    }
    // One pair (2345J) (23455)
    else if (uniqueCardsCount === 4) {
        return handTypes.onePair;
    }
    // High card (23456)
    // High card (23456)
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
