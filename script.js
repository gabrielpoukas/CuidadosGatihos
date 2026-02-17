
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const ravenaCard = document.getElementById('ravena');
  
  const hoje = new Date();
  const diaSemana = hoje.getDay();

  if (diaSemana !== 2) {
      const bombinhaTask = ravenaCard.querySelector('.special');
      bombinhaTask.style.opacity = "0.4";
      bombinhaTask.style.pointerEvents = "none";
      bombinhaTask.querySelector('strong').innerHTML += " <small>(Apenas Terças)</small>";
  } else {
      ravenaCard.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.3)";
      ravenaCard.style.border = "2px solid #ef4444";
  }

  loadSavedProgress(checkboxes);

  checkboxes.forEach((check, index) => {
      check.addEventListener('change', () => {
          saveProgress(index, check.checked);
          updateCardStyle(check);
          checkAllTasksDone(check.closest('.pet-card, .service-card'));
      });
  });
}

function saveProgress(id, status) {
  localStorage.setItem(`pet_task_${id}`, status);
}

function loadSavedProgress(elements) {
  elements.forEach((el, index) => {
      const savedStatus = localStorage.getItem(`pet_task_${index}`);
      if (savedStatus === 'true') {
          el.checked = true;
          updateCardStyle(el);
          setTimeout(() => checkAllTasksDone(el.closest('.pet-card, .service-card')), 100);
      }
  });
}

function updateCardStyle(input) {
  const parentTask = input.closest('.task-item');
  if (input.checked) {
      parentTask.style.opacity = "0.5";
      parentTask.style.background = "#f8fafc";
  } else {
      parentTask.style.opacity = "1";
      parentTask.style.background = "white";
  }
}

function checkAllTasksDone(container) {
  if (!container) return;
  
  const allChecks = container.querySelectorAll('input[type="checkbox"]');
  const allDone = Array.from(allChecks).every(c => c.checked);
  
  if (allDone) {
      container.style.borderColor = "var(--accent)";
      const header = container.querySelector('h2');
      if (!header.innerHTML.includes('✅')) {
          header.innerHTML += ' ✅';
      }
  } else {
      container.style.borderColor = "var(--glass-border)";
      const header = container.querySelector('h2');
      header.innerHTML = header.innerHTML.replace(' ✅', '');
  }
}

const themeSwitcher = document.getElementById('theme-switcher');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);
}

themeSwitcher.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        theme = 'light';
    } else {
        theme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
});

function updateToggleIcon(theme) {
    const icon = themeSwitcher.querySelector('i');
    const text = themeSwitcher.querySelector('span');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        text.innerText = 'Modo Dia';
    } else {
        icon.className = 'fas fa-moon';
        text.innerText = 'Modo Noite';
    }
}