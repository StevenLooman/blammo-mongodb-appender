TODO
====

MongoDbAppender has to be 'yielded' before it connects
------------------------------------------------------
Due to the workings of NodeJs/v8, MongoDb will not connect/get the colleciton until the main 'thread' is 'yielded' (i.e., until is has nothing more to do and another callback/timeout will be fired.) This means that if the loggers/appenders are built, and the main 'thread' is running from the start, the MongoDbAppender will not be connected and thus the appender will have nothing to append to. This should somehow be fixed.
