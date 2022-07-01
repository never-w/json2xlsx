var xlsx = require("node-xlsx").default
const fs = require("fs")
const treeValues = require("./44.json")

let num = 0
const data = []
const header = []

function dfs(treeData, depth, newArr) {
  let count = 0
  treeData.forEach((item) => {
    if (item.children?.length) {
      count =
        count +
        dfs(item.children, depth + 1, [
          ...newArr,
          item.order ?? null,
          item?.meta?.title,
          item.path,
          item.meta?.icon ?? null,
          item.appMicroConfig?.code ?? null,
          item.appMicroConfig?.entryUrl,
        ])
      console.log(count)
    } else {
      count = count + 1
      num = Math.max(num, depth + 1)
      data.push([...newArr, item.order ?? null, item?.meta?.title, item.path, item.meta?.icon ?? null, item.appMicroConfig?.code ?? null, item.appMicroConfig?.entryUrl])
    }
  })
  return count
}

dfs(treeValues, 0, [])

new Array(num).fill(null).forEach((_, index) => {
  header.push("order", `${index + 1}级菜单`, "path", "icon", "code", "entryUrl")
})
data.unshift(header)

// json   ---> xlsx
function json2xls(value) {
  const colsList =
    Array(data[0].length)
      .fill(null)
      .map(() => ({ wch: 40 })) || []
  const sheetOptions = { "!cols": colsList }
  var buffer = xlsx.build([{ name: "路由的表格", data: value }], { sheetOptions })
  fs.writeFile("routes.xlsx", buffer, (err, res) => console.log(res))
}

json2xls(data)

// console.log(data)
