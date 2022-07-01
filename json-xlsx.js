var xlsx = require("node-xlsx").default
const fs = require("fs")
const routerDataBaseData = require("./routerDataBaseData.json")
const routerDataCost = require("./routerDataCost.json")
const routerDataCustoms = require("./routerDataCustoms.json")
const routerDataDurian = require("./routerDataDurian.json")
const routerDataPitaya = require("./routerDataPitaya.json")
const routerDataSystem = require("./routerDataSystem.json")
const routerDataTransport = require("./routerDataTransport.json")
const routerDataWholesale = require("./routerDataWholesale.json")

let num = 0
const data = []
const header = []
const range = []
let totalRow = 1

function dfs(treeData, depth, newArr) {
  let count = 0
  const prevRow = totalRow
  treeData.forEach((item) => {
    if (item.children?.length) {
      const subCount = dfs(item.children || [], depth + 1, [
        ...newArr,
        item?.meta?.title,
        item.order ?? null,
        item.path,
        item.meta?.icon ?? null,
        item.appMicroConfig?.code ?? null,
        item.appMicroConfig?.entryUrl,
      ])
      count += subCount
    } else {
      count = count + 1
      totalRow += 1
      num = Math.max(num, depth + 1)
      data.push([...newArr, item?.meta?.title, item.order ?? null, item.path, item.meta?.icon ?? null, item.appMicroConfig?.code ?? null, item.appMicroConfig?.entryUrl])
    }
  })
  const col = (newArr.length / 6 - 1) * 6
  const row = prevRow + count - 1
  if (col >= 0 && count > 1) {
    ;[].push.apply(range, [
      { s: { c: col, r: prevRow }, e: { c: col, r: row } },
      { s: { c: col + 1, r: prevRow }, e: { c: col + 1, r: row } },
      { s: { c: col + 2, r: prevRow }, e: { c: col + 2, r: row } },
      { s: { c: col + 3, r: prevRow }, e: { c: col + 3, r: row } },
      { s: { c: col + 4, r: prevRow }, e: { c: col + 4, r: row } },
      { s: { c: col + 5, r: prevRow }, e: { c: col + 5, r: row } },
    ])
  }
  return count
}

dfs(routerDataWholesale, 0, [])

new Array(num).fill(null).forEach((_, index) => {
  header.push(`${index + 1}级菜单`, "order", "path", "icon", "code", "entryUrl")
})
data.unshift(header)

// json   ---> xlsx
function json2xls(value) {
  const colsList =
    Array(data[0].length)
      .fill(null)
      .map(() => ({ wch: 40 })) || []
  const sheetOptions = { "!cols": colsList }
  var buffer = xlsx.build(
    [
      {
        name: "路由的表格",
        data: value,
        options: {
          "!merges": range,
        },
      },
    ],
    { sheetOptions }
  )
  fs.writeFile("routerDataWholesale.xlsx", buffer, (err, res) => console.log(res))
}

json2xls(data)
