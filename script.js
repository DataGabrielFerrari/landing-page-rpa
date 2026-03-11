// script.js
// =====================================
// CONFIG (edite aqui)
// =====================================
const WHATSAPP_NUMBER = "5511918573927"; // 55 + DDD + número (só dígitos)
const YOUTUBE_ID = "wcjZXRso8FI";        // ID do vídeo (não é a URL inteira)
const WHATSAPP_NEW_TAB = true;

// =====================================
// Helpers
// =====================================
function buildWhatsAppLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const text = encodeURIComponent(message || "");
  return text ? `${base}?text=${text}` : base;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  if (WHATSAPP_NEW_TAB) {
    el.target = "_blank";
    el.rel = "noopener noreferrer nofollow";
  }
}

// =====================================
// WhatsApp CTAs (IDs que EXISTEM no HTML)
// =====================================
function setupWhatsAppCtas() {
  const msgDefault = "Oi! Quero automatizar meu processo.";

  const msg200  = "Oi! Quero automatizar. Meu volume é ATÉ 200 cotas/mês.";
  const msg500  = "Oi! Quero automatizar. Meu volume é 201–500 cotas/mês.";
  const msg1000 = "Oi! Quero automatizar. Meu volume é 501–1.000 cotas/mês.";
  const msg1500 = "Oi! Quero automatizar. Meu volume é 1.001–1.500 cotas/mês.";
  const msgNeg  = "Oi! Quero automatizar. Meu volume é ACIMA de 1.500 cotas/mês";

  setHref("ctaWhatsappHero", buildWhatsAppLink(msgDefault));
  setHref("ctaWhatsappBottom", buildWhatsAppLink(msgDefault));
  setHref("ctaWhatsappFinal", buildWhatsAppLink(msgDefault));


  // Planos
  setHref("ctaPlan200",  buildWhatsAppLink(msg200));
  setHref("ctaPlan500",  buildWhatsAppLink(msg500));
  setHref("ctaPlan1000", buildWhatsAppLink(msg1000));
  setHref("ctaPlan1500", buildWhatsAppLink(msg1500));
  setHref("ctaPlanNeg",  buildWhatsAppLink(msgNeg));
}

// =====================================
// YouTube modal (lazy-load no clique)
// =====================================
function setupVideoModal() {
  const thumbBtn = document.getElementById("videoThumb");
  const thumbImg = document.getElementById("ytThumbImg");
  if (!thumbBtn || !thumbImg) return;

  // thumb leve (pode trocar para maxresdefault.jpg se quiser)
  thumbImg.src = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;

  thumbBtn.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "vmodal";
    modal.innerHTML = `
      <div class="vmodal__panel" role="dialog" aria-modal="true" aria-label="Demonstração">
        <div class="vmodal__head">
          <strong>Demonstração</strong>
          <button class="btn btn--ghost vmodal__close" type="button" aria-label="Fechar">✕</button>
        </div>
        <div class="vmodal__body">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0"
            title=" Funcionamento"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    const close = () => {
      document.body.style.overflow = "";
      modal.remove();
    };

    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    modal.querySelector(".vmodal__close")?.addEventListener("click", close);
    document.addEventListener("keydown", function esc(e){
      if (e.key === "Escape") {
        document.removeEventListener("keydown", esc);
        close();
      }
    });
  });
}

// =====================================
// Footer year
// =====================================
function setupYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// =====================================
// Init
// =====================================
window.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppCtas();
  setupVideoModal();
  setupYear();
});

/* =========================================================
   MENU MOBILE
   ========================================================= */
(function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  // LOG: evita erro caso o header ainda não exista na página
  if (!menuToggle || !mobileNav) {
    console.warn("[MENU] menuToggle ou mobileNav não encontrado.");
    return;
  }

  function openMenu() {
    mobileNav.classList.add("is-open");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    console.log("[MENU] Aberto");
  }

  function closeMenu() {
    mobileNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    console.log("[MENU] Fechado");
  }

  function toggleMenu() {
    const isOpen = mobileNav.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // EVENTO: clique no botão hambúrguer
  menuToggle.addEventListener("click", toggleMenu);

  // EVENTO: ao clicar em qualquer link do menu, fecha no mobile
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) {
        closeMenu();
      }
    });
  });

  // EVENTO: clique fora do menu fecha
  document.addEventListener("click", (event) => {
    const clickedInsideNav = mobileNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && mobileNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // EVENTO: tecla ESC fecha
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // EVENTO: ao voltar para desktop, garante estado limpo
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });

})();
