// Function to update content based on selected language
const updateContent = (langData) => {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        element.textContent = langData[key];
    });
}

// Function to set the language preference
const setLanguagePreference = (lang) => {
    localStorage.setItem('language', lang);
    // location.reload();
}

// Function to fetch language data
const fetchLanguageData = async (lang) => {
    const response = await fetch(`lang/${lang}.json`);
    return await response.json();
}

// Function to change language
const changeLanguage = async (lang) => {
    setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// When page loads, get the language preference from local storage
const onLoadGetLanguage = async () => {
    window.addEventListener('DOMContentLoaded', async () => {
        const userPreferredLanguage = localStorage.getItem('language') || 'fr';
        const langData = await fetchLanguageData(userPreferredLanguage);
        updateContent(langData);
    });
}

// When user clicks on language button, change the language
const onClickSetLanguage = () => {
    // Call changeLanguage() on language change
    document.querySelectorAll('[data-set-lang]').forEach(element => {
        element.addEventListener('click', async () => {
            const lang = element.getAttribute('data-set-lang');
            changeLanguage(lang);
        });
    });
}

onLoadGetLanguage();
onClickSetLanguage();