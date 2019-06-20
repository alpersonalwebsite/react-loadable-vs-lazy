import React from 'react'
import Loadable from 'react-loadable'
//import UsingReactLoadable from './UsingReactLoadable'

const LoadUsingReactLoadable = Loadable({
  loader: () => import('./UsingReactLoadable'),
  loading() {
    return <div>Loading...</div>
  }
})


function App() {
  return (
    <div>
      <LoadUsingReactLoadable />
    </div>
  );
}

export default App;
