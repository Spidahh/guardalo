// SISTEMA STORAGE LOCALE - SOSTITUISCE FIREBASE
class LocalStorageManager {
    constructor() {
        this.storageKey = 'guardalo_user_data';
        this.currentUser = null;
    }

    // Simula login/logout (in realtà solo attiva modalità locale)
    login(email = 'user@example.com') {
        this.currentUser = {
            uid: this.generateUserId(),
            email: email,
            displayName: email.split('@')[0]
        };
        this.saveUserSession();
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('guardalo_session');
        return null;
    }

    // Session management
    saveUserSession() {
        if (this.currentUser) {
            localStorage.setItem('guardalo_session', JSON.stringify(this.currentUser));
        }
    }

    loadUserSession() {
        const session = localStorage.getItem('guardalo_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            return this.currentUser;
        }
        return null;
    }

    // Data management
    getUserLists() {
        if (!this.currentUser) return { watched: [], towatch: [] };
        
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            const allData = JSON.parse(data);
            return allData[this.currentUser.uid] || { watched: [], towatch: [] };
        }
        return { watched: [], towatch: [] };
    }

    saveUserLists(lists) {
        if (!this.currentUser) return;
        
        const data = localStorage.getItem(this.storageKey) || '{}';
        const allData = JSON.parse(data);
        allData[this.currentUser.uid] = lists;
        localStorage.setItem(this.storageKey, JSON.stringify(allData));
    }

    toggleListItem(type, title) {
        const lists = this.getUserLists();
        const list = lists[type] || [];
        
        if (list.includes(title)) {
            // Rimuovi
            lists[type] = list.filter(item => item !== title);
        } else {
            // Aggiungi
            lists[type] = [...list, title];
        }
        
        this.saveUserLists(lists);
        return lists;
    }

    isInList(type, title) {
        const lists = this.getUserLists();
        return lists[type] && lists[type].includes(title);
    }

    // Utility
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // Export/Import dati
    exportData() {
        const data = {
            user: this.currentUser,
            lists: this.getUserLists(),
            timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `guardalo_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            if (data.lists) {
                this.currentUser = data.user || this.login();
                this.saveUserSession();
                this.saveUserLists(data.lists);
                return true;
            }
        } catch (e) {
            console.error('Import fallito:', e);
            return false;
        }
        return false;
    }
}

// Istanza globale
window.storageManager = new LocalStorageManager();
