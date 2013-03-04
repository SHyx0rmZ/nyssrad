    config =

Server settings

        server:

Set the port nyssrad should listen for connections on. Can also be set via the
command line to spawn multiple instances on different ports.

            port: 8888
            protocol: 'http'

General/environmental settings

        env:

If you don't want any colors, set this to false. Otherwise: Colors \o/

            colors: true

If set to false, no prompt will be provided at startup. Can also be set
via --noprompt

            prompt: true

Supresses startup-messages and other information

            suppress_messages: false

Print debug messages

            debug: false

Settings for store (known stores, flushing intervals, etc.)

        store:

Set this to false to deactivate automatic flushing at shutdown

            use_default: true

If (for any reason) a default file with the same timestamp exists, allow it
to be overwritten

            overwrite_default: true

nyssrad can flush the complete key-value store every n seconds

            flush:

Set this to true to activate automatic flushing every n seconds

                interval: false
                milliseconds: 3000

Add all stores you want to use in nyssrad here. Put the names in ''

            stores:

You can change the name of the default store, but this is not recommended

                default: 'default.store'

For now, you can specify additional stores here:

    # store: 'mystore.store'

This store identifies the currently loaded store; You shall not set it here,
it'll be set during runtime

                loaded: false

    module.exports = exports.config = config
