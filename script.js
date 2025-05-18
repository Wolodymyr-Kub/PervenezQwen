// Translations
const translations = {
  en: {
    title: "Bible Quotes Collection",
    searchPlaceholder: "Search topics and quotes...",
    searchBtn: "Search",
    clearSearchBtn: "Clear",
    topicLabel: "Topic name:",
    topicPlaceholder: "Enter topic name",
    addQuoteBtn: "Add Bible quote",
    addTopicBtn: "Add Topic",
    clearFormBtn: "Clear Form",
    noTopicAlert: "Please enter topic name.",
    noQuotesAlert: "Please add at least one quote.",
    deleteConfirm: "Delete this quote?",
    noResults: "No matching topics or quotes found."
  },
  uk: {
    title: "Колекція біблійних цитат",
    searchPlaceholder: "Пошук тем та цитат...",
    searchBtn: "Пошук",
    clearSearchBtn: "Очистити",
    topicLabel: "Назва теми:",
    topicPlaceholder: "Введіть назву теми",
    addQuoteBtn: "Додати цитату з Біблії",
    addTopicBtn: "Додати тему",
    clearFormBtn: "Очистити форму",
    noTopicAlert: "Будь ласка, введіть назву теми.",
    noQuotesAlert: "Будь ласка, додайте хоча б одну цитату.",
    deleteConfirm: "Видалити цю цитату?",
    noResults: "Не знайдено відповідних тем або цитат."
  },
  cs: {
    title: "Sbírka biblických citátů",
    searchPlaceholder: "Hledat témata a citáty...",
    searchBtn: "Hledat",
    clearSearchBtn: "Vymazat",
    topicLabel: "Název tématu:",
    topicPlaceholder: "Zadejte název tématu",
    addQuoteBtn: "Přidat biblický citát",
    addTopicBtn: "Přidat téma",
    clearFormBtn: "Vyčistit formulář",
    noTopicAlert: "Prosím zadejte název tématu.",
    noQuotesAlert: "Prosím přidejte alespoň jeden citát.",
    deleteConfirm: "Smazat tento citát?",
    noResults: "Nebyly nalezeny odpovídající témata nebo citáty."
  },
  pl: {
    title: "Kolekcja cytatów biblijnych",
    searchPlaceholder: "Szukaj tematów i cytatów...",
    searchBtn: "Szukaj",
    clearSearchBtn: "Wyczyść",
    topicLabel: "Nazwa tematu:",
    topicPlaceholder: "Wprowadź nazwę tematu",
    addQuoteBtn: "Dodaj cytat biblijny",
    addTopicBtn: "Dodaj temat",
    clearFormBtn: "Wyczyść formularz",
    noTopicAlert: "Proszę wprowadzić nazwę tematu.",
    noQuotesAlert: "Proszę dodać przynajmniej jeden cytat.",
    deleteConfirm: "Usunąć ten cytat?",
    noResults: "Nie znaleziono pasujących tematów lub cytatów."
  },
  de: {
    title: "Bibelzitate Sammlung",
    searchPlaceholder: "Themen und Zitate suchen...",
    searchBtn: "Suchen",
    clearSearchBtn: "Löschen",
    topicLabel: "Themenname:",
    topicPlaceholder: "Themenname eingeben",
    addQuoteBtn: "Bibelzitat hinzufügen",
    addTopicBtn: "Thema hinzufügen",
    clearFormBtn: "Formular leeren",
    noTopicAlert: "Bitte geben Sie einen Themenname ein.",
    noQuotesAlert: "Bitte fügen Sie mindestens ein Zitat hinzu.",
    deleteConfirm: "Dieses Zitat löschen?",
    noResults: "Keine passenden Themen oder Zitate gefunden."
  },
  es: {
    title: "Colección de citas bíblicas",
    searchPlaceholder: "Buscar temas y citas...",
    searchBtn: "Buscar",
    clearSearchBtn: "Limpiar",
    topicLabel: "Nombre del tema:",
    topicPlaceholder: "Ingrese el nombre del tema",
    addQuoteBtn: "Agregar cita bíblica",
    addTopicBtn: "Agregar tema",
    clearFormBtn: "Limpiar formulario",
    noTopicAlert: "Por favor ingrese el nombre del tema.",
    noQuotesAlert: "Por favor agregue al menos una cita.",
    deleteConfirm: "¿Eliminar esta cita?",
    noResults: "No se encontraron temas o citas coincidentes."
  },
  sv: {
    title: "Bibelcitat Samling",
    searchPlaceholder: "Sök ämnen och citat...",
    searchBtn: "Sök",
    clearSearchBtn: "Rensa",
    topicLabel: "Ämnesnamn:",
    topicPlaceholder: "Ange ämnesnamn",
    addQuoteBtn: "Lägg till bibelcitat",
    addTopicBtn: "Lägg till ämne",
    clearFormBtn: "Rensa formulär",
    noTopicAlert: "Vänligen ange ett ämnesnamn.",
    noQuotesAlert: "Vänligen lägg till minst ett citat.",
    deleteConfirm: "Ta bort detta citat?",
    noResults: "Inga matchande ämnen eller citat hittades."
  }
};

