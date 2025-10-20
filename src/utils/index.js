export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const getUniqueRandomNumbers = (min, max, count) => {
  const numbers = []

  while (numbers.length < count) {
    const number = getRandomNumber(min, max)

    if (!numbers.includes(number)) {
      numbers.push(number)
    }
  }

  return numbers
}
