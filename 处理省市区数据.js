function handleTree(data, id, parentId, children) {
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children",
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] === undefined) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] === undefined) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

const simpleData = [
  {
    id: 1,
    parentId: 0,
    label: "浙江省",
    value: "zhejiang",
  },
  {
    id: 2,
    parentId: 1,
    label: "杭州市",
    value: "zhejiang",
  },
  {
    id: 3,
    parentId: 1,
    label: "宁波市",
    value: "zhejiang",
  },
  {
    id: 4,
    parentId: 1,
    label: "绍兴市",
    value: "zhejiang",
  },
  {
    id: 5,
    parentId: 2,
    label: "滨江区",
    value: "binjiang",
  },
  {
    id: 6,
    parentId: 2,
    label: "江干区",
    value: "jianggan",
  },
  {
    id: 7,
    parentId: 3,
    label: "余姚市",
    value: "yuyao",
  },
];

//重点看里面的参数，理解参数的含义，基本上就明白了
const tree = handleTree(simpleData, "id", "parentId");

console.log(tree);
