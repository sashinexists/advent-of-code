"use strict";

class Room {
    constructor(input) {
        this.encryptedName = input.slice(0, input.length-12);
        this.sectorID = Number(input.slice(input.length-11, input.length-8));
        this.checksum = input.slice(input.length-7, input.length-2);
    }

    determineExpectedChecksum() {
        let name = deleteAllOfASpecificCharacter(this.encryptedName, "-");
        let expected = "";
        while (expected.length<5) {
            const HIGHEST = findHighestFrequency(name);
            const MOST_COMMON_CHARACTERS = findCharactersWithFrequency(name, HIGHEST);
            name = removeMatchingCharacters(name, MOST_COMMON_CHARACTERS);
            expected += MOST_COMMON_CHARACTERS.sort().join("");
        }
        return expected.slice(0,5);   
    }

    verify() {
        return this.checksum === this.determineExpectedChecksum();
    }

    decryptName() {
        return this.encryptedName
            .split("")
            .map(char => char === "-" ? " " : decryptLetter(char, this.sectorID))
            .join("");
            
    }
}

function init(input) {
    let sectorIDSum = 0;
    const KEY_TO_STORAGE = input.find((roomKey)=>{
        const ROOM = new Room(roomKey);
        return ROOM.verify() && ROOM.decryptName() === "northpole object storage";
    })
    const NORTH_POLE_OBJECT_STORAGE = new Room(KEY_TO_STORAGE);
    return NORTH_POLE_OBJECT_STORAGE.sectorID;
}

function findCharactersWithFrequency(str, frequency) {
    const FREQUENCIES = findFrequencyOfEachCharacter(str);
    const OUTPUT = [];
    for (let letter in FREQUENCIES) {
        if(FREQUENCIES[letter]===frequency) {
            OUTPUT.push(letter);
        }
    }
    return OUTPUT;
}

function removeMatchingCharacters(str, chars) {
    chars.forEach(char => str = deleteAllOfASpecificCharacter(str, char));
    return str;
}

function deleteAllOfASpecificCharacter(str, char) {
    return str.split("")
            .filter(letter => letter!==char)
            .join("");
}

function findHighestFrequency(str) {
    const FREQUENCIES = findFrequencyOfEachCharacter(str);
    let highestFrequency = 0;
    for (let letter in FREQUENCIES) {
        if(FREQUENCIES[letter]>highestFrequency) {
            highestFrequency = FREQUENCIES[letter];
        }
    }
    return highestFrequency;
}


function findFrequencyOfEachCharacter(str) {
    const STRING_ARRAY = str.split("");
    const COUNT = {};
    STRING_ARRAY.forEach(char => COUNT[char] ? COUNT[char]+=1 : COUNT[char]=1);
    return COUNT;
}

function decryptLetter(letter, key) {
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    let position = ALPHABET.indexOf(letter) + key;
    while(position>=ALPHABET.length) {
        position -= ALPHABET.length;
    }
    return ALPHABET[position];
}

function readInput() {
    const fs = require('fs');
    return fs.readFileSync("input/day4.txt", "utf8");
}

function parseInput(input) {
    return input.split("\n");
}

(
    function run() {
        console.log(init(parseInput(readInput())));
    }
)();
