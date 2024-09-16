import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const loreEntriesList = document.getElementById('lore-entries');
    const loreForm = document.getElementById('lore-form');

    // Function to display lore entries
    async function displayLoreEntries() {
        const entries = await backend.listLoreEntries();
        loreEntriesList.innerHTML = '';
        entries.forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${entry.title}</h3>
                <p><strong>Category:</strong> ${entry.category}</p>
                <p>${entry.content}</p>
            `;
            loreEntriesList.appendChild(li);
        });
    }

    // Display initial lore entries
    await displayLoreEntries();

    // Handle form submission
    loreForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const content = document.getElementById('content').value;

        await backend.addLoreEntry(title, content, category);
        await displayLoreEntries();

        // Clear form fields
        loreForm.reset();
    });
});