// Current language
let currentLanguage = 'en';
const languageSelect = document.getElementById('language-select');
const languageSelector = document.querySelector('.language-selector');

// DOM elements
const pyramid = document.getElementById('pyramid');
const stickersInputsContainer = document.getElementById('stickers-inputs');
const searchBtn = document.getElementById('search-btn');
const clearSearchBtn = document.getElementById('clear-search-btn');
const addQuoteBtn = document.getElementById('add-quote-btn');
const addTopicBtn = document.getElementById('add-topic-btn');
const clearFormBtn = document.getElementById('clear-form-btn');

// Function to check if any topic is expanded
function isAnyTopicExpanded() {
  return document.querySelector('.bar[data-expanded="true"]') !== null;
}

// Function to update language selector visibility
function updateLanguageSelectorVisibility() {
  if (isAnyTopicExpanded()) {
    languageSelector.classList.add('hidden');
  } else {
    languageSelector.classList.remove('hidden');
  }
}

// Initialize app
function initApp() {
  const savedLanguage = localStorage.getItem('bibleAppLanguage');
  const browserLanguage = navigator.language.substring(0, 2);
  
  if (savedLanguage) {
    currentLanguage = savedLanguage;
  } else if (translations[browserLanguage]) {
    currentLanguage = browserLanguage;
  }
  
  languageSelect.value = currentLanguage;
  updateLanguage();
  addStickerInput();
  loadTopics();
  
  // Add observer for topic expansion changes
  const observer = new MutationObserver(function(mutations) {
    updateLanguageSelectorVisibility();
  });
  
  observer.observe(document.getElementById('pyramid'), {
    attributes: true,
    subtree: true,
    attributeFilter: ['data-expanded']
  });

  // Event listeners
  languageSelect.addEventListener('change', handleLanguageChange);
  searchBtn.addEventListener('click', searchTopics);
  clearSearchBtn.addEventListener('click', clearSearch);
  addQuoteBtn.addEventListener('click', addStickerInput);
  addTopicBtn.addEventListener('click', addTopic);
  clearFormBtn.addEventListener('click', clearForm);
}

// Language change handler
function handleLanguageChange() {
  currentLanguage = this.value;
  localStorage.setItem('bibleAppLanguage', currentLanguage);
  updateLanguage();
}

// Update all text elements to current language
function updateLanguage() {
  const t = translations[currentLanguage];
  document.getElementById('main-title').textContent = t.title;
  document.getElementById('search-input').placeholder = t.searchPlaceholder;
  document.getElementById('search-btn').textContent = t.searchBtn;
  document.getElementById('clear-search-btn').textContent = t.clearSearchBtn;
  document.getElementById('topic-label').textContent = t.topicLabel;
  document.getElementById('topic-name').placeholder = t.topicPlaceholder;
  document.getElementById('add-quote-btn').textContent = t.addQuoteBtn;
  document.getElementById('add-topic-btn').textContent = t.addTopicBtn;
  document.getElementById('clear-form-btn').textContent = t.clearFormBtn;
  
  // Update existing sticker input labels
  document.querySelectorAll('.sticker-input label').forEach((label, index) => {
    label.textContent = `${t.addQuoteBtn} ${index + 1}:`;
  });
}

