const process_argv = require('@warren-bank/node-process-argv')

const argv_flags = {
  "--help":                  {bool: true},
  "--version":               {bool: true},

  "--verbose":               {bool: true},
  "--queue":                 {bool: true},
  "--url":                   {},
  "--playlist-range":        {},
  "--device-host":           {},
  "--device-port":           {num: "int"},
  "--discovery-timeout":     {num: "int"},
  "--start-at":              {num: "int"}
}

const argv_flag_aliases = {
  "--version":               ["-V"],
  "--verbose":               ["-v"],
  "--queue":                 ["-q"],
  "--url":                   ["-u"],
  "--playlist-range":        ["-r"],
  "--device-host":           ["-h"],
  "--device-port":           ["-p"],
  "--discovery-timeout":     ["-t"],
  "--start-at":              ["-s"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (argv_vals["--help"] || !argv_vals["--url"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

const regexs = {
  url_format_2: new RegExp('https://youtu.be/([^\\?]+)(?:\\?(.*))?$'),
  start_at:     new RegExp('^[^\\?]+\\?(?:.*&)*t=(\\d+).*$'),
}

{
  const matches = regexs.url_format_2.exec(argv_vals["--url"])
  if (matches && (matches.length >= 3)) {
    argv_vals["--url"] = 'https://www.youtube.com/watch?v=' + matches[1] + (matches[2] ? ('&' + matches[2]) : '')
  }
}

if (!argv_vals["--start-at"]) {
  const matches = regexs.start_at.exec(argv_vals["--url"])
  if (matches && (matches.length >= 2)) {
    argv_vals["--start-at"] = parseInt(matches[1], 10)
  }
}

if (argv_vals["--device-host"] && !argv_vals["--device-port"])
  argv_vals["--device-port"] = 8192

if (!argv_vals["--device-host"] && !argv_vals["--discovery-timeout"])
  argv_vals["--discovery-timeout"] = 15

module.exports = argv_vals
