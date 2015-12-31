#!/usr/bin/env node
'use strict';

const domain     = require('domain-info'),
      meow       = require('meow'),
      logSymbols = require('log-symbols'),
      chalk      = require('chalk'),
      columnify  = require('columnify');

const cli = meow(`
    Usage
      $ domain <command> <domain or ip address> <option>

    Command
      groper   - dig commnad. alias dig
      reverse  - reverse DNS lookup
      whois    - whois command
      punycode - convert ascii domain to uicode

    Options
      groper
        -t --type     resourse type
        -s --server   ip address
        -p --port     server port
        -o --timeout  wait for the request

      whois
        -s --server hostname
        -p --port   server port

    Examples
      $ domain groper example.com --type A
      $ domain dig example.com --type A
      $ domain reverse ip address
      $ domain whois example.com --server whois.verisign-grs.com
      $ domain punycode 日本語.jp
`);

const command = cli.input[0],
      domain_or_ip  = cli.input[1],
      flags   = cli.flags;

if (cli.input.length === 0) {
    console.error(logSymbols.error, chalk.red('Input required'));
    process.exit(1);
}

function stout(data) {
    if(Array.isArray(data)) {
        data.forEach(record => {
            console.log(record);
        });
    } else if(typeof data === 'string') {
        console.log(data);
    } else {
        for(var type in data) {
            let keys;
            data[type].forEach(record => {
                keys = Object.keys(record);
                return false;
            });
            console.log(columnify(data[type], {columns: keys}));
        }
        
    }

    process.exit(0);
}

function sterr(error) {
    console.error(logSymbols.error, chalk.red(error));
    process.exit(1);
}

switch(command) {
    case 'groper':
    case 'dig':
        var type = flags.t || flags.type,
            address = flags.s || flags.server,
            port = flags.p || flags.port,
            timeout = flags.o || flags.timeout,
            options = {};

        if(address) options.server = { address: address };
        if(port) options.server = { port: port };
        if(timeout) options.timeout = timeout;

        domain.groper(domain_or_ip, type, options)
            .then(data => { stout(data); })
            .catch(error => { sterr(error); })
        break;

    case 'reverse':
        domain.reverse(domain_or_ip)
            .then(data => { stout(data); })
            .catch(error => { sterr(error); })
        break;

    case 'whois':
        var address = flags.s || flags.server,
            port = flags.p || flags.port,
            options = {};

        if(address) options.server = address;
        if(port) options.port = port;

        domain.whois(domain_or_ip, options)
            .then(data => { stout(data); })
            .catch(error => { sterr(error); })
        break

    case 'punycode':
        var res = domain.punycode(domain_or_ip);
        stout(res);
        break;
}
