

export default class About extends HTMLElement {
  connectedCallback() {
    
    this.innerHTML = `
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/" id="back"></ion-back-button>
          </ion-buttons>
          <ion-title>About</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content fullscreen>
        <ion-card class="ion-text-center">
          <ion-card-header>
            <img src="/images/icons/android-chrome-512x512.png" width="150px">
            <ion-card-title>Walleto</ion-card-title>
            <ion-card-subtitle>V1.0.0</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            This application is developed by <b>Mohammed Ashad</b> for managing your wallet.
            You can add your income and expenses with a category.
            You can easily add, delete and modified a item. You can also add new custom category
            with a name and icon you want. With sliding the custom added category from right to 
            left you get an option to delete that category.
            
            <br /><br />
            <ion-button href="https://github.com/e-labinnovations" class="ion-no-padding" style="color:#211F1F;" fill="clear" target="blank_">
              <ion-icon name="logo-github" size="large"></ion-icon>
            </ion-button>
            <ion-button href="https://www.facebook.com/elabin" class="ion-no-padding" style="color:#3B5998;" fill="clear" target="blank_">
              <ion-icon name="logo-facebook" size="large"></ion-icon>
            </ion-button>
            <ion-button href="https://www.instagram.com/elab_innnovations" class="ion-no-padding" style="color:#DD2A7F;" fill="clear" target="blank_">
              <ion-icon name="logo-instagram" size="large"></ion-icon>
            </ion-button>
            <ion-button href="https://www.youtube.com/c/elabinnovations" class="ion-no-padding" style="color:#ff0000;" fill="clear" target="blank_">
              <ion-icon name="logo-youtube" size="large"></ion-icon>
            </ion-button>
            <ion-button href="https://www.linkedin.com/" class="ion-no-padding" style="color:#0E76A8;" fill="clear" target="blank_">
              <ion-icon name="logo-linkedin" size="large"></ion-icon>
            </ion-button>
            <ion-button href="https://www.linkedin.com/" class="ion-no-padding" style="color:#00ACEE;" fill="clear" target="blank_">
              <ion-icon name="logo-twitter" size="large"></ion-icon>
            </ion-button>
            
          </ion-card-content>
        </ion-card>
      
      </ion-content>
    `;
    
    
  }
}
 
customElements.define("about-page", About);
 