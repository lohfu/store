export function wrapActions(actions, store) {
  const mapped = {}

  for (const i in actions) {
    mapped[i] = (...args) => store.dispatch(actions[i](...args))
  }

  return mapped
}

// select('foo,bar') creates a function of the form: ({ foo, bar }) => ({ foo, bar })
export function select(properties) {
  if (typeof properties === 'string') properties = properties.split(/\s*,\s*/)

  return (state) => {
    const selected = {}

    for (let i = 0; i < properties.length; i++) {
      selected[properties[i]] = state[properties[i]]
    }

    return selected
  }
}

// Lighter Object.assign stand-in
export function assign(obj, props) {
  for (const i in props) {
    obj[i] = props[i]
  }

  return obj
}
