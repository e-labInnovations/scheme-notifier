const nav = document.querySelector('ion-nav');
let walletoItems = null;
let categories = null;

//Handles
//Open detailed item model in Home.js
const openDetailedItemModal = (id) => {
  const modalElement = document.createElement('ion-modal');
  modalElement.component = 'detailed-item-modal';
    modalElement.componentProps = {id};
  document.body.appendChild(modalElement);
  return modalElement.present();
}

//Show toast message
async function presentToast(msg) {
  const toast = document.createElement('ion-toast');
  toast.message = msg;
  toast.duration = 2000;

  document.body.appendChild(toast);
  return toast.present();
}

//Handle delete category item request in Categories.js
const handleDeleteCategoryItem = (id) => {
    let categoryItem = getCategories().find(category => category.id == id);
    
    const deleteItem = () => {
        deleteCategoryItem(id, (data) => {
            document.querySelector('categories-page').connectedCallback();
        })
        //document.querySelector('ion-nav').setRoot('categories-page')
    }
    
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    //alert.subHeader = 'Subtitle';
    alert.message = `Do you really want to delete the <b>${categoryItem.name}</b> category? <br /> You will <b>lose all added items under the ${categoryItem.name}</b> category!`;
    alert.buttons = [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: deleteItem
        }
      ];

    document.body.appendChild(alert);
    return alert.present();
}
    
//Handle icon select in AddNewCategory.js
const handleIconSelect = (icon, color) => {
    let avatarIcon = document.getElementById("avatar-"+icon);
    let iconIcon = document.getElementById("icon-"+icon);
    let currentCategoryAvatar = document.getElementById("currentCategoryAvatar");
    let currentCategoryIcon = document.getElementById("currentCategoryIcon");
    
    currentCategoryAvatar.style.backgroundColor = color;
    currentCategoryIcon.setAttribute("name", icon);
    
    var iconAvatarElements, iconIconElements, i;
    iconAvatarElements = document.querySelectorAll(".iconAvatar");
    iconIconElements = document.querySelectorAll(".iconIcon");
    
    for (i = 0; i < iconAvatarElements.length; i++) {
      iconAvatarElements[i].style.backgroundColor = "#F5F5F5";
    }
    for (i = 0; i < iconAvatarElements.length; i++) {
      iconIconElements[i].style.color = "#000";
    }
    
    iconIcon.style.color = "#FFF";
    avatarIcon.style.backgroundColor = color;
    
    
}

//Handle category select (category icon) in AddItem.js
const handleCategorySelect = (icon, color, id) => {
    let avatarIcon = document.getElementById("avatar-"+id);
    let iconIcon = document.getElementById("icon-"+id);
    let currentCategoryAvatar = document.getElementById("currentCategoryAvatar");
    let currentCategoryIcon = document.getElementById("currentCategoryIcon");
    
    currentCategoryAvatar.style.backgroundColor = color;
    currentCategoryAvatar.setAttribute("category", id);
    currentCategoryIcon.setAttribute("name", icon);
    
    var iconAvatarElements, iconIconElements, i;
    iconAvatarElements = document.querySelectorAll(".iconAvatar");
    iconIconElements = document.querySelectorAll(".iconIcon");
    
    for (i = 0; i < iconAvatarElements.length; i++) {
      iconAvatarElements[i].style.backgroundColor = "#F5F5F5";
    }
    for (i = 0; i < iconAvatarElements.length; i++) {
      iconIconElements[i].style.color = "#000";
    }
    
    iconIcon.style.color = "#FFF";
    avatarIcon.style.backgroundColor = color; 
}

//Handle delete wallet item request in DetailedItemModal.js 
const handleDeleteWalletoItem = (id) => {
    const modalElement = document.querySelector('ion-modal');
    const deleteItem = () => {
        deleteWalletoItem(id, (data) => {
            modalElement.dismiss({
                'dismissed': true
            });
            document.querySelector('home-page').connectedCallback();
        })
    }
    
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.message = `Do you really want to delete this item?`;
    alert.buttons = [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: deleteItem
        }
      ];

    document.body.appendChild(alert);
    return alert.present();
}

