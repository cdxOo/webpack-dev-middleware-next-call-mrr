'use strict';
var expect = require('chai').expect,
    fetch = require('r2'),
    
    create_wdm_instance = require('./create-wdm-instance'),
    create_express_server = require('./create-express-server'),
    
    dummy_route = require('./dummy-route');

describe('next-call', function () {
    this.timeout(3000);

    var server, app, target;

    beforeEach(async () => {
        var r = await create_express_server();
        server = r.server; app = r.app;
        
        target = `http://127.0.0.1:${r.port}`;
    });

    afterEach(async () => {
        server.kill(() => {
            //console.log('killswitch activated');
        });
    });

    it('server basics work as intended', async () => {
        var did_call_other_mw = false,
            wdm = create_wdm_instance();
        
        app.get('/', dummy_route);

        app.use(wdm);
        app.use((req, res, next) => {
            did_call_other_mw = true;
            next();
        });

        var r = await fetch(`${target}/`).response;
        expect(r.status).to.equal(200);
        expect(await r.text()).to.have.length(9);

        expect(did_call_other_mw).to.equal(true);
    });

    it('calls next when bundle is compiled', async () => {
        var did_call_other_mw = false,
            did_call_injected_next = false,
            wdm = create_wdm_instance();

        app.get('/', dummy_route);

        app.use(wdm);
        app.use((req, res, next) => {
            did_call_other_mw = true;
            next();
        });

        var r = await fetch(`${target}/assets/bundle.js`).response;
        expect(r.status).to.equal(200);
        expect(await r.text()).to.have.length(3932);

        expect(did_call_other_mw).to.equal(true);
        expect(did_call_injected_next).to.equal(true);
    });
});
