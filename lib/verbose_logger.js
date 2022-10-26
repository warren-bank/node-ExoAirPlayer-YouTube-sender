let enabled = false

const set_enabled = function(val) {
  enabled = !!val
}

const is_enabled = function() {
  return enabled
}

const log = function(...args) {
  if (!enabled) return

  args = args.map(arg => {
    return (arg && (arg instanceof Object))
      ? JSON.stringify(arg, null, 4)
      : arg
  })

  console.log(...args)
}

module.exports = {set_enabled, is_enabled, log}
