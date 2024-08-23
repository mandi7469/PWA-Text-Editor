const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  //stores the triggered events
  window.deferredPrompt = event;

  //removes the hidden class from the button
  butInstall.classList.toggle("hidden", false);
});


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
 
  if (!promptEvent) {
    return;
  }

  //hows prompt
  promptEvent.prompt();

  //resets the deferred prompt variable, it can only be used once
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  //clears prompt
  window.deferredPrompt = null;
});
