import { icons } from '../icons.js';

export default class AddNewCategory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/categories"></ion-back-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button id="btnSubmit">
              <ion-icon slot="icon-only" color="primary" name="checkmark"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Add New Category</ion-title>
        </ion-toolbar>
      </ion-header>
      
        <ion-item>
          <ion-avatar id="currentCategoryAvatar" slot="start"  style="background-color: ${icons[Object.keys(icons)[0]][0].color};">
            <ion-icon id="currentCategoryIcon" name="${icons[Object.keys(icons)[0]][0].icon}"></ion-icon>
          </ion-avatar>
          <ion-label position="floating">Category Name</ion-label>
          <ion-input id="input-categorie" enterkeyhint="done"></ion-input>
        </ion-item>
      
        <ion-item>
            <ion-label>Type</ion-label>
            <ion-select value="expenses" id="categorySelect" interface="popover">
                <ion-select-option value="expenses">Expenses</ion-select-option>
                <ion-select-option value="income">Income</ion-select-option>
                <ion-select-option value="both">Both</ion-select-option>
            </ion-select>
        </ion-item>
      
      <ion-content>
      
      <ion-grid class="ion-text-center">
        ${iconList()}
      <ion-grid>
      
      
      </ion-content>
    `;
    
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.addEventListener("click", () => {    
        const currentCategoryAvatar = document.getElementById("currentCategoryAvatar");
        const currentCategoryIcon = document.getElementById("currentCategoryIcon");
        const inputCategorieName = document.getElementById("input-categorie");
        const categorySelect = document.getElementById("categorySelect");
        const router = document.querySelector('ion-router');
        
        const icon = currentCategoryIcon.getAttribute("name");
        const name = inputCategorieName.value;
        const id = name.toLowerCase();
        const color = rgb2hex(currentCategoryAvatar.style.backgroundColor);
        const type = categorySelect.value;
        const userAdded = true;
        
        if(!name) {
            presentErrorAlert("Enter a name")
        } else {
            const newItem = {id, icon, name, color, type, userAdded};
            addCategoryItem(newItem, (error, data) => {
                if(error) {
                    presentErrorAlert(error)
                } else {
                    presentToast("New category added successfully");
                    router.back();
                }
            })
            
        }
    });
    
    function iconList() {
        let iconKeys = Object.keys(icons);
        let ListHTML = iconKeys.map(icon => `
            <div class="ion-padding"> ${icon} </div>
            <ion-row>
                ${
                    icons[icon].map(iconObj => `
                <ion-col size="3" onclick="handleIconSelect('${iconObj.icon}','${iconObj.color}')">
                          <ion-avatar class="iconAvatar" id="avatar-${iconObj.icon}" style="margin: 0 auto; height:50px; width:50px; background-color: ${iconObj.icon==icons[Object.keys(icons)[0]][0].icon?iconObj.color:"#F5F5F5"};">
                            <ion-icon class="iconIcon" id="icon-${iconObj.icon}" name="${iconObj.icon}" style="color: ${iconObj.icon==icons[Object.keys(icons)[0]][0].icon?"#FFF":"#000"};"></ion-icon>
                          </ion-avatar>
                        </ion-col>
                    `).join("")
                }
            </ion-row>
        `).join("");
        return ListHTML;
    }
    
    const presentErrorAlert = (message) => {
        const alert = document.createElement('ion-alert');
        alert.header = 'Error';
        //alert.subHeader = 'Subtitle';
        alert.message = message;
        alert.buttons = ['OK'];

        document.body.appendChild(alert);
        return alert.present();
    }
  }
}

customElements.define("add-new-category-page", AddNewCategory);