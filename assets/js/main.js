/* =========================================
   DADOS — EDITE AQUI PARA TROCAR CONTEÚDO
   ========================================= */
const services = [
  { icon:"🏛️", title:"Administração condominial", desc:"Gestão completa do dia a dia do condomínio com processos claros e organizados." },
  { icon:"📊", title:"Gestão financeira",         desc:"Controle preciso de receitas, despesas e inadimplência com relatórios mensais." },
  { icon:"📑", title:"Prestação de contas",        desc:"Transparência total: documentos auditáveis e demonstrativos acessíveis." },
  { icon:"🗣️", title:"Apoio a assembleias",       desc:"Convocação, condução e ata — tudo conduzido com método e neutralidade." },
  { icon:"🤝", title:"Atendimento ao síndico",     desc:"Suporte ágil ao síndico e moradores, com canal direto e respostas claras." },
  { icon:"🧾", title:"Contratação de fornecedores",desc:"Orçamentos comparativos e gestão de contratos com critérios técnicos." },
  { icon:"🛠️", title:"Manutenção preventiva",     desc:"Acompanhamento de cronogramas para preservar o patrimônio condominial." },
  { icon:"💡", title:"Consultoria condominial",    desc:"Diagnóstico e plano de ação para otimizar gestão, custos e relações." },
  { icon:"🗂️", title:"Suporte administrativo",   desc:"Equipe dedicada para rotinas operacionais e documentação em ordem." },
];
const diffs = [
  { t:"Atendimento humanizado", d:"Pessoas reais, respostas rápidas e linguagem clara." },
  { t:"Transparência total",    d:"Você acompanha cada centavo e cada decisão." },
  { t:"Suporte contínuo",       d:"Estamos presentes — não só quando há problema." },
  { t:"Visão estratégica",      d:"Decisões pensadas a longo prazo para o seu patrimônio." },
  { t:"Comunicação clara",      d:"Comunicados objetivos, sem jargão técnico desnecessário." },
  { t:"Confiança na gestão",    d:"Processos auditáveis e equipe qualificada." },
];
const stats = [
  { v:"180+", l:"Condomínios atendidos" },
  { v:"15",   l:"Anos de experiência" },
  { v:"98%",  l:"Síndicos satisfeitos" },
  { v:"24h",  l:"Tempo médio de resposta" },
];

/* Render */
document.getElementById("services").innerHTML = services.map(s=>`
  <article class="card fade-up">
    <div class="ico">${s.icon}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
  </article>`).join("");
document.getElementById("diffs").innerHTML = diffs.map((d,i)=>`
  <div class="diff fade-up">
    <div class="num">0${i+1}</div>
    <h3>${d.t}</h3><p>${d.d}</p>
  </div>`).join("");
document.getElementById("stats").innerHTML = stats.map(s=>`
  <div class="stat glass fade-up">
    <div class="v gradient-gold-text">${s.v}</div>
    <div class="l">${s.l}</div>
  </div>`).join("");
document.getElementById("yr").textContent = new Date().getFullYear();

/* Header scroll */
const hdr = document.getElementById("hdr");
addEventListener("scroll", ()=> hdr.classList.toggle("scrolled", scrollY > 20), { passive:true });

/* Reveal on scroll */
const io = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.12});
document.querySelectorAll(".fade-up").forEach(el=>io.observe(el));

/* ===========================================
   DEMO 4 — ÓRBITAS DOURADAS ao redor do logo
   =========================================== */
(function(){
  const wrap   = document.getElementById("stage");
  const canvas = document.getElementById("cv");
  const ctx    = canvas.getContext("2d");
  const dpr    = window.devicePixelRatio || 1;
  let w=0,h=0, particles=[], raf;
  const mouse  = { x:-9999, y:-9999, inside:false };

  function resize(){
    const r = wrap.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w*dpr; canvas.height = h*dpr;
    canvas.style.width = w+"px"; canvas.style.height = h+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    // partículas em 3 anéis
    particles = [];
    const cx = w/2, cy = h/2;
    for (let i=0; i<110; i++){
      const ring = i % 3;
      const a = Math.random() * Math.PI * 2;
      const radius = (w*0.22) + ring*(w*0.10) + Math.random()*8;
      particles.push({
        angle:a,
        radius,
        speed: (ring % 2 === 0 ? 1 : -1) * (0.003 + Math.random()*0.004),
        x: cx + Math.cos(a)*radius,
        y: cy + Math.sin(a)*radius,
        size: 1.2 + Math.random()*2.4
      });
    }
  }

  function onMove(e){
    const r = wrap.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.inside = true;
  }
  function onLeave(){ mouse.inside = false; mouse.x=-9999; mouse.y=-9999; }

  function draw(){
    ctx.clearRect(0,0,w,h);
    const cx = w/2, cy = h/2;
    ctx.globalCompositeOperation = "lighter";
    for (const p of particles){
      p.angle += p.speed;
      let tx = cx + Math.cos(p.angle) * p.radius;
      let ty = cy + Math.sin(p.angle) * p.radius;
      if (mouse.inside){
        tx += (mouse.x - cx) * 0.30;
        ty += (mouse.y - cy) * 0.30;
      }
      p.x += (tx - p.x) * 0.12;
      p.y += (ty - p.y) * 0.12;
      ctx.fillStyle = "rgba(230,190,90,0.9)";
      ctx.shadowColor = "rgba(255,230,160,1)";
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(draw);
  }

  resize();
  addEventListener("resize", resize);
  wrap.addEventListener("pointermove", onMove);
  wrap.addEventListener("pointerenter", onMove);
  wrap.addEventListener("pointerleave", onLeave);
  raf = requestAnimationFrame(draw);
})();
