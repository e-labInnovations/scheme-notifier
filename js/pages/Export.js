export default class Export extends HTMLElement {
  connectedCallback() {
    
    this.innerHTML = `
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/" id="back"></ion-back-button>
          </ion-buttons>
          <ion-title>Backup & Expert</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content fullscreen class="ion-padding">
          <ion-item button>
            <ion-icon name="wallet" slot="start"></ion-icon>
            <ion-label>Export as Walleto file</ion-label>
          </ion-item>
          <ion-item button>
            <ion-icon name="cloud" slot="start"></ion-icon>
            <ion-label>Backup to Walleto cloud</ion-label>
          </ion-item>
          <ion-item button>
            <ion-icon name="document" slot="start"></ion-icon>
            <ion-label>Export as *.csv file</ion-label>
          </ion-item>
          <ion-item button>
            <ion-icon name="logo-google" slot="start"></ion-icon>
            <ion-label>Backup to Google Drive</ion-label>
          </ion-item>
      
      </ion-content>
    `;
    
    
  }
}
 
customElements.define("export-page", Export);
 