//Return data for Home.js
const getHomeData = () => {
    walletoItems = getWalletoItems();
    let dateSet = new Set(walletoItems.map(item => convertDate(item.date)));
    
    let dateArray = Array.from(dateSet).sort(function(a,b){
        var dateAParts = a.split("-");
        var dateAObject = new Date(+dateAParts[2], dateAParts[1] - 1, +dateAParts[0]);
        var dateBParts = b.split("-");
        var dateBObject = new Date(+dateBParts[2], dateBParts[1] - 1, +dateBParts[0]);
        
        return dateBObject - dateAObject;
    });
    
    let expenseArray = walletoItems.filter(item => item.type === "expenses").map(item => Number(item.money));
    let incomeArray = walletoItems.filter(item => item.type === "income").map(item => Number(item.money));
    let totalExpenses = expenseArray.reduce((a, b) => a + b, 0);
    let totalIncome = incomeArray.reduce((a, b) => a + b, 0);
    
    return {dateArray, totalIncome, totalExpenses};
}

//Return walletoItems list
const getWalletoItems = () => {
    if(walletoItems == null) {
        walletoItems = JSON.parse(localStorage.getItem('Walleto-allItems'));
        if(walletoItems == null) {
            walletoItems = [];
            localStorage.setItem('Walleto-allItems',JSON.stringify(walletoItems));
        }
    }
    return walletoItems;
}

//Return single walletoItem by its id
const getSingleWalletoItem = (id) => {
    walletoItems = getWalletoItems();
    categories = getCategories();
    let singleWalletoItem = {...walletoItems.find(element => element.id === id)};
    if(walletoItems.findIndex(element => element.id === id) != -1) {
        singleWalletoItem.category = categories.find(element => element.id === singleWalletoItem.category);
        return singleWalletoItem;
    } else {
        return null; 
    }
}

//Add new item to walletoItems
const addWalletoItem = (newWalletoItem, callback) => {
    walletoItems = getWalletoItems();
    
    if(!newWalletoItem.id){
        var newID = Math.random().toString(36).substr(2, 9);
        newWalletoItem.id = newID;
    
        walletoItems.push(newWalletoItem);
        
        localStorage.setItem('Walleto-allItems', JSON.stringify(walletoItems));
        sessionStorage.setItem("refreshHome", true);
        callback(undefined, walletoItems);
    } else {
        let position = walletoItems.findIndex((element => element.id === newWalletoItem.id))
        walletoItems[position] = newWalletoItem;
        
        localStorage.setItem('Walleto-allItems', JSON.stringify(walletoItems));
        sessionStorage.setItem("refreshHome", true);
        callback(undefined, walletoItems);
    }
}

//Return a list of walletoItems with spesific date
const getWalletoItemsByDate = (date) => {
    walletoItems = getWalletoItems();
    categories = getCategories();
    
    let newItems = [...(walletoItems.filter(item => convertDate(item.date) === date))];
    newItems = newItems.map(item => {
        let category = item.category;
        let categoryObj = categories.find(itemCat => itemCat.id === item.category);
        let itemObj = {...item}
        itemObj.category = categoryObj;
        return itemObj;
    });
    newItems = newItems.reverse();
    
    let expenseArray = newItems.filter(item => item.type === "expenses").map(item => Number(item.money));
    let incomeArray = newItems.filter(item => item.type === "income").map(item => Number(item.money));
    let totalExpenses = expenseArray.reduce((a, b) => a + b, 0);
    let totalIncome = incomeArray.reduce((a, b) => a + b, 0);
    return { newItems, totalIncome, totalExpenses };
}

//Delete a walletoItem with its id
const deleteWalletoItem = (id, callback) => {
    walletoItems = getWalletoItems();
    walletoItems = walletoItems.filter((item) => {
        return item.id !== id;
    });
    localStorage.setItem('Walleto-allItems', JSON.stringify(walletoItems));
    
    callback(categories)
}

//return categories list
const getCategories = () => {
    if(categories == null) {
        categories = JSON.parse(localStorage.getItem('Walleto-categories'));
        if(categories == null) {
            categories = defaultCategories();
            localStorage.setItem('Walleto-categories',JSON.stringify(categories));
        }
    }
    return categories;
}

//Add an new item to categories list
const addCategoryItem = (newItem, callback) => {
    categories = getCategories();
    
    var isExist = categories.some(category => category.id == newItem.id);
    if (isExist) {
      callback(`Category already exist with the name ${newItem.name}`, undefined)
    } else {
       categories.push(newItem);
       localStorage.setItem('Walleto-categories', JSON.stringify(categories));
       sessionStorage.setItem("refreshCategories", true);
       callback(undefined, categories)
    }
}

