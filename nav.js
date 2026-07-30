<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>All_RustyRocket YARA Rule · RustyRocket</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../css/style.css"/>
</head>
<body>

<nav class="topnav">
  <a class="topnav-brand" href="../index.html">
    <div class="brand-icon">🚀</div>
    RustyRocket
  </a>
  <div class="topnav-links">
    <a href="samples.html">Samples</a>
    <a href="mitigation.html">Mitigation</a>
    <a href="yara.html" class="active">YARA Rules</a>
    <a href="network.html">Network</a>
  </div>
</nav>

<div class="docs-layout">
  <aside class="sidebar" id="sidebar"></aside>

  <main class="doc-content">
    <h1>All_RustyRocket</h1>
    <div class="page-meta">
      <span>📅 10 March 2026</span>
      <span>🏷 Accenture ATHENA (RL)</span>
      <span>🔖 v1.2</span>
    </div>

    <p>
      <code>All_RustyRocket.yar</code> detects both Windows and Linux RustyRocket agent samples.
      It targets three key indicators: config-related strings embedded in the binary, a key-extraction
      opcode pattern, and opaque predicate sequences used as anti-analysis obfuscation.
    </p>

    <h2 id="coverage">Coverage</h2>

    <div class="table-wrapper">
      <table>
        <thead><tr><th>Platform</th><th>Detection Method</th></tr></thead>
        <tbody>
          <tr><td>Windows (PE)</td><td><code>uint16(0) == 0x5A4D</code> — MZ magic</td></tr>
          <tr><td>Linux (ELF)</td><td><code>uint32(0) == 0x464C457F</code> — ELF magic</td></tr>
          <tr><td>Unknown format</td><td>String + opcode match without magic check</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="rule">Rule</h2>

    <pre><code><span class="yara-keyword">rule</span> All_RustyRocket
{
  <span class="yara-keyword">meta:</span>
    <span class="yara-string">author</span>      = <span class="yara-meta-val">"Accenture ATHENA (RL)"</span>
    <span class="yara-string">description</span> = <span class="yara-meta-val">"Detects Linux and Windows RustyRocket samples"</span>
    <span class="yara-string">date</span>        = <span class="yara-meta-val">"10 March 2026"</span>
    <span class="yara-string">ver</span>         = <span class="yara-meta-val">"1.2"</span>
    <span class="yara-comment">// hashes omitted for brevity — see Sample Hashes page</span>

  <span class="yara-keyword">strings:</span>
    <span class="yara-comment">// Config-related strings</span>
    $cfg1 = <span class="yara-meta-val">"cidrsaddrs"</span>
    $cfg2 = <span class="yara-meta-val">"domainssubdomainechstruct"</span>

    <span class="yara-comment">// Key extraction pattern</span>
    $key_stub = {
      <span class="yara-hex">48 8D 05 ?? ?? ?? 00</span>
      <span class="yara-hex">48 89 45 C0</span>
      <span class="yara-hex">48 8B 4D C0</span>
      <span class="yara-hex">C7 45 C0 ?? ?? ?? ??</span>
      <span class="yara-hex">8B 55 C0</span>
      <span class="yara-hex">E8 ?? ?? ?? ??</span>
      <span class="yara-hex">48 BE ?? ?? ?? ?? ?? ?? ?? ??</span>
      <span class="yara-hex">48 33 30</span>
      <span class="yara-hex">B9 08 00 00 00</span>
      <span class="yara-hex">E8</span>
    }

    <span class="yara-comment">// Opaque predicate sequences (anti-analysis obfuscation)</span>
    $opaque_predicates = {
      <span class="yara-hex">8B 05 ?? ?? ?? ??</span>           <span class="yara-comment">// mov eax,[rip+data]</span>
      ( <span class="yara-hex">33</span> | <span class="yara-hex">2B</span> | <span class="yara-hex">03</span> | <span class="yara-hex">23</span> ) <span class="yara-hex">05 ?? ?? ?? ??</span>  <span class="yara-comment">// xor/sub/add/and eax,[rip+data]</span>
      ( <span class="yara-hex">69 C0 ?? ?? ?? ??</span> | ( <span class="yara-hex">35</span> | <span class="yara-hex">2D</span> | <span class="yara-hex">05</span> | <span class="yara-hex">25</span> | <span class="yara-hex">0D</span> ) <span class="yara-hex">?? ?? ?? ??</span> )
      ( <span class="yara-hex">69 C0 ?? ?? ?? ??</span> | ( <span class="yara-hex">35</span> | <span class="yara-hex">2D</span> | <span class="yara-hex">05</span> | <span class="yara-hex">25</span> | <span class="yara-hex">0D</span> ) <span class="yara-hex">?? ?? ?? ??</span> )
      ( <span class="yara-hex">69 C0 ?? ?? ?? ??</span> | ( <span class="yara-hex">35</span> | <span class="yara-hex">2D</span> | <span class="yara-hex">05</span> | <span class="yara-hex">25</span> | <span class="yara-hex">0D</span> ) <span class="yara-hex">?? ?? ?? ??</span> )
      <span class="yara-hex">3D ?? ?? ?? ??</span>               <span class="yara-comment">// cmp eax,imm</span>
      <span class="yara-hex">0F 8? ?? ?? ?? ??</span>            <span class="yara-comment">// conditional jump</span>
    }

    $canary = <span class="yara-meta-val">"This is a YARA rule"</span>

  <span class="yara-keyword">condition:</span>
    <span class="yara-comment">// Windows PE</span>
    uint16(0) == 0x5A4D and ($key_stub or ($cfg1 and $cfg2) and $opaque_predicates)
    or
    <span class="yara-comment">// Linux ELF</span>
    uint32(0) == 0x464C457F and ($key_stub or ($cfg1 and $cfg2) and $opaque_predicates)
    or
    <span class="yara-comment">// Unknown format (fallback)</span>
    ($key_stub or ($cfg1 and $cfg2) and $opaque_predicates) and not $canary
}</code></pre>

    <h2 id="notes">Rule Notes</h2>
    <ul>
      <li>The <code>$canary</code> string prevents self-detection on systems where the rule file itself is scanned.</li>
      <li>The opaque predicate pattern targets RustyRocket's anti-analysis obfuscation — repeated arithmetic on memory-loaded values followed by a conditional branch.</li>
      <li>The key extraction stub pattern is architecture-specific (x86-64) and targets the XOR-based key derivation routine.</li>
    </ul>

    <p style="margin-top:2rem">
      Also see:
      <a href="yara-proxy-win.html">Windows Proxy Rule</a> ·
      <a href="yara-proxy-lin.html">Linux Proxy Rule</a> ·
      <a href="yara-launcher.html">RocketLaunch Rule</a>
    </p>
  </main>

  <aside class="toc-rail">
    <div class="toc-rail-label">On this page</div>
    <a href="#coverage">Coverage</a>
    <a href="#rule">Rule</a>
    <a href="#notes">Rule Notes</a>
  </aside>
</div>

<footer>
  <span>RustyRocket IOC Report · Accenture Security ATHENA</span>
  <div class="footer-links">
    <a href="samples.html">Samples</a>
    <a href="mitigation.html">Mitigation</a>
    <a href="network.html">Network Fingerprints</a>
  </div>
</footer>

<script src="../js/nav.js"></script>
<script>renderSidebar('yara.html');</script>
</body>
</html>
