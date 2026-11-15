(function () {
  var KEY = "h12_cart_v1";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("h12-cart"));
  }
  window.H12Cart = {
    load: load,
    add: function (item) {
      var cart = load();
      var ex = cart.find(function (c) { return c.id === item.id; });
      if (ex) ex.qty += 1;
      else cart.push({ id: item.id, slug: item.slug, name: item.name, price: item.price, type: item.type, qty: 1 });
      save(cart);
      return cart;
    },
    remove: function (id) {
      var cart = load().filter(function (c) { return c.id !== id; });
      save(cart);
      return cart;
    },
    clear: function () { save([]); },
    count: function (items) { return (items || load()).reduce(function (s, i) { return s + i.qty; }, 0); },
    total: function (items) { return (items || load()).reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  };
  function syncBadge() {
    var el = document.getElementById("cart-badge");
    if (!el) return;
    var n = window.H12Cart.count();
    if (n > 0) { el.textContent = n; el.classList.remove("hidden"); }
    else el.classList.add("hidden");
  }
  document.addEventListener("DOMContentLoaded", syncBadge);
  window.addEventListener("h12-cart", syncBadge);
})();
