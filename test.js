var xlsx = require("node-xlsx").default
const fs = require("fs")

const data = [
  [1, 2, 3],
  [true, false, null, "sheetjs"],
  ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
  ["baz", null, "qux"],
]
const sheetOptions = { "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }] }

var buffer = xlsx.build([{ name: "mySheetName", data: data }], { sheetOptions }) // Returns a buffer

fs.writeFile("test.xlsx", buffer, (err, res) => console.log(res))
