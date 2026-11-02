// Componente de um verbete (definição, detalhes, termos relacionados)
function Entry({ e, open, onToggle, done, onDone, byId, onGo, onDelete, flash }) {
  return html`
    <article className=${"entry" + (flash ? " hit" : "")} id=${"v-" + e.id}>
      <div className="erow">
        <h3 className="term">${e.termo}</h3>
        <span className=${"tag" + (e.own ? " own" : "")}>${e.own ? "seu verbete" : e.cat}</span>
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
      ${open && ((e.fonte && e.fonte.length > 0) || e.fontetxt) && html`
        <p className="src"><span className="mono">fonte</span>
          ${(e.fonte || []).map((id, i) => html`<span key=${id}>${i > 0 ? "; " : ""}<a href=${"#ref-" + id}>${REFS_BY_ID[id].cit}</a></span>`)}
          ${e.fontetxt}</p>`}
      ${open && e.ver && e.ver.length > 0 && html`
        <div className="rel">
          <span className="mono">ver também</span>
          ${e.ver.filter((id) => byId[id]).map((id) => html`<a key=${id} href=${"#" + id} onClick=${(ev) => { ev.preventDefault(); onGo(id); }}>${byId[id].termo}</a>`)}
        </div>`}
      <div>
        ${(e.mais && e.mais.length > 0) || e.ex || e.nota
          ? html`<button className="tog" aria-expanded=${open} onClick=${() => onToggle(e.id)}>${open ? "Fechar" : "Ler mais"}</button>` : null}
        ${e.own && html`<button className="del" onClick=${() => onDelete(e.id)}>Excluir</button>`}
      </div>
    </article>`;
}
