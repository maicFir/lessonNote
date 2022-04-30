const actions = [
  {
    action: '命令1',
    key: 'actionA'
  },
  {
    action: '命令2',
    key: 'actionA'
  }
];
const map = new Map();
// 设备命令
function ActionView() {
    const handleAction = async (v) => {
      const result = await fetch('xxx')
      map.set(v.key, {
        actionName: v.action,
        result
      });
    }
    return actions.map(v => <div onClick={(v) => {handleAction(v)}}>{v.action}</div>)
};
// 命令操作记录
function consoleView() {
  const ret = Array.from(map.entries());

  return (<div>
    ret.map(item => {
      const [actionName, result] = item;
      return (<p>
          {actionName}
          返回结果: {result}
        </p>)
    })
    </div>)
}
