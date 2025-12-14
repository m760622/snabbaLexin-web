/**
 * SnabbaLexin - IndexedDB Database Module
 * Provides fast local storage for dictionary data with caching
 */

const DictionaryDB = {
    DB_NAME: 'snabba-lexin-db',
    DB_VERSION: 2,
    STORE_NAME: 'words',
    META_STORE: 'meta',
    
    db: null,
    isReady: false,
    
    /**
     * Initialize the database
     * @returns {Promise<boolean>} Success status
     */
    async init() {
        if (this.db) return true;
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            
            request.onerror = (event) => {
                console.error('[DB] Error opening database:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.isReady = true;
                console.log('[DB] Database opened successfully');
                resolve(true);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create words store if not exists
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const wordStore = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
                    wordStore.createIndex('swedish', 'swe', { unique: false });
                    wordStore.createIndex('arabic', 'arb', { unique: false });
                    wordStore.createIndex('type', 'type', { unique: false });
                    console.log('[DB] Words store created');
                }
                
                // Create meta store for version tracking
                if (!db.objectStoreNames.contains(this.META_STORE)) {
                    db.createObjectStore(this.META_STORE, { keyPath: 'key' });
                    console.log('[DB] Meta store created');
                }
            };
        });
    },
    
    /**
     * Get cached data version
     * @returns {Promise<string|null>} Version string or null
     */
    async getDataVersion() {
        if (!this.db) await this.init();
        
        return new Promise((resolve) => {
            try {
                const tx = this.db.transaction([this.META_STORE], 'readonly');
                const store = tx.objectStore(this.META_STORE);
                const request = store.get('dataVersion');
                
                request.onsuccess = () => {
                    resolve(request.result?.value || null);
                };
                request.onerror = () => resolve(null);
            } catch (e) {
                resolve(null);
            }
        });
    },
    
    /**
     * Set data version
     * @param {string} version - Version string
     */
    async setDataVersion(version) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([this.META_STORE], 'readwrite');
            const store = tx.objectStore(this.META_STORE);
            store.put({ key: 'dataVersion', value: version });
            
            tx.oncomplete = () => resolve(true);
            tx.onerror = (e) => reject(e);
        });
    },
    
    /**
     * Get word count in database
     * @returns {Promise<number>} Number of words stored
     */
    async getWordCount() {
        if (!this.db) await this.init();
        
        return new Promise((resolve) => {
            try {
                const tx = this.db.transaction([this.STORE_NAME], 'readonly');
                const store = tx.objectStore(this.STORE_NAME);
                const request = store.count();
                
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(0);
            } catch (e) {
                resolve(0);
            }
        });
    },
    
    /**
     * Save words to IndexedDB (bulk save with progress)
     * @param {Array} words - Array of word arrays from dictionaryData
     * @param {Function} onProgress - Progress callback (0-100)
     * @returns {Promise<boolean>} Success status
     */
    async saveWords(words, onProgress = null) {
        if (!this.db) await this.init();
        
        const BATCH_SIZE = 1000;
        const totalBatches = Math.ceil(words.length / BATCH_SIZE);
        
        console.log(`[DB] Saving ${words.length} words in ${totalBatches} batches...`);
        
        for (let batch = 0; batch < totalBatches; batch++) {
            const start = batch * BATCH_SIZE;
            const end = Math.min(start + BATCH_SIZE, words.length);
            const batchWords = words.slice(start, end);
            
            await this._saveBatch(batchWords);
            
            if (onProgress) {
                const progress = Math.round(((batch + 1) / totalBatches) * 100);
                onProgress(progress);
            }
        }
        
        console.log('[DB] All words saved successfully');
        return true;
    },
    
    /**
     * Save a batch of words
     * @private
     */
    async _saveBatch(words) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([this.STORE_NAME], 'readwrite');
            const store = tx.objectStore(this.STORE_NAME);
            
            words.forEach(word => {
                // Convert array to object for easier indexing
                const wordObj = {
                    id: word[0],        // Lexin ID
                    type: word[1],      // Word type
                    swe: word[2],       // Swedish word
                    arb: word[3],       // Arabic word
                    arbExt: word[4],    // Arabic extended
                    sweDef: word[5],    // Swedish definition
                    forms: word[6],     // Word forms
                    sweEx: word[7],     // Swedish example
                    arbEx: word[8],     // Arabic example
                    idiomSwe: word[9],  // Swedish idiom
                    idiomArb: word[10], // Arabic idiom
                    // Keep original array for compatibility
                    raw: word
                };
                store.put(wordObj);
            });
            
            tx.oncomplete = () => resolve(true);
            tx.onerror = (e) => reject(e);
        });
    },
    
    /**
     * Get all words as original array format
     * @param {Function} onProgress - Progress callback
     * @returns {Promise<Array>} Array of word arrays
     */
    async getAllWords(onProgress = null) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([this.STORE_NAME], 'readonly');
            const store = tx.objectStore(this.STORE_NAME);
            const request = store.getAll();
            
            request.onsuccess = () => {
                const words = request.result.map(w => w.raw);
                if (onProgress) onProgress(100);
                console.log(`[DB] Retrieved ${words.length} words from cache`);
                resolve(words);
            };
            
            request.onerror = (e) => {
                console.error('[DB] Error getting words:', e);
                reject(e);
            };
        });
    },
    
    /**
     * Check if database has cached data
     * @returns {Promise<boolean>}
     */
    async hasCachedData() {
        const count = await this.getWordCount();
        return count > 0;
    },
    
    /**
     * Clear all cached data
     * @returns {Promise<boolean>}
     */
    async clearCache() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([this.STORE_NAME, this.META_STORE], 'readwrite');
            tx.objectStore(this.STORE_NAME).clear();
            tx.objectStore(this.META_STORE).clear();
            
            tx.oncomplete = () => {
                console.log('[DB] Cache cleared');
                resolve(true);
            };
            tx.onerror = (e) => reject(e);
        });
    }
};

