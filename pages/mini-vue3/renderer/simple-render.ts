type VNode = {
  tag: string | Function
  props?: Record<string, any>
  children?: string | VNode[]
}

function render(vnode: VNode, el = document.body) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, el)
  } else {
    mountComponent(vnode, el)
  }
}

/**挂载普通HTML标签 */
function mountElement(vnode: VNode, ctn: HTMLElement) {
  const el = document.createElement(<string>vnode.tag)
  for (const k in vnode.props) {
    if (/^on/.test(k)) {
      el.addEventListener(k.slice(2).toLowerCase(), vnode.props[k])
    } else {
      el.setAttribute(k, vnode.props[k])
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((child) => render(child, el))
  }

  ctn.appendChild(el)
}

/**挂载组件 */
function mountComponent(vnode: VNode, el: HTMLElement) {
  // subtree是vnode而不是HTMLElement
  const subtree = (<Function>vnode.tag)()
  render(subtree, el)
}

render({
  tag: 'div',
  props: {
    onClick: () => alert('hello'),
  },
  children: [
    { tag: 'h1', children: '基本渲染器' },
    { tag: 'p', children: '点击弹出', props: { onClick: () => alert('文本') } },
    {
      tag: () => {
        return { tag: 'p', children: '组件内容', props: { onClick: () => alert('组件内容') } }
      },
    },
  ],
})