function addStickerInput() {
  const stickerInputDiv = document.createElement('div');
  stickerInputDiv.className = 'sticker-input';

  const t = translations[currentLanguage];
  const label = document.createElement('label');
  label.textContent = `${t.addQuoteBtn} ${stickersInputsContainer.children.length + 1}:`;
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = t.addQuoteBtn;
  input.className = 'sticker-input-field';

  stickerInputDiv.appendChild(label);
  stickerInputDiv.appendChild(input);
  stickersInputsContainer.appendChild(stickerInputDiv);
}

function addTopic() {
  const topicNameInput = document.getElementById('topic-name');
  const topicName = topicNameInput.value.trim();

  const t = translations[currentLanguage];
  
  if (!topicName) {
    alert(t.noTopicAlert);
    return;
  }

  // Collect all quotes
  const stickerInputs = stickersInputsContainer.querySelectorAll('.sticker-input-field');
  const stickers = Array.from(stickerInputs)
    .map(input => input.value.trim())
    .filter(value => value);

  if (stickers.length === 0) {
    alert(t.noQuotesAlert);
    return;
  }

  // Create bar
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.dataset.expanded = 'false';

  const title = document.createElement('div');
  title.className = 'bar-title';
  title.textContent = `${topicName} (${stickers.length})`;
  bar.appendChild(title);

  const stickersContainer = document.createElement('div');
  stickersContainer.className = 'stickers-container';
  bar.appendChild(stickersContainer);

  title.addEventListener('click', () => {
    const isExpanded = bar.dataset.expanded === 'true';
    if (!isExpanded) {
      bar.classList.add('expanded');
      if (!stickersContainer.hasChildNodes()) {
        createStickers(stickersContainer, stickers);
        requestAnimationFrame(() => layoutStickers(stickersContainer));
      }
    } else {
      bar.classList.remove('expanded');
      stickersContainer.innerHTML = '';
    }
    bar.dataset.expanded = (!isExpanded).toString();
  });

  pyramid.appendChild(bar);
  saveTopics();

  // Clear form but don't disable
  clearForm();
}

function createStickers(container, stickers) {
  // Add close button
  const closeBtn = document.createElement('div');
  closeBtn.className = 'close-btn';
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const bar = container.closest('.bar');
    if (bar) {
      bar.classList.remove('expanded');
      bar.dataset.expanded = 'false';
      container.innerHTML = '';
    }
  });
  container.appendChild(closeBtn);

  // Create trash bin
  const trashBin = document.createElement('div');
  trashBin.className = 'trash-bin';
  container.appendChild(trashBin);

  // Create stickers
  stickers.forEach((quote, i) => {
  const sticker = document.createElement('div');
  sticker.className = 'sticker enter'; // Додаємо клас 'enter' для анімації
  sticker.textContent = quote;
  sticker.style.setProperty('--rotation', `${(Math.random() * 10 - 5)}deg`);
  container.appendChild(sticker);

    requestAnimationFrame(() => {
      sticker.classList.add('active'); // Активація анімації
      if (document.body.contains(sticker)) {
        makeDraggable(sticker, trashBin); // Ініціалізація перетягування
      }
    });
  });
}

