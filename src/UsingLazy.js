import React from 'react'

// Deliberately trivial: the point of this repo is HOW the component gets here, not what
// it renders. It returns an element rather than a bare string, because a component that
// returns `props.type` returns a string and leaves `import React` unused, which Create
// React App reports as a warning and CI=false was hiding.
const UsingLazy = ({ label }) => <p>Loaded via {label}</p>

export default UsingLazy
