// Pseudocode

// 1. Initialize DOM elements and game states

// 2. Randomly make the mole appear and disappear while playing

// 3. Handle the whacks and scoring

// 4. Include reset, timer, start game controls and loop the game

// 5. Add the necessary event listeners like the start button

//Queryselector for the gameboard
//3 part if statements for easy medium and hard
//if easy append 4 divs to gameboard with class of hole
//set inner html of each hole div to contain rock and mole image


const mainPage = document.querySelector('.mainPage')
//
const easyButton = document.querySelector('#easyButton')
const mediumButton = document.querySelector('#mediumButton')
const hardButton = document.querySelector('#hardButton')
//
const rulesPage = document.querySelector('.rulesPage')
//
const chosenMode = document.querySelector('#chosenMode')
//
const backButton = document.querySelector('#backButton')
const continueButton = document.querySelector('#continueButton')
//
const gamePage = document.querySelector('.gamePage')
//
const titleMode = document.querySelector('#titleMode')
//
const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
//
const gameboard = document.querySelector('.gameboard')
//
const timer = document.querySelector('#timer')
const score = document.querySelector('.score')
//

let currentDifficulty = ''

mainPage.style.display = 'block'
rulesPage.style.display = 'none'
gamePage.style.display = 'none'

function chooseDifficulty (difficulty) {
    currentDifficulty = difficulty
    chosenMode.textContent = difficulty
    mainPage.style.display = 'none'
    rulesPage.style.display = 'block'
}

easyButton.addEventListener('click', () => {
    chooseDifficulty('Easy Mode')
})

mediumButton.addEventListener('click', () => {
    chooseDifficulty('Medium Mode')
})

hardButton.addEventListener('click', () => {
    chooseDifficulty('Hard Mode')
})

backButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    mainPage.style.display = 'block'
})

// function setupGameboard () {
//     let hole = document.createElement('div')
//     hole.innerHTML='<img scr="./assets/mole.png" class="moleImg"> <img scr="./assets/rock.png" class="rockImg">'
//     if (currentDifficulty === easy) {
//              for (i=0;i<4;i++){
//             gameboard.appendChild(hole)
//         }else if (currentDifficulty === 'medium') {
//              for (i=0;i<6;i++){
//             gameboard.appendChild(hole)
//         }else {
//             for (i=0;i<9;i++){
//             gameboard.appendChild(hole)
//         }
//     }
// }
//     }
// }

continueButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    gamePage.style.display = 'block'
    titleMode.textContent = `Whack-A-Mole: ${currentDifficulty}`
    console.log(setupGameboard)
})

resetButton.addEventListener('click', () => {
    gamePage.style.display = 'none'
    mainPage.style.display = 'block'
    currentDifficulty = ''
    timer.textContent = ' 00:00'
    score.textContent = 'Score: 0'
    gameboard.innerHTML = ''
})