function makeDraggable(el, trashBin) {
  if (!el) return;

  let isDragging = false;
  let shiftX, shiftY;
  let isOverTrash = false;
  let startX, startY;
  let touchId = null;

  function getTouchById(touches, id) {
    for (let i = 0; i < touches.length; i++) {
      if (touches[i].identifier === id) return touches[i];
    }
    return null;
  }

  function handleStart(clientX, clientY) {
    const rect = el.getBoundingClientRect();
    if (!rect) return;
    shiftX = clientX - rect.left;
    shiftY = clientY - rect.top;
    isDragging = true;
    startX = clientX;
    startY = clientY;

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    el.classList.add('dragging');/* QWEN */
  }

  function handleMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX, e.clientY);
  }

  function handleTouchMove(e) {
    if (!isDragging || !touchId) return;
    e.preventDefault();
    const touch = getTouchById(e.changedTouches, touchId);
    if (touch) {
      updatePosition(touch.clientX, touch.clientY);
    }
  }

  function updatePosition(clientX, clientY) {
    const container = el.parentElement;
    if (!container || !document.body.contains(container)) {
      stopDragging();
      return;
    }

    // Check if over trash bin
    const trashRect = trashBin.getBoundingClientRect();
    const elRect = {
      left: clientX - shiftX,
      top: clientY - shiftY,
      right: clientX - shiftX + el.offsetWidth,
      bottom: clientY - shiftY + el.offsetHeight
    };

    const isOver = !(
      elRect.right < trashRect.left || 
      elRect.left > trashRect.right || 
      elRect.bottom < trashRect.top || 
      elRect.top > trashRect.bottom
    );

    if (isOver && !isOverTrash) {
      trashBin.classList.add('active');
      isOverTrash = true;
    } else if (!isOver && isOverTrash) {
      trashBin.classList.remove('active');
      isOverTrash = false;
    }

    const bounds = container.getBoundingClientRect();
    const x = Math.min(Math.max(0, clientX - bounds.left - shiftX), bounds.width - el.offsetWidth);
    const y = Math.min(Math.max(0, clientY - bounds.top - shiftY), bounds.height - el.offsetHeight);

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  function handleEnd() {
    checkForTrash();
    stopDragging();
  }

  function handleTouchEnd(e) {
    const touch = getTouchById(e.changedTouches, touchId);
    if (touch) {
      checkForTrash();
      stopDragging();
    }
  }

  function checkForTrash() {
    if (isOverTrash) {
      const t = translations[currentLanguage];
      if (confirm(t.deleteConfirm)) {
        el.remove();
        const bar = el.closest('.bar');
        if (bar) {
          const title = bar.querySelector('.bar-title');
          if (title) {
            const match = title.textContent.match(/\((\d+)\)$/);
            if (match) {
              const count = parseInt(match[1]) - 1;
              title.textContent = title.textContent.replace(/\(\d+\)$/, `(${count})`);
            }
          }
        }
        saveTopics();
      }
      trashBin.classList.remove('active');
    }
  }

  function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    isOverTrash = false;
    touchId = null;
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }

  // Mouse events
  el.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('close-btn')) return;
    handleStart(e.clientX, e.clientY);
  });

  // Touch events
  el.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('close-btn')) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchId = touch.identifier;
      handleStart(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  el.ondragstart = () => false;
}

function layoutStickers(container) {
  if (document.visibilityState !== 'visible') return;

  const stickers = container.querySelectorAll('.sticker:not(.close-btn):not(.trash-bin)');
  const width = container.offsetWidth;
  const cols = Math.max(1, Math.floor(width / 320));

  stickers.forEach((sticker, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    let offsetX = 0;
    if (col === 0) offsetX = Math.random() * 75;
    else if (col === cols - 1) offsetX = -Math.random() * 75;
    else offsetX = (Math.random() - 0.5) * 75;

    const stickerWidth = sticker.offsetWidth;
    const x = col * (stickerWidth + 20) + offsetX;
    const y = row * 120 + 40; // +40 to account for close button

    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;
  });

  const rows = Math.ceil(stickers.length / cols);
  container.style.minHeight = `${rows * 130 + 40}px`;
}

// Save and load topics from localStorage
function saveTopics() {
  const topics = [];
  document.querySelectorAll('.bar').forEach(bar => {
    const title = bar.querySelector('.bar-title').textContent;
    const stickerCount = parseInt(title.match(/\((\d+)\)/)?.[1]) || 0;
    const topicName = title.replace(/\s*\(\d+\)$/, '');
    
    // Get quotes from DOM or from initial creation
    let quotes = [];
    const stickers = bar.querySelectorAll('.sticker');
    if (stickers.length > 0) {
      quotes = Array.from(stickers).map(s => s.textContent);
    } else {
      // For topics that haven't been expanded yet
      quotes = Array(stickerCount).fill('Quote not loaded yet');
    }
    
    topics.push({
      title: topicName,
      stickers: quotes
    });
  });
  localStorage.setItem('bibleTopics', JSON.stringify(topics));
}

