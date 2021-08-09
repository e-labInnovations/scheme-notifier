 
export default class DetailedItemModal extends HTMLElement {
  connectedCallback() {
    const modalElement = document.querySelector('ion-modal');
    let id = modalElement.componentProps.id;
    let walletoItem = getSingleWalletoItem(id);
    
    this.innerHTML = `
    <ion-header>
      <ion-toolbar>
        <ion-title>Details</ion-title>
        <ion-buttons slot="primary">
          <ion-button id="btnClose">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-item>
                <ion-avatar style="background-color: ${walletoItem.category.color};" slot="start">
                    <ion-icon name="${walletoItem.category.icon}"></ion-icon>
                </ion-avatar>
                <ion-label>
                    <ion-card-title>${walletoItem.category.name}</ion-card-title>
                </ion-label>
            </ion-item>
          </ion-card-header>
 
          <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="4"> <h2>Category</h2> </ion-col>
                    <ion-col size="8"> <h2>${capitalizeFirstLetter(walletoItem.type)}</h2> </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="4"> <h2>Money</h2> </ion-col>
                    <ion-col size="8"> <h2>${walletoItem.money}</h2> </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="4"> <h2>Date</h2> </ion-col>
                    <ion-col size="8"> <h2>${convertDate(walletoItem.date,true)}</h2> </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="4"> <h2>Memo</h2> </ion-col>
                    <ion-col size="8"> <h2>${walletoItem.memo}</h2> </ion-col>
                </ion-row>
            <ion-grid>
          </ion-card-content>
        </ion-card>
        
        <ion-fab horizontal="center">
            <ion-fab-button>
                <ion-icon name="settings"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="start" onclick="handleDeleteWalletoItem('${walletoItem.id}')">
                <ion-fab-button color="danger"><ion-icon name="trash"></ion-icon></ion-fab-button>
            </ion-fab-list>
            <ion-fab-list side="end" id="btnEdit">
                <ion-fab-button color="primary"><ion-icon name="create"></ion-icon></ion-fab-button>
            </ion-fab-list>
        </ion-fab>
    </ion-content>
      
      `;
    
    
    const btnClose = document.getElementById("btnClose");
    const btnEdit = document.getElementById("btnEdit");
    
    btnClose.addEventListener("click", () => {
        modalElement.dismiss({
            'dismissed': true
        });
    });
    
    btnEdit.addEventListener("click", () => {
        modalElement.dismiss({
            'dismissed': true
        });
        document.querySelector('ion-router').push(`/editItem/${id}`)
    });
  }
}
 
customElements.define("detailed-item-modal", DetailedItemModal);