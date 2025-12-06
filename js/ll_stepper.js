// docs/js/ll-stepper.js
(function(){
  document.querySelectorAll('.ll-stepper').forEach(function(root){
    const base = root.getAttribute('data-base') || '';
    const frames = (root.getAttribute('data-frames') || '')
      .split(',').map(s=>s.trim()).filter(Boolean);
    if (!frames.length) return;

    const img = document.createElement('img');
    img.style.cssText = 'width:100%;height:auto;display:block;border:1px solid rgba(255,255,255,0.08);';

    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;align-items:center;gap:.5rem;margin-top:.5rem;';
    const prev = document.createElement('button');
    prev.type='button'; prev.textContent='◀ Prev';
    const dots = document.createElement('div');
    dots.style.cssText='display:flex;gap:.25rem;flex-wrap:wrap;';
    const next = document.createElement('button');
    next.type='button'; next.textContent='Next ▶'; next.style.marginLeft='auto';

    controls.appendChild(prev); controls.appendChild(dots); controls.appendChild(next);
    root.appendChild(img); root.appendChild(controls);

    let i = 0;
    function set(n){
      i = (n + frames.length) % frames.length;
      img.src = base + frames[i];
      Array.from(dots.children).forEach((b, idx)=>{
        b.style.opacity = idx===i ? '1' : '.35';
        b.style.transform = idx===i ? 'scale(1.1)' : 'scale(1.0)';
      });
    }

    frames.forEach((_, idx)=>{
      const b = document.createElement('button');
      b.type='button';
      b.textContent = idx+1;
      b.style.cssText = 'padding:.25rem .4rem;border:1px solid rgba(255,255,255,.25);background:transparent;cursor:pointer;font:inherit;';
      b.onclick = ()=> set(idx);
      dots.appendChild(b);
    });

    prev.onclick = ()=> set(i-1);
    next.onclick = ()=> set(i+1);
    set(0);
  });
})();

