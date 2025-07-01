// ��������� ����������
let currentTab = 'home';
let currentSettingsTab = 'personal';

// ������������� ����������
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMainNavigation();
    setupSettingsNavigation();
    setupToggleSwitches();
    setupEditButtons();
    
    console.log('��������� ���������� ���������� ����������������');
}

// �������� ��������� ����� ���������
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
    // ������� �������� ��������� � ���� ������ ���������
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // �������� ��� ���������� �������
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // ���������� ��������� �������
    const activeNavBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeTabContent = document.getElementById(`${tabName}-tab`);
    
    if (activeNavBtn && activeTabContent) {
        activeNavBtn.classList.add('active');
        activeTabContent.classList.add('active');
        currentTab = tabName;
        
        console.log(`����������� �� �������: ${tabName}`);
    }
}

// ������������ ��������� �� �������� ��������
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

// �������� �������: ���������� ������������ ������� ��������
function switchSettingsTab(tabName) {
    // ������� �������� ��������� � ���� ������ ������� ��������
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // �����: �������� ��� ���������� ������� ��������
    document.querySelectorAll('.settings-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // ���������� ��������� ������� ��������
    const activeSettingsBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeSettingsContent = document.getElementById(`${tabName}-settings`);
    
    if (activeSettingsBtn && activeSettingsContent) {
        // ��������� �������� ����� � ��������� ��������� ��� ������� ��������
        setTimeout(() => {
            activeSettingsBtn.classList.add('active');
            activeSettingsContent.classList.add('active');
        }, 50);
        
        currentSettingsTab = tabName;
        
        console.log(`����������� �� ������� ��������: ${tabName}`);
    }
}

// ��������� ��������������
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
        'biometric': '�������������� �����������',
        'sms-notifications': 'SMS-�����������',
        'push-notifications': 'Push-�����������'
    };
    
    const settingName = settingNames[setting] || setting;
    const status = isEnabled ? '��������' : '���������';
    
    console.log(`${settingName} ${status}`);
    
    // ����� ����� �������� ������ ���������� ��������
    // ��������, �������� �� ������ ��� ���������� � localStorage
    saveSettingToStorage(setting, isEnabled);
}

// ���������� �������� � ��������� ���������
function saveSettingToStorage(setting, value) {
    try {
        const settings = JSON.parse(localStorage.getItem('bankAppSettings') || '{}');
        settings[setting] = value;
        localStorage.setItem('bankAppSettings', JSON.stringify(settings));
        
        console.log(`��������� ${setting} ���������:`, value);
    } catch (error) {
        console.error('������ ���������� ���������:', error);
    }
}

// �������� �������� �� ���������� ���������
function loadSettingsFromStorage() {
    try {
        const settings = JSON.parse(localStorage.getItem('bankAppSettings') || '{}');
        
        Object.keys(settings).forEach(setting => {
            const toggle = document.getElementById(setting);
            if (toggle && typeof settings[setting] === 'boolean') {
                toggle.checked = settings[setting];
            }
        });
        
        console.log('��������� ��������� �� ���������');
    } catch (error) {
        console.error('������ �������� ��������:', error);
    }
}

// ��������� ������ ��������������
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
        button.textContent = '���������';
        input.style.backgroundColor = 'white';
    } else {
        input.readOnly = true;
        button.textContent = '��������';
        input.style.backgroundColor = '#f5f7fa';
        
        // ����� ����� �������� ������ ���������� ���������
        console.log(`���� ���������: ${input.value}`);
        showNotification('������ ������� ���������');
    }
}

function handleChangeField(fieldName) {
    console.log(`������ �� ���������: ${fieldName}`);
    
    if (fieldName === 'PIN-���') {
        showPinChangeDialog();
    }
}

function showPinChangeDialog() {
    // ������� �������� ������� ����� PIN-����
    const newPin = prompt('������� ����� PIN-��� (4 �����):');
    
    if (newPin && newPin.length === 4 && /^\d+$/.test(newPin)) {
        console.log('PIN-��� �������');
        showNotification('PIN-��� ������� �������');
    } else if (newPin !== null) {
        alert('PIN-��� ������ ��������� ����� 4 �����');
    }
}

// ������� �����������
function showNotification(message, type = 'success') {
    // ������� ������� �����������
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // ����� ��� �����������
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
    
    // ��������� CSS ��������
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
    
    // ������� ����������� ����� 3 �������
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ��������� �������� �� ������� ��������
document.addEventListener('click', function(e) {
    if (e.target.closest('.action-btn')) {
        const actionBtn = e.target.closest('.action-btn');
        const actionText = actionBtn.querySelector('span').textContent;
        
        console.log(`��������� ��������: ${actionText}`);
        showNotification(`������� "${actionText}" ����� �������� � ��������� �������`);
    }
    
    if (e.target.closest('.payment-category')) {
        const category = e.target.closest('.payment-category');
        const categoryText = category.querySelector('span').textContent;
        
        console.log(`������� ��������� �������: ${categoryText}`);
        showNotification(`��������� ������ "${categoryText}"`);
    }
});

// �������� �������� ��� �������
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSettingsFromStorage, 100);
});

// ��������� ��������� � ���������� ������� ��������
document.addEventListener('change', function(e) {
    if (e.target.tagName === 'SELECT' && e.target.closest('.settings-tab-content')) {
        const setting = e.target.parentElement.querySelector('label').textContent;
        const value = e.target.value;
        
        console.log(`��������� "${setting}" �������� ��: ${value}`);
        showNotification(`��������� "${setting}" ���������`);
        
        // ��������� � localStorage
        saveSettingToStorage(setting.toLowerCase().replace(/\s+/g, '_'), value);
    }
});

// ������� ��� �������
window.debugApp = {
    getCurrentTab: () => currentTab,
    getCurrentSettingsTab: () => currentSettingsTab,
    switchTab: switchMainTab,
    switchSettingsTab: switchSettingsTab,
    showNotification: showNotification
};

console.log('��������� ���������� ���������� ��������� �������');
console.log('��������� ������� �������: window.debugApp');
