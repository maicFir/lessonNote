import React from 'react';
// import Example1 from 'application_b/Example';
// import Example2 from 'application_b/Example2';
// or
const Example1 = React.lazy(() => import('application_b/Example'));
const Example2 = React.lazy(() => import('application_b/Example2'));
const AppFromB = React.lazy(() => import('application_b/App'));
function App() {
  return (
    <div>
      <p>this is applicatin a</p>
      <Example1 />
      <Example2 />
      <p>下面是从另外一个应用动态加载过来的</p>
      <AppFromB></AppFromB>
    </div>
  );
}

export default App;
