function processCopy(text) {
  return text.replace(/`([^`]+)`/g, (match, code) => {
      return `<span class="copy" onclick="copyCode(this)">${code}</span>`;
  });
}

function copyCode(element) {
  navigator.clipboard.writeText(element.innerText);
  element.style.background = "#d0d0d0";
  setTimeout(() => element.style.background = "#f0f0f0", 300);
}
