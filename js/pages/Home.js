import ItemCard from "./components/ItemCard.js";
import { menuController } from 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/index.esm.js';

export default class HomePage extends HTMLElement {
    connectedCallback() {
        let HomeData = getHomeData(); //from app.js
        let dateArray = getHomeData().dateArray;
        
        this.innerHTML = `
              <ion-menu side="start" content-id="main-content">
                  <ion-header>
                    <ion-toolbar translucent>
                      <ion-title>Menu</ion-title>
                    </ion-toolbar>
                  </ion-header>
          
                  <ion-content>
                    <ion-list>
                      <ion-item>
                        <ion-icon name="pie-chart-outline" slot="start"></ion-icon>
                        <ion-label>Charts</ion-label>
                      </ion-item>
                      <ion-item href="/categories">
                        <ion-icon name="grid-outline" slot="start"></ion-icon>
                        <ion-label>Categories</ion-label>
                      </ion-item>
                      <ion-item href="/export">
                        <ion-icon name="open-outline" slot="start"></ion-icon>
                        <ion-label>Backup & Expert</ion-label>
                      </ion-item>
                      <ion-item href="/settings">
                        <ion-icon name="settings-outline" slot="start"></ion-icon>
                        <ion-label>Settings</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon name="star-outline" slot="start"></ion-icon>
                        <ion-label>Rate Us</ion-label>
                      </ion-item>
                      <ion-item href="/about">
                        <ion-icon name="information-circle-outline" slot="start"></ion-icon>
                        <ion-label>About</ion-label>
                      </ion-item>
                    </ion-list>
                  </ion-content>
                </ion-menu>

                <div class="ion-page" id="main-content">
                  <ion-header>
                    <ion-toolbar>
                      <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                      </ion-buttons>
                      <ion-buttons slot="end" id="btnFilter">
                        <ion-icon  slot="icon-only" class="icon-tool" ios="ios-options-outline" md="md-options"></ion-icon>
                      </ion-buttons>
                      <ion-title>Walleto</ion-title>
                    </ion-toolbar>
                  </ion-header>
                  
                  <ion-content>
                    <ion-card>
                        <ion-card-content>
                            <ion-grid>
                                <ion-row>
                                    <ion-col class="ion-text-center">
                                        <ion-text color="secondary">
                                            <p>Income</p>
                                            <h1>${HomeData.totalIncome}</h1>
                                        </ion-text>
                                    </ion-col>
                                    <div class="verticalLine"></div>
                                    <ion-col class="ion-text-center">
                                        <ion-text color="secondary">
                                            <p>Expense</p>
                                            <h1>${HomeData.totalExpenses}</h1>
                                        </ion-text>
                                    </ion-col>
                                    <div class="verticalLine"></div>
                                    <ion-col class="ion-text-center">
                                        <ion-text color="secondary">
                                            <p>Balance</p>
                                            <h1>${Number(HomeData.totalIncome) - Number(HomeData.totalExpenses)}</h1>
                                        </ion-text>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-card-content>
                    </ion-card>
                    
                    ${
                        dateArray.map((item) => { return `
                            <component-item-card date=${item}></component-item-card>
                        `}).join("")
                    }
                    
                  
                  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button href="/addItem">
                      <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                  </ion-fab>
              
                  </ion-content>
                </div>
            `;
            
        let router = document.querySelector('ion-router');
        let btnFilter = document.getElementById('btnFilter');
        
        router.addEventListener("ionRouteWillChange", () => {
          if (menuController.isOpen()) {
            menuController.close();
          }
        })
        
        btnFilter.addEventListener('click', () => {
          router.push('/filter')
        })
    }
}

customElements.define("home-page", HomePage);