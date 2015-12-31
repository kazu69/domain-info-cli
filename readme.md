# domain-info-cli

[![Build Status](https://travis-ci.org/kazu69/domain-info-cli.svg?branch=master)](https://travis-ci.org/kazu69/domain-info-cli)

[domain-info](https://www.npmjs.com/package/domain-info) command-line tools.

## install

```sh
npm install --global domain-info-cli
```

## Usage

```sh
domain --help

  simple domain information tool cli

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
    $ domain reverse example.com
    $ domain whois example.com --server whois.verisign-grs.com
    $ domain punycode 日本語.jp
```

## Related

[domain-info](https://www.npmjs.com/package/domain-info)

## License

MIT © kazu69

