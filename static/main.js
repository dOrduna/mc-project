function SimpleApp() {
    this.body = document.body;
    this.fetchData();
}

SimpleApp.prototype.showPlaceholder = function () {
  let placeholder = document.createElement("div");
  helpers.addClass(placeholder, "placeholder");
  placeholder.innerText = "Loading songs...";
  this.body.appendChild(placeholder);
};

SimpleApp.prototype.hidePlaceholder = function () {
  helpers.empty(this.body);
};

SimpleApp.prototype.fetchData = function () {
  this.showPlaceholder();
    setTimeout(() => {
        fetch("/data.json")
          .then(response => response.json())
          .then(json => this.onDataLoad(json))
          .catch(error => {
            console.error(error);
            alert("Something went wrong...");
          });
    }, helpers.generateRandomNumber(500, 2000));
};

SimpleApp.prototype.onDataLoad = function (data) {
  this.hidePlaceholder();
    this.staticListView = new StaticListView(
      this.body,
      !helpers.isNullOrUndefined(data.Items)? data.Items : [],
      [
          {
              elementTag: "img",
              classes: "thumbnail",
              get: function (item) {
                  return helpers.isNotEmpty(item.ImageUrls) ? item.ImageUrls[0].ImageUrl : null
              }
          },
          {
              elementTag: "div",
              classes: "title",
              get: function (item) {
                  return !helpers.isNullOrUndefined(item.Ttla) ? item.Ttla.Line2 : null
              }
          },
          {
              elementTag: "div",
              classes: "subtitle",
              get: function (item) {
                  return !helpers.isNullOrUndefined(item.Ttla) ? item.Ttla.Line1 : null
              }
          },
          {
              elementTag: "div",
              classes: "additional",
              get: function (item) {
                  return helpers.isNotEmpty(item.TvRating) ? item.TvRating : null
              }
          }
      ],
      "songs"
    );
};