// Data version - increment when data.js changes
const DATA_VERSION = '2024.12.14.1';

/**
 * Progressive data loader with caching
 */
const DataLoader = {
    /**
     * Load dictionary data with caching
     * @param {Function} onProgress - Progress callback (0-100)
     * @param {Function} onStatusChange - Status text callback
     * @returns {Promise<Array>} Dictionary data array
     */
    async loadDictionary(onProgress = null, onStatusChange = null) {
        try {
            await DictionaryDB.init();
            
            // Check if we have cached data
            const cachedVersion = await DictionaryDB.getDataVersion();
            const hasCached = await DictionaryDB.hasCachedData();
            
            if (hasCached && cachedVersion === DATA_VERSION) {
                // Use cached data
                if (onStatusChange) onStatusChange('Laddar från cache... / جاري التحميل من الذاكرة...');
                console.log('[DataLoader] Using cached data (version:', cachedVersion, ')');
                return await DictionaryDB.getAllWords(onProgress);
            }
            
            // Need to load from data.js
            if (onStatusChange) onStatusChange('Laddar ordbok... / جاري تحميل القاموس...');
            console.log('[DataLoader] Loading fresh data from data.js');
            
            // Check if dictionaryData is available (loaded from data.js)
            if (typeof dictionaryData === 'undefined' || !dictionaryData.length) {
                throw new Error('dictionaryData not loaded from data.js');
            }
            
            // Save to IndexedDB for next time
            if (onStatusChange) onStatusChange('Sparar i cache... / جاري الحفظ...');
            await DictionaryDB.saveWords(dictionaryData, onProgress);
            await DictionaryDB.setDataVersion(DATA_VERSION);
            
            console.log('[DataLoader] Data cached successfully');
            return dictionaryData;
            
        } catch (error) {
            console.error('[DataLoader] Error:', error);
            // Fallback to direct data.js usage
            if (typeof dictionaryData !== 'undefined') {
                return dictionaryData;
            }
            throw error;
        }
    },
    
    /**
     * Force refresh cache from data.js
     */
    async refreshCache(onProgress = null) {
        await DictionaryDB.clearCache();
        return this.loadDictionary(onProgress);
    }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.DictionaryDB = DictionaryDB;
    window.DataLoader = DataLoader;
    window.DATA_VERSION = DATA_VERSION;
}
