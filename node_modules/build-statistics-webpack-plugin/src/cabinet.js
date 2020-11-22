/*
  Cabinet是一个柜子，柜子里有好多抽屉（drawer），  
  我们可以将物品（gadget）根据抽屉类别，放置到不同的抽屉中。  
  
  用例
  ```
  const cabinet = new Cabinet;

  // 创建两个不同的抽屉，抽屉可以是任意类型的js对象
  const drawer1 = 'my-drawer1';
  const drawer2 = 'my-drawer2';

  cabinet.put({
      drawer: drawer1,
      gadget: 1,
  });
  cabinet.put({
      drawer: drawer2,
      gadget: 2,
  });
  cabinet.put({
      drawer: drawer2,
      gadget: 3,
  });
  cabinet.put({
      drawer: drawer1,
      gadget: 4,
  });

  // {
  //     "my-drawer1": [
  //         1,
  //         4
  //     ],
  //     "my-drawer2": [
  //         2,
  //         3
  //     ]
  // }
  ```
*/

class Cabinet {
  constructor() {
    this._cache = new Map;
  }

  // 向drawer抽屉中，放入gadget小玩意
  put({ drawer, gadget }) {
    // 如果还没有这个抽屉
    // 就新建一个抽屉，然后把gadget小玩意放进去
    if (!this._cache.has(drawer)) {
      this._cache.set(drawer, [gadget]);
      return;
    }

    // 否则就打开drawer抽屉，按顺序放入gadget小玩意
    this._cache.get(drawer).push(gadget);
  }

  // 获取所有的drawer抽屉
  getDrawerList() {
    return Array.from(this._cache.keys());
  }

  // 是否已有drawer抽屉
  hasDrawer(drawer) {
    return this._cache.has(drawer);
  }

  // 获取给定抽屉里的所有小玩意
  getGadgetListFromDrawer(drawer) {
    return this._cache.get(drawer);
  }
}

module.exports = Cabinet;
