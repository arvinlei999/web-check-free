<h1 align="center">Web Check (Free!)</h1>


<p align="center">
  <img src="https://i.ibb.co/q1gZN2p/web-check-logo.png" width="96" /><br />
  <i>A fork of <a href="https://github.com/lissy93/web-check">Lissy93/Web-Check</a>, optimized for easy self-hosting</i><br />
  <b><i>Comprehensive, on-demand open source intelligence for any website</i></b>
</p>

---

## Deployment

### Deploying - Option #1: Netlify

Click the button below, to deploy to Netlify 👇

[![Deploy to Netlify](https://img.shields.io/badge/Deploy-Netlify-%2330c8c9?style=for-the-badge&logo=netlify&labelColor=1e0e41 'Deploy Web-Check to Netlify, via 1-Click Script')](https://app.netlify.com/start/deploy?repository=https://github.com/xray-web/web-check-free)

### Deploying - Option #2: Vercel

Click the button below, to deploy to Vercel 👇

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-%23ffffff?style=for-the-badge&logo=vercel&labelColor=1e0e41)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fxray-web%2Fweb-check&project-name=web-check-free&repository-name=web-check-fork&demo-title=Web-Check%20Demo&demo-description=Check%20out%20web-check.xyz%20to%20see%20a%20live%20demo%20of%20this%20application%20running.&demo-url=https%3A%2F%2Fweb-check.xyz&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2FLissy93%2Fweb-check%2Fmaster%2F.github%2Fscreenshots%2Fweb-check-screenshot10.png)

### Deploying - Option #3: Docker

