const swap = (arr, i, j) => {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

/**
 * 冒泡排序，将最大的值一步步上浮到数组末尾
 */
export const bubbleSort = (originalArray) => {
  const arr = [...originalArray]
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}

/**
 * 插入排序，类似扑克牌理牌的过程，将后面未排序部分的值插入到前面已排序部分的正确位置
 */
export const insertionSort = (originalArray) => {
  const arr = [...originalArray]
  const len = arr.length

  for (let i = 1; i < len; i++) {
    const k = arr[i] // 当前需要插入到前面的元素
    let j = i - 1 // 前面已排序部分的最后一个

    while (j >= 0 && arr[j] > k) {
      arr[j + 1] = arr[j]
      j -= 1
    }
    arr[j + 1] = k // 插入到不小于k值的后一位
  }
  return arr
}

/**
 * 选择排序，将后面未排序部分的值中的最小值发到已排序部分的末尾
 */
export const selectionSort = (originalArray) => {
  const arr = [...originalArray]
  const len = arr.length

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) swap(arr, i, minIndex)
  }

  return arr
}

/**
 * 快速排序，采用分治策略，先将待排序数组分为两部分，左侧部分小于右侧部分，然后对左右两侧再进行快速排序
 */
export const quickSort = (originalArray) => {
  const arr = [...originalArray]
  return _quickSort(arr)
}

const _quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const partitionIndex = _partition(arr, left, right)
    _quickSort(arr, left, partitionIndex - 1)
    _quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

const _partition = (arr, left, right) => {
  const pivot = arr[right]
  let i = left
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j)
      i += 1
    }
  }
  swap(arr, right, i)
  return i
}

/**
 * 归并排序，将待排序数组分成两半，然后对两半的数组进行归并排序，直到每个数组的元素个数小于2，再将数字合起来
 */
export const mergeSort = (originalArray) => {
  const arr = [...originalArray]
  return _mergeSort(arr)
}

const _mergeSort = (arr) => {
  if (arr.length <= 1) return arr
  const middle = Math.floor(arr.length / 2)
  const leftArr = _mergeSort(arr.slice(0, middle))
  const rightArr = _mergeSort(arr.slice(middle))
  return _merge(leftArr, rightArr)
}

const _merge = (left, right) => {
  const res = []
  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      res.push(left[leftIndex])
      leftIndex += 1
    } else {
      res.push(right[rightIndex])
      rightIndex += 1
    }
  }

  if (leftIndex < left.length) {
    res.push(...left.slice(leftIndex))
  }

  if (rightIndex < right.length) {
    res.push(...right.slice(rightIndex))
  }

  return res
}

/**
 * 希尔排序，是基于插入排序的一种实现，以不同的间隔对待排序速度进行插入排序
 */
export const shellSort = (originalArray) => {
  const arr = [...originalArray]
  const len = arr.length
  let gap = Math.floor(len / 2)

  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      const k = arr[i]
      let j = i - gap
      while (j >= 0 && arr[j] > k) {
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = k
    }
    gap = Math.floor(gap / 2)
  }

  return arr
}

/**
 * 基数排序
 */
export const radixSort = (originalArray) => {
  const arr = [...originalArray]
  const len = arr.length
}
