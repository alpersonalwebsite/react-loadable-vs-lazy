// The artificial delay that makes the loading states visible.
//
// The old form was, in each of the three loaders:
//
//   let timer = await new Promise(resolve => setTimeout(resolve, 7000))
//   clearTimeout(timer)
//
// which does not do what it looks like. `timer` is the promise's RESOLVED VALUE, and
// that promise resolves with nothing, so `timer` is undefined and clearTimeout(undefined)
// cancels nothing. setTimeout's actual handle was never captured. It reads like cleanup
// and is dead code.
//
// Also: 7, 9 and 11 seconds is a long time to stare at a blank page. One second is
// enough to see a fallback render, and DELAY_MS is one place to change it.
export const DELAY_MS = 1000

export const delay = (ms = DELAY_MS) => new Promise(resolve => setTimeout(resolve, ms))
