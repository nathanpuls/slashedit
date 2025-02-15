function processLinks(text) {
    let linkMap = {}; // Store labeled links
    let index = 0;

    // Step 1: Process labeled links first, replacing them with placeholders
    text = text.replace(/\/([\w\s-]+)\s+((?:https?:\/\/|www\.|[\w.-]+\.\w{2,})\S*)/gm, function(match, label, url) {
        label = label.trim();
        if (!url.match(/^https?:\/\//)) {
            url = `http://${url}`; // Add http:// if missing
        }
        let placeholder = `{{LINK_${index}}}`; // Unique placeholder
        linkMap[placeholder] = `<a href="${url}" target="_blank">${label}</a>`;
        index++;
        return placeholder;
    });

    // Step 2: Process standalone links (Ensure http:// is added in href but hidden in text)
    text = text.replace(/(?<!["'>])\b(?:https?:\/\/)?[\w.-]+\.\w{2,}(\/\S*)?/gm, function(url) {
        let href = url.match(/^https?:\/\//) ? url : `http://${url}`;
        return `<a href="${href}" target="_blank">${url}</a>`; // Clickable but no visible "http://"
    });

    // Step 3: Restore labeled links from placeholders
    Object.keys(linkMap).forEach(placeholder => {
        text = text.replace(placeholder, linkMap[placeholder]);
    });

    return text;
}