//Delete an item from categories list
const deleteCategoryItem = (id, callback) => {
    categories = getCategories();
    walletoItems = getWalletoItems();
    categories = categories.filter((item) => {
        return item.id !== id;
    });
    walletoItems = walletoItems.filter((item) => {
        return item.category !== id;
    });
    localStorage.setItem('Walleto-categories', JSON.stringify(categories));
    localStorage.setItem('Walleto-allItems', JSON.stringify(walletoItems));
    sessionStorage.setItem("refreshHome", true);
    
    callback(categories)
}


//Utility Functions

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
    var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
    
    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
 
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

//Convert date to walleto date form with day and without day
function convertDate(inputFormat, withDay = false) {
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function pad(s) { 
        return (s < 10) ? '0' + s : s; 
    }
    var d = new Date(inputFormat);
    if(withDay) {
        let day = weekday[d.getDay()];
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-') + " " + day;
    } else {
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
    }
}

//Capitalize first letter of string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



//Return a default list for categories list
const defaultCategories = () => {
    return [
{
"id":"food",
"icon":"restaurant",
"name":"Food",
"color":"#e53935",
"type":"expenses",
"userAdded":false
},{
"id":"bills",
"icon":"receipt",
"name":"Bills",
"color":"#d81b60",
"type":"expenses",
"userAdded":false
},{
"id":"home",
"icon":"home",
"name":"Home",
"color":"#8e24aa",
"type":"expenses",
"userAdded":false
},{
"id":"transportation",
"icon":"subway",
"name":"Transportation",
"color":"#5e35b1",
"type":"expenses",
"userAdded":false
},{
"id":"car",
"icon":"car-sport",
"name":"Car",
"color":"#3949ab",
"type":"expenses",
"userAdded":false
},{
"id":"entertainment",
"icon":"game-controller",
"name":"Entertainment",
"color":"#1e88e5",
"type":"expenses",
"userAdded":false
},{
"id":"shopping",
"icon":"cart",
"name":"Shopping",
"color":"#039be5",
"type":"expenses",
"userAdded":false
},{
"id":"clothing",
"icon":"shirt",
"name":"Clothing",
"color":"#00acc1",
"type":"expenses",
"userAdded":false
},{
"id":"insurance",
"icon":"shield-checkmark",
"name":"Insurance",
"color":"#00897b",
"type":"expenses",
"userAdded":false
},{
"id":"tax",
"icon":"reader",
"name":"Tax",
"color":"#43a047",
"type":"expenses",
"userAdded":false
},{
"id":"telephone",
"icon":"call",
"name":"Telephone",
"color":"#7cb342",
"type":"expenses",
"userAdded":false
},{
"id":"health",
"icon":"medkit",
"name":"Health",
"color":"#c0ca33",
"type":"expenses",
"userAdded":false
},{
"id":"sport",
"icon":"football",
"name":"Sport",
"color":"#fdd835",
"type":"expenses",
"userAdded":false
},{
"id":"electronics",
"icon":"watch",
"name":"Electronics",
"color":"#ffb300",
"type":"expenses",
"userAdded":false
},{
"id":"gift",
"icon":"gift",
"name":"Gift",
"color":"#fb8c00",
"type":"expenses",
"userAdded":false
},{
"id":"travel",
"icon":"airplane",
"name":"Travel",
"color":"#f4511e",
"type":"expenses",
"userAdded":false
},{
"id":"education",
"icon":"school",
"name":"Education",
"color":"#6d4c41",
"type":"expenses",
"userAdded":false
},{
"id":"office",
"icon":"attach",
"name":"Office",
"color":"#757575",
"type":"expenses",
"userAdded":false
},{
"id":"other",
"icon":"grid",
"name":"Other",
"color":"#546e7a",
"type":"both",
"userAdded":false
},{
"id":"salary",
"icon":"wallet",
"name":"Salary",
"color":"#01579b",
"type":"income",
"userAdded":false
},{
"id":"awards",
"icon":"medal",
"name":"Awards",
"color":"#004d40",
"type":"income",
"userAdded":false
},{
"id":"sale",
"icon":"pricetag",
"name":"Sale",
"color":"#1a237e",
"type":"income",
"userAdded":false
}]
}