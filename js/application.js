var updateSubtotal = function(ele) {

  var unitPrice = parseInt($($(ele).find('.item-price h5')[0]).text().slice(1));
  console.log(unitPrice);
  console.log(typeof unitPrice);

  var qty = parseFloat($(ele).find('.item-qty input').val());
  console.log(qty);
  console.log(typeof qty);

  var subtotalCalc = unitPrice * qty;
  console.log(subtotalCalc);
  console.log(typeof subtotalCalc)
  $(ele).find('.item-subtotal h5').text(`$ ${subtotalCalc}.00`);
  return subtotalCalc;
}

var sum = function (acc, x) { return acc + x; };

var updateTotal = function () {
  var cartTotal = [];

  $('.item-wrap').each(function (i) {
    var subtotal = updateSubtotal(this);
    cartTotal.push(subtotal);
    console.log(subtotal);
  });

  var subtotalSum = cartTotal.reduce(sum);

  if (subtotalSum === 0) {
    $('#total-price').html('$ --.--');
  } else {
    $('#total-price').html(`$ ${subtotalSum}.00`);
  }
  console.log(subtotalSum);
} 


$(document).ready(function () {
  updateTotal();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('.row').remove();
    updateTotal();
  });

  var timeout;
  $(document).on('input', '.quantity-input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 1000);
  });

  $(document).on('click', '.btn.add', function (event) {
    event.preventDefault();
    var name = $('#item-input[name=name]').val();
    var price = $('#price-input[name=price]').val();

    $('.shopping-cart-inner').append(`<div class="row no-gutters mb-2 bg-light text-center align-items-center item-wrap">
      <div class="item-name col w-20">
        <h5>${name}</h5>
      </div>
      <div class="item-price col w-20">
        <h5>$ ${price}.00</h5>
      </div>
      <div class="item-qty col w-20">
        <input class="quantity-input form-control form-control-sm w-50 mx-auto" type="number" value="1">
      </div>
      <div class="item-subtotal col w-20">
        <h5 class="subtotal"></h5>
      </div>
      <div class="item-remove col w-20">
        <button class="btn btn-danger btn-sm btn-block remove w-50 mx-auto">Remove</button>
      </div>
    </div>`);

    updateTotal();
    $('#item-input[name=name]').val('');
    $('#price-input[name=price]').val('');
  });
});