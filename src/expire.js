import {
  getExpireError,
  getValidDelay
} from './fn'

const expire = (pr, delay, err = getExpireError()) => {
  delay = getValidDelay(delay)

  if (delay) {
    pr = Promise.race([
      pr,
      new Promise((resolve, reject) => setTimeout(() => reject(err), delay))
    ])
  }

  return pr
}

export default expire
