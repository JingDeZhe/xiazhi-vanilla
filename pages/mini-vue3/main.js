import './main.css'

const app = document.querySelector('#app')

const data = { text: 'hello' }

const obj = new Proxy(data, {
  get(target, key, reciever) {
    track(target, key)
    return Reflect.get(target, key, reciever)
  },
  set(target, key, newVal) {
    Reflect.set(target, key, newVal)
    trigger(target, key)
    return true
  },
})

const bucket = new WeakMap()
let activeEffect

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach((fn) => fn())
}

function effect(fn) {
  activeEffect = fn
  fn()
}

effect(() => {
  app.innerHTML = obj.text
})

setTimeout(() => {
  obj.text = 'sss'
}, 1000)
