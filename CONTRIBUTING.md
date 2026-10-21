# Contributing

This guide is for Accenture Security APEX Labs analysts who publish reports to this repository. The [README](README.md) is client-facing, so keep internal process here.

## Repository layout

```text
.
├── _config.yml                 # Jekyll settings: site URL, and files kept off the published site
├── _layouts/
│   └── default.html            # Page skeleton: <head>, header, content, footer
├── _includes/
│   ├── header.html             # Header: logo, team name, site links, TLP label
│   ├── footer.html             # Footer: TLP label and Legal's disclaimer and copyright
│   └── report-scripts.html     # Sidebar highlighting on report pages
├── assets/
│   ├── css/
│   │   ├── site.css                      # Shared by every page: fonts, colours, header, footer
│   │   ├── report.css                    # Report pages: hero, sidebar, tables, YARA blocks, quotes
│   │   └── landing.css                   # Landing page: report cards and information sections
│   ├── fonts/Graphik/                    # Graphik web fonts (Regular, Medium, Semibold)
│   ├── accenture-logo.svg                # Accenture logo, black lettering (landing page, README light theme)
│   ├── accenture-logo-white.svg          # Accenture logo, white lettering (README dark theme)
│   ├── accenture-greater-than.svg        # Accenture ">" mark (report pages, favicon)
│   ├── apex-labs-title-light.svg         # "APEX Labs" README heading, Graphik Regular in black (light theme)
│   ├── apex-labs-title-dark.svg          # "APEX Labs" README heading, Graphik Regular in white (dark theme)
│   ├── apex-tagline-light.svg            # APEX tagline in Graphik, purple initials, black text (light theme)
│   ├── apex-tagline-dark.svg             # APEX tagline in Graphik, purple initials, white text (dark theme)
│   └── icons/                            # Icons exported from the Accenture icon library
├── index.html                  # Landing page listing every published report
├── ai-agents-stolen-source-code/
│   └── index.html              # AI agents weaponizing stolen source code alert
├── rustyrocket/
│   └── index.html              # RustyRocket report, with its July 2026 update
├── settra-blinder/
│   └── index.html              # Settra Blinder report
├── Gemfile                     # Local preview only: the same Jekyll version GitHub Pages uses
├── README.md                   # Client-facing overview and list of published reports
└── CONTRIBUTING.md             # This guide
```

## How pages are built

GitHub Pages builds the site with Jekyll each time `main` changes. A report in `<report>/index.html` is published at `https://accenture.github.io/cyber-intelligence/<report>/`.

Each page holds only its own content, under a short front matter block. The shared header, footer, stylesheets and legal notice come from `_layouts/` and `_includes/`, so you change them in one place:

```yaml
---
layout: default
type: report                      # "report" for a report page, "landing" for the landing page
title: "Threat name — IOCs & detection"   # browser title; " | Accenture Security APEX Labs" is added for you
footer_date: "Month YYYY"         # shown in the footer after "Threat Intelligence"
---
```

`type: report` loads `report.css`, the Greater Than logo and the sidebar script. `type: landing` loads `landing.css` and the full Accenture logo.

Jekyll treats `{{` and `{%` in a page as template code. If a report ever needs to show them, for example inside a YARA rule or JSON sample, wrap that block in `{% raw %}` … `{% endraw %}`.

## Publishing a new report

1. Copy an existing report folder, for example `settra-blinder/`, to a new folder named after the threat (lowercase, hyphenated). Update the front matter, then replace the hero, sidebar sections and content sections. Keep the class names so the shared styles apply:

   ```html
   <div class="hero">
     <div class="hero-eyebrow">Malware intelligence report</div>
     <h1>Threat name<br>IOCs &amp; detection</h1>
     <p class="hero-lead">One-sentence summary from the source report.</p>
     <div class="hero-meta">
       <div class="meta-item"><span class="meta-label">Published</span><span class="meta-val">Month YYYY</span></div>
       <div class="meta-item"><span class="meta-label">Author</span><span class="meta-val team-name">Accenture Cyber Intelligence</span></div>
     </div>
     <div class="hero-divider"></div>
   </div>

   <div class="layout">
     <aside class="sidebar">
       <div class="sidebar-section">
         <div class="sidebar-label">Sections</div>
         <ul class="sidebar-nav">
           <li><a href="#overview">What's new</a></li>
         </ul>
       </div>
     </aside>
     <main class="content" id="main">
       <section id="overview">
         <div class="section-header"><span class="section-number">01</span><h2>What's new</h2></div>
         <p>…</p>
       </section>
     </main>
   </div>
   ```

2. Add a report card as the first card under Published reports on the landing page, `index.html` (newest first). Mark the date up as `<time datetime="YYYY-MM">`.
3. Add a row to the top of the [Published reports](README.md#published-reports) table in the README (newest first), linking to the report. Keep report content (hashes, rules, analysis) on the report page, not in the README.
4. Preview the site locally (see below) and check that every hash and rule matches the source analysis and that the TLP marking is correct.

When a threat gets a follow-up report, don't create a new page. Add a dated update section (for example, "July 2026 update") as the first section of the existing report, add an "Updated" date to its hero, and mark the landing card and README row as updated.

The landing page repeats the README's client-facing sections: what reports include, using this intelligence, TLP, feedback and about. If you change one, change the other to match.

Keep source PDFs, drafts and other working files out of the repository folder. `_config.yml` keeps any PDFs off the published site, but anything committed here is public.

## Previewing locally

Pages now depend on Jekyll, so opening an `index.html` file directly in a browser won't show the header, footer or styles. Preview with Jekyll instead. One-time setup, on macOS with Homebrew:

```bash
brew install ruby@3.3
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
gem install bundler
bundle install
```

Then, from the repository folder:

```bash
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/cyber-intelligence/. The preview rebuilds when you save a file.

## Brand rules

- Write organisational and team names (for example, Accenture Security APEX Labs) in Graphik Regular, title case, in black or white depending on the background. Don't colour or embolden them; add the `team-name` class where a name sits inside bold text, such as the hero's Author field.
- Keep team names a generous distance from the Accenture logo or Greater Than symbol so they never read as a combined logo. The header and footer use a `2rem` gap.
- Every page carries Legal's disclaimer and copyright line, which comes from `_includes/footer.html`. The README carries them under Disclaimer. Use Legal's wording exactly; don't edit it or add a second disclaimer in the page body.
- Report pages use the same header links as the landing page (Reports, How to use, Sharing, About), which come from `_includes/header.html`. List each report's own sections in its sidebar, not the header.
- Show the TLP label in the header and footer of every page, right-justified, at 16px or larger, as white text on black (FIRST TLP 2.0). Both labels come from the shared includes.
