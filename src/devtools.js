export default function storeDevTools(store) {
  const extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__
  let ignoreState = false

  if (!extension) {
    console.warn('Please install/enable Redux devtools extension')
    store.devtools = null

    return store
  }

  if (!store.devtools) {
    store.devtools = extension.connect()
    store.devtools.subscribe(function (message) {
      if (message.type === 'DISPATCH' && message.state) {
        ignoreState = message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE'
        store.setState(JSON.parse(message.state), true)
      }
    })
    store.devtools.init(store.getState())
    store.subscribe(function (state, action, update) {
      update = update || {}
      const actionName = action
        ? action.type || action.name || 'N/A (' + (Object.keys(update).join(', ') || 'none') + ')'
        : 'setState (' + (Object.keys(update).join(', ') || 'none') + ')'

      if (!ignoreState) {
        store.devtools.send({ type: actionName, update }, state)
      } else {
        ignoreState = false
      }
    })
  }

  return store
}
