# tag-recon

OSINT a domain's tracking code footprint to discover hidden connections.

Directly scrape the tags from the target website, and also access historical snapshots of tracking codes by referencing BuiltWith and Spyonweb records.

Analyzing a website's tracking codes is especially useful for identifying spam websites and blogs that often share the same analytics tags, by discovering what other websites they are operating or affiliated with.

Use tag-recon in conjunction with other website OSINT techniques to get a more holistic picture. For example, reversing an IP address often limits further visibility, or worse presents overly noisy results in a shared cloud hosting environment.

## Installation

`git clone https://github.com/daehee/tag-recon.git`

Create `.env` file at root folder of this project with your API keys

```plaintext
SPYONWEB_KEY=XXX
BUILTWITH_KEY=XXX
```

- Get Spyonweb API key: [https://api.spyonweb.com](https://api.spyonweb.com)
- (WIP) Get BuiltWith API key: [https://api.builtwith.com](https://api.builtwith.com)

## Example

Run:

`node example/index.js`

## Credits

- Inspired by [Justin Seitz's blog post on AutomatingOSINT.com](http://www.automatingosint.com/blog/2017/07/osint-website-connections-tracking-codes/).
