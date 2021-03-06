# promise-over

[![NPM](https://nodei.co/npm/promise-over.png)](https://nodei.co/npm/promise-over/)

A promise extension for over duration, timeout, and expiration.

## Install

```bash
npm i promise-over
# or using yarn
yarn add promise-over
```

CDN:

```html
<script src="https://unpkg.com/promise-over/dist/promiseOver.umd.min.js"></script>
```

Notice that `promise-finally` [polyfill](https://github.com/tc39/proposal-promise-finally/blob/master/polyfill.js) is required if you want to support browsers not supporting `promise-finally`.

## Usage

### Essential

```javascript
// es5
var promiseOver = require('promise-over')
// es6+
import promiseOver from 'promise-over'
// tree shaking(babel is required)
import promiseOver from 'promise-over/src/promise-over'
import expire from 'promise-over/src/expire'
import over from 'promise-over/src/over'
import timeoutExpire from 'promise-over/src/timeout-expire'
import timeout from 'promise-over/src/timeout'

promiseOver.over(asyncMethod, 5000).then(() => {
  // this will be called after over 5 seconds
})

promiseOver.timeout(asyncMethod, () => {
  // This would be called if `asyncMethod` was not resolved(or rejected) yet in 5 seconds
}, 5000)

promiseOver.expire(asyncMethod, 5000, new Error('Expired!!!'))
// An error with message `Expired!!!` would be thrown if `asyncMethod` was not resolved(or rejected) yet in 5 seconds
```

### Advanced

```javascript
// promiseOver = over + timeout + expire
promiseOver(asyncMethod, overDelay, [timeoutFunction, timeoutDelay], [expireDelay[, thrownOnExpired]])

promiseOver(getPeople(), 1000)
// the same as promiseOver.over(getPeople(), 1000)

promiseOver(getPeople(), 1000, () => showWaitingMessage(), 1000, 5000)

// timeoutExpire = timeout + expire
promiseOver.timeoutExpire(asyncMethod, timeoutFunction, timeoutDelay, [expireDelay[, thrownOnExpired])

promiseOver.timeoutExpire(getPeople(), () => showWaitingMessage(), 1000)
// the same as promiseOver.timeout(getPeople(), () => showWaitingMessage(), 1000)

// example:
promiseOver.timeoutExpire(getPeople(), () => showWaitingMessage(), 1000, 5000)
  .catch(err => {
    if (promiseOver.isExpireError(err)) {
      showExpiredMessage()
    }
  )

// with async / await
try {
  await promiseOver(getPeople(), () => showWaitingMessage(), 1000, 5000)
} catch(err) {
  if (promiseOver.isExpireError(err)) {
    showExpiredMessage()
  }
}
```

## Demo

Check timeline [here](https://vdustr.github.io/promise-over).
