const Bonjour = require('bonjour')

const verbose = require('./verbose_logger')

const find_device = function(timeout, choose_only_device_found_without_user_prompt) {
  return find_devices(timeout)
    .then(devices => prompt_user_to_choose_one_device(devices, choose_only_device_found_without_user_prompt))
    .then(device  => {
      verbose.log('Selected device:', preprocess_device_for_logging(device))
      return device
    })
}

const find_devices = function(timeout) {
  return new Promise((resolve, reject) => {
    const devices = []

    const bonjour = Bonjour()

    const browser = bonjour.find({type: 'airplay'}, device => {
      devices.push(device)
    })

    setTimeout(
      function() {
        browser.stop()
        bonjour.destroy()
        verbose.log('All devices found:', devices.map(preprocess_device_for_logging))
        resolve(devices)
      },
      (timeout * 1000)
    )
  })
}

const prompt_user_to_choose_one_device = function(devices, choose_only_device_found_without_user_prompt) {
  return new Promise((resolve, reject) => {
    if (!devices || !Array.isArray(devices) || !devices.length) {
      reject(new Error("No ExoAirPlayer devices found."))
      return
    }

    if ((devices.length === 1) && choose_only_device_found_without_user_prompt) {
      resolve(devices[0])
      return
    }

    console.log()
    console.log('Please select one instance of ExoAirPlayer:')
    for (var i=0; i<devices.length; i++) {
      console.log(`    ${i+1}) ${devices[i]['host']} (${devices[i]['name']})`)
    }
    console.log()

    const replay_prompt = function() {
      console.log('Please enter the number corresponding to your selection:')
    }

    replay_prompt()

    //Start reading input
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    process.stdin.on('data', function (text) {
      console.log()

      text = text.trim()
      if (!text) return replay_prompt()

      var num = Number(text)
      if ((typeof num !== 'number') || isNaN(num)) return replay_prompt()

      num--
      if (num < 0 || num >= devices.length) {
        console.log('The number entered is outside the range of valid options.')
        return replay_prompt()
      }

      //Stop reading input
      process.stdin.pause()

      resolve(devices[num])
    })
  })
}

const preprocess_device_for_logging = function(device) {
  return verbose.is_enabled()
    ? {...device, rawTxt: device.rawTxt.toString('utf8')}
    : device
}

module.exports = {find_device, find_devices}
