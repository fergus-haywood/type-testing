const commonWords = [
  'the',
  'of',
  'and',
  'a',
  'to',
  'in',
  'is',
  'you',
  'that',
  'it',
  'he',
  'was',
  'for',
  'on',
  'are',
  'as',
  'with',
  'his',
  'they',
  'I',
  'at',
  'be',
  'this',
  'have',
  'from',
  'or',
  'one',
  'had',
  'by',
  'word',
  'but',
  'not',
  'what',
  'all',
  'were',
  'we',
  'when',
  'your',
  'can',
  'said',
  'there',
  'use',
  'an',
  'each',
  'which',
  'she',
  'do',
  'how',
  'their',
  'if',
  'will',
  'up',
  'other',
  'about',
  'out',
  'many',
  'then',
  'them',
  'these',
  'so',
  'some',
  'her',
  'would',
  'make',
  'like',
  'him',
  'into',
  'time',
  'has',
  'look',
  'two',
  'more',
  'write',
  'go',
  'see',
  'number',
  'no',
  'way',
  'could',
  'people',
  'my',
  'than',
  'first',
  'water',
  'been',
  'call',
  'who',
  'oil',
  'its',
  'now',
  'find',
  'long',
  'down',
  'day',
  'did',
  'get',
  'come',
  'made',
  'may',
  'part',
]
// els variables

const wordsArea = document.querySelector('#words-area')
const inputArea = document.querySelector('#test-input')
const startBtn = document.querySelector('#start-test-btn')
const restartBtn = document.querySelector('#restart-test-btn')
const introEl = document.querySelector('#intro-text')

//stats variables

const currentWpmEl = document.querySelector('#current_wpm')
const currentErrorsEl = document.querySelector('#current_errors')
const currentTimeEl = document.querySelector('#current_time')
const currentAccuracyEl = document.querySelector('#current_accuracy')

// test variables

let testWordSize = 100
let testTimeLimit = 0
let testTimeLeft = 0
let testTimeElapsed = 0
let testErrors = 0
let testCpm = 0
let testWpm = testCpm / 5
let charactersTyped = 0
let testAccuracy = 0
let currentWord = ''
let timer = null

// init mapping

currentErrorsEl.innerHTML = testErrors
currentTimeEl.innerHTML = testTimeLeft
introEl.innerHTML = 'Click start to begin the test'

// game functions

let testList = []

function startTest() {
  resetValues()
  testList = []

  for (let i = 0; i < testWordSize; i++) {
    let index = Math.floor(Math.random() * testWordSize)
    testList.push(commonWords[index])
  }

  clearInterval(timer)

  wordsArea.innerHTML = ''
  currentTimeEl.innerHTML = testTimeLeft

  testList
    .join(' ')
    .split('')
    .forEach((x) => {
      const span = document.createElement('span')
      span.innerHTML = x
      wordsArea.appendChild(span)
    })
  startBtn.style.display = 'none'
  restartBtn.style.display = 'block'
  introEl.innerHTML = 'Click to Restart Test'
}

function restartTest() {
  startTest()
}

function processText() {
  let currentInput = inputArea.value
  let currentInputArray = currentInput.split('')
  let wordsArray = testList.join(' ').split('')
  let currentInputIndex = currentInputArray.length - 1
  let currentInputChar = currentInputArray[currentInputIndex]
  let currentTestChar = wordsArray[currentInputIndex]

  testAccuracy = testErrors / charactersTyped

  if (isNaN(testAccuracy)) {
    testAccuracy = 1
  }

  if (charactersTyped === 0) {
    timer = setInterval(updateTimer, 1000)
  }

  //scroll up when getting low

  if (charactersTyped % 130 === 0 && charactersTyped != 0) {
    wordsArea.style.bottom = `${charactersTyped - 30}px`
    inputArea.style.bottom = `${charactersTyped - 30}px`
  }

  let wordsSpanArr = document.querySelectorAll('span')
  // need to make backspaces remove characters and if theres an error, remove the error
  if (currentInputChar === currentTestChar) {
    wordsSpanArr[currentInputIndex].classList.remove('error')
    wordsSpanArr[currentInputIndex].classList.add('correct')
  } else {
    testErrors++
    wordsSpanArr[currentInputIndex].classList.remove('correct')
    wordsSpanArr[currentInputIndex].classList.add('error')
  }
  charactersTyped++
  currentErrorsEl.innerHTML = testErrors
  currentAccuracyEl.innerHTML = `${Math.floor(100 - testAccuracy * 100)}%`
}

function resetValues() {
  testErrors = 0
  charactersTyped = 0
  testTimeLeft = 60
  testTimeElapsed = 0
  testAccuracy = 0
  wordsArea.style.bottom = '0px'
  inputArea.style.bottom = '0px'
  inputArea.value = ''
  inputArea.disabled = false
}

function updateTimer() {
  if (testTimeLeft > 0) {
    testTimeElapsed++
    testTimeLeft--
    testCpm = Math.floor(
      ((charactersTyped * (1 - testAccuracy)) / testTimeElapsed) * 60
    )
    testWpm = testCpm / 5
    currentWpmEl.innerHTML = testWpm
    currentTimeEl.innerHTML = testTimeLeft
  } else {
    introEl.innerHTML = 'Click restart to play again'
    finishGame()
  }
}

function finishGame() {
  inputArea.disabled = true
}

startBtn.addEventListener('click', startTest)
restartBtn.addEventListener('click', restartTest)
