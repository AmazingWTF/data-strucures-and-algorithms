export function print (head) {
  let arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  console.log(arr)
}

export class ListNode {
  constructor (val) {
    this.val = val
    this.next = null
  }
}

export function genLinkedList (list = []) {
  let head = null
  let prev = null
  let len = list.length
  let count = 0
  while (count < len) {
    let node = new ListNode(list[count])
    if (head === null) {
      head = node
    } else {
      prev.next = node
    }
    prev = node
    count++
  }
  return head
}

export class Solution {
  constructor () {
    this.caches = new Map()
  }

  copyRandomList (head) {
    if (String(head) !== '[object Object]') return null

    if (this.caches.has(head)) {
      return head
    }

    let node = new ListNode(head.val, null, null)

    this.caches.set(head, 1)
    node.next = this.copyRandomList(head.next)
    node.random = this.copyRandomList(head.random)

    return node
  }
}
