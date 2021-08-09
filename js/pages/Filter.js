export default class Filter extends HTMLElement {
 connectedCallback() {
   let categories = getCategories(); //From app.js
  
    this.innerHTML = `
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="/" id="back"></ion-back-button>
          </ion-buttons>
          <ion-title>Filter</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content fullscreen class="ion-padding">
          <ion-item>
            <ion-label>Start Date</ion-label>
            <ion-datetime display-format="DD-MMM-YYYY" placeholder="Select Date"  value="${new Date()}"></ion-datetime>
          </ion-item>
          
          <ion-item>
            <ion-label>End Date</ion-label>
            <ion-datetime display-format="DD-MMM-YYYY" placeholder="Select Date"  value="${new Date()}"></ion-datetime>
          </ion-item>
          
      
        <ion-list>
          <ion-list-header lines="inset">
            <ion-label>Category</ion-label>
          </ion-list-header>
          ${listHTMLData(categories)}
        </ion-list>
        
      </ion-content>
      <ion-button color="primary" id="btnSubmit">Save</ion-button>
    `;
    
    let toggle = document.querySelectorAll('ion-toggle');
    let btnSubmit = document.getElementById('btnSubmit');
    
    btnSubmit.addEventListener('click', () => {
      let filterCats = [];
      toggle.forEach(tg => {
        //console.log(tg);
      })
    })
    
    function listHTMLData(categories) {
        return categories.map(
            (category) => `
                <ion-item>
                  <ion-toggle slot="end" value="${category.id}" checked=true></ion-toggle>
                  <ion-avatar slot="start"  style="background-color: ${category.color};">
                    <ion-icon name="${category.icon}"></ion-icon>
                  </ion-avatar>
                  <ion-label>
                    <h3>${category.name}</h3>
                  </ion-label>
                </ion-item>
        `
          )
          .join("")
    }
    
    
  }
}
 
customElements.define("filter-page", Filter);
 