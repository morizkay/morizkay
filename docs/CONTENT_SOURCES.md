# Content sources

Verified on **19 October 2026**. This file records the public evidence behind the personal site and GitHub profile README. It is an editorial reference, not a claim that the linked software has been tested for production use.

## Identity and public links

| Content | Primary source | Verification and scope |
| --- | --- | --- |
| Handle `morizkay` | [GitHub profile](https://github.com/morizkay), [public profile API](https://api.github.com/users/morizkay) | Live GitHub API confirms the account. |
| Display name Moh. Rizky Kay; short name Rizky | [Bluesky profile](https://bsky.app/profile/morizkay.bsky.social), [public Bluesky profile API](https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=morizkay.bsky.social) | Live Bluesky API returns “Moh. Rizky Kay”; this account is linked by GitHub. |
| Palu, Indonesia | [GitHub profile API](https://api.github.com/users/morizkay) | Public location is “Palu, Sulawesi Tengah, Indonesia.” Copy uses city and country only. |
| Tictag affiliation | [GitHub profile API](https://api.github.com/users/morizkay) | Current public company field is “Tictag.” No title, seniority, employment dates, client work, or achievements were inferred. |
| Maintaining Efektif | [GitHub profile API](https://api.github.com/users/morizkay), [Efektif organization](https://github.com/efektif) | Current public bio says “Maintaining @efektif.” “Maintainer” is supported; founder or leadership titles were not inferred. |
| `morizkay@proton.me` | [GitHub profile API](https://api.github.com/users/morizkay) | Intentionally published as the contact email on the public GitHub profile. |
| LinkedIn and Bluesky links | [GitHub social accounts API](https://api.github.com/users/morizkay/social_accounts) | Both URLs are explicitly listed by the GitHub account. LinkedIn profile contents were unavailable, so no career claims were derived from it. |
| npm profile | [npm: morizkay](https://www.npmjs.com/~morizkay) | Public package ownership and selected package metadata were checked. No download or adoption statistics are used. |
| Personal domains | [morizkay.com](https://morizkay.com), [rizky.id](https://rizky.id) | Both domains were supplied by the owner for this site. GitHub also links morizkay.com. Both live URLs served an Anubis browser challenge during research; existing deployed page contents were not verified. |
| Portrait | [GitHub profile API](https://api.github.com/users/morizkay), [public avatar](https://avatars.githubusercontent.com/u/26421928?v=4) | Downloaded from the avatar URL returned by the live GitHub API and inspected. Stored locally at `src/assets/avatar.jpg` (400 × 400 JPEG). |

The introductory description of developer tools, React interfaces, local workflows, and AI tooling is an editorial synthesis of the public projects below, not a formal job title.

## Selected projects

| Project | Primary sources | Supported description and limits |
| --- | --- | --- |
| ClosedRouter | [Public repository and README](https://github.com/morizkay/closedrouter), [public architecture documentation](https://github.com/morizkay/closedrouter/blob/main/docs/ARCHITECTURE.md), [public example configuration](https://github.com/morizkay/closedrouter/blob/main/config.example.yaml) | Self-hosted LLM API gateway using Rust/Axum, a React dashboard, and PostgreSQL/pgvector memory. Architecture documentation explicitly lists OpenAI, Anthropic, and Ollama as upstreams, supporting the illustration labels. The example configuration documents explicit opt-in for local Ollama. The site illustration is a conceptual diagram, not a product screenshot or live connection status. No production-readiness or adoption claim is made. |
| Efektif | [@efektif/ui](https://www.npmjs.com/package/@efektif/ui), [@efektif/hooks](https://www.npmjs.com/package/@efektif/hooks), [@efektif/tokens](https://www.npmjs.com/package/@efektif/tokens), [@efektif/native](https://www.npmjs.com/package/@efektif/native) | Public npm packages support React components, CSS theme, hooks, shared tokens, and React Native primitives. The selected link points to the public UI package. |
| pi-cursor-auth | [Public repository and README](https://github.com/morizkay/pi-cursor-auth), [npm package](https://www.npmjs.com/package/pi-cursor-auth) | Makes Cursor models available through Pi using the Cursor SDK while preserving Pi’s tools, extensions, and agent loop. No provider endorsement or universal compatibility claim is made. |
| Pantai | [Public npm package](https://www.npmjs.com/package/pantai) | Local dashboard for Cursor and Pi AI-agent sessions. The project link is its public npm package. |
| Lokalisa | [Public npm package](https://www.npmjs.com/package/lokalisa) | Directory-derived `*.lolo` domains for local development servers. The project link is its public npm package. |
| AppVolume | [Public repository and README](https://github.com/morizkay/appvolume) | Native macOS SwiftUI menu bar MVP that discovers apps with active Core Audio output and controls system/master output. Per-app gain, mute, and routing are explicitly disabled in the documented MVP; it is described as a prototype, not a functioning per-app mixer. |

At verification time, public npm metadata reported `@efektif/ui` 2.0.0, `pi-cursor-auth` 0.2.4, `pantai` 0.1.4, and `lokalisa` 0.1.0. Versions are deliberately omitted from the profile copy so it does not imply ongoing automated synchronization.

## Editorial boundaries

- Use owner-controlled public profiles, public repository documentation, and public package metadata as evidence. Search snippets helped discovery but did not establish current employment or project capabilities.
- Do not publish private workspace details, private repository names, employer implementation details, or client names. Public npm descriptions can support package links independently of repository visibility.
- Do not invent employment history, years of experience, education, credentials, testimonials, availability, client outcomes, adoption metrics, or production guarantees.
- GitHub repository and follower counts change and are omitted. Project descriptions should be refreshed when their public scope changes.
- Default Astro demo posts and placeholder biography text do not describe the owner and should not appear as authored content.
