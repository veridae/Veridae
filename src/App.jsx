import { useState } from "react";

const TAROT_CARDS = [
  { name: "Le Mat", number: "0", keywords: "liberte, spontaneite, nouveau depart" },
  { name: "Le Bateleur", number: "I", keywords: "volonte, habilete, manifestation" },
  { name: "La Papesse", number: "II", keywords: "intuition, sagesse, mystere" },
  { name: "L'Imperatrice", number: "III", keywords: "fertilite, abondance, nature" },
  { name: "L'Empereur", number: "IV", keywords: "autorite, structure, protection" },
  { name: "Le Pape", number: "V", keywords: "tradition, guidance, spiritualite" },
  { name: "L'Amoureux", number: "VI", keywords: "choix, amour, alignement" },
  { name: "Le Chariot", number: "VII", keywords: "victoire, determination, maitrise" },
  { name: "La Justice", number: "VIII", keywords: "equilibre, verite, karma" },
  { name: "L'Hermite", number: "IX", keywords: "solitude, introspection, sagesse" },
  { name: "La Roue", number: "X", keywords: "cycle, destin, tournant" },
  { name: "La Force", number: "XI", keywords: "courage, patience, compassion" },
  { name: "Le Pendu", number: "XII", keywords: "sacrifice, lacher prise, perspective" },
  { name: "La Mort", number: "XIII", keywords: "transformation, fin, renouveau" },
  { name: "La Temperance", number: "XIV", keywords: "harmonie, patience, moderation" },
  { name: "Le Diable", number: "XV", keywords: "attachement, desir, illusion" },
  { name: "La Maison Dieu", number: "XVI", keywords: "revelation, rupture, liberation" },
  { name: "L'Etoile", number: "XVII", keywords: "espoir, inspiration, renouveau" },
  { name: "La Lune", number: "XVIII", keywords: "inconscient, illusion, peur" },
  { name: "Le Soleil", number: "XIX", keywords: "joie, clarte, succes" },
  { name: "Le Jugement", number: "XX", keywords: "eveil, absolution, transformation" },
  { name: "Le Monde", number: "XXI", keywords: "accomplissement, integration, voyage" },
];

const CELTIC_POSITIONS = [
  "La situation", "Ce qui vous traverse", "Ce qui est derriere",
  "Ce qui est devant", "Au-dessus", "En-dessous",
  "Votre attitude", "Votre entourage", "Espoirs et craintes", "Le denouement"
];

const draw = (n) => {
  const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
};

