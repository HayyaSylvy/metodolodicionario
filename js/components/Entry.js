// Um verbete: definição, "Ler mais" (gaveta), termos relacionados e "Fontes" (gaveta).
function Entry({ e, num, open, onToggle, done, onDone, byId, onGo, flash, printing }) {
  const [refsOpen, setRefsOpen] = useState(false);
  const showRefs = refsOpen || !!printing;
  const rid = "fontes-" + e.id;
  const mid = "mais-" + e.id;
  const hasMore = (e.mais && e.mais.length > 0) || e.ex || e.nota;
  const related = (e.ver || []).filter((id) => byId[id]);
  return html`
    <article className=${"entry" + (flash ? " hit" : "")} id=${"v-" + e.id}>
      <div className="erow">
        <h4 className="term"><span className="num">${num}</span> ${e.termo}</h4>
        <span className="sp"></span>
        <label className=${"study" + (done ? " on" : "")}>
          <input type="checkbox" checked=${done} onChange=${() => onDone(e.id)} />
          ${done ? "Estudado" : "Marcar como estudado"}
        </label>
      </div>
      <p className="def">${e.def}</p>

      ${hasMore ? html`
        <div className=${"drawer drawer--mais" + (open ? " is-open" : "")}>
          <h5 className="drawer-h">
            <button type="button" className="drawer-btn" aria-expanded=${open} aria-controls=${mid} onClick=${() => onToggle(e.id)}>
              <span className="drawer-label">${open ? "Fechar" : "Ler mais"}</span>
              <span className="drawer-chev" aria-hidden="true">▾</span>
            </button>
          </h5>
          <div className="drawer-body" id=${mid} role="region" aria-label=${"Detalhes de " + e.termo}>
            <div className="drawer-inner">
              <div className="more">
                ${e.mais && e.mais.length > 0 && html`<ul>${e.mais.map((m, i) => html`<li key=${i}>${m}</li>`)}</ul>`}
                ${e.ex && html`<p><span className="k">Exemplo</span>${e.ex}</p>`}
                ${e.nota && html`<p><span className="k">Nota da aula</span>${e.nota}</p>`}
              </div>
              ${related.length > 0 && html`
                <div className="rel">
                  <span>Ver também:</span>
                  ${related.map((id) => html`<a key=${id} href=${"#" + id} onClick=${(ev) => { ev.preventDefault(); onGo(id); }}>${byId[id].termo}</a>`)}
                </div>`}
            </div>
          </div>
        </div>` : null}

      <div className=${"drawer drawer--fontes" + (showRefs ? " is-open" : "")}>
        <h5 className="drawer-h">
          <button type="button" className="drawer-btn" aria-expanded=${showRefs} aria-controls=${rid} onClick=${() => setRefsOpen((v) => !v)}>
            <span className="drawer-label">Fontes</span>
            <span className="drawer-count">${e.fonte.length}</span>
            <span className="drawer-chev" aria-hidden="true">▾</span>
          </button>
        </h5>
        <div className="drawer-body" id=${rid} role="region" aria-label=${"Fontes de " + e.termo}>
          <div className="drawer-inner">
            <p className="cit">Citado como: (${e.fonte.map((r) => r.cit).join("; ")}).</p>
            <${RefList} refs=${e.fonte} />
          </div>
        </div>
      </div>
    </article>`;
}
