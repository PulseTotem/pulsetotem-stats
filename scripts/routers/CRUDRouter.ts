/**
 * @author Simon Urli <simon@pulsetotem.fr>
 */


class CRUDRouter extends RouterItf {

    constructor() {
        super();
    }

    buildRouter() {
        var self = this;

        this.router.post('/create', function (req : any, res : any) { self.createData(req, res); });
    }

    createData(req : any, res : any) {

    }
}