const today = new Date().toLocaleDateString("fr-FR", {
  weekday: "long", day: "numeric", month: "long"
});

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=IM+Fell+English:ital@0;1&display=swap');

  :root {
    --bg: #080808;
    --surface: #0f0f0d;
    --border: #1c1a16;
    --border-mid: #2a2720;
    --gold: #c9a96e;
    --gold-dim: #7a6541;
    --text: #ddd8ce;
    --text-mid: #8a8278;
    --text-dim: #3d3a34;
    --premium: #7b9e8a;
    --oracle: #9a7eb8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Cormorant Garamond', Georgia, serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .site-header {
    width: 100%;
    max-width: 900px;
    padding: 40px 24px 0;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .logo {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: var(--gold);
  }

  .logo span {
    font-style: italic;
    color: var(--text-mid);
    font-size: 14px;
    margin-left: 8px;
  }

  .header-date {
    font-size: 11px;
    letter-spacing: 0.25em;
    color: var(--text-dim);
    text-transform: uppercase;
  }

  .tabs {
    width: 100%;
    max-width: 900px;
    padding: 40px 24px 0;
    display: flex;
    border-bottom: 1px solid var(--border);
  }

  .tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 20px 14px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.25s;
    margin-bottom: -1px;
  }

  .tab:hover { color: var(--text-mid); }
  .tab.active-free { color: var(--gold); border-bottom-color: var(--gold); }
  .tab.active-premium { color: var(--premium); border-bottom-color: var(--premium); }
  .tab.active-oracle { color: var(--oracle); border-bottom-color: var(--oracle); }

  .main {
    width: 100%;
    max-width: 900px;
    padding: 56px 24px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;
  }

  .tier-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tier-name {
    font-size: 11px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
  }

  .tier-name-free { color: var(--gold-dim); }
  .tier-name-premium { color: var(--premium); }
  .tier-name-oracle { color: var(--oracle); }

  .tier-title {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 42px;
    line-height: 1;
    color: var(--text);
  }

  .tier-subtitle {
    font-size: 15px;
    color: var(--text-mid);
    font-style: italic;
  }

  .single-card-wrap {
    perspective: 1200px;
    width: 180px;
    height: 290px;
  }

  .card-3d {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-3d.flipped { transform: rotateY(180deg); }

  .card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 4px;
    border: 1px solid var(--border-mid);
    background: var(--surface);
  }

  .card-back {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-back-inner {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-back-symbol {
    font-size: 28px;
    color: var(--border-mid);
  }

  .card-front {
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 20px 16px;
  }

  .card-front-number {
    font-size: 10px;
    letter-spacing: 0.3em;
    color: var(--text-dim);
    text-transform: uppercase;
  }

  .card-front-name {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 17px;
    color: var(--text);
    text-align: center;
    line-height: 1.2;
  }

  .card-front-keywords {
    font-size: 10px;
    color: var(--text-mid);
    text-align: center;
    line-height: 1.8;
    font-style: italic;
  }

  .spread-3 {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }

  .spread-card-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .spread-position {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  .spread-card-mini {
    perspective: 1200px;
    width: 130px;
    height: 210px;
  }

  .question-area {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .question-label {
    font-size: 11px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  .question-input {
    background: var(--surface);
    border: 1px solid var(--border-mid);
    color: var(--text);
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 16px;
    font-style: italic;
    padding: 14px 18px;
    width: 100%;
    resize: none;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1.5;
  }

  .question-input::placeholder { color: var(--text-dim); }
  .question-input-premium:focus { border-color: var(--premium); }
  .question-input-oracle:focus { border-color: var(--oracle); }

  .cta-btn {
    border: 1px solid;
    background: none;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 13px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    padding: 14px 44px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.35s;
  }

  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .cta-btn:hover::before { transform: translateX(0); }
  .cta-btn span { position: relative; z-index: 1; }
  .cta-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .btn-free { border-color: var(--gold-dim); color: var(--gold); }
  .btn-free::before { background: var(--gold); }
  .btn-free:hover { color: var(--bg); }

  .btn-premium { border-color: var(--premium); color: var(--premium); }
  .btn-premium::before { background: var(--premium); }
  .btn-premium:hover { color: var(--bg); }

  .btn-oracle { border-color: var(--oracle); color: var(--oracle); }
  .btn-oracle::before { background: var(--oracle); }
  .btn-oracle:hover { color: var(--bg); }

  .btn-ghost {
    background: none;
    border: none;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 11px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 8px 0;
    transition: color 0.2s;
  }

  .reset-btn-free { color: var(--text-dim); }
  .reset-btn-free:hover { color: var(--gold-dim); }
  .reset-btn-premium { color: var(--text-dim); }
  .reset-btn-premium:hover { color: var(--premium); }
  .reset-btn-oracle { color: var(--text-dim); }
  .reset-btn-oracle:hover { color: var(--oracle); }

  .reading-wrap {
    width: 100%;
    max-width: 560px;
    animation: fadeUp 0.7s ease both;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .reading-divider {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .reading-line { flex: 1; height: 1px; background: var(--border); }

  .reading-label {
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
  }

  .reading-label-free { color: var(--gold-dim); }
  .reading-label-premium { color: var(--premium); }
  .reading-label-oracle { color: var(--oracle); }

  .reading-text {
    font-size: 18px;
    line-height: 1.85;
    color: var(--text-mid);
    font-style: italic;
  }

  .card-reading-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
    border-bottom: 1px solid var(--border);
  }

  .card-reading-block:last-child { border-bottom: none; }

  .card-reading-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  .card-reading-name {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 20px;
    color: var(--text);
  }

  .card-reading-text {
    font-size: 16px;
    line-height: 1.8;
    color: var(--text-mid);
    font-style: italic;
  }

  .loading {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 32px 0;
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: blink 1.4s ease infinite;
  }

  .dot-free { background: var(--gold-dim); }
  .dot-premium { background: var(--premium); }
  .dot-oracle { background: var(--oracle); }

  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes blink {
    0%,80%,100% { opacity: 0.15; transform: scale(1); }
    40% { opacity: 1; transform: scale(1.4); }
  }

  .paywall {
    width: 100%;
    max-width: 480px;
    border: 1px solid var(--border-mid);
    padding: 48px 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: fadeUp 0.5s ease both;
  }

  .paywall-title {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 28px;
    color: var(--text);
  }

  .paywall-desc {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-mid);
    font-style: italic;
    max-width: 320px;
  }

  .paywall-price {
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .paywall-price-premium { color: var(--premium); }
  .paywall-price-oracle { color: var(--oracle); }

  .paywall-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    text-align: left;
    padding: 16px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .paywall-features li {
    font-size: 13px;
    color: var(--text-mid);
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
  }

  .paywall-features li::before {
    content: '-';
    position: absolute;
    left: 0;
    color: var(--text-dim);
  }

  .error-msg {
    font-size: 14px;
    font-style: italic;
    color: #6b4040;
    text-align: center;
    padding: 24px 0;
  }

  .hint {
    font-size: 13px;
    color: var(--text-dim);
    font-style: italic;
    letter-spacing: 0.05em;
  }
`;

function TarotCard({ card, flipped, size }) {
  const isMini = size === "mini";
  const wrapStyle = isMini
    ? { perspective: "1200px", width: "130px", height: "210px" }
    : { perspective: "1200px", width: "180px", height: "290px" };

  return (
    <div style={wrapStyle}>
      <div className={`card-3d ${flipped ? "flipped" : ""}`}>
        <div className="card-face card-back">
          <div className="card-back-inner">
            <div className="card-back-symbol">*</div>
          </div>
        </div>
        <div className="card-face card-front">
          {card && (
            <>
              <div className="card-front-number">{card.number}</div>
              <div className="card-front-name">{card.name}</div>
              <div className="card-front-keywords">{card.keywords}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Dots({ tier }) {
  return (
    <div className="loading">
      <div className={`dot dot-${tier}`} />
      <div className={`dot dot-${tier}`} />
      <div className={`dot dot-${tier}`} />
    </div>
  );
}

function FreeTier() {
  const [phase, setPhase] = useState("idle");
  const [card, setCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [text, setText] = useState("");

  const doRead = async (c) => {
    setPhase("reading");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Tu es Veridae, une entite oraculaire fictive et intemporelle. Tu lis le tarot avec sobriete et profondeur poetique. Pas de cliches esoteriques. Parle directement a la personne, 3-4 phrases elegantes, en francais.",
          messages: [{ role: "user", content: `Carte du jour : "${c.name}" (${c.number}). Mots-cles : ${c.keywords}. Donne une lecture du tirage du jour.` }]
        })
      });
      const data = await res.json();
      setText(data.content?.map(b => b.text || "").join("") || "");
      setPhase("done");
    } catch (e) {
      setPhase("error");
    }
  };

  const start = () => {
    const c = draw(1)[0];
    setCard(c);
    setPhase("flipping");
    setTimeout(() => {
      setFlipped(true);
      setTimeout(() => doRead(c), 900);
    }, 300);
  };

  const reset = () => { setPhase("idle"); setCard(null); setFlipped(false); setText(""); };

  return (
    <>
      <div className="tier-header">
        <div className="tier-name tier-name-free">Le Souffle - Gratuit</div>
        <div className="tier-title">Tirage du Jour</div>
        <div className="tier-subtitle">Une carte. Un message. Chaque jour.</div>
      </div>

      <TarotCard card={card} flipped={flipped} />

      {phase === "idle" && (
        <button className="cta-btn btn-free" onClick={start}>
          <span>Reveler ma carte</span>
        </button>
      )}
      {phase === "flipping" && <p className="hint">La carte se revele...</p>}
      {phase === "reading" && <div className="reading-wrap"><Dots tier="free" /></div>}

      {phase === "done" && (
        <div className="reading-wrap">
          <div className="reading-divider">
            <div className="reading-line" />
            <div className="reading-label reading-label-free">Lecture de Veridae</div>
            <div className="reading-line" />
          </div>
          <div className="reading-text">{text}</div>
        </div>
      )}

      {phase === "error" && <p className="error-msg">Une perturbation dans les etoiles... Reessayez.</p>}

      {(phase === "done" || phase === "error") && (
        <button className="btn-ghost reset-btn-free" onClick={reset}>Recommencer</button>
      )}
    </>
  );
}

function PremiumTier() {
  const [unlocked] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState([null, null, null]);
  const [flipped, setFlipped] = useState([false, false, false]);
  const [readings, setReadings] = useState([]);

  const positions = ["Passe", "Present", "Futur"];

  const start = () => {
    const c = draw(3);
    setCards(c);
    setPhase("flipping");
    [0, 1, 2].forEach(i => {
      setTimeout(() => {
        setFlipped(prev => { const n = [...prev]; n[i] = true; return n; });
        if (i === 2) setTimeout(() => doRead(c), 800);
      }, 400 + i * 500);
    });
  };

  const doRead = async (c) => {
    setPhase("reading");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Tu es Veridae, entite oraculaire fictive. Tu fais des lectures de tarot en 3 cartes sobres et poetiques. Pour chaque position (Passe, Present, Futur), donne 2-3 phrases percutantes. Reponds en JSON strict sans markdown : [{\"position\":\"Passe\",\"carte\":\"...\",\"lecture\":\"...\"},{\"position\":\"Present\",\"carte\":\"...\",\"lecture\":\"...\"},{\"position\":\"Futur\",\"carte\":\"...\",\"lecture\":\"...\"}]",
          messages: [{ role: "user", content: `Question : "${question || "Quelle energie m'accompagne en ce moment ?"}" | Cartes : Passe = ${c[0].name}, Present = ${c[1].name}, Futur = ${c[2].name}.` }]
        })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "[]";
      const clean = raw.replace(/```json|```/g, "").trim();
      setReadings(JSON.parse(clean));
      setPhase("done");
    } catch (e) {
      setPhase("error");
    }
  };

  const reset = () => { setPhase("idle"); setCards([null,null,null]); setFlipped([false,false,false]); setReadings([]); setQuestion(""); };

  if (!unlocked) {
    return (
      <div className="paywall">
        <div className="paywall-title">L'Eveil</div>
        <div className="paywall-desc">Accedez au tirage en trois cartes et posez vos propres questions a Veridae.</div>
        <ul className="paywall-features">
          <li>Tirage Passe, Present, Futur</li>
          <li>Question personnalisee a Veridae</li>
          <li>Lectures illimitees chaque jour</li>
          <li>Interpretations approfondies</li>
        </ul>
        <div className="paywall-price paywall-price-premium">4,99 EUR / mois - Sans engagement</div>
        <button className="cta-btn btn-premium"><span>S'abonner a L'Eveil</span></button>
      </div>
    );
  }

  return (
    <>
      <div className="tier-header">
        <div className="tier-name tier-name-premium">L'Eveil - 4,99 EUR / mois</div>
        <div className="tier-title">Passe, Present, Futur</div>
        <div className="tier-subtitle">Trois cartes pour lire le fil de votre chemin.</div>
      </div>

      {phase === "idle" && (
        <div className="question-area">
          <div className="question-label">Votre question (optionnelle)</div>
          <textarea
            className="question-input question-input-premium"
            rows={2}
            placeholder="Sur quoi souhaitez-vous que Veridae se concentre ?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>
      )}

      <div className="spread-3">
        {positions.map((pos, i) => (
          <div key={i} className="spread-card-wrap">
            <div className="spread-position">{pos}</div>
            <TarotCard card={cards[i]} flipped={flipped[i]} size="mini" />
          </div>
        ))}
      </div>

      {phase === "idle" && <button className="cta-btn btn-premium" onClick={start}><span>Lancer le tirage</span></button>}
      {phase === "flipping" && <p className="hint">Les cartes s'ouvrent...</p>}
      {phase === "reading" && <div className="reading-wrap"><Dots tier="premium" /></div>}

      {phase === "done" && (
        <div className="reading-wrap">
          <div className="reading-divider">
            <div className="reading-line" />
            <div className="reading-label reading-label-premium">Lecture de Veridae</div>
            <div className="reading-line" />
          </div>
          {readings.map((r, i) => (
            <div key={i} className="card-reading-block">
              <div className="card-reading-label">{r.position}</div>
              <div className="card-reading-name">{r.carte}</div>
              <div className="card-reading-text">{r.lecture}</div>
            </div>
          ))}
        </div>
      )}

      {phase === "error" && <p className="error-msg">Une perturbation... Veuillez reessayer.</p>}
      {(phase === "done" || phase === "error") && (
        <button className="btn-ghost reset-btn-premium" onClick={reset}>Nouveau tirage</button>
      )}
    </>
  );
}

function OracleTier() {
  const [unlocked] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState(Array(10).fill(null));
  const [flipped, setFlipped] = useState(Array(10).fill(false));
  const [synthesis, setSynthesis] = useState("");

  const start = () => {
    const c = draw(10);
    setCards(c);
    setPhase("flipping");
    c.forEach((_, i) => {
      setTimeout(() => {
        setFlipped(prev => { const n = [...prev]; n[i] = true; return n; });
        if (i === 9) setTimeout(() => doRead(c), 700);
      }, 300 + i * 300);
    });
  };

  const doRead = async (c) => {
    setPhase("reading");
    const listing = c.map((card, i) => `${i+1}. ${CELTIC_POSITIONS[i]} : ${card.name}`).join("\n");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Tu es Veridae, entite oraculaire fictive. Tu fais une lecture complete de la Croix Celtique (10 cartes). Tu donnes une synthese narrative de 5-7 phrases, poetique et profonde, qui relie toutes les cartes en un seul message coherent. En francais, sobre, sans cliches. Pas de liste, une seule narration fluide.",
          messages: [{ role: "user", content: `Question : "${question || "Quel message me destine l'univers en ce moment ?"}" \n\nCartes tirees :\n${listing}` }]
        })
      });
      const data = await res.json();
      setSynthesis(data.content?.map(b => b.text || "").join("") || "");
      setPhase("done");
    } catch (e) {
      setPhase("error");
    }
  };

  const reset = () => { setPhase("idle"); setCards(Array(10).fill(null)); setFlipped(Array(10).fill(false)); setSynthesis(""); setQuestion(""); };

  if (!unlocked) {
    return (
      <div className="paywall">
        <div className="paywall-title">L'Infini</div>
        <div className="paywall-desc">La Croix Celtique - le tirage le plus complet du tarot. Dix cartes, une synthese narrative totale.</div>
        <ul className="paywall-features">
          <li>Tirage Croix Celtique (10 cartes)</li>
          <li>Synthese narrative complete</li>
          <li>Tout ce qui est inclus dans L'Eveil</li>
          <li>Historique de vos tirages</li>
        </ul>
        <div className="paywall-price paywall-price-oracle">9,99 EUR / mois - Sans engagement</div>
        <button className="cta-btn btn-oracle"><span>S'abonner a L'Infini</span></button>
      </div>
    );
  }

  return (
    <>
      <div className="tier-header">
        <div className="tier-name tier-name-oracle">L'Infini - 9,99 EUR / mois</div>
        <div className="tier-title">La Croix Celtique</div>
        <div className="tier-subtitle">Dix cartes. Une vision totale de votre chemin.</div>
      </div>

      {phase === "idle" && (
        <div className="question-area">
          <div className="question-label">Votre question profonde</div>
          <textarea
            className="question-input question-input-oracle"
            rows={2}
            placeholder="Quelle question essentielle portez-vous en ce moment ?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", maxWidth: "620px" }}>
        {cards.map((card, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-dim)", textTransform: "uppercase", textAlign: "center", maxWidth: "72px" }}>
              {CELTIC_POSITIONS[i]}
            </div>
            <div style={{ perspective: "800px", width: "62px", height: "100px" }}>
              <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(.4,0,.2,1)", transform: flipped[i] ? "rotateY(180deg)" : "none" }}>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", border: "1px solid var(--border-mid)", background: "var(--surface)", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--border-mid)", fontSize: "14px" }}>*</span>
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", border: "1px solid var(--border-mid)", background: "var(--surface)", borderRadius: "3px", transform: "rotateY(180deg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", padding: "4px" }}>
                  {card && (
                    <>
                      <div style={{ fontSize: "8px", textAlign: "center", color: "var(--text-mid)", lineHeight: "1.3" }}>{card.name}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {phase === "idle" && <button className="cta-btn btn-oracle" onClick={start}><span>Ouvrir la Croix</span></button>}
      {phase === "flipping" && <p className="hint">Les dix cartes s'eveillent...</p>}
      {phase === "reading" && <div className="reading-wrap"><Dots tier="oracle" /></div>}

      {phase === "done" && (
        <div className="reading-wrap">
          <div className="reading-divider">
            <div className="reading-line" />
            <div className="reading-label reading-label-oracle">Synthese de Veridae</div>
            <div className="reading-line" />
          </div>
          <div className="reading-text">{synthesis}</div>
        </div>
      )}

      {phase === "error" && <p className="error-msg">Une perturbation profonde... Veuillez reessayer.</p>}
      {(phase === "done" || phase === "error") && (
        <button className="btn-ghost reset-btn-oracle" onClick={reset}>Nouveau tirage</button>
      )}
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState("free");

  const tabClass = (t) => tab === t ? `tab active-${t}` : "tab";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="site-header">
          <div className="logo">Veridae <span>Oracle</span></div>
          <div className="header-date">{today}</div>
        </header>

        <nav className="tabs">
          <button className={tabClass("free")} onClick={() => setTab("free")}>Le Souffle</button>
          <button className={tabClass("premium")} onClick={() => setTab("premium")}>L'Eveil</button>
          <button className={tabClass("oracle")} onClick={() => setTab("oracle")}>L'Infini</button>
        </nav>

        <main className="main">
          {tab === "free" && <FreeTier />}
          {tab === "premium" && <PremiumTier />}
          {tab === "oracle" && <OracleTier />}
        </main>
      </div>
    </>
  );
}
