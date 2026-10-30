// Componente raiz. Estrutura do documento (ABNT NBR 14724:2024, 6024, 6027 e 6028):
// folha de rosto (cabeçalho e equipe), sumário, 1 Introdução, 2 Verbetes (por categoria) e Referências.
function App() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [open, setOpen] = useState({});
  const [flash, setFlash] = useState("");
  const [printing, setPrinting] = useState(false);
  const [done, setDone] = useState(() => load("mtc-done", []));
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");

  const all = useMemo(() => BASE, []);
  const byId = useMemo(() => Object.fromEntries(all.map((e) => [e.id, e])), [all]);

  // Numeração progressiva (NBR 6024): 2.<categoria>.<verbete>, verbetes em ordem alfabética.
  const num = useMemo(() => {
    const n = {};
    CATS.forEach((c, ci) => all.filter((e) => e.cat === c).sort((a, b) => a.termo.localeCompare(b.termo, "pt"))
      .forEach((e, j) => { n[e.id] = "2." + (ci + 1) + "." + (j + 1); }));
    return n;
  }, [all]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return all
      .filter((e) => cat === "Todos" || e.cat === cat)
      .filter((e) => !nq || norm(e.termo + " " + e.def + " " + (e.mais || []).join(" ") + " " + (e.ex || "")).includes(nq))
      .sort((a, b) => a.termo.localeCompare(b.termo, "pt"));
  }, [all, q, cat]);

  const sections = CATS.map((c, ci) => ({ c, n: "2." + (ci + 1), items: list.filter((e) => e.cat === c) })).filter((s) => s.items.length);
  const present = new Set(list.map((e) => letterOf(e.termo)));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Referências do documento inteiro, sem repetição e em ordem alfabética (NBR 6023).
  const allRefs = useMemo(() => {
    const m = {};
    all.forEach((e) => e.fonte.forEach((r) => { m[r.key] = r; }));
    return Object.values(m).sort((a, b) => (a.aut + a.tit).localeCompare(b.aut + b.tit, "pt"));
  }, [all]);

  const go = (id) => {
    setQ(""); setCat("Todos");
    setOpen((o) => ({ ...o, [id]: true }));
    setFlash(id);
    history.replaceState(null, "", "#" + id);
    setTimeout(() => { const el = document.getElementById("v-" + id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 40);
    setTimeout(() => setFlash(""), 1800);
  };

  useEffect(() => {
    const h = () => { const id = location.hash.slice(1); if (id && byId[id]) go(id); };
    h();
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, [byId]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("mtc-theme", theme); } catch (e) {}
  }, [theme]);

  // Ao imprimir, expande todos os verbetes.
  useEffect(() => {
    const before = () => ReactDOM.flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);

  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const markDone = (id) => setDone((d) => { const n = d.includes(id) ? d.filter((x) => x !== id) : d.concat(id); save("mtc-done", n); return n; });
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const jump = (l) => { const e = list.find((x) => letterOf(x.termo) === l); if (e) { const el = document.getElementById("v-" + e.id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); } };
  const doneCount = all.filter((e) => done.includes(e.id)).length;
  const dark = theme === "dark";

  return html`
    <div className="wrap">
      <header className="head">
        <button className="theme-toggle" onClick=${toggleTheme} aria-label=${dark ? "Ativar modo claro" : "Ativar modo escuro"}>
          <span aria-hidden="true">${dark ? "☀" : "☾"}</span> ${dark ? "Modo claro" : "Modo escuro"}
        </button>
        <h1>Metodolodicionário</h1>
        <p className="sub">Dicionário de termos de metodologia científica</p>
        <ul className="pills" aria-label="Resumo do conteúdo">
          <li>NBR 14724:2024</li><li>NBR 6023:2025</li><li>NBR 10520:2023</li>
        </ul>
      </header>

      <section className="equipe card" aria-labelledby="t-equipe">
        <h2 className="unnum" id="t-equipe">Equipe</h2>
        <ul className="equipe-list">${EQUIPE.map((n) => html`<li key=${n}>${n}</li>`)}</ul>
        <p className="turma">${TURMA}</p>
        <p className="orient"><strong>Orientadora:</strong> ${ORIENTADORA}</p>
      </section>

      <div className="top-grid">

      <nav className="sumario card" aria-labelledby="t-sum">
        <h2 className="unnum" id="t-sum">Sumário</h2>
        <ol>
          <li><a href="#introducao">1 Introdução</a></li>
          <li><a href="#verbetes">2 Verbetes</a>
            <ol>${CATS.map((c, ci) => html`<li key=${c}><a href=${"#cat-" + (ci + 1)}>2.${ci + 1} ${c}</a></li>`)}</ol>
          </li>
          <li><a href="#referencias">Referências</a></li>
        </ol>
      </nav>
        <section id="introducao" className="card">
          <h2>1 Introdução</h2>
          <p>Este documento reúne termos de metodologia científica para consulta e estudo. Cada verbete traz definição, detalhamento, exemplo, termos relacionados e as fontes que o sustentam, e a lista completa das referências aparece ao final. A apresentação segue as normas da Associação Brasileira de Normas Técnicas (ABNT): NBR 14724:2024 (trabalhos acadêmicos), NBR 10520:2023 (citações), NBR 6023:2025 (referências) e NBR 6024 (numeração progressiva das seções).</p>
        </section>
      </div>


      <div className="grid">
        <aside className="side card" aria-label="Busca e filtros">
          <div>
            <h2 className="lab">Buscar</h2>
            <input className="search" type="search" id="busca" placeholder="Termo ou ideia…" value=${q} onInput=${(e) => setQ(e.target.value)} aria-label="Buscar verbetes" />
          </div>
          <div>
            <h2 className="lab">Categoria</h2>
            <div className="cats">${["Todos"].concat(CATS).map((c) => html`<button key=${c} className="chip" aria-pressed=${cat === c} onClick=${() => setCat(c)}>${c}</button>`)}</div>
          </div>
          <div>
            <h2 className="lab">Índice A–Z</h2>
            <div className="az">${letters.map((l) => html`<button key=${l} disabled=${!present.has(l)} onClick=${() => jump(l)} aria-label=${"Ir para a letra " + l}>${l}</button>`)}</div>
          </div>
          <div className="count">${list.length} de ${all.length} verbetes · ${doneCount} estudados</div>
        </aside>

        <main id="verbetes">
          <h2>2 Verbetes</h2>
          ${sections.length === 0
            ? html`<div className="empty">Nenhum verbete encontrado. Limpe a busca ou tente outro termo.</div>`
            : sections.map((s) => html`
              <section key=${s.c} id=${"cat-" + s.n.slice(2)}>
                <h3>${s.n} ${s.c}</h3>
                ${s.items.map((e) => html`<${Entry} key=${e.id} e=${e} num=${num[e.id]} open=${!!open[e.id] || printing} onToggle=${toggle} done=${done.includes(e.id)} onDone=${markDone} byId=${byId} onGo=${go} flash=${flash === e.id} printing=${printing} />`)}
              </section>`)}
        </main>
      </div>

      <section id="referencias" className="referencias card">
        <h2 className="unnum">Referências</h2>
        <${RefList} refs=${allRefs} />
      </section>

    </div>`;
}
