export class ListNode {
  constructor(v, next) {
    this.val = v || null
    this.next = next || null
  }

  toArray() {
    const res = []
    let p = this
    while (p) {
      res.push(p.val)
      p = p.next
    }
    return res
  }
}

export const array2list = (arr) => {
  const dummy = new ListNode()
  let p = dummy
  for (const v of arr) {
    p.next = new ListNode(v)
    p = p.next
  }
  return dummy.next
}
