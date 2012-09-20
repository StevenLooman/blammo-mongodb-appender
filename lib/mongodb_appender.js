var mongodb = require('mongodb');


/**
 * MongoDb appender for Blammo
 */
function MongoDbAppender(name, encoder, layout, options) {
    this.name    = name;
    this.encoder = encoder;
    this.layout  = layout;

    this.connect(options.database, options.hostname, parseInt(options.port, 10), options.collection);
}


MongoDbAppender.prototype.connect = function(database, hostname, port, collection) {
    var db = new mongodb.Db(database, new mongodb.Server(hostname, port, { auto_reconnect: true }));
    var self = this;

    function collectionCb(err, col) {
        if (err) {
            console.error('blammo.MongoDbAppender: ' + err);
            return;
        }

        self.collection = col;
    }

    function openCb(err, db) {
        if (err) {
            console.error('blammo.MongoDbAppender: ' + err);
            return;
        }

        db.collection(collection, collectionCb);
    }

    db.open(openCb);
};


/**
 * Append a LoggingEvent to the earlier specified collection
 */
MongoDbAppender.prototype.append = function(e) {
    if (!this.collection) {
        // something broke?
        console.error('blammo.MongoDbAppender: no collection');
        return;
    }

    function insertCb(err, doc) {
        if (err) {
            console.error(err);
        }
    }

    this.collection.insert(e, insertCb);
};


module.exports = MongoDbAppender;
