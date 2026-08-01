# Programme PDFs

Per-tour programme documents, served **only** through the gated route at
`/api/programme-pdf`. This directory sits outside `public/` on purpose: anything under
`public/` gets its own URL, which would make the name-and-email gate decorative.

To add one:

1. Drop the file here, e.g. `cinnamon-maldives-ru.pdf`.
2. Add an entry to that tour's JSON (or the Tours collection in `/admin`):

   ```json
   "programmePdf": [
     { "file": "cinnamon-maldives-ru.pdf", "locale": "ru",
       "label": { "en": "Russian programme", "ru": "Программа на русском" } }
   ]
   ```

A tour with no entry, or an entry whose file is missing from this directory, renders no
download block at all rather than a form that would collect an email and then fail.

Filenames in tour JSON are matched against declared entries and stripped to their base
name before use, so a path in the `file` field cannot escape this directory.

**Status: the PDFs themselves are outstanding.** The client is producing them, and
whether they ship in Russian only or in both languages is still open (spec v2.1
Appendix D). The mechanism is complete and waiting for files.
