import { getValidDelay } from './fn'

const timeout = (pr, fn, delay) => {
  delay = getValidDelay(delay)

  if (typeof fn === 'function' && delay) {
    const to = setTimeout(fn, delay)
    pr = pr.finally(() => clearTimeout(to))
  }

  return pr
}

export default timeout
