export const getValidDelay = delay => {
  const valid = Number.parseInt(delay, 10)

  if (valid > 0 && valid !== Infinity) {
    return valid
  }

  return NaN
}

export const getExpireError = () => {
  const err = new Error('Promise expired')
  err.isPromiseExpired = true
  return err
}

export const isExpireError = (err) => {
  return err && err.isPromiseExpired
}
