import React, { Suspense } from 'react'
import Loadable from 'react-loadable'
import loadable from '@loadable/component'

import { delay } from './delay'

// A shared fallback element. `loading` used to be a function called as `loading()` at
// each use site; Suspense and @loadable want an element, so this is one.
const Loading = <span>Loading...</span>

// 1. react-loadable. The original of the three, and now unmaintained: its repository
//    has been archived since 2019. It bundles the loading state INTO the component, so
//    the consumer just renders <LoadUsingReactLoadable /> with no wrapper.
const LoadUsingReactLoadable = Loadable({
  loader: () => delay().then(() => import('./UsingReactLoadable')),
  loading: () => Loading
})

// 2. @loadable/component. The maintained successor, and the one to reach for if you
//    need server-side rendering, which React.lazy did not support at the time.
//    The fallback is a prop on the component.
const LoadUsingLoadable = loadable(() =>
  delay().then(() => import('./UsingLoadableComponents'))
)

// 3. React.lazy. Built in, no dependency at all, but it needs a <Suspense> boundary
//    somewhere above it to supply the fallback. That is the trade: less to install,
//    one more thing to remember.
const LoadUsingLazy = React.lazy(() => delay().then(() => import('./UsingLazy')))

function App() {
  return (
    <div>
      <h1>Three ways to load a component lazily</h1>

      <LoadUsingReactLoadable label="react-loadable" />
      <br />

      <LoadUsingLoadable fallback={Loading} label="@loadable/component" />
      <br />

      <Suspense fallback={Loading}>
        <LoadUsingLazy label="React.lazy" />
      </Suspense>
    </div>
  )
}

export default App