Run `docker run -p 3000:3000 lissy93/web-check:1.0.0`, then open [`localhost:3000`](http://localhost:3000)

<details>
<summary>Docker Options</summary>

You can get the Docker image from:
- DockerHub: [`lissy93/web-check`](https://hub.docker.com/r/lissy93/web-check)
- GHCR: [`ghcr.io/lissy93/web-check`](https://github.com/Lissy93/web-check/pkgs/container/web-check)
- Or build the image yourself by cloning the repo and running `docker build -t web-check .`

Be sure to include the `1.0.0` tag when pulling the image.

</details>

### Deploying - Option #4: From Source

```bash
git clone https://github.com/xray-web/web-check-free.git  # Download the code from GitHub
cd web-check-free                                         # Navigate into the project dir
yarn install                                              # Install the NPM dependencies
yarn build                                                # Build the app for production
yarn serve                                                # Start the app (API and GUI)
```

## Configuring

By default, no configuration is needed.

But there are some optional environmental variables that you can set to give you access to some additional checks, or to increase rate-limits for some checks that use external APIs.

<details><summary><b>API Keys & Credentials</b></summary>

Key | Value
---|---
`GOOGLE_CLOUD_API_KEY` | A Google API key ([get here](https://cloud.google.com/api-gateway/docs/authenticate-api-keys)). This can be used to return quality metrics for a site
`REACT_APP_SHODAN_API_KEY` | A Shodan API key ([get here](https://account.shodan.io/)). This will show associated host names for a given domain
`REACT_APP_WHO_API_KEY` | A WhoAPI key ([get here](https://whoapi.com/)). This will show more comprehensive WhoIs records than the default job

<details>
  <summary><small>Full / Upcoming Vals</small></summary>
  
- `GOOGLE_CLOUD_API_KEY` - A Google API key ([get here](https://cloud.google.com/api-gateway/docs/authenticate-api-keys)). This can be used to return quality metrics for a site
- `REACT_APP_SHODAN_API_KEY` - A Shodan API key ([get here](https://account.shodan.io/)). This will show associated host names for a given domain
- `REACT_APP_WHO_API_KEY` - A WhoAPI key ([get here](https://whoapi.com/)). This will show more comprehensive WhoIs records than the default job
- `SECURITY_TRAILS_API_KEY` - A Security Trails API key ([get here](https://securitytrails.com/corp/api)). This will show org info associated with the IP
- `CLOUDMERSIVE_API_KEY` - API key for Cloudmersive ([get here](https://account.cloudmersive.com/)). This will show known threats associated with the IP
- `TRANCO_USERNAME` - A Tranco email ([get here](https://tranco-list.eu/)). This will show the rank of a site, based on traffic
- `TRANCO_API_KEY` - A Tranco API key ([get here](https://tranco-list.eu/)). This will show the rank of a site, based on traffic
- `URL_SCAN_API_KEY` - A URLScan API key ([get here](https://urlscan.io/)). This will fetch miscalanious info about a site
- `BUILT_WITH_API_KEY` - A BuiltWith API key ([get here](https://api.builtwith.com/)). This will show the main features of a site
- `TORRENT_IP_API_KEY` - A torrent API key ([get here](https://iknowwhatyoudownload.com/en/api/)). This will show torrents downloaded by an IP
  
</details>

</details>

<details><summary><b>Configuration Settings</b></summary>

Key | Value
---|---
`PORT` | Port to serve the API, when running server.js (e.g. `3000`)
`API_ENABLE_RATE_LIMIT` | Enable rate-limiting for the /api endpoints (e.g. `true`)
`API_TIMEOUT_LIMIT` | The timeout limit for API requests, in milliseconds (e.g. `10000`)
`API_CORS_ORIGIN` | Enable CORS, by setting your allowed hostname(s) here (e.g. `example.com`)
`CHROME_PATH` | The path the Chromium executable (e.g. `/usr/bin/chromium`)
`DISABLE_GUI` | Disable the GUI, and only serve the API (e.g. `false`)
`REACT_APP_API_ENDPOINT` | The endpoint for the API, either local or remote (e.g. `/api`)

</details>

All values are optional.

You can add these as environmental variables. Either put them directly into an `.env` file in the projects root, or via the Netlify / Vercel UI, or by passing to the Docker container with the --env flag, or using your own environmental variable management system

Note that keys that are prefixed with `REACT_APP_` are used client-side, and as such they must be scoped correctly with minimum privileges, since may be made visible when intercepting browser <-> server network requests

---

## Why this Fork?

While [Web Check](https://github.com/Lissy93/web-check) will **always** remain 100% free and open source, the work on the upstream repo at the moment is more geared towards making the managed instance as scalable and cost effective to run at scale as possible. This includes features for advanced rate-limiting, user signup and billing. This new work adds excess overhead for those who just want to host their own instance on the cloud or locally.

To solve this, we cut this repo from [Web-Check:1.0.0](https://github.com/Lissy93/web-check/tree/1.0.0), to keep it free and easy for anyone who wants to self-host their own instance of Web Check.

If you'd rather not deploy your own, and would just like to use the public instance, you can do so at **[web-check.xyz](https://web-check.xyz/)**.

---

## Sponsor

Found Web Check useful? Consider supporting us, by [sponsoring Lissy93 on GitHub](https://github.com/sponsors/Lissy93) 💖

This project is only possible, thanks to supporters like you. Your donations will be used to cover running costs, and to fund both ongoing maintence and the development of new features, on both Web Check, and our [other projects](https://apps.aliciasykes.com/). 

[![Sponsor Lissy93 on GitHub](https://img.shields.io/badge/Sponsor_on_GitHub-Lissy93-%23ff4dda?style=for-the-badge&logo=githubsponsors&logoColor=ff4dda)](https://github.com/sponsors/Lissy93)

---

## License

> _**[Web-Check](https://github.com/Lissy93/web-check)** is licensed under [MIT](https://github.com/xray-web/web-check-free/blob/HEAD/LICENSE) © [Alicia Sykes](https://aliciasykes.com) 2024._<br>
> <sup align="right">For information, see <a href="https://tldrlegal.com/license/mit-license">TLDR Legal > MIT</a></sup>

<details>
<summary>Expand License</summary>

```
The MIT License (MIT)
Copyright (c) Alicia Sykes <alicia@omg.com> 

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sub-license, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included install 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANT ABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

[![View Dependency Licenses & SBOM on FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FLissy93%2Fweb-check.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FLissy93%2Fweb-check?ref=badge_large&issueType=license)

</details>

---

<p align="center">
  <sup>Kindly supported by:</sup><br>
<a href="https://terminaltrove.com/?utm_campaign=github&utm_medium=referral&utm_content=web-check&utm_source=wcgh">
  <img src="https://i.ibb.co/8jrrcZ0/IMG-7210.jpg" width="300" alt="Terminal Trove">
  <br>
  <strong>The $HOME of all things in the terminal.</strong>
</a>
<br>
<a href="https://terminaltrove.com/newsletter?utm_campaign=github&utm_medium=referral&utm_content=web-check&utm_source=wcgh">
  <sub>Find your next CLI / TUI tool and more at Terminal Trove,</sub>
  <br>
  <sup>Get updates on new tools on our newsletter.</sup>
</a>
</p>

---

<!-- License + Copyright -->
<p  align="center">
  <i>© <a href="https://aliciasykes.com">Alicia Sykes</a> 2024</i><br>
  <i>Licensed under <a href="https://gist.github.com/Lissy93/143d2ee01ccc5c052a17">MIT</a></i><br>
  <a href="https://github.com/lissy93"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" /></a><br>
  <sup>Thanks for visiting :)</sup>
</p>

<!-- Dinosaurs are Awesome -->
<!-- 
                        . - ~ ~ ~ - .
      ..     _      .-~               ~-.
     //|     \ `..~                      `.
    || |      }  }              /       \  \
(\   \\ \~^..'                 |         }  \
 \`.-~  o      /       }       |        /    \
 (__          |       /        |       /      `.
  `- - ~ ~ -._|      /_ - ~ ~ ^|      /- _      `.
              |     /          |     /     ~-.     ~- _
              |_____|          |_____|         ~ - . _ _~_-_
-->

