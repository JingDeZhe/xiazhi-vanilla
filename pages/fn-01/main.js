import './main.css'
import { debounce, flattern, throttle } from './utils'
const app = document.querySelector('#app')
app.innerHTML = 'fn-01'

const handleDebouncedResize = debounce(function () {
  console.log('debounced resized')
}, 300)

const handleThrottleResize = throttle(function () {
  console.log('throttle resized')
}, 1000)

window.addEventListener('resize', handleDebouncedResize)
window.addEventListener('resize', handleThrottleResize)

console.log(flattern([1, 2, [3, 4, [5, 6, [7, 8]]], 9, 10, [11, 12, [13, 14]]]))
