# Contributing

This guide is for Accenture Security APEX Labs analysts who publish reports to this repository. The [README](README.md) is client-facing, so keep internal process here.

## Repository layout

```text
.
├── index.html                  # Landing page listing every published report
├── assets/                     # Shared images for the site and the README
│   ├── accenture-logo.svg                # Accenture logo, black lettering (landing page, README light theme)
│   ├── accenture-logo-white.svg          # Accenture logo, white lettering (README dark theme)
│   ├── accenture-greater-than.svg        # Accenture ">" mark (report pages)
│   ├── apex-labs-title-light.svg         # "APEX Labs" README heading, Graphik Regular in black (light theme)
│   ├── apex-labs-title-dark.svg          # "APEX Labs" README heading, Graphik Regular in white (dark theme)
│   ├── apex-tagline-light.svg            # APEX tagline in Graphik, purple initials, black text (light theme)
│   ├── apex-tagline-dark.svg             # APEX tagline in Graphik, purple initials, white text (dark theme)
│   └── icons/                            # README icons, exported from the Accenture icon library
├── rustyrocket/
│   └── index.html              # RustyRocket report
├── settra-blinder/
│   └── index.html              # Settra Blinder report
├── README.md                   # Client-facing overview and list of published reports
└── CONTRIBUTING.md             # This guide
```

Each report is a single, self-contained HTML page. GitHub Pages serves the site from this repository, so a report in `<report>/index.html` is available at `https://accenture.github.io/cyber-intelligence/<report>/`.

## Publishing a new report

1. Create a folder named after the threat (lowercase, hyphenated) containing the report as `index.html`.
2. Add a report card as the first card under Published reports on the landing page, `index.html` (newest first). Mark the date up as `<time datetime="YYYY-MM">`.
3. Add a row to the top of the [Published reports](README.md#published-reports) table in the README (newest first), linking to the report. Keep report content (hashes, rules, analysis) on the report page, not in the README.
4. Before merging, check that every hash and rule matches the source analysis and that the TLP marking is correct.

The landing page repeats the README's client-facing sections: what reports include, using this intelligence, TLP, feedback, disclaimer and about. If you change one, change the other to match.

## Brand rules

- Write organisational and team names (for example, Accenture Security APEX Labs) in Graphik Regular, title case, in black or white depending on the background. Don't colour or embolden them.
- Keep team names a generous distance from the Accenture logo or Greater Than symbol so they never read as a combined logo. The pages use a `2rem` gap.
- Show the TLP label in the header and footer of every page, right-justified, at 16px or larger, as white text on black (FIRST TLP 2.0).
