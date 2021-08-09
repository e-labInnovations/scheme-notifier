export default class ItemCard extends HTMLElement {
  connectedCallback() {
    let itemsObj = getWalletoItemsByDate(this.getAttribute("date"));
    let items = itemsObj.newItems;

    this.innerHTML = `
		<ion-card>
		<ion-card-header>
		    <ion-card-subtitle>${this.getAttribute("date")} <span class="ion-float-right"> Income: ${itemsObj.totalIncome} Expenses: -${itemsObj.totalExpenses}</span> </ion-card-subtitle>
		  </ion-card-header>
            <ion-card-content>
            
                ${items.map(item => {
                    return `
                    <ion-item detail button onclick="openDetailedItemModal('${item.id}')">
                      <ion-avatar style="background-color: ${item.category.color};" slot="start">
                        <ion-icon name="${item.category.icon}"></ion-icon>
                      </ion-avatar>
                      <ion-label>
                        <h2>${item.memo.length>0?item.memo:item.category.name} <span class="ion-float-right"> ${item.type === 'income' ? "" : "-"}${item.money} </span></h2>
                      </ion-label>
                    </ion-item>
                    `}).join("")
                }
                
            </ion-card-content>
            </ion-card>
        `;
  }
}

customElements.define("component-item-card", ItemCard);