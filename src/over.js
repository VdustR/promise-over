import { getValidDelay } from './fn'

const over = (pr, delay) => {
  delay = getValidDelay(delay)

  if (delay) {
    return Promise.all([
      pr,
      new Promise(resolve => setTimeout(resolve, delay))
    ])
  }

  return pr
}

export default over
