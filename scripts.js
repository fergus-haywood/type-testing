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
let accuracy = 0
let charactersTyped = 0
let currentWord = ''
let timer = null

// game functions

let testList = []

function generateTest() {
  testList = []
  for (let i = 0; i < testWordSize; i++) {
    let index = Math.floor(Math.random() * testWordSize)
    testList.push(commonWords[index])
  }

  wordsArea.innerHTML = ''

  testList.forEach((x) => {
    const span = document.createElement('span')
    x += ' '
    span.innerHTML = x
    wordsArea.appendChild(span)
  })
}

function restartTest() {
  inputArea.value = ''
  generateTest()
}

startBtn.addEventListener('click', generateTest)
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
}
