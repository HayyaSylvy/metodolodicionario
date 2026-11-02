// Lista de referências (ABNT NBR 6023:2025): alinhada à esquerda, espaçamento simples,
// recuo deslocado (hanging indent) e uma linha em branco entre itens.
function RefList({ refs }) {
  return html`<ul className="reflist">${refs.map((r, i) => html`
    <li key=${r.key}>
      ${r.aut ? html`<span className="ref-author">${i > 0 && refs[i - 1].aut === r.aut ? "______" : r.aut}</span>.` : null}
      ${r.pre ? html` <span className="ref-pre">${r.pre}</span>` : null}
      ${" "}<strong className="ref-title">${r.tit}</strong><span className="ref-details">${r.pos}</span>
    </li>`)}</ul>`;
}
