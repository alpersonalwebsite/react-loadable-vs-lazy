import React, { Suspense } from 'react'
import Loadable from 'react-loadable'
import loadable from '@loadable/component'

function loading() {
  return <span>Loading...</span>;
}


const LoadUsingReactLoadable = Loadable({
  loader: async () => {
    let timer = await new Promise(resolve => setTimeout(resolve, 7000));
    clearTimeout(timer);
    return import('./UsingReactLoadable');
  },
  //loading: loading if you like it more
  loading
})

const LoadUsingLoadable = loadable(async () => {
  let timer = await new Promise(resolve => setTimeout(resolve, 9000));
  clearTimeout(timer);
  return import('./UsingLoadableComponents');
})

const LoadUsingLazy = React.lazy(async () => {
  let timer = await new Promise(resolve => setTimeout(resolve, 11000));
  clearTimeout(timer);
  return import('./UsingLazy');
})



function App() {
  return (
    <div>
      <LoadUsingReactLoadable type='UsingReactLoadable' />

      <br />
      <LoadUsingLoadable fallback={loading()} type='UsingLoadableComponents' />
      <br />

      <Suspense fallback={loading()}>
        <LoadUsingLazy type='UsingLazy' />
      </Suspense>
    </div>
  );
}

export default App;
