import GUN from 'gun';
import fs from 'fs';
import 'gun/sea.js';



var SEA = GUN.SEA;
var gun = GUN({
    localStorage: false,
    radisk: false,
})

var serverAdmin = await SEA.pair();
gun.user().auth(serverAdmin);

let rules = [
    { "#": { "*": "users" }, ".": { "+": "*" } },
    { "#": { "*": "messages" }, ".": { "+": "*" } },
    { "#": { "*": "new_article" }, ".": { "+": "*" } }
]
var certificate = await SEA.certify("*", rules, serverAdmin, null)

fs.writeFile("creds.server.json", JSON.stringify({ serverCertificate: certificate, serverCredentials: serverAdmin }, null, 4), 'utf8', function (err) {
    if (err) throw err;
    fs.writeFile("src/creds.client.json", JSON.stringify({ serverCertificate: certificate, serverPublicKey: serverAdmin.pub }, null, 4), 'utf8', function (err) {
        if (err) throw err;
        console.log(`\n🎉 Success!`)
        process.exit(0)
    });
});
