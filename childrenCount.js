const data = [
  {
    id: "z234s-sd232-dd423",
    title: "中华人民共和国",
    parentId: "",
    children: [
      {
        id: "gsd23-dds31-dll42",
        title: "贵州省",
        parentId: "z234s-sd232-dd423",
        children: [
          {
            id: "gy023-87sd2-33dw2",
            title: "贵阳市",
            parentId: "gsd23-dds31-dll42",
          },
        ],
      },
      {
        id: "fj873-ops23-ys7ds",
        title: "福建省",
        parentId: "z234s-sd232-dd423",
      },
    ],
  },
]
// 设置每个节点的统计字段,并返回所有节点总数。
var toTreeCount = (data = [], countField = "count") => data.reduce((total, cur) => total + (cur[countField] = toTreeCount(cur.children || [], countField)), data.length)
toTreeCount(data, "childCount")

// const xY = []
// function data2XYDfs(value, newXy = []) {
//   value.forEach((item, index) => {
//     console.log(item)
//     // const range = { s: { c: 0, r: 0 }, e: { c: 0, r: item.children - 1 } }
//     // newXy.push(range)
//     if (item.children?.length) {
//       data2XYDfs(item.children)
//     } else {
//       console.log(item)
//     }
//   })
// }

// data2XYDfs(data, [])

function walkBFS(root) {
  if (root === null) return

  const queue = [...root]
  while (queue.length) {
    const item = queue.shift()
    // do something
    console.log(item.title)

    if (item.children?.length) queue.push(...item.children)
  }
}

walkBFS(data)
