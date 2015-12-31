import test from 'ava';
import execa from 'execa';

test('.groper()', async t => {
    const result = await execa.shell('node ./cli.js groper example.com');
    const ip = '93.184.216.34'
    t.true(result.stdout.indexOf(ip) > 0);
    t.true(result.stdout.indexOf('example.com') > 0);
});

test('.dig()', async t => {
    const result = await execa.shell('node ./cli.js dig example.com');
    const ip = '93.184.216.34'
    t.true(result.stdout.indexOf(ip) > 0);
    t.true(result.stdout.indexOf('example.com') > 0);
});

test('.reverse()', async t => {
    const result = await execa.shell('node ./cli.js reverse 192.30.252.128');
    t.is(result.stdout, 'github.com');
});

test('.whois()', async t => {
    const result = await execa.shell('node ./cli.js whois example.com');
    t.false(result.stdout == '');
    t.true(result.stdout.indexOf('EXAMPLE.COM') > 0);
});

test('.punycode()', async t => {
    const result = await execa.shell('node ./cli.js punycode 日本語.jp');
    t.is(result.stdout, 'xn--wgv71a119e.jp');
});

test('.punycode()', async t => {
    const result = await execa.shell('node ./cli.js punycode xn--wgv71a119e.jp');
    t.is(result.stdout, '日本語.jp');
});
