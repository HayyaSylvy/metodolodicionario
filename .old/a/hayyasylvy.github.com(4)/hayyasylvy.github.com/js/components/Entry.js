// Um verbete: definição, detalhes, exemplo, termos relacionados e referências próprias.
function Entry({ e, num, open, onToggle, done, onDone, byId, onGo, flash, printing }) {
  const [refsOpen, setRefsOpen] = useState(false);
  const showRefs = refsOpen || !!printing;
  const rid = "fontes-" + e.id;
  const hasMore = (e.mais && e.mais.length > 0) || e.ex || e.nota;
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
      ${open && html`
        <div className="more">
          ${e.mais && e.mais.length > 0 && html`<ul>${e.mais.map((m, i) => html`<li key=${i}>${m}</li>`)}</ul>`}
          ${e.ex && html`<p><span className="k">Exemplo</span>${e.ex}</p>`}
          ${e.nota && html`<p><span className="k">Nota da aula</span>${e.nota}</p>`}
        </div>`}
      ${open && e.ver && e.ver.length > 0 && html`
        <div className="rel">
          <span>Ver também:</span>
          ${e.ver.filter((id) => byId[id]).map((id) => html`<a key=${id} href=${"#" + id} onClick=${(ev) => { ev.preventDefault(); onGo(id); }}>${byId[id].termo}</a>`)}
        </div>`}
      ${hasMore ? html`<button className="tog" aria-expanded=${open} onClick=${() => onToggle(e.id)}>${open ? "Fechar" : "Ler mais"}</button>` : null}
      <div className=${"drawer" + (showRefs ? " is-open" : "")}>
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
