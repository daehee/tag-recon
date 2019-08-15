# tag-recon

OSINT a domain's tracking code footprint to discover hidden connections.

Directly scrape the tags from the target website, and also access historical snapshots of its tags by referencing BuiltWith and Spyonweb records.

Analyzing a website's tracking codes is especially useful for identifying spam websites and blogs that often share the same analytics and advertising tags across its network. Discover what other websites they are operating or affiliated with.

Use tag-recon in conjunction with other website OSINT techniques to get a more holistic picture of the domain. For example, just reversing an IP address often limits further visibility, or worse presents overly noisy results in a shared cloud hosting environment. [domain-scanner](https://github.com/b4dnewz/domain-scanner) is a great node utility to get other data points such as subdomains, password breaches, email addresses, SSL certificates, and more.

## Installation

`git clone https://github.com/daehee/tag-recon.git`

Create `.env` file at root folder of this project with your API keys

```plaintext
SPYONWEB_KEY=XXX
BUILTWITH_KEY=XXX
```

- Get Spyonweb API key: [https://api.spyonweb.com](https://api.spyonweb.com)
- (WIP) Get BuiltWith API key: [https://api.builtwith.com](https://api.builtwith.com)

## Example Output

Run:
`node example/index.js`

See [example JSON output](../blob/master/example/output.json).

## Credits

- Inspired by Justin Seitz's [blog post on AutomatingOSINT.com](http://www.automatingosint.com/blog/2017/07/osint-website-connections-tracking-codes/)

## License

[MIT](LICENSE)
