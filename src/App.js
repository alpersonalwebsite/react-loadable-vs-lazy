import React, { Suspense } from 'react'
import Loadable from 'react-loadable'

function loading() {
  return <span>Loading...</span>;
}

const LoadUsingReactLoadable = Loadable({
  loader: async () => {
    let timer = await new Promise(resolve => setTimeout(resolve, 10000));
    clearTimeout(timer);
    return import('./UsingReactLoadable');
  },
  loading: loading,
})


const LoadUsingLazy = React.lazy(async () => {
  let timer = await new Promise(resolve => setTimeout(resolve, 10000));
  clearTimeout(timer);
  return import('./UsingLazy');
})


function App() {
  return (
    <div>
      <LoadUsingReactLoadable />

      <br />

      <Suspense fallback={loading()}>
        <LoadUsingLazy />
      </Suspense>
    </div>
  );
}

export default App;
