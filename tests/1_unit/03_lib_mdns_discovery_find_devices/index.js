const {find_devices} = require('../../../lib/mdns_discovery')
const verbose        = require('../../../lib/verbose_logger')

verbose.set_enabled(true)

const configs = {
  timeout: 15
}

const run_all_tests = async function() {
  await find_devices(configs.timeout)
}

run_all_tests()
