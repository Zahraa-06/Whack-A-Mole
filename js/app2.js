// Pseudocode

// 1. Initialize DOM elements and game states

// 2. Randomly make the mole appear and disappear while playing

// 3. Handle the whacks and scoring

// 4. Include reset, timer, start game controls and loop the game

// 5. Add the necessary event listeners like the start button



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
const difficultySettings = {
    'Easy Mode': {showTime: 2500, appearInterval: 1500},
    'Medium Mode': {showTime: 2000, appearInterval: 1000},
    'Hard Mode': {showTime: 800, appearInterval: 800}
}
//

let gameInterval
let timerInterval
let holesNum = 0
let scoreCount = 0
let timeLeft = 60
let activeMole = null
let moleTimeout = null
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

function setupGameboard () {
    gameboard.innerHTML = ''
    gameboard.classList.remove('easyMode', 'mediumMode', 'hardMode')

    let gridClass

    if (currentDifficulty === 'Easy Mode') {
        holesNum = 4
        gridClass = 'easyMode'
    } else if (currentDifficulty === 'Medium Mode') {
        holesNum = 6
        gridClass = 'mediumMode'
    } else {
        holesNum = 9
        gridClass = 'hardMode'
    }

     gameboard.classList.add(gridClass)

    for (let i=0; i<holesNum;i++) {
        let hole = document.createElement('div')
        hole.className = 'hole'
        hole.id = `hole-${i}`
        hole.innerHTML = `<img src="./assets/mole.png" alt= "Mole" class="moleImg"> <img src="./assets/rock.png" alt="Rock" class="rockImg">`
        gameboard.appendChild(hole)

        const mole = hole.querySelector('.moleImg')
        const rock = hole.querySelector('.rockImg')

        hole.addEventListener('click', () => {
            if (mole.style.display === 'block') {
                scoreCount++
                score.textContent = `Score: ${scoreCount}`
                mole.style.display = 'none'
                rock.style.display = 'block'
            }
        })
    }    

}



function appearRandomMole() {
    const holes = document.querySelectorAll ('.hole')
    const holeDivs = [...holes]
    let randomHole
    console.log('appear')
    
    holeDivs.forEach(hole => {
        hole.addEventListener (() => {
            // appearRandomMole()

        }) 
    })

    // if (moleTimeout) {
        // clearTimeout(moleTimeout)
    //     moleTimeout = null
    // }

    // if (activeMole) {
    //     activeMole.firstChild.style.display = 'none'
    //     activeMole.lastChild.style.display = 'block'
    // }

    // do {
        num = Math.floor(Math.random() * holesNum) + 1
         randomHole = holeDivs [num-1]
    // } while (randomHole === activeMole && holesNum > 1) 
    console.log (holes)
    randomHole.firstChild.style.display = 'block'
    randomHole.lastChild.style.display = 'none'
    // activeMole = randomHole

    // const showTime = difficultySettings[currentDifficulty].showTime
    // moleTimeout = setTimeout (() => {
    //     if (activeMole) {
    //         activeMole.firstChild.style.display = 'none'
    //         activeMole.lastChild.style.display = 'block'
    //         activeMole = null
    //     }
    // }, showTime)
}

function startGame () {
    activeMole = null
    scoreCount = 0
    score.textContent = `Score: ${scoreCount}`
    timeLeft = 60
    // updateTimer()

    if (gameInterval) clearInterval(gameInterval)
    if (timerInterval) clearInterval(timerInterval)
    if (moleTimeout) clearTimeout(moleTimeout)

    appearRandomMole()
   
    // timerInterval = setInterval (() => {
    //     timeLeft--
    //     // updateTimer()
    //      if (timeLeft <= 0) {
    //         endGame();
    //     }
    // }, 1000)
}


continueButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    gamePage.style.display = 'block'
    titleMode.textContent = `Whack-A-Mole: ${currentDifficulty}`
    setupGameboard()
    // const showTime = difficultySettings[currentDifficulty].showTime
    // console.log('clicked')
    // moleTimeout = setTimeout (() => {
    //     console.log('timer started')
    //     appearRandomMole()
    // }, showTime)
    
})

startButton.addEventListener('click', startGame)

resetButton.addEventListener('click', () => {
    if (gameInterval) clearInterval(gameInterval)
    if (timerInterval) clearInterval(timerInterval)
    if (moleTimeout) clearTimeout(moleTimeout)

    gamePage.style.display = 'none'
    mainPage.style.display = 'block'
    currentDifficulty = ''
    timer.textContent = ' 00:00'
    score.textContent = 'Score: 0'
    scoreCount = 0
    gameboard.innerHTML = ''
    activeMole = null
})
