#! /usr/bin/env node

const argv_vals = require('./exoairtube/process_argv')
const {send}    = require('../lib/process_cli')

send(argv_vals)
.catch((error) => {
  console.log('ERROR:', error.message)
  process.exit(1)
})
.then(() => {
  process.exit(0)
})
