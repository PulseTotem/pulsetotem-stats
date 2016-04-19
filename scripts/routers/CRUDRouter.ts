/**
 * @author Simon Urli <simon@pulsetotem.fr>
 */

/// <reference path="../core/DatabaseConnection.ts" />

class CRUDRouter extends RouterItf {

    constructor() {
        super();
    }

    buildRouter() {
        var self = this;

        this.router.post('/create', function (req : any, res : any) { self.createData(req, res); });
    }

    createData(req : any, res : any) {
        var connection = DatabaseConnection.getConnection();

        if (connection == null) {
            Logger.error("The service is not connected to a DB.");
            res.status(500).send({'error': 'DB not connected.'});
        } else {
            var stat = req.body;

            var collection = stat.collection;
            delete stat.collection;

            connection.collection(collection).insertOne(stat, function(err, result) {
                if (err != null) {
                    Logger.error("Error while inserting data in collection "+collection);
                    Logger.error(err);

                    res.status(500).send({'error': 'Error while inserting data in collection '+collection});
                } else {
                    Logger.debug("Inserting data "+result.insertedId._id+" in collection "+collection);
                    res.status(200).send();
                }
            });
        }
    }
}