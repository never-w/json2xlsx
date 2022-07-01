var xlsx = require("node-xlsx").default
const fs = require("fs")

// demo-1
// const data = [
//   [1, 2, 3],
//   [true, false, null, "sheetjs"],
//   ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
//   ["baz", null, "qux"],
// ]
// const sheetOptions = { "!cols": [{ wch: 30 }, { wch: 15 }, { wch: 40 }, { wch: 20 }] }

// demo-2
// const data = [
//   [1, 2, 3],
//   [true, false, null, "sheetjs"],
//   ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
//   ["baz", null, "qux"],
// ]
// const range = [
//   { s: { c: 1, r: 0 }, e: { c: 1, r: 5 } },
//   { s: { c: 0, r: 0 }, e: { c: 0, r: 2 } },
// ] // A1:A3 b2:b6
// const sheetOptions = { "!merges": [...range] }

// var buffer = xlsx.build([{ name: "mySheetName", data: data }], { sheetOptions })

// demo-3
const data = [
  ["一级菜单", "title", "url", "二级菜单", "title", "url", "三级菜单", "title", "url"],
  ["财务中心1", null, null, "批发管理1-1", null, null, 1, "批发管理1-1-1", null, null, 1],
  ["财务中心1", null, null, "批发管理1-1", null, null, 1, "批发管理1-1-2", null, null, 1],
  ["财务中心2", null, null, "批发管理2-1", null, null, 1, "批发管理2-1-1", null, null, 1],
  ["财务中心2", null, null, "批发管理2-1", null, null, 1, "批发管理2-1-2", null, null, 1],
]

const range = { s: { c: 0, r: 0 }, e: { c: 0, r: 3 } } // A1:A4
const sheetOptions = { "!merges": [range, { s: { c: 0, r: 0 }, e: { c: 0, r: 3 } }] }
var buffer = xlsx.build([{ name: "mySheetName", data: data }], { sheetOptions }) // Returns a buffer

fs.writeFile("output.xlsx", buffer, (err, res) => console.log(res))
