import badWords from "badwords/array"

const hello = ["hello", "helo", "helllo", "helloo", "hellooo"]
const hi = ["hi", "hii", "hiii", "hiiii", "hhi", "hey"]
const ws = ["how", "what"]
const pronoun = ["hun", "honey", "sweetie", "baby", "bae", "babe"]
const time = ["today", "morning", "night", "day", "date"]
const developer = ["developer", "coder", "programmer"]
const beautiful = ["beautiful", "pretty"]

const noGood = [
  ...badWords,
  ...hello,
  ...hi,
  ...ws,
  ...pronoun,
  ...time,
  ...developer,
  ...beautiful,
  "good",
  "doing",
  "you",
  "there",
  "nice",
  "meet",
  "a",
]

export default noGood
