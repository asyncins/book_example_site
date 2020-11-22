"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Cabinet =
/*#__PURE__*/
function () {
  function Cabinet() {
    _classCallCheck(this, Cabinet);

    this._cache = new Map();
  } // 向drawer抽屉中，放入gadget小玩意


  _createClass(Cabinet, [{
    key: "put",
    value: function put(_ref) {
      var drawer = _ref.drawer,
          gadget = _ref.gadget;

      // 如果还没有这个抽屉
      // 就新建一个抽屉，然后把gadget小玩意放进去
      if (!this._cache.has(drawer)) {
        this._cache.set(drawer, [gadget]);

        return;
      } // 否则就打开drawer抽屉，按顺序放入gadget小玩意


      this._cache.get(drawer).push(gadget);
    } // 获取所有的drawer抽屉

  }, {
    key: "getDrawerList",
    value: function getDrawerList() {
      return Array.from(this._cache.keys());
    } // 是否已有drawer抽屉

  }, {
    key: "hasDrawer",
    value: function hasDrawer(drawer) {
      return this._cache.has(drawer);
    } // 获取给定抽屉里的所有小玩意

  }, {
    key: "getGadgetListFromDrawer",
    value: function getGadgetListFromDrawer(drawer) {
      return this._cache.get(drawer);
    }
  }]);

  return Cabinet;
}();

module.exports = Cabinet;