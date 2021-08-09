export default class Settings extends HTMLElement {
  connectedCallback() {
    let enableDarkMode = localStorage.getItem('enableDarkMode')==="true"?true:false;
    this.innerHTML = `
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/" id="back"></ion-back-button>
          </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content fullscreen class="ion-padding">
      <ion-item>
        <ion-label>Enable Dark Mode</ion-label>
        <ion-toggle slot="end" value="dark-mode" id="dark-mode-enable" checked=${enableDarkMode}></ion-toggle>
      </ion-item>
      
      </ion-content>
    `;
    
    const darkModeEnable = document.getElementById('dark-mode-enable');
    
    darkModeEnable.addEventListener('ionChange', e => {
      enableDarkMode = e.detail.checked;
      const body = document.querySelector('body');
      localStorage.setItem('enableDarkMode', enableDarkMode);
      
      if (enableDarkMode) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    })
  }
}
 
customElements.define("settings-page", Settings);
 