import { expect, test } from 'vitest'
import { mergeTwoArrays, mergeTwoLists, partition } from './double-pointer'
import { array2list as a2l } from './util'

test('合并两个有序数组', () => {
  expect(mergeTwoArrays([1, 2, 4], [1, 3, 4])).toEqual([1, 1, 2, 3, 4, 4])
  expect(mergeTwoArrays([], [1])).toEqual([1])
  expect(mergeTwoArrays([], [])).toEqual([])
})

test('合并两个有序链表', () => {
  expect(mergeTwoLists(a2l([1, 2, 4]), a2l([1, 3, 4])).toArray()).toEqual([1, 1, 2, 3, 4, 4])
  expect(mergeTwoLists(a2l([]), a2l([1])).toArray()).toEqual([1])
  expect(mergeTwoLists(a2l([]), a2l([]))).toBeNull()
})

test('分隔链表', () => {
  expect(partition(a2l([1, 4, 3, 2, 5, 2]), 3).toArray()).toEqual([1, 2, 2, 4, 3, 5])
})
