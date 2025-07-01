// Состояние приложения
let currentTab = 'home';
let currentSettingsTab = 'personal';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMainNavigation();
    setupSettingsNavigation();
    setupToggleSwitches();
    setupEditButtons();
    
    console.log('Мобильное банковское приложение инициализировано');
}

// Основная навигация между вкладками
function setupMainNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchMainTab(targetTab);
        });
    });
}

function switchMainTab(tabName) {
    // Убираем активное состояние у всех кнопок навигации
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Скрываем все содержимое вкладок
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Активируем выбранную вкладку
    const activeNavBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeTabContent = document.getElementById(`${tabName}-tab`);
    
    if (activeNavBtn && activeTabContent) {
        activeNavBtn.classList.add('active');
        activeTabContent.classList.add('active');
        currentTab = tabName;
        
        console.log(`Переключено на вкладку: ${tabName}`);
    }
}

// ИСПРАВЛЕННАЯ навигация по вкладкам настроек
function setupSettingsNavigation() {
    const settingsTabButtons = document.querySelectorAll('.settings-tab-btn');
    const settingsTabContents = document.querySelectorAll('.settings-tab-content');
    
    settingsTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchSettingsTab(targetTab);
        });
    });
}

// КЛЮЧЕВАЯ ФУНКЦИЯ: Правильное переключение вкладок настроек
function switchSettingsTab(tabName) {
    // Убираем активное состояние у всех кнопок вкладок настроек
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // ВАЖНО: Скрываем ВСЕ содержимое вкладок настроек
    document.querySelectorAll('.settings-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Активируем выбранную вкладку настроек
    const activeSettingsBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeSettingsContent = document.getElementById(`${tabName}-settings`);
    
    if (activeSettingsBtn && activeSettingsContent) {
        // Добавляем активный класс с небольшой задержкой для плавной анимации
        setTimeout(() => {
            activeSettingsBtn.classList.add('active');
            activeSettingsContent.classList.add('active');
        }, 50);
        
        currentSettingsTab = tabName;
        
        console.log(`Переключено на вкладку настроек: ${tabName}`);
    }
}

// Настройка переключателей
function setupToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.id;
            const isEnabled = this.checked;
            
            handleToggleChange(setting, isEnabled);
        });
    });
}

function handleToggleChange(setting, isEnabled) {
    const settingNames = {
        'biometric': 'Биометрическая авторизация',
        'sms-notifications': 'SMS-уведомления',
        'push-notifications': 'Push-уведомления'
    };
    
    const settingName = settingNames[setting] || setting;
    const status = isEnabled ? 'включена' : 'выключена';
    
    console.log(`${settingName} ${status}`);
    
    // Здесь можно добавить логику сохранения настроек
    // Например, отправка на сервер или сохранение в localStorage
    saveSettingToStorage(setting, isEnabled);
}

// Сохранение настроек в локальное хранилище
function saveSettingToStorage(setting, value) {
    try {
        const settings = JSON.parse(localStorage.getItem('bankAppSettings') || '{}');
        settings[setting] = value;
        localStorage.setItem('bankAppSettings', JSON.stringify(settings));
        
        console.log(`Настройка ${setting} сохранена:`, value);
    } catch (error) {
        console.error('Ошибка сохранения настройки:', error);
    }
}

// Загрузка настроек из локального хранилища
function loadSettingsFromStorage() {
    try {
        const settings = JSON.parse(localStorage.getItem('bankAppSettings') || '{}');
        
        Object.keys(settings).forEach(setting => {
            const toggle = document.getElementById(setting);
            if (toggle && typeof settings[setting] === 'boolean') {
                toggle.checked = settings[setting];
            }
        });
        
        console.log('Настройки загружены из хранилища');
    } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
    }
}

// Настройка кнопок редактирования
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const changeButtons = document.querySelectorAll('.change-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input) {
                handleEditField(input, this);
            }
        });
    });
    
    changeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const field = this.parentElement.querySelector('label').textContent;
            handleChangeField(field);
        });
    });
}

function handleEditField(input, button) {
    if (input.readOnly) {
        input.readOnly = false;
        input.focus();
        button.textContent = 'Сохранить';
        input.style.backgroundColor = 'white';
    } else {
        input.readOnly = true;
        button.textContent = 'Изменить';
        input.style.backgroundColor = '#f5f7fa';
        
        // Здесь можно добавить логику сохранения изменений
        console.log(`Поле обновлено: ${input.value}`);
        showNotification('Данные успешно обновлены');
    }
}

function handleChangeField(fieldName) {
    console.log(`Запрос на изменение: ${fieldName}`);
    
    if (fieldName === 'PIN-код') {
        showPinChangeDialog();
    }
}

function showPinChangeDialog() {
    // Простая имитация диалога смены PIN-кода
    const newPin = prompt('Введите новый PIN-код (4 цифры):');
    
    if (newPin && newPin.length === 4 && /^\d+$/.test(newPin)) {
        console.log('PIN-код изменен');
        showNotification('PIN-код успешно изменен');
    } else if (newPin !== null) {
        alert('PIN-код должен содержать ровно 4 цифры');
    }
}

// Система уведомлений
function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    `;
    
    // Добавляем CSS анимацию
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Обработка действий на главной странице
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn')) {
        const actionBtn = e.target.closest('.action-btn');
        const actionText = actionBtn.querySelector('span').textContent;
        
        console.log(`Выполнено действие: ${actionText}`);
        showNotification(`Функция "${actionText}" будет доступна в следующих версиях`);
    }
    
    if (e.target.closest('.payment-category')) {
        const category = e.target.closest('.payment-category');
        const categoryText = category.querySelector('span').textContent;
        
        console.log(`Выбрана категория платежа: ${categoryText}`);
        showNotification(`Открываем раздел "${categoryText}"`);
    }
});

// Загрузка настроек при запуске
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSettingsFromStorage, 100);
});

// Обработка изменений в выпадающих списках настроек
document.addEventListener('change', function(e) {
    if (e.target.tagName === 'SELECT' && e.target.closest('.settings-tab-content')) {
        const setting = e.target.parentElement.querySelector('label').textContent;
        const value = e.target.value;
        
        console.log(`Настройка "${setting}" изменена на: ${value}`);
        showNotification(`Настройка "${setting}" обновлена`);
        
        // Сохраняем в localStorage
        saveSettingToStorage(setting.toLowerCase().replace(/\s+/g, '_'), value);
    }
});

// Утилиты для отладки
window.debugApp = {
    getCurrentTab: () => currentTab,
    getCurrentSettingsTab: () => currentSettingsTab,
    switchTab: switchMainTab,
    switchSettingsTab: switchSettingsTab,
    showNotification: showNotification
};

console.log('Мобильное банковское приложение загружено успешно');
console.log('Доступные команды отладки: window.debugApp');
