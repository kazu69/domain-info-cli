import test from 'ava';
import execa from 'execa';
import fs from 'fs';
import readline from 'readline';

test('.groper()', async t => {
    const readStream = fs.createReadStream(__dirname + '/groper.txt', 'utf8');
    const readLine = readline.createInterface(readStream, {});
    const result = await execa.shell('node ../cli.js groper example.com');
    readLine.on('line', (line) => {
        t.true(result.stdout.includes(line));
    });
});

test('.dig()', async t => {
    const readStream = fs.createReadStream(__dirname + '/groper.txt', 'utf8');
    const readLine = readline.createInterface(readStream, {});
    const result = await execa.shell('node ../cli.js dig example.com');
    readLine.on('line', (line) => {
        t.true(result.stdout.includes(line));
    });
});

test('.reverse()', async t => {
    const result = await execa.shell('node ../cli.js reverse 192.30.252.128');
    t.is(result.stdout, 'github.com');
});

test('.whois()', async t => {
    const readStream = fs.createReadStream(__dirname + '/whois.txt', 'utf8');
    const readLine = readline.createInterface(readStream, {});
    const result = await execa.shell('node ../cli.js whois example.com');
    readLine.on('line', (line) => {
        t.true(result.stdout.includes(line));
    });});

test('.punycode()', async t => {
    const result = await execa.shell('node ../cli.js punycode 日本語.jp');
    t.is(result.stdout, 'xn--wgv71a119e.jp');
});

test('.punycode()', async t => {
    const result = await execa.shell('node ../cli.js punycode xn--wgv71a119e.jp');
    t.is(result.stdout, '日本語.jp');
});
