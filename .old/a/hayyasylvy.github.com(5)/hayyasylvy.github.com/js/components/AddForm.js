// Formulário para adicionar verbetes próprios
function AddForm({ onAdd }) {
  const [termo, setTermo] = useState("");
  const [cat, setCat] = useState(CATS[0]);
  const [def, setDef] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (ev) => {
    ev.preventDefault();
    if (!termo.trim() || !def.trim()) { setMsg("Preencha o termo e a definição."); return; }
    onAdd({ termo: termo.trim(), cat, def: def.trim() });
    setTermo(""); setDef(""); setMsg("Verbete adicionado ao dicionário.");
  };
  return html`
    <form className="form" onSubmit=${submit}>
      <label for="f-termo">Termo
        <input id="f-termo" value=${termo} onInput=${(e) => setTermo(e.target.value)} placeholder="Ex.: Revisão sistemática" />
      </label>
      <label for="f-cat">Categoria
        <select id="f-cat" value=${cat} onChange=${(e) => setCat(e.target.value)}>${CATS.map((c) => html`<option key=${c} value=${c}>${c}</option>`)}</select>
      </label>
      <label for="f-def">Definição
        <textarea id="f-def" value=${def} onInput=${(e) => setDef(e.target.value)} placeholder="Explique com suas palavras."></textarea>
      </label>
      <button className="btn" type="submit">Adicionar verbete</button>
      <div className="msg" role="status">${msg}</div>
    </form>`;
}
