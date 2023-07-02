
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('[data-modal]');
  overlay.addEventListener('click', closeModal);

function openModal() {
  modal.classList.add('active');
  overlay.classList.add('active');
  }
  
function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  }
  document.body.addEventListener('keyup', function (e) {
    const key = e.keyCode;
    
    if (key === 27) {

      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay.active').classList.remove('active');
    };
  });

  