// Componente raiz: busca, filtros, índice A–Z, estado e navegação por hash
function App() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [open, setOpen] = useState({});
  const [flash, setFlash] = useState("");
  const [printing, setPrinting] = useState(false);
  const [done, setDone] = useState(() => load("mtc-done", []));
  const [own, setOwn] = useState(() => load("mtc-own", []));

  const all = useMemo(() => BASE.concat(own.map((o) => ({ ...o, own: true, mais: [], ver: [] }))), [own]);
  const byId = useMemo(() => Object.fromEntries(all.map((e) => [e.id, e])), [all]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return all
      .filter((e) => (cat === "Todos" || e.cat === cat))
      .filter((e) => !nq || norm(e.termo + " " + e.def + " " + (e.mais || []).join(" ") + " " + (e.ex || "")).includes(nq))
      .sort((a, b) => a.termo.localeCompare(b.termo, "pt"));
  }, [all, q, cat]);

  const groups = useMemo(() => {
    const g = [];
    list.forEach((e) => { const l = letterOf(e.termo); const last = g[g.length - 1]; if (last && last.l === l) last.items.push(e); else g.push({ l, items: [e] }); });
    return g;
  }, [list]);
  const present = new Set(groups.map((g) => g.l));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const go = (id) => {
    setQ(""); setCat("Todos");
    setOpen((o) => ({ ...o, [id]: true }));
    setFlash(id);
    history.replaceState(null, "", "#" + id);
    setTimeout(() => {
      const el = document.getElementById("v-" + id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    setTimeout(() => setFlash(""), 1800);
  };

  useEffect(() => {
    const h = () => { const id = location.hash.slice(1); if (id && byId[id]) go(id); };
    h();
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, [byId]);

  // Ao imprimir, expande todos os verbetes (o CSS de impressão segue a NBR 14724).
  useEffect(() => {
    const before = () => ReactDOM.flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);

  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const markDone = (id) => setDone((d) => { const n = d.includes(id) ? d.filter((x) => x !== id) : d.concat(id); save("mtc-done", n); return n; });
  const addOwn = (v) => setOwn((o) => { let id = slug(v.termo); while (byId[id] || o.some((x) => x.id === id)) id += "-2"; const n = o.concat({ ...v, id }); save("mtc-own", n); return n; });
  const delOwn = (id) => setOwn((o) => { const n = o.filter((x) => x.id !== id); save("mtc-own", n); return n; });
  const jump = (l) => { const el = document.getElementById("letra-" + l); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const doneCount = all.filter((e) => done.includes(e.id)).length;

  return html`
    <div className="wrap">
      <header className="head">
        <div className="holes" aria-hidden="true"></div>
        <div className="date">28 out. 2026 · METODOLOGIA CIENTÍFICA</div>
        <h1>Metodologicionário</h1>
        <div className="alt">ou Epistemologionário</div>
        <p className="sub">Dicionário de metodologia científica montado a partir das anotações de aula. Cada verbete traz definição, detalhes, exemplo e termos relacionados.</p>
      </header>

      <div className="grid">
        <aside className="side" aria-label="Filtros">
          <div>
            <h2 className="lab">Buscar</h2>
            <input className="search" type="search" id="busca" placeholder="Termo ou ideia…" value=${q} onInput=${(e) => setQ(e.target.value)} aria-label="Buscar verbetes" />
          </div>
          <div>
            <h2 className="lab">Categoria</h2>
            <div className="cats">
              ${["Todos"].concat(CATS).map((c) => html`<button key=${c} className="chip" aria-pressed=${cat === c} onClick=${() => setCat(c)}>${c}</button>`)}
            </div>
          </div>
          <div>
            <h2 className="lab">Índice A–Z</h2>
            <div className="az">${letters.map((l) => html`<button key=${l} disabled=${!present.has(l)} onClick=${() => jump(l)} aria-label=${"Ir para a letra " + l}>${l}</button>`)}</div>
          </div>
          <div className="count">${list.length} de ${all.length} verbetes · ${doneCount} estudados</div>
        </aside>

        <main>
          ${groups.length === 0
            ? html`<div className="empty">Nenhum verbete encontrado. Limpe a busca ou acrescente o termo no fim da página.</div>`
            : groups.map((g) => html`
              <section key=${g.l}>
                <div className="letter" id=${"letra-" + g.l}>${g.l}</div>
                ${g.items.map((e) => html`<${Entry} key=${e.id} e=${e} open=${!!open[e.id] || printing} onToggle=${toggle} done=${done.includes(e.id)} onDone=${markDone} byId=${byId} onGo=${go} onDelete=${delOwn} flash=${flash === e.id} />`)}
              </section>`)}

          <section className="dots" aria-labelledby="mais">
            <h2 id="mais">… e o que mais?</h2>
            <p>As anotações terminam em reticências, então o dicionário também continua. Acrescente os termos das próximas aulas. Eles ficam salvos neste navegador.</p>
            <${AddForm} onAdd=${addOwn} />
          </section>

          <section className="refs" aria-labelledby="refs-t">
            <h2 id="refs-t">Referências</h2>
            <ul>${REFS.map((r, i) => html`
              <li key=${r.id} id=${"ref-" + r.id}>${i > 0 && REFS[i - 1].aut === r.aut ? "______" : r.aut}. <strong>${r.tit}</strong>${r.pos}${r.conferir && html` <span className="chk">(conferir edição e editora no exemplar)</span>`}</li>`)}
            </ul>
          </section>
        </main>
      </div>

      <footer className="foot">Termos extraídos das anotações de 28 out. 2026. Confira normas e edições vigentes nas fontes oficiais antes de entregar um trabalho.</footer>
    </div>`;
}
