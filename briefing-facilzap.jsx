import { useState, useEffect, useRef, useCallback } from "react";

const ADMIN_PASS = "planned2026";

/* ── SVG Visual Examples ── */
const VisualExamples = {
  headerStyles: [
    { id:"solid", label:"Cor Sólida", svg:<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="40" fill="#d4608a"/><circle cx="20" cy="20" r="12" fill="rgba(255,255,255,0.2)"/><rect x="40" y="14" width="60" height="12" rx="2" fill="rgba(255,255,255,0.8)"/><circle cx="170" cy="20" r="8" fill="rgba(255,255,255,0.3)"/><circle cx="188" cy="20" r="8" fill="rgba(255,255,255,0.3)"/></svg>},
    { id:"gradient", label:"Gradiente", svg:<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hg"><stop offset="0%" stopColor="#d4608a"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient></defs><rect width="200" height="40" fill="url(#hg)"/><circle cx="20" cy="20" r="12" fill="rgba(255,255,255,0.2)"/><rect x="40" y="14" width="60" height="12" rx="2" fill="rgba(255,255,255,0.8)"/><circle cx="170" cy="20" r="8" fill="rgba(255,255,255,0.3)"/><circle cx="188" cy="20" r="8" fill="rgba(255,255,255,0.3)"/></svg>},
    { id:"dark", label:"Escuro/Preto", svg:<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="40" fill="#1a1a2e"/><circle cx="20" cy="20" r="12" fill="rgba(255,255,255,0.1)"/><rect x="40" y="14" width="60" height="12" rx="2" fill="rgba(255,255,255,0.7)"/><circle cx="170" cy="20" r="8" fill="rgba(255,255,255,0.2)"/><circle cx="188" cy="20" r="8" fill="rgba(255,255,255,0.2)"/></svg>},
    { id:"transparent", label:"Transparente", svg:<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="40" fill="#f5f5f5" stroke="#ddd"/><circle cx="20" cy="20" r="12" fill="#eee"/><rect x="40" y="14" width="60" height="12" rx="2" fill="#999"/><circle cx="170" cy="20" r="8" fill="#ddd"/><circle cx="188" cy="20" r="8" fill="#ddd"/></svg>},
  ],
  cardStyles: [
    { id:"rounded", label:"Arredondado", svg:<svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="80" height="110" rx="14" fill="white" stroke="#e0e0e0" strokeWidth="1.5"/><rect x="5" y="5" width="80" height="60" rx="14" fill="#f0e8f5"/><rect x="12" y="72" width="50" height="6" rx="2" fill="#ccc"/><rect x="12" y="84" width="35" height="8" rx="2" fill="#a855f7"/><rect x="12" y="98" width="66" height="12" rx="6" fill="#a855f7" opacity="0.15"/><text x="45" y="107" textAnchor="middle" fontSize="7" fill="#a855f7" fontWeight="bold">Comprar</text></svg>},
    { id:"square", label:"Quadrado", svg:<svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="80" height="110" rx="2" fill="white" stroke="#e0e0e0" strokeWidth="1.5"/><rect x="5" y="5" width="80" height="60" rx="2" fill="#e8f0f5"/><rect x="12" y="72" width="50" height="6" rx="1" fill="#ccc"/><rect x="12" y="84" width="35" height="8" rx="1" fill="#333"/><rect x="12" y="98" width="66" height="12" rx="2" fill="#333"/><text x="45" y="107" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">Comprar</text></svg>},
    { id:"shadow", label:"Com Sombra", svg:<svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg"><defs><filter id="sh"><feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15"/></filter></defs><rect x="8" y="5" width="74" height="105" rx="10" fill="white" filter="url(#sh)"/><rect x="8" y="5" width="74" height="55" rx="10" fill="#fce8f2"/><rect x="15" y="67" width="45" height="5" rx="2" fill="#ccc"/><rect x="15" y="78" width="30" height="7" rx="2" fill="#d4608a"/><rect x="15" y="92" width="56" height="10" rx="5" fill="#d4608a"/><text x="43" y="100" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Comprar</text></svg>},
    { id:"minimal", label:"Minimalista", svg:<svg viewBox="0 0 90 120" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="80" height="110" fill="white"/><rect x="5" y="5" width="80" height="60" fill="#f8f8f8"/><rect x="5" y="65" width="80" height="1" fill="#eee"/><rect x="12" y="72" width="50" height="5" rx="1" fill="#ddd"/><rect x="12" y="83" width="35" height="7" rx="1" fill="#555"/><text x="12" y="107" fontSize="7" fill="#a855f7" fontWeight="bold" textDecoration="underline">Comprar →</text></svg>},
  ],
  layoutStyles: [
    { id:"2col", label:"2 Colunas", svg:<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="100" fill="#f9f9f9" rx="6"/><rect x="6" y="6" width="72" height="42" rx="6" fill="#e8e0f0"/><rect x="82" y="6" width="72" height="42" rx="6" fill="#e8e0f0"/><rect x="6" y="52" width="72" height="42" rx="6" fill="#e8e0f0"/><rect x="82" y="52" width="72" height="42" rx="6" fill="#e8e0f0"/></svg>},
    { id:"3col", label:"3 Colunas", svg:<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="100" fill="#f9f9f9" rx="6"/><rect x="5" y="6" width="48" height="42" rx="5" fill="#e0e8f5"/><rect x="56" y="6" width="48" height="42" rx="5" fill="#e0e8f5"/><rect x="107" y="6" width="48" height="42" rx="5" fill="#e0e8f5"/><rect x="5" y="52" width="48" height="42" rx="5" fill="#e0e8f5"/><rect x="56" y="52" width="48" height="42" rx="5" fill="#e0e8f5"/><rect x="107" y="52" width="48" height="42" rx="5" fill="#e0e8f5"/></svg>},
    { id:"carousel", label:"Carrossel", svg:<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="100" fill="#f9f9f9" rx="6"/><rect x="10" y="10" width="60" height="75" rx="8" fill="#f0e8f5" stroke="#d4b8e8" strokeWidth="1"/><rect x="55" y="10" width="60" height="75" rx="8" fill="#ede0f5" stroke="#d4b8e8" strokeWidth="1"/><rect x="100" y="10" width="60" height="75" rx="8" fill="#e8d8f0" stroke="#d4b8e8" strokeWidth="1" opacity="0.5"/><circle cx="70" cy="93" r="3" fill="#a855f7"/><circle cx="80" cy="93" r="3" fill="#ddd"/><circle cx="90" cy="93" r="3" fill="#ddd"/></svg>},
  ],
  bgStyles: [
    { id:"solid_white", label:"Branco Limpo", svg:<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="60" fill="#ffffff" stroke="#eee"/></svg>},
    { id:"off_white", label:"Off-White/Creme", svg:<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="60" fill="#faf8f5" stroke="#e8e4de"/></svg>},
    { id:"pastel", label:"Pastel/Colorido", svg:<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="60" fill="#fce8f2" stroke="#f0c0d8"/></svg>},
    { id:"dots", label:"Com Padrão", svg:<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="60" fill="#fffbfd"/>{[...Array(12)].map((_, i) => <circle key={i} cx={10 + (i % 4) * 20} cy={10 + Math.floor(i / 4) * 20} r="1.5" fill="#f0d0e0"/>)}</svg>},
    { id:"dark_bg", label:"Fundo Escuro", svg:<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="60" fill="#1a1a2e"/></svg>},
  ],
  buttonStyles: [
    { id:"pill", label:"Pílula", svg:<svg viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="90" height="24" rx="12" fill="#a855f7"/><text x="50" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Comprar</text></svg>},
    { id:"rounded_btn", label:"Arredondado", svg:<svg viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="90" height="24" rx="6" fill="#d4608a"/><text x="50" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Comprar</text></svg>},
    { id:"square_btn", label:"Quadrado", svg:<svg viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="90" height="24" rx="1" fill="#333"/><text x="50" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">COMPRAR</text></svg>},
    { id:"outline_btn", label:"Contorno", svg:<svg viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="90" height="24" rx="6" fill="none" stroke="#a855f7" strokeWidth="2"/><text x="50" y="20" textAnchor="middle" fontSize="10" fill="#a855f7" fontWeight="bold">Comprar</text></svg>},
    { id:"gradient_btn", label:"Gradiente", svg:<svg viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg"><stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs><rect x="5" y="4" width="90" height="24" rx="8" fill="url(#bg)"/><text x="50" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Comprar</text></svg>},
  ],
  catStyles: [
    { id:"circle_border", label:"Círculo c/ Borda", svg:<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="28" r="24" fill="#fce8f2" stroke="#d4608a" strokeWidth="2.5"/><text x="30" y="33" textAnchor="middle" fontSize="18">👗</text><text x="30" y="62" textAnchor="middle" fontSize="7" fill="#666" fontWeight="600">Vestidos</text></svg>},
    { id:"circle_fill", label:"Círculo Colorido", svg:<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="28" r="24" fill="#d4608a"/><text x="30" y="33" textAnchor="middle" fontSize="18">👗</text><text x="30" y="62" textAnchor="middle" fontSize="7" fill="#666" fontWeight="600">Vestidos</text></svg>},
    { id:"square_cat", label:"Quadrado", svg:<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="52" height="48" rx="10" fill="#f0e8f5" stroke="#d8c8e8" strokeWidth="1.5"/><text x="30" y="33" textAnchor="middle" fontSize="18">👗</text><text x="30" y="65" textAnchor="middle" fontSize="7" fill="#666" fontWeight="600">Vestidos</text></svg>},
  ],
};

/* ── Questions ── */
const questions = [
  { id:"welcome", type:"intro", emoji:"✨", title:"Briefing de Personalização FácilZap", subtitle:"Vamos criar a loja virtual perfeita para o seu negócio! Responda as perguntas — leva menos de 5 minutos.", btnText:"Vamos começar →" },
  { id:"nome_loja", type:"text", emoji:"🏪", title:"Qual o nome da sua loja?", subtitle:"O nome que aparece para seus clientes.", placeholder:"Ex: Boutique Maria Fashion", required:true },
  { id:"url_loja", type:"text", emoji:"🔗", title:"Qual a URL da sua loja na FácilZap?", subtitle:"Se já tiver, cole aqui. Se não, escreva o nome desejado.", placeholder:"Ex: minhaloja.facilzap.app.br" },
  { id:"instagram", type:"text", emoji:"📸", title:"Qual o @ do Instagram da loja?", subtitle:"Vamos integrar seu Instagram na loja.", placeholder:"Ex: @minhaloja" },
  { id:"whatsapp", type:"text", emoji:"💬", title:"Qual o WhatsApp da loja?", subtitle:"Com DDD. Ex: (11) 99999-9999", placeholder:"(00) 00000-0000" },
  { id:"nicho", type:"select", emoji:"🎯", title:"Qual o segmento da sua loja?", subtitle:"Escolha o que melhor descreve seu negócio.", options:[
    {value:"moda_feminina",label:"👗 Moda Feminina"},{value:"moda_infantil",label:"👶 Moda Infantil"},{value:"moda_masculina",label:"👔 Moda Masculina"},
    {value:"acessorios",label:"💍 Acessórios"},{value:"calcados",label:"👟 Calçados"},{value:"cosmeticos",label:"💄 Cosméticos / Beleza"},
    {value:"alimentacao",label:"🍰 Alimentação"},{value:"pet",label:"🐾 Pet Shop"},{value:"decoracao",label:"🏠 Decoração"},{value:"outro",label:"📦 Outro"},
  ]},
  { id:"nicho_outro", type:"text", emoji:"📝", title:"Descreva seu segmento", placeholder:"Ex: Artigos esportivos", showIf: a => a.nicho === "outro" },
  { id:"publico", type:"multi", emoji:"👥", title:"Qual o público-alvo?", subtitle:"Selecione todos que se aplicam.", options:[
    {value:"mulheres",label:"👩 Mulheres"},{value:"homens",label:"👨 Homens"},{value:"jovens",label:"🧑 Jovens (18-30)"},
    {value:"adultos",label:"🧑‍💼 Adultos (30-50)"},{value:"maes",label:"🤱 Mães"},{value:"todos",label:"🌍 Todos"},
  ]},
  { id:"tem_logo", type:"select", emoji:"🎨", title:"Você já tem logo e identidade visual?", subtitle:"Cores, fontes, manual de marca, etc.", options:[
    {value:"sim_completo",label:"✅ Sim, tenho tudo definido"},{value:"so_logo",label:"🖼️ Tenho logo mas sem cores definidas"},
    {value:"nao",label:"❌ Não tenho nada ainda"},{value:"refazer",label:"🔄 Tenho mas quero refazer"},
  ]},
  { id:"cor_principal", type:"color", emoji:"🎨", title:"Qual a cor principal da sua marca?", subtitle:"Clique para escolher ou digite o código hex. Se não souber, pule.", presets:["#d4608a","#a855f7","#3b82f6","#22c55e","#f59e0b","#ef4444","#ec4899","#14b8a6","#f97316","#6366f1","#84cc16","#000000"] },
  { id:"cor_secundaria", type:"color", emoji:"🎨", title:"E a cor secundária?", subtitle:"Uma cor que complementa a principal.", presets:["#fce8f2","#f0ebff","#e8eeff","#e8f8ef","#fef3cd","#fee2e2","#fce7f3","#ccfbf1","#ffedd5","#e0e7ff","#ecfccb","#f5f5f5"] },
  { id:"estilo_header", type:"visual", emoji:"📱", title:"Qual estilo de cabeçalho você prefere?", subtitle:"Como quer que o topo da loja pareça?", visuals: VisualExamples.headerStyles },
  { id:"estilo_bg", type:"visual", emoji:"🖼️", title:"Qual estilo de fundo da página?", subtitle:"O background geral da sua loja.", visuals: VisualExamples.bgStyles },
  { id:"estilo_card", type:"visual", emoji:"🃏", title:"Qual estilo de card de produto?", subtitle:"Como os produtos aparecem na vitrine.", visuals: VisualExamples.cardStyles },
  { id:"estilo_botao", type:"visual", emoji:"🔘", title:"Qual estilo de botão 'Comprar'?", subtitle:"O botão que leva o cliente à ação.", visuals: VisualExamples.buttonStyles },
  { id:"estilo_categoria", type:"visual", emoji:"🔵", title:"Qual estilo para as categorias?", subtitle:"Como as categorias aparecem na home.", visuals: VisualExamples.catStyles },
  { id:"estilo_layout", type:"visual", emoji:"📐", title:"Qual layout de produtos no mobile?", subtitle:"Como os produtos são exibidos no celular.", visuals: VisualExamples.layoutStyles },
  { id:"widgets", type:"multi", emoji:"🧩", title:"Quais seções quer na página inicial?", subtitle:"Selecione tudo que deseja ter na home da loja.", options:[
    {value:"banners",label:"🖼️ Banners / Slide de Imagens"},{value:"categorias",label:"🔵 Carrossel de Categorias"},
    {value:"boas_vindas",label:"👋 Card de Boas-Vindas"},{value:"novidades",label:"🆕 Novidades da Semana"},
    {value:"compre_tamanho",label:"👕 Compre por Tamanho"},{value:"promocoes",label:"🔥 Promoções"},
    {value:"instagram",label:"📸 Siga no Instagram"},{value:"mais_vendidos",label:"⭐ Mais Vendidos"},
    {value:"feedbacks",label:"💬 Depoimentos de Clientes"},{value:"faq",label:"❓ Perguntas Frequentes"},
    {value:"pagamento",label:"💳 Formas de Pagamento"},{value:"frete",label:"🚚 Informações de Entrega"},
  ]},
  { id:"slogan", type:"textarea", emoji:"💬", title:"Tem algum slogan ou frase da loja?", subtitle:"Uma frase que represente sua marca.", placeholder:"Ex: Moda infantil com amor e qualidade 💕" },
  { id:"categorias_lista", type:"textarea", emoji:"🗂️", title:"Liste as categorias de produtos", subtitle:"Escreva todas as categorias da sua loja, uma por linha.", placeholder:"Ex:\nCamisetas\nCalças\nVestidos\nAcessórios\nCalçados" },
  { id:"referencia_visual", type:"textarea", emoji:"🌟", title:"Tem alguma referência visual?", subtitle:"Cole links de lojas que admira ou descreva o estilo que quer. Sites, Instagram, Pinterest...", placeholder:"Ex: Gosto do estilo da loja X, quero algo delicado e feminino..." },
  { id:"tem_banners", type:"select", emoji:"🖼️", title:"Você já tem banners prontos?", subtitle:"Imagens para o slide da página inicial (ideal: 1200×500px).", options:[
    {value:"sim",label:"✅ Sim, já tenho"},{value:"preciso",label:"🎨 Preciso que criem"},{value:"depois",label:"⏳ Vou providenciar depois"},
  ]},
  { id:"observacoes", type:"textarea", emoji:"📝", title:"Alguma observação extra?", subtitle:"Algo que não perguntamos e você quer destacar? Pode escrever à vontade!", placeholder:"Escreva aqui qualquer detalhe adicional..." },
  { id:"contato_nome", type:"text", emoji:"👤", title:"Qual seu nome?", subtitle:"Para sabermos com quem estamos falando.", placeholder:"Seu nome completo", required:true },
  { id:"contato_email", type:"text", emoji:"📧", title:"Seu melhor e-mail?", subtitle:"Para enviarmos atualizações do projeto.", placeholder:"seu@email.com" },
  { id:"fim", type:"outro", emoji:"🎉", title:"Briefing enviado com sucesso!", subtitle:"Obrigado por responder! Nossa equipe vai analisar suas respostas e entrar em contato em breve para iniciar a personalização da sua loja." },
];

/* ── Styles ── */
const S = {
  app: { minHeight:"100vh", background:"#0a0a0f", color:"#e8e8f0", fontFamily:"'Segoe UI',system-ui,sans-serif" },
  progress: { position:"fixed", top:0, left:0, height:3, background:"linear-gradient(90deg,#a855f7,#ec4899)", zIndex:100, transition:"width 0.5s ease", borderRadius:"0 2px 2px 0" },
  counter: { position:"fixed", top:14, right:24, fontSize:13, color:"#8888a0", zIndex:100, fontWeight:600 },
  center: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", padding:"24px 20px" },
  card: { width:"100%", maxWidth:640, animation:"slideUp 0.5s ease" },
  emoji: { fontSize:48, marginBottom:16, display:"block", animation:"bounce 0.6s ease" },
  title: { fontSize:"clamp(22px,4vw,32px)", fontWeight:800, lineHeight:1.2, marginBottom:8, letterSpacing:"-0.5px" },
  subtitle: { fontSize:15, color:"#8888a0", marginBottom:32, lineHeight:1.6 },
  input: { width:"100%", padding:"16px 20px", fontSize:16, background:"#16161f", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, color:"#e8e8f0", outline:"none", transition:"border 0.3s", fontFamily:"inherit" },
  textarea: { width:"100%", padding:"16px 20px", fontSize:15, background:"#16161f", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, color:"#e8e8f0", outline:"none", minHeight:120, resize:"vertical", fontFamily:"inherit", lineHeight:1.6 },
  btn: { padding:"14px 32px", fontSize:15, fontWeight:700, border:"none", borderRadius:12, cursor:"pointer", transition:"all 0.3s", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8 },
  btnPrimary: { background:"linear-gradient(135deg,#a855f7,#7c3aed)", color:"#fff", boxShadow:"0 4px 20px rgba(168,85,247,0.3)" },
  btnOutline: { background:"transparent", color:"#8888a0", border:"1.5px solid rgba(255,255,255,0.1)" },
  optionBtn: { width:"100%", padding:"14px 18px", background:"#16161f", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, color:"#e8e8f0", cursor:"pointer", fontSize:15, textAlign:"left", transition:"all 0.2s", fontFamily:"inherit" },
  optionActive: { borderColor:"#a855f7", background:"rgba(168,85,247,0.1)", boxShadow:"0 0 20px rgba(168,85,247,0.1)" },
  visualGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:12 },
  visualCard: { padding:12, background:"#16161f", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, cursor:"pointer", transition:"all 0.25s", textAlign:"center" },
  visualCardActive: { borderColor:"#a855f7", background:"rgba(168,85,247,0.1)", transform:"scale(1.03)", boxShadow:"0 0 24px rgba(168,85,247,0.15)" },
  colorGrid: { display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:16 },
  colorSwatch: { width:"100%", aspectRatio:"1/1", borderRadius:10, cursor:"pointer", transition:"all 0.2s", border:"3px solid transparent" },
  colorSwatchActive: { border:"3px solid #fff", transform:"scale(1.15)", boxShadow:"0 0 16px rgba(255,255,255,0.3)" },
  multiBtn: { padding:"12px 16px", background:"#16161f", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:10, color:"#e8e8f0", cursor:"pointer", fontSize:14, transition:"all 0.2s", fontFamily:"inherit" },
  multiActive: { borderColor:"#a855f7", background:"rgba(168,85,247,0.12)", color:"#c084fc" },
  navBtns: { display:"flex", gap:12, marginTop:32, flexWrap:"wrap" },
  logo: { fontSize:20, fontWeight:800, marginBottom:40, color:"#a855f7", display:"flex", alignItems:"center", gap:8 },
};

const cssAnim = `
@keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
@keyframes bounce { 0%,100% { transform:scale(1); } 50% { transform:scale(1.15); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
`;

/* ── Components ── */
function QuestionView({ q, answer, setAnswer, onNext, onBack, idx, total }) {
  const isValid = q.required ? (answer && answer.length > 0) : true;

  if (q.type === "intro") return (
    <div style={S.center}>
      <div style={{...S.card, textAlign:"center"}}>
        <div style={S.logo}><span style={{fontSize:28}}>⚡</span> Planned Mídia</div>
        <span style={S.emoji}>{q.emoji}</span>
        <h1 style={S.title}>{q.title}</h1>
        <p style={S.subtitle}>{q.subtitle}</p>
        <button style={{...S.btn,...S.btnPrimary}} onClick={onNext} onMouseOver={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 8px 30px rgba(168,85,247,0.4)"}} onMouseOut={e=>{e.target.style.transform="";e.target.style.boxShadow="0 4px 20px rgba(168,85,247,0.3)"}}>{q.btnText}</button>
      </div>
    </div>
  );

  if (q.type === "outro") return (
    <div style={S.center}>
      <div style={{...S.card, textAlign:"center"}}>
        <span style={{...S.emoji, fontSize:64}}>🎉</span>
        <h1 style={S.title}>{q.title}</h1>
        <p style={S.subtitle}>{q.subtitle}</p>
        <div style={{background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:12, padding:"16px 20px", color:"#4ade80", fontSize:14, marginTop:20}}>
          ✅ Suas respostas foram salvas! Entraremos em contato em breve.
        </div>
      </div>
    </div>
  );

  return (
    <div style={S.center}>
      <div style={S.card} key={q.id}>
        <span style={S.emoji}>{q.emoji}</span>
        <h1 style={S.title}>{q.title}</h1>
        {q.subtitle && <p style={S.subtitle}>{q.subtitle}</p>}

        {q.type === "text" && (
          <input style={S.input} value={answer || ""} onChange={e => setAnswer(e.target.value)} placeholder={q.placeholder}
            onFocus={e => e.target.style.borderColor = "#a855f7"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            onKeyDown={e => e.key === "Enter" && isValid && onNext()} autoFocus />
        )}

        {q.type === "textarea" && (
          <textarea style={S.textarea} value={answer || ""} onChange={e => setAnswer(e.target.value)} placeholder={q.placeholder}
            onFocus={e => e.target.style.borderColor = "#a855f7"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} autoFocus />
        )}

        {q.type === "select" && (
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {q.options.map(o => (
              <button key={o.value} style={{...S.optionBtn, ...(answer === o.value ? S.optionActive : {})}}
                onClick={() => { setAnswer(o.value); setTimeout(onNext, 300); }}
                onMouseOver={e => { if(answer !== o.value) e.target.style.borderColor="rgba(168,85,247,0.3)"; }}
                onMouseOut={e => { if(answer !== o.value) e.target.style.borderColor="rgba(255,255,255,0.08)"; }}>
                {o.label}
              </button>
            ))}
          </div>
        )}

        {q.type === "multi" && (
          <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
            {q.options.map(o => {
              const sel = (answer || []).includes(o.value);
              return (
                <button key={o.value} style={{...S.multiBtn, ...(sel ? S.multiActive : {})}}
                  onClick={() => {
                    const arr = answer || [];
                    setAnswer(sel ? arr.filter(v => v !== o.value) : [...arr, o.value]);
                  }}>
                  {sel ? "✓ " : ""}{o.label}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "visual" && (
          <div style={S.visualGrid}>
            {q.visuals.map(v => (
              <div key={v.id}
                style={{...S.visualCard, ...(answer === v.id ? S.visualCardActive : {})}}
                onClick={() => { setAnswer(v.id); setTimeout(onNext, 400); }}
                onMouseOver={e => { if(answer !== v.id) { e.currentTarget.style.borderColor="rgba(168,85,247,0.3)"; e.currentTarget.style.transform="scale(1.02)"; }}}
                onMouseOut={e => { if(answer !== v.id) { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.transform=""; }}}>
                <div style={{marginBottom:8, lineHeight:0}}>{v.svg}</div>
                <div style={{fontSize:12, fontWeight:600, color: answer === v.id ? "#c084fc" : "#aaa"}}>{v.label}</div>
              </div>
            ))}
          </div>
        )}

        {q.type === "color" && (<>
          <div style={S.colorGrid}>
            {q.presets.map(c => (
              <div key={c} style={{...S.colorSwatch, background:c, ...(answer === c ? S.colorSwatchActive : {})}}
                onClick={() => setAnswer(c)} />
            ))}
          </div>
          <input type="text" style={{...S.input, marginTop:8}} value={answer || ""} onChange={e => setAnswer(e.target.value)}
            placeholder="#000000 ou clique acima" onFocus={e => e.target.style.borderColor="#a855f7"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.08)"} />
          {answer && <div style={{marginTop:12, display:"flex", alignItems:"center", gap:12}}>
            <div style={{width:40, height:40, borderRadius:8, background:answer, border:"2px solid rgba(255,255,255,0.2)"}} />
            <span style={{fontSize:14, color:"#aaa"}}>Preview: {answer}</span>
          </div>}
        </>)}

        <div style={S.navBtns}>
          {idx > 1 && <button style={{...S.btn,...S.btnOutline}} onClick={onBack}
            onMouseOver={e=>e.target.style.borderColor="#a855f7"} onMouseOut={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}>← Voltar</button>}
          {q.type !== "select" && (
            <button style={{...S.btn,...S.btnPrimary, opacity:isValid?1:0.4}} onClick={() => isValid && onNext()}
              onMouseOver={e=>{if(isValid){e.target.style.transform="translateY(-2px)"}}} onMouseOut={e=>{e.target.style.transform=""}}>
              {idx === total - 2 ? "Enviar Briefing 🚀" : "Próxima →"}
            </button>
          )}
          {!q.required && q.type !== "select" && (
            <button style={{...S.btn,...S.btnOutline, fontSize:13}} onClick={onNext}>Pular</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Admin Panel ── */
function AdminPanel({ responses }) {
  const [expanded, setExpanded] = useState(null);
  const labelMap = {};
  questions.forEach(q => { if(q.options) q.options.forEach(o => { labelMap[o.value] = o.label; }); });
  const visualMap = {};
  Object.values(VisualExamples).flat().forEach(v => { visualMap[v.id] = v.label; });

  const formatAnswer = (qId, val) => {
    if (!val) return "—";
    if (Array.isArray(val)) return val.map(v => labelMap[v] || visualMap[v] || v).join(", ");
    return labelMap[val] || visualMap[val] || val;
  };

  return (
    <div style={{padding:"24px 20px", maxWidth:900, margin:"0 auto"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:16}}>
        <div>
          <h1 style={{fontSize:24, fontWeight:800, display:"flex", alignItems:"center", gap:10}}>
            <span style={{color:"#a855f7"}}>⚡</span> Painel de Briefings
          </h1>
          <p style={{fontSize:14, color:"#8888a0", marginTop:4}}>{responses.length} briefing(s) recebido(s)</p>
        </div>
        <button style={{...S.btn,...S.btnOutline, fontSize:13}} onClick={() => window.location.reload()}>Sair</button>
      </div>

      {responses.length === 0 && (
        <div style={{textAlign:"center", padding:60, color:"#8888a0"}}>
          <div style={{fontSize:48, marginBottom:16}}>📭</div>
          <p>Nenhum briefing recebido ainda.</p>
        </div>
      )}

      {responses.map((r, i) => (
        <div key={i} style={{background:"#16161f", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, marginBottom:12, overflow:"hidden", transition:"all 0.3s"}}>
          <div style={{padding:"16px 20px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center"}}
            onClick={() => setExpanded(expanded === i ? null : i)}>
            <div>
              <div style={{fontWeight:700, fontSize:15}}>{r.nome_loja || "Sem nome"}</div>
              <div style={{fontSize:12, color:"#8888a0", marginTop:2}}>
                {r.contato_nome || "—"} · {r.contato_email || "—"} · {r.nicho ? (labelMap[r.nicho] || r.nicho) : "—"}
              </div>
              <div style={{fontSize:11, color:"#666", marginTop:4}}>{r._date || ""}</div>
            </div>
            <span style={{color:"#a855f7", fontSize:18, transition:"transform 0.3s", transform: expanded===i?"rotate(180deg)":""}}>▼</span>
          </div>
          {expanded === i && (
            <div style={{padding:"0 20px 20px", borderTop:"1px solid rgba(255,255,255,0.04)", animation:"fadeIn 0.3s ease"}}>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10, marginTop:16}}>
                {questions.filter(q => q.type !== "intro" && q.type !== "outro" && r[q.id]).map(q => (
                  <div key={q.id} style={{background:"#111118", borderRadius:10, padding:"12px 16px"}}>
                    <div style={{fontSize:11, color:"#8888a0", marginBottom:4, fontWeight:600}}>{q.emoji} {q.title?.replace(/\?$/,"")}</div>
                    <div style={{fontSize:14, fontWeight:500, wordBreak:"break-word"}}>
                      {q.type === "color" && r[q.id] ? (
                        <div style={{display:"flex", alignItems:"center", gap:8}}>
                          <div style={{width:24, height:24, borderRadius:6, background:r[q.id], border:"1px solid rgba(255,255,255,0.2)"}} />
                          {r[q.id]}
                        </div>
                      ) : formatAnswer(q.id, r[q.id])}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  const [mode, setMode] = useState("loading");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [responses, setResponses] = useState([]);
  const [adminPass, setAdminPass] = useState("");
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location?.search || "");
      if (params.get("admin") === "true") {
        setMode("admin_login");
      } else {
        setMode("form");
      }
      try {
        const res = await window.storage.get("briefing_responses", false);
        if (res?.value) setResponses(JSON.parse(res.value));
      } catch(e) {}
    })();
  }, []);

  const activeQuestions = questions.filter(q => !q.showIf || q.showIf(answers));
  const currentQuestion = activeQuestions[currentQ];
  const progress = (currentQ / (activeQuestions.length - 1)) * 100;

  const handleNext = async () => {
    if (currentQ < activeQuestions.length - 2) {
      setCurrentQ(c => c + 1);
    } else if (currentQ === activeQuestions.length - 2) {
      const submission = { ...answers, _date: new Date().toLocaleString("pt-BR") };
      const updated = [...responses, submission];
      setResponses(updated);
      try { await window.storage.set("briefing_responses", JSON.stringify(updated), false); } catch(e) {}
      setCurrentQ(c => c + 1);
    }
  };

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASS) {
      setMode("admin");
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  if (mode === "loading") return <div style={{...S.app,...S.center}}><div style={{color:"#a855f7",fontSize:24}}>⚡ Carregando...</div></div>;

  if (mode === "admin_login") return (
    <div style={{...S.app,...S.center}}>
      <style>{cssAnim}</style>
      <div style={{...S.card, textAlign:"center", maxWidth:400}}>
        <div style={S.logo}><span style={{fontSize:28}}>⚡</span> Planned Mídia</div>
        <span style={{...S.emoji, fontSize:40}}>🔐</span>
        <h2 style={{fontSize:22, fontWeight:800, marginBottom:8}}>Painel Administrativo</h2>
        <p style={{color:"#8888a0", fontSize:14, marginBottom:24}}>Digite a senha para acessar os briefings.</p>
        <input type="password" style={{...S.input, textAlign:"center", marginBottom:12}} placeholder="Senha" value={adminPass}
          onChange={e => { setAdminPass(e.target.value); setPassError(false); }}
          onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
          onFocus={e => e.target.style.borderColor="#a855f7"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.08)"} autoFocus />
        {passError && <div style={{color:"#ef4444", fontSize:13, marginBottom:12}}>❌ Senha incorreta</div>}
        <button style={{...S.btn,...S.btnPrimary, width:"100%", justifyContent:"center"}} onClick={handleAdminLogin}>Entrar →</button>
      </div>
    </div>
  );

  if (mode === "admin") return (
    <div style={S.app}>
      <style>{cssAnim}</style>
      <AdminPanel responses={responses} />
    </div>
  );

  return (
    <div style={S.app}>
      <style>{cssAnim}</style>
      {currentQ > 0 && currentQ < activeQuestions.length - 1 && <>
        <div style={{...S.progress, width: progress + "%"}} />
        <div style={S.counter}>{currentQ}/{activeQuestions.length - 2}</div>
      </>}
      <QuestionView
        q={currentQuestion}
        answer={answers[currentQuestion.id]}
        setAnswer={v => setAnswers(a => ({...a, [currentQuestion.id]: v}))}
        onNext={handleNext}
        onBack={() => setCurrentQ(c => Math.max(0, c - 1))}
        idx={currentQ}
        total={activeQuestions.length}
      />
    </div>
  );
}
