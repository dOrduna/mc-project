function StaticListView (parentElement, data, listSpec, containerClass) {
    this.data = data;
    this.listSpec = listSpec;
    this.parent = parentElement;
    this.containerClass = containerClass;
    this.initialLoad();
}

StaticListView.prototype.initialLoad = function() {
    helpers.empty(this.parent);

    this.emptyList = document.createElement("ul");

    helpers.addClass(this.emptyList, this.containerClass);

    this.parent.appendChild(this.emptyList);

    this.data.forEach((item) => {
        this.renderItem(item);
    });
    
    
};

StaticListView.prototype.renderItem = function(item) {
    let listItem = document.createElement("li");

    this.listSpec.forEach(function (spec) {
        let element = document.createElement(spec.elementTag);
        switch (spec.elementTag) {
            case "img":
                element.src = spec.get(item);
                break;
            case "div":
                element.innerText = spec.get(item);
                break;
        }
        helpers.addClass(element, spec.classes);
        listItem.appendChild(element);
    });

    this.emptyList.appendChild(listItem);
};