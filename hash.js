function processHashes(text) {
  return text.replace(/#(\w+)/g, (match, tag) => {
      return `<a href="#${tag}" class="hashtag" onclick="copyToClipboard('#${tag}')">#${tag}</a>`;
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

window.onload = function() {
  if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.querySelector(`a[href="#${hash}"]`);
      if (element) element.scrollIntoView();
  }
};
