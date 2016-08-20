'use strict'

const ElectronConfig = require('electron-config')
const storage = new ElectronConfig()
const Rules = require('./rules')

class Rule {
  constructor(key) {
    this.key = key
  }

  exists() {
    return storage.has(this.key)
  }

  retrieve() {
    if (this.exists()) {
      return storage.get(this.key)
    }
    return {}
  }

  store(value) {
    storage.set(this.key, value)
    return Rules.addKey(this.key)
  }

  delete() {
    storage.delete(this.key)
    return Rules.deleteKey(this.key)
  }
}

module.exports = Rule