function loadTopics() {
  const saved = localStorage.getItem('bibleTopics');
  if (saved) {
    try {
      JSON.parse(saved).forEach(topic => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.dataset.expanded = 'false';

        const title = document.createElement('div');
        title.className = 'bar-title';
        title.textContent = `${topic.title} (${topic.stickers.length})`;
        bar.appendChild(title);

        const stickersContainer = document.createElement('div');
        stickersContainer.className = 'stickers-container';
        bar.appendChild(stickersContainer);

        title.addEventListener('click', () => {
          const isExpanded = bar.dataset.expanded === 'true';
          if (!isExpanded) {
            bar.classList.add('expanded');
            if (!stickersContainer.hasChildNodes()) {
              createStickers(stickersContainer, topic.stickers);
              requestAnimationFrame(() => layoutStickers(stickersContainer));
            }
          } else {
            bar.classList.remove('expanded');
            stickersContainer.innerHTML = '';
          }
          bar.dataset.expanded = (!isExpanded).toString();
        });

        pyramid.appendChild(bar);
      });
    } catch (e) {
      console.error('Failed to load saved topics:', e);
    }
  }
}

// Search functionality
function searchTopics() {
  const query = document.getElementById('search-input').value.toLowerCase();
  if (!query) return;
  
  const t = translations[currentLanguage];
  
  // Remove previous highlights
  document.querySelectorAll('.highlight').forEach(el => {
    el.classList.remove('highlight');
  });
  
  let found = false;
  
  document.querySelectorAll('.bar').forEach(bar => {
    const title = bar.querySelector('.bar-title');
    const titleText = title.textContent.toLowerCase();
    const stickers = bar.querySelectorAll('.sticker');
    
    let hasMatch = false;
    
    // Check title
    if (titleText.includes(query)) {
      title.classList.add('highlight');
      hasMatch = true;
    }
    
    // Check stickers (only if expanded)
    if (bar.dataset.expanded === 'true') {
      stickers.forEach(sticker => {
        const stickerText = sticker.textContent.toLowerCase();
        if (stickerText.includes(query)) {
          sticker.classList.add('highlight');
          hasMatch = true;
        }
      });
    }
    
    if (hasMatch) {
      bar.style.display = 'block';
      found = true;
      
      // Expand if not already
      if (bar.dataset.expanded === 'false') {
        bar.dataset.expanded = 'true';
        bar.classList.add('expanded');
        const stickersContainer = bar.querySelector('.stickers-container');
        stickersContainer.innerHTML = '';
        
        // Need to get the actual quotes - this is simplified
        const topicTitle = title.textContent.replace(/\s*\(\d+\)$/, '');
        const savedTopics = JSON.parse(localStorage.getItem('bibleTopics') || '[]');
        const topic = savedTopics.find(t => t.title === topicTitle);
        
        if (topic) {
          createStickers(stickersContainer, topic.stickers);
          layoutStickers(stickersContainer);
          
          // Highlight matching stickers after they're created
          setTimeout(() => {
            stickersContainer.querySelectorAll('.sticker').forEach(sticker => {
              if (sticker.textContent.toLowerCase().includes(query)) {
                sticker.classList.add('highlight');
              }
            });
          }, 100);
        }
      }
    } else {
      bar.style.display = 'none';
    }
  });
  
  if (!found) {
    alert(t.noResults);
  }
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.querySelectorAll('.bar').forEach(bar => {
    bar.style.display = 'block';
  });
  document.querySelectorAll('.highlight').forEach(el => {
    el.classList.remove('highlight');
  });
}

function clearForm() {
  document.getElementById('topic-name').value = '';
  stickersInputsContainer.innerHTML = '';
  addStickerInput(); // Add one empty input
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.querySelectorAll('.bar[data-expanded="true"] .stickers-container')
      .forEach(container => layoutStickers(container));
  }, 100);
});

// Initialize the app
document.addEventListener('DOMContentLoaded', initApp);