import timeout from './timeout'
import expire from './expire'

const timeoutExpire = (pr, timeoutFn, timeoutDelay, expireDelay, expireError) => {
  pr = expire(pr, expireDelay, expireError)
  pr = timeout(pr, timeoutFn, timeoutDelay)
  return pr
}

export default timeoutExpire
