import { ListNode } from './util'

export const mergeTwoArrays = (list1, list2) => {
  if (!list1 || !list2) return [...(list1 || []), ...(list2 || [])]
  let p1 = 0
  let p2 = 0
  const len1 = list1.length
  const len2 = list2.length
  const res = []
  while (p1 < len1 && p2 < len2) {
    if (list1[p1] <= list2[p2]) {
      res.push(list1[p1])
      p1 += 1
    } else {
      res.push(list2[p2])
      p2 += 1
    }
  }
  if (p1 === len1) return res.concat(list2.slice(p2))
  if (p2 === len2) return res.concat(list1.slice(p1))

  return res
}

export const mergeTwoLists = (list1, list2) => {
  const dummy = new ListNode()
  let p = dummy
  let p1 = list1
  let p2 = list2

  while (p1 !== null && p2 !== null) {
    if (p1.val <= p2.val) {
      p.next = p1
      p1 = p1.next
    } else {
      p.next = p2
      p2 = p2.next
    }
    p = p.next
  }

  if (p1 !== null) p.next = p1
  if (p2 !== null) p.next = p2

  return dummy.next
}

export const partition = (head, x) => {
  const dummy1 = new ListNode()
  let p1 = dummy1
  const dummy2 = new ListNode()
  let p2 = dummy2
  let p = head

  while (p !== null) {
    if (p.val < x) {
      p1.next = p
      p1 = p1.next
    } else {
      p2.next = p
      p2 = p2.next
    }
    // 注意这里要避免形成环
    const t = p.next
    p.next = null
    p = t
  }

  p1.next = dummy2.next
  return dummy1.next
}
