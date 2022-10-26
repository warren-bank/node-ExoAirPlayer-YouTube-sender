const process_argv = require('@warren-bank/node-process-argv')

const argv_flags = {
  "--help":                  {bool: true},
  "--version":               {bool: true},

  "--verbose":               {bool: true},
  "--queue":                 {bool: true},
  "--url":                   {},
  "--device-host":           {},
  "--device-port":           {num: "int"},
  "--discovery-timeout":     {num: "int"}
}

const argv_flag_aliases = {
  "--version":               ["-V"],
  "--verbose":               ["-v"],
  "--queue":                 ["-q"],
  "--url":                   ["-u"],
  "--device-host":           ["-h"],
  "--device-port":           ["-p"],
  "--discovery-timeout":     ["-t"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--help"] || !argv_vals["--url"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (argv_vals["--device-host"] && !argv_vals["--device-port"])
  argv_vals["--device-port"] = 8192

if (!argv_vals["--device-host"] && !argv_vals["--discovery-timeout"])
  argv_vals["--discovery-timeout"] = 15

module.exports = argv_vals
