export default class IndexDB {
  constructor(options = { databaseName: 'loacalTest', userTabel: 'user' }) {
    this.options = options;
    this.objectStore = null;
    this.db = null;
    this.dataIndex = [
      {
        id: 1,
        name: 'Maic',
        age: 18
      },
      {
        id: 2,
        name: 'Tom',
        age: 10
      }
    ];
  }
  onerror() {
    // 打开数据库失败
    this.request.onerror = function (evrnt) {
      console.log('数据库打开错误')
    }
  }
  onsucess() {
    // 表示成功打开数据库
    this.request.onsuccess = (event) => {
      console.log('数据库打开成功')
    }
  }
  async init() {
    this.createTable();
  }
  createTable() {
    const { databaseName, userTabel } = this.options;
    let objectStore;
    // 创建loacalTest表
    this.request = window.indexedDB.open(databaseName);
    console.log(this.request);
    var db;
    // 新建数据库表
    this.request.onupgradeneeded = (event) => {
      debugger;
      db = event.target.result;
      this.db = db;
      // 为loacal-test创建一个对象仓库,以id为主键
      if (!db.objectStoreNames.contains(userTabel)) {
        objectStore = db.createObjectStore(userTabel, { keyPath: 'id' });
      } else {
        // 如果存在就直接取出
        objectStore = event.target.transaction.objectStore(userTabel);
      }
      this.objectStore = objectStore;
      // 写入数据
      this.dataIndex.forEach(v => {
        objectStore.put(v)
      });
      objectStore.getAll().onsuccess = (event) => {
        console.log(event.target.result);
        this.dataIndex = event.target.result;
      }
    }

  }
  update(parmas) {
    // console.log(this.objectStore, '--')
    // this.objectStore.put(parmas);
    // this.onerror();
    // this.onsucess();
    console.log(this.request);
    // const transition = this.request.transaction(userTabel, 'readwrite');
    // transition.objectStore(userTabel).put(parmas)
  }
  delete(id) {
    this.objectStore.delete(id);
    this.onerror();
    this.onsucess();
  }
}