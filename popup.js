let intervalId;

// Drapeau français - script pour la version française de YouTube
document.getElementById('french').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: startFrenchScript
    });
  });
});

// Drapeau anglais - script pour la version anglaise de YouTube
document.getElementById('english').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: startEnglishScript
    });
  });
});

// Bouton d'arrêt - arrête l'exécution du script
document.getElementById('stop').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: stopScript
    });
  });
});

// Script pour la version française de YouTube
function startFrenchScript() {
  window.intervalId = setInterval(function () {
    document.querySelector('#primary button[aria-label="Menu d\'actions"]').click();
    var things = document.evaluate(
      '//span[contains(text(),"Supprimer de")]',
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var i = 0; i < things.snapshotLength; i++) {
      things.snapshotItem(i).click();
    }
  }, 1000);
}

// Script pour la version anglaise de YouTube
function startEnglishScript() {
  window.intervalId = setInterval(function () {
    var video = document.getElementsByTagName('ytd-playlist-video-renderer')[0];
    video.querySelector('#primary button[aria-label="Action menu"]').click();

    var things = document.evaluate(
      '//span[contains(text(),"Remove from")]',
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var i = 0; i < things.snapshotLength; i++) {
      things.snapshotItem(i).click();
    }
  }, 500);
}

// Fonction pour arrêter le script
function stopScript() {
  clearInterval(window.intervalId);
}
