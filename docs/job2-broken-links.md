# Job 2: broken local links in 40 Markdown docs

This is the prompt from the "Try Code Mode" section of Anthropic's docs, pointed at a docs folder:
> Read every Markdown file in this project and list the links that point to local files that don't exist.

## The setup
`job2-docs/` has 40 Markdown files (guides, API pages, tutorials, release notes, reference) with about 340 links. Some point to files that don't exist.

## The prompt (`/job2-links`)
> Read every Markdown file in job2-docs and list the links that point to local files that don't exist. Give the file and the link for each one. Don't change any files.

## Why a one-liner gets it wrong
The links come in every shape Markdown allows: relative paths (`../api/tokens.md`), links with `#anchors`, folder names with spaces (`../release%20notes/v2.0.md` and `<../release notes/v2.1.md>`), links with titles (`[x](setup.md "Setup")`), images, reference-style links (`[text][id]` with `[id]: path` at the bottom), plus web links, `mailto:` links and same-page anchors that aren't local files at all. Some pages show link syntax inside code blocks as an example, which isn't a real link.

`grep` for `](...)` plus a file-exists test flagged 136 links on my copy: 118 of them were fine, and it missed 12 that really are broken.

## Check it
There are 30 broken local links. The answer key is kept outside this repo, so Claude can't read it.

## What I got
See [results.md](results.md).
