/**
 * @author Simon Urli <simon@pulsetotem.fr>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/Server.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="./routers/CRUDRouter.ts" />
/// <reference path="./core/DatabaseConnection.ts" />

class PulseTotemStats extends Server {

    constructor(listeningPort : number, arguments : Array<String>) {
        super(listeningPort, arguments);

        this.init();
    }

    init = function() {
        var self = this;

        var success = function () {
            self.addAPIEndpoint("crud", CRUDRouter);
        };

        DatabaseConnection.connect(success);
    }
}

/**
 * Server's PulseTotemStats listening port.
 *
 * @property _The6thScreenBackendListeningPort
 * @type number
 * @private
 */
var _PulseTotemStatsListeningPort : number = process.env.PORT || 11000;

/**
 * Server's PulseTotemStats command line arguments.
 *
 * @property _PulseTotemStatsArguments
 * @type Array<string>
 * @private
 */
var _PulseTotemStatsArguments : Array<string> = process.argv;

var serverInstance = new PulseTotemStats(_PulseTotemStatsListeningPort, _PulseTotemStatsArguments);
serverInstance.run();