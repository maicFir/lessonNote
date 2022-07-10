import DiagModal from '../js/diagModal.js';
const { reactive, toRefs, ref } = Vue;
export const useApp = () => {
  const useInfo = reactive({
    lesson: '初识IndexDB，实现本地crud一把梭',
    initData: [],
    showDiag: false,
    view: 'add',
    searchName: '',
    formParams: {
      name: '',
      age: '',
    }
  });
  return {
    ...toRefs(useInfo)
  }
}
// IndexDB hooks
export const useIndexDB = () => {
  const db = new Dexie('local-test');
  db.version(1).stores({
    user: '++id, name, age'
  });
  // 添加数据
  const add_indexDB = (params, callback) => {
    db.user.add(params);
    callback();
  }
  // 更新数据
  const update_indexDB = (params, callback) => {
    db.user.put(params);
    callback()
  }
  // 查询
  const search_indexDB = async (params) => {
    const colletion = params ? await db.user.where('name').equals(params).toArray() : await db.user.toArray();
    return colletion;
  }
  // 删除
  const del_indexDB = (id, callback) => {
    db.user.where('id').equals(id).delete();
    callback();
  }
  return {
    db,
    add_indexDB,
    update_indexDB,
    search_indexDB,
    del_indexDB
  }
}


// todo 弹框
export const useDiagModal = () => {
  const createDiag = DiagModal.init(() => {
    const div = document.createElement('div');
    div.innerHTML = `<div>
          <input placeholder="请输入姓名"/>
          <input placeholder="请输入age" />
          <div>
            <span id="sure">确认</span>  
          </div>
        </div>`;
    div.style = 'position: absolute;top:10px;left:50%;transform:translateY(30%);';
    document.getElementById('app').appendChild(div);
    return div;
  });
  return {
    createDiag
  }
}