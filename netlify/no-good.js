import badWords from "badwords/array"

const hello = ["hello", "helo", "helllo", "helloo", "hellooo"]
const hi = ["hi", "hii", "hiii", "hiiii", "hhi"]
const ws = ["how", "what"]
const pronoun = ["hun", "honey", "sweetie", "baby", "bae", "babe"]
const time = ["today", "morning", "night", "day", "date"]
const developer = ["developer", "coder", "programmer"]

const noGood = [
  ...badWords,
  ...hello,
  ...hi,
  ...ws,
  ...pronoun,
  ...time,
  ...developer,
  "doing",
  "you",
  "there",
  "nice",
  "meet",
  "a",
]

export default noGood
