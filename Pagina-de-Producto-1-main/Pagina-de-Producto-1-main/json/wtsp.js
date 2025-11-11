const whatsappBtn = document.getElementById("whatsappButton");
const whatsappPopup = document.getElementById("whatsappPopup");
const closePopup = document.getElementById("closePopup");
const openChatBtn = document.getElementById("openChatBtn");

  if (whatsappBtn && whatsappPopup) {
    whatsappBtn.addEventListener("click", () => {
      const visible = whatsappPopup.style.display === "block";
      whatsappPopup.style.display = visible ? "none" : "block";
    });
  }

  closePopup?.addEventListener("click", () => {
    whatsappPopup.style.display = "none";
  });

  openChatBtn?.addEventListener("click", () => {
    window.open("https://wa.me/51920835758?text=¡Hola! 👋 Estoy interesado en los productos de Velu Global.", "_blank");
    whatsappPopup.style.display = "none";
  });

  document.addEventListener("click", (e) => {
    if (
      whatsappPopup.style.display === "block" &&
      !whatsappPopup.contains(e.target) &&
      !whatsappBtn.contains(e.target)
    ) {
      whatsappPopup.style.display = "none";
    }
  });