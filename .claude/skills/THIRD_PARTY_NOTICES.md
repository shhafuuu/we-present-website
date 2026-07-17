# Third-party skills

These skill folders were copied in from external, community-maintained repositories (not authored for this project, not official Anthropic content) to help keep the We Present site's design polished. Installed manually (files copied directly, no `npx`/installer scripts executed) into this project's `.claude/skills/` on 2026-07-18.

| Folder(s) | Source | License |
|---|---|---|
| `animation-vocabulary/`, `apple-design/`, `emil-design-eng/`, `find-animation-opportunities/`, `improve-animations/`, `review-animations/` | [github.com/emilkowalski/skill](https://github.com/emilkowalski/skill) — Emil Kowalski | MIT |
| `impeccable/` | [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable) — Paul Bakaus | Apache 2.0 |
| `taste-skill/` | [github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — Leonxlnx | MIT |

To update any of these to a newer version, re-clone the source repo and copy its skill folder(s) over these — same paths as above. `impeccable/scripts/` is fully self-contained (verified: no external npm imports, only Node built-ins + relative imports), so a plain file copy is sufficient; no `npm install` needed anywhere in this project for these skills to function.
