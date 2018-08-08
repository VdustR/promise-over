import { isExpireError } from './fn'
import over from './over'
import timeoutExpire from './timeout-expire'
import expire from './expire'
import timeout from './timeout'

const promiseOver = (pr, prDelay, ...args) => {
  pr = over(pr, prDelay)
  pr = timeoutExpire(pr, ...args)
  return pr
}

promiseOver.timeoutExpire = timeoutExpire
promiseOver.expire = expire
promiseOver.over = over
promiseOver.timeout = timeout
promiseOver.isExpireError = isExpireError

export default promiseOver
