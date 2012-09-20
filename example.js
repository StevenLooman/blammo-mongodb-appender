var blammo = require('blammo');

function main() {
    var root = blammo.LoggerFactory.getLogger(blammo.Logger.ROOT_LOGGER_NAME);

    root.debug('test debug message');
}

main();
