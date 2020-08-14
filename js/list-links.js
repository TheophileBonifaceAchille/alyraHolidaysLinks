"use strict";
class ListLinks {
  constructor(container, defaultList) {
    this.container = container;
    this.list = JSON.parse(localStorage.getItem("listLinks")) || defaultList;
  }
  init() {
    this.render();
  }

  pushEl(el) {
    /* @todo : remplacer array vide [] dans const urls = [], par l'array qui contient tous les urls
    trouvés dans this.list */
    console.log(this.list);
    const urls = this.list.map((el) => el.url);
    console.log(urls);
    if (!urls.includes(el.url)) {
      // si el.url n'est pas dans la liste des urls
      // je l'ajoute
      this.list.push(el);
      // et j'appelle la méthode refresh
      this.refresh();
    } else {
      alert("Ce lien est déjà inclu");
    }
  }
  remove(el) {
    const i = this.list.findIndex((item) => item === el); // <- ce code trouve index de l'élément récherché
    this.list.splice(i, 1); // <- ce code enleve l'élément avec index i de this.list
    console.log(this.list);
    this.refresh();
  }
  refresh() {
    this.render();
    this.addToLocalStorage();
  }
  addToLocalStorage() {
    /*
     le code ci-dessous convertis l'array list (array qui contients des objet) en format JSON afin de la
     sauvegarder en localStorage dans la clé "listLinks"
    */
    localStorage.setItem("listLinks", JSON.stringify(this.list));
  }
  render() {
    const ulEl = this.addUl();
    this.container.innerHTML = "";
    this.container.append(ulEl);
  }

  addUl() {
    const ulEl = this.createUlElement();
    console.log(this.list);
    for (let el of this.list) {
      const li = this.addLi(el);
      ulEl.append(li);
    }
    return ulEl;
  }

  addLi(el) {
    const liEl = this.createLiElement();
    liEl.append(this.addTitle(el));
    liEl.append(this.addDescription(el));
    liEl.append(this.addLink(el));
    liEl.append(this.addButton(el));
    return liEl;
  }

  createUlElement() {
    const ulEl = document.createElement("ul");
    ulEl.classList.add("row", "list-unstyled", "mt-4");
    return ulEl;
  }

  createLiElement() {
    const liEl = document.createElement("li");
    liEl.classList.add("border", "shadow-sm", "mb-3", "p-2");
    return liEl;
  }

  createTitleElement() {
    const el = document.createElement("h3");
    el.classList.add("h6", "mb-0");
    return el;
  }

  createDescriptionElement() {
    const el = document.createElement("p");
    return el;
  }

  createLinkElement() {
    const el = document.createElement("a");
    el.classList.add("btn", "btn-sm", "btn-outline-warning", "mr-2");
    return el;
  }

  createButtonElement() {
    // <button type="button" class="btn btn-warning btn-sm"></button>
    const el = document.createElement("button");
    el.type = "button";
    el.classList.add("btn", "btn-warning", "btn-sm");
    return el;
  }

  addTitle(el) {
    const title = this.createTitleElement();
    title.textContent = el.title;
    return title;
  }

  addDescription(el) {
    const description = this.createDescriptionElement();
    description.textContent = el.description;
    return description;
  }

  addLink(el) {
    const a = this.createLinkElement();
    a.textContent = "visiter le lien";
    a.href = el.url;
    return a;
  }

  addButton(el) {
    const buttonEl = this.createButtonElement();
    buttonEl.textContent = "Supprimer le lien";
    buttonEl.addEventListener("click", () => {
      this.remove(el);
    });
    return buttonEl;
  }
}

//element HTML recupéré pour faire le filtre
const selectCategory = document.getElementById("selectCategory");

class FilteredLinks extends ListLinks {
  //modification constructor parent
  constructor(container, defaultList, categoryOption) {
    super(container, defaultList);
    this.categoryOption = categoryOption;
  }
  // filtre liste
  filter() {
    const filteredList = this.list.filter((element) => {
      if (this.categoryOption === "toutes") {
        return true;
      } else {
        return element.category === this.categoryOption;
      }
    });
    return filteredList;
  }

  /*mise a jour methode addUl du parent pour creer liEl selon liste filtree qui doit etre triee aussi
  triee*/
  addUl() {
    const filteredList = this.filter();
    const ulEl = this.createUlElement();
    for (let el of filteredList) {
      const li = this.addLi(el);
      ulEl.append(li);
    }
    return ulEl;
  }
}
