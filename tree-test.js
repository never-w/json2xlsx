var xlsx = require("node-xlsx").default
const fs = require("fs")

const v = [
  {
    id: 0,
    name: "财务中心1",
    routes: [
      {
        name: "批发管理1-1",
        routes: [
          {
            name: "批发管理1-1-1",
          },
          {
            name: "批发管理1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "财务中心2",
    routes: [
      {
        name: "批发管理2-1",
        routes: [
          {
            name: "批发管理2-1-1",
          },
          {
            name: "批发管理2-1-2",
          },
        ],
      },
    ],
  },
]

// 为每一项添加id
function dfs(values, _id) {
  values?.forEach((item) => {
    if (item.routes?.length) {
      if (!item.id) {
        item.id = _id
      }
      dfs(item.routes, item.id)
    } else {
      if (!item.id) {
        item.id = _id
      }
    }
  })
}
dfs(v, 0)

// treeData格式化为表单形式的一行一行的数组
const newData = []
let num = 0
function dfs2(values, depth, newArr, _id) {
  values?.forEach((item) => {
    if (item.routes?.length) {
      dfs2(item.routes, depth + 1, [...newArr, item.name], item.id)
    } else {
      num = Math.max(num, depth)
      newData.push([...newArr, item.name, item.id])
    }
  })
}
dfs2(v, 0, [], 0)

console.log(newData)

// 集合
// const newValues = []
// let newArr = []
// for (let i = 0; i < newData.length; i++) {
//   if (newData[i]?.[newData[i]?.length - 1] === newData[i + 1]?.[newData?.[i + 1]?.length - 1]) {
//     newArr.push(newData[i])
//   } else {
//     newArr.push(newData[i])
//     newValues.push({ [newData[i]?.[newData[i]?.length - 1]]: newArr })
//     newArr = []
//   }
// }
// // console.log(JSON.stringify(newValues))

// const range = [
//   //   { s: { c: 1, r: 0 }, e: { c: 1, r: 5 } },
//   //   { s: { c: 0, r: 0 }, e: { c: 0, r: 2 } },
// ]

// newValues.forEach((item, index, arr) => {
//   if (index === 0) {
//     range[0] = { s: { c: 0, r: index }, e: { c: 0, r: item[index].length - 1 } }
//   } else if (index > 0) {
//     range[index] = { s: { c: 0, r: Object.values(arr[index - 1])[0].length }, e: { c: 0, r: Object.values(arr[index - 1])[0].length + item[index]?.length - 1 } }
//   }
// })

// const sheetOptions = { "!merges": [...range] }
// var buffer = xlsx.build([{ name: "mySheetName", data: newData }], { sheetOptions }) // Returns a buffer

// fs.writeFile("output.xlsx", buffer, (err, res) => console.log(res))
