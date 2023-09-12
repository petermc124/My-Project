//1. deposit some money
//2.determine number of lines to bet on
//3. collect a bet amount
//4.spin the slot machine
//5.check if the user won
//6.give the user their winnings
//7.play again

const prompt = require("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "b": 4,
    "c": 6,
    "d": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}

const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter Amount To Deposit: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid Deposit,Try Again")
    } else {
        return numberDepositAmount;
    }
}

};

const getNumberOfLines = () => {
    while (true) {
        const Lines = prompt("Enter Amount Of Lines To Bet on (1-3): ");
        const NumberOfLines = parseFloat(Lines);
    
        if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
            console.log("Invalid Line Amount,Try Again")
        } else {
            return NumberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter The Bet Per Line: ");
        const NumberBet = parseFloat(bet);
    
        if (isNaN(NumberBet) || NumberBet <= 0  || NumberBet > balance / lines) {
            console.log("Invalid Bet Amount,Try Again")
        } else {
            return NumberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for ( const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

 const reels = []
 for (i = 0; i < COLS; i++) {
   reels.push([]); 
    const reelSymbols = [...symbols];
    for (j = 0; j < ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);        
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
    }
 }
 
 return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([])
        for (let j = 0; j < COLS;j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
}

const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "A";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }

        }
        console.log(rowString)
    }
};

const getWInnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol!= symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winnings;
}

const game = () => {
let balance = deposit();

while (true) {
    console.log("you have a balance of $" + balance);
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines)
balance -= bet * numberOfLines;
const reels =  spin();
const rows = transpose(reels)
printRows(rows);
const winnings = getWInnings(rows, bet, numberOfLines)
balance += winnings;
console.log("you win!,$" + winnings.toString())

if (balance <= 0) {
console.log("you ran out of money");
break;
   }

   const playAgain = prompt("D you want to play again (y/n)?")

   if(playAgain != "y") break;
  }
};


game();