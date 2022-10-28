require('../../../lib/verbose_logger').set_enabled(true)

const {find_devices} = require('../../../lib/mdns_discovery')

const configs = {
  timeout: 15
}

const run_all_tests = async function() {
  await find_devices(configs.timeout)
}

run_all_tests()
