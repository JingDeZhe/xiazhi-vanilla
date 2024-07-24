export function debounce(func, wait) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export function throttle(func, wait) {
  let inThrottle = false
  return function () {
    if (inThrottle) return
    const context = this
    const args = arguments
    func.apply(context, args)
    inThrottle = true
    setTimeout(() => {
      inThrottle = false
    }, wait)
  }
}

export const flattern = (arr) => {
  return arr.reduce((pv, cv) => {
    return Array.isArray(cv) ? pv.concat(flattern(cv)) : pv.concat(cv)
  }, [])
}

export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this.args)
    } else {
      return function (...args2) {
        return curried.apply(this, ...args.concat(args2))
      }
    }
  }
}
