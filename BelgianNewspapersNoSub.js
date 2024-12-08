// ==UserScript==
// @name         BelgianNewspapersNoSub
// @namespace    https://github.com/Nikoh-D/BelgianNewspapersNoSub
// @version      1.8
// @description:fr  Permet de lire n'importe quel article réservé aux abonné.e.s sur lalibre, l'avenir, dhnet et levif
// @description:en  Be able to read any sub-only article on lalibre, l'avenir, dhnet and levif
// @author       Nikoh-D
// @match        https://www.lalibre.be/*
// @match        https://www.lavenir.net/*
// @match        https://www.dhnet.be/*
// @match        https://*.levif.be/*
// @icon         https://external-content.duckduckgo.com/iu/?u=https://cdn-icons-png.flaticon.com/512/3099/3099820.png
// @updateURL    https://raw.githubusercontent.com/Nikoh-D/BelgianNewspapersNoSub/refs/heads/main/BelgianNewspapersNoSub.js
// @downloadURL  https://raw.githubusercontent.com/Nikoh-D/BelgianNewspapersNoSub/refs/heads/main/BelgianNewspapersNoSub.js
// ==/UserScript==

let browser = detectBrowser();
let IPMcontent;
function forceScrollBarToShow(){
    // credits to user1274820: https://stackoverflow.com/a/43725145
    var r = "html,body{overflow:auto !important;}";
    var style = document.createElement("style");
    style.type="text/css";
    style.appendChild(document.createTextNode(r));
    document.body.appendChild(style);
}

function removePaywallGroupeIPM(){
    if (browser === 'Chrome') {
        const paywallElement = document.getElementById('piano-paywall-PAYING');
        while (paywallElement.firstChild) {
            paywallElement.removeChild(paywallElement.firstChild);
        }
        paywallElement.appendChild(IPMcontent);
    }
    removeClassFromElementById("story-preview-PAYING", "is-preview");
    removeClassFromElementById("story-content-PAYING", "is-hidden");
}

function removeElement(selectors){
    const element = document.querySelector(selectors);
    if (element) { element.remove(); }
}

function removePaywallRoulartaMediaGroup(){
    if (location.hostname === 'trends.levif.be') {
        removeElement('#datawall-modal');
    } else if (location.hostname === 'www.levif.be'){
        removeElement('#paywall-modal');
    }
}

function removeClassFromElementById(ElementId, ClassToRemove){
    const preview = document.getElementById(ElementId);
    if (preview) {
        preview.classList.remove(ClassToRemove);
    }
}

function checkHostname(urls) {
    const currentHostname = window.location.hostname;
    return urls.includes(currentHostname);
}

// Fonction pour détecter le navigateur
function detectBrowser() {
  let userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('chrome') !== -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('firefox') !== -1) {
    return 'Firefox';
  } else {
    return 'Other';
  }
}

if ((browser === 'Chrome') && checkHostname(['www.lalibre.be', 'www.lavenir.net', 'www.dhnet.be'])) {
    const sourceCode = document.documentElement;
    IPMcontent = sourceCode.querySelector('#story-content-PAYING');
}

function main(){
    if (checkHostname(['www.lalibre.be', 'www.lavenir.net', 'www.dhnet.be'])) {
        removePaywallGroupeIPM();
    } else if (checkHostname(['www.levif.be', 'trends.levif.be'])){
        forceScrollBarToShow();
        removePaywallRoulartaMediaGroup();
    }
}setTimeout(main, 1000);
