document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("product-grid");
  if (!grid || !window.H12_PRODUCTS) return;
  var list = window.H12_PRODUCTS.filter(function (p) { return p.type !== "subscription"; });
  grid.innerHTML = list.map(function (p) {
    return (
      '<article class="card product-card">' +
        '<div class="product-top">' +
          (p.badge ? '<span class="badge">' + p.badge + "</span>" : "<span></span>") +
          '<div class="price">' +
            (p.originalPrice ? '<span class="old">' + formatPrice(p.originalPrice) + "</span>" : "") +
            formatPrice(p.price) +
          "</div>" +
        "</div>" +
        "<h3>" + p.name + "</h3>" +
        '<p class="desc">' + p.short + "</p>" +
        '<ul class="includes">' +
          p.includes.slice(0, 3).map(function (i) {
            return '<li><span class="ok">✓</span>' + i + "</li>";
          }).join("") +
        "</ul>" +
        '<div class="product-actions">' +
          '<a class="btn-ghost btn-sm" href="formation.html?slug=' + p.slug + '">Détails</a>' +
          '<button type="button" class="btn-primary btn-sm" data-add="' + p.id + '">Ajouter au panier</button>' +
        "</div>" +
      "</article>"
    );
  }).join("");

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add]");
    if (!btn) return;
    var p = window.H12_PRODUCTS.find(function (x) { return x.id === btn.getAttribute("data-add"); });
    if (!p) return;
    window.H12Cart.add(p);
    btn.textContent = "Ajouté ✓";
    setTimeout(function () { btn.textContent = "Ajouter au panier"; }, 1600);
  });
});
