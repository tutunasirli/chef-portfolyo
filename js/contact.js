/* İletişim formu — Web3Forms ile gönderim */
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

const MESSAGES = {
  sending: 'Gönderiliyor…',
  success: 'Mesajınız iletildi. En kısa sürede dönüş yapacağım.',
  error:   'Mesaj gönderilemedi. Lütfen WhatsApp veya e-posta ile ulaşın.',
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const button = form.querySelector('.form-submit');
  const successBox = document.getElementById('successMsg');
  const errorBox = document.getElementById('errorMsg');
  const defaultLabel = button.innerHTML;

  const showMessage = (box, text) => {
    successBox.style.display = 'none';
    errorBox.style.display = 'none';
    if (box) {
      box.textContent = text;
      box.style.display = 'block';
    }
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    showMessage(null);
    button.disabled = true;
    button.textContent = MESSAGES.sending;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      showMessage(successBox, MESSAGES.success);
      form.reset();
    } catch (error) {
      showMessage(errorBox, MESSAGES.error);
    } finally {
      button.disabled = false;
      button.innerHTML = defaultLabel;
    }
  });
});