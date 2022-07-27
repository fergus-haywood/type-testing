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

const input = document.querySelector('#test-input')
const wordsArea = document.querySelector('#words-area')
const inputArea = document.querySelector('#test-input')
const startBtn = document.querySelector('#start-test-btn')
const restartBtn = document.querySelector('#restart-test-btn')

//stats variables

const currentWpmEl = document.querySelector('#current_wpm')
const currentErrorsEl = document.querySelector('#current_errors')
const currentTimeEl = document.querySelector('#current_time')
const currentAccuracyEl = document.querySelector('#current_accuracy')

// test variables

let testWordSize = 75
let testTimeLimit = 0
let testTimeLeft = 0
let testErrors = 0
let testWpm = 0
let charactersTyped = 0
let testAccuracy = 0
let currentWord = ''
let timer = null

// init mapping stats

currentErrorsEl.innerHTML = testErrors
currentTimeEl.innerHTML = testTimeLeft

// game functions

let testList = []

function startTest() {
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
}

function restartTest() {
  inputArea.value = ''
  startTest()
}

startBtn.addEventListener('click', startTest)
restartBtn.addEventListener('click', restartTest)

//Getting the current value of the input box
//Coloring the characters of the word text
// Calculating the errors and accuracy
//Moving to next quote

function processText() {
  let currentInput = inputArea.value
  let currentInputArray = currentInput.split('')
  let wordsArray = testList.join(' ').split('')
  let currentInputIndex = currentInputArray.length - 1
  let currentInputChar = currentInputArray[currentInputIndex]
  let currentTestChar = wordsArray[currentInputIndex]

  testAccuracy = Math.floor(testErrors / charactersTyped)

  if (isNaN(testAccuracy)) {
    testAccuracy = 1
  }

  if (charactersTyped === 1) {
    timer = setInterval(updateTimer, 1000)
  }
  if (testTimeLeft == 0) {
    finishGame()
  }

  let wordsSpanArr = document.querySelectorAll('span')
  // need to make backspaces remove characters and if theres an error, remove the error

  if (currentInputChar === currentTestChar) {
    wordsSpanArr[currentInputIndex].classList.remove('remove')
    wordsSpanArr[currentInputIndex].classList.add('correct')
  } else {
    testErrors++
    wordsSpanArr[currentInputIndex].classList.remove('correct')
    wordsSpanArr[currentInputIndex].classList.add('error')
  }

  charactersTyped++
  currentWpmEl.innerHTML = getWpm()
  currentErrorsEl.innerHTML = testErrors
  currentAccuracyEl.innerHTML = `${100 - testAccuracy * 100}%`
  console.log(testAccuracy)
}

function getWpm() {
  let wpm = (charactersTyped * testAccuracy) / (60 - testTimeLeft)
  return wpm
}
function clearInterval() {
  testErrors = 0
  testWpm = 0
  charactersTyped = 0
  testTimeLeft = 60
}

function updateTimer() {
  testTimeLeft--
  currentTimeEl.innerHTML = testTimeLeft
}

function finishGame() {
  inputArea.disabled = true
}
