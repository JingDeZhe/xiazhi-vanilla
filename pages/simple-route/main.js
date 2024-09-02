/**
 * 简单的路由实现
 */

import htm from 'htm'
import vhtml from 'vhtml'

const html = htm.bind(vhtml)
import './main.css'
const app = document.querySelector('#app')
const links = document.createElement('div')
links.className = 'links'
const content = document.createElement('div')
app.appendChild(links)
app.appendChild(content)

const routes = [
  {
    path: 'home',
    element: html`<div class="home">主页</div>`,
  },
  {
    path: 'about',
    element: html`<div class="about">关于</div>`,
  },
  {
    ignore: true,
    path: '*',
    element: html`<div class="home">空白页</div>`,
  },
]

function renderLinks() {
  const frag = document.createDocumentFragment()
  for (const v of routes) {
    if (v.ignore) continue
    const link = document.createElement('a')
    link.href = v.path
    link.innerText = v.path
    link.addEventListener('click', (e) => {
      e.preventDefault()
      window.history.pushState(v, null, `#${v.path}`)
      renderRoute(v.path)
    })
    frag.appendChild(link)
  }
  links.appendChild(frag)
}

function renderRoute(path = '*') {
  const route = routes.find((d) => d.path === path)
  if (!route) {
    content.innerHTML = `没有匹配的路由：${path}`
  } else {
    content.innerHTML = route.element
  }
}

renderLinks()

window.addEventListener('popstate', (e) => {
  console.log('state:', e.state)
  renderRoute(e.state.path)
})
