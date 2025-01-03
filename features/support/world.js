const { World } = require('@cucumber/cucumber');
const serverUtils = require('./server-utils');

class CustomWorld extends World {
    constructor(options) {
        super(options);
        this.serverUtils = serverUtils;
    }
}

setWorldConstructor(CustomWorld);