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
      {
        name: "批发管理1-2",
        routes: [
          {
            name: "批发管理1-2-1",
          },
          {
            name: "批发管理1-2-2",
          },
          {
            name: "批发管理1-2-3",
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

// 深度遍历
const newData = []
let num = 0
function dfs2(values, depth, newArr) {
  values?.forEach((item) => {
    if (item.routes?.length) {
      dfs2(item.routes, depth + 1, [...newArr, item.name])
    } else {
      num = Math.max(num, depth)
      newData.push([...newArr, item.name])
    }
  })
}
dfs2(v, 0, [], 0)

function getFirstXy() {
  let count = 0
  let countArr = []
  for (let i = 0; i < newData.length; i++) {
    if (newData[i][0] === newData[i + 1]?.[0]) {
      count += 1
    } else {
      count += 1
      countArr.push(count)
      count = 0
    }
  }
  console.log(countArr)
}
getFirstXy()

function getSecondXy() {
  let count = 0
  let countArr = []
  for (let i = 0; i < newData.length; i++) {
    if (newData[i]?.[1] === newData[i + 1]?.[1]) {
      count += 1
    } else {
      count += 1
      countArr.push(count)
      count = 0
    }
  }
  console.log(countArr)
}
getFirstXy()

function getThirdXy() {
  let count = 0
  let countArr = []
  for (let i = 0; i < newData.length; i++) {
    if (newData[i]?.[2] === newData[i + 1]?.[2]) {
      count += 1
    } else {
      count += 1
      countArr.push(count)
      count = 0
    }
  }
  console.log(countArr)
}
getFirstXy()
