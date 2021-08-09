
export default class addItem extends HTMLElement {
  connectedCallback() {
    
    this.innerHTML = `
    <ion-header translucent>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
            </ion-buttons>
            <ion-title>Add Client</ion-title>
        </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-item>
        <ion-label position="stacked">Name</ion-label>
        <ion-input  placeholder="Name" id="" type="text" autofocus=true enterkeyhint="next" inputmode="text" required=true></ion-input>
      </ion-item>
        
      <ion-item>
        <ion-label position="stacked">Contact</ion-label>
        <ion-input placeholder="Phone Number" id="" type="tel" autofocus=true enterkeyhint="done" inputmode="tel" required=true></ion-input>
      </ion-item>
      
      <ion-item>
        <ion-label position="stacked">Address</ion-label>
        <ion-textarea></ion-textarea>
      </ion-item>
      
      <ion-item>
        <ion-label position="stacked">Paper</ion-label>
        <ion-select value="സുപ്രഭാതം">
          <ion-select-option value="സുപ്രഭാതം">സുപ്രഭാതം</ion-select-option>
          <ion-select-option value="ചന്ദ്രിക">ചന്ദ്രിക</ion-select-option>
          <ion-select-option value="മാധ്യമം">മാധ്യമം</ion-select-option>
          <ion-select-option value="മനോരമ">മനോരമ</ion-select-option>
          <ion-select-option value="മാതൃഭൂമി">മാതൃഭൂമി</ion-select-option>
          <ion-select-option value="dog">Dog</ion-select-option>
        </ion-select>
      </ion-item>
      
      <ion-item>
        <ion-label position="stacked">Start Date</ion-label>
        <ion-datetime value="${new Date()}"></ion-datetime>
      </ion-item>
      
      <ion-item>
        <ion-label position="stacked">Area</ion-label>
        <ion-input></ion-input>
      </ion-item>
          
    </ion-content>
    
    <ion-button color="primary" id="btnSubmit">Save</ion-button>
      
      `;


    const btnSubmit = document.getElementById("btnSubmit");
    

    btnSubmit.addEventListener("click", () => {
        const memoInput = document.getElementById('input-memo');
        
    });
  }
}

customElements.define("add-item-page", addItem);