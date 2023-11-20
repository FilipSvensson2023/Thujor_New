 $(document).ready(function () {

  $.getScript("//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js").done(function() {

    quick_view();

  })
});
function quick_view(data__get_handel) {
var quick_id = data__get_handel.getAttribute('quick-node-js')
    if ($('#quick-view').length == 0){$("body").append('<div id="quick-view"></div>');}
    var product_handle =  data__get_handel.getAttribute('data-handle')
    
    jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
      console.log(product)
      var title = product.title;
      var type = product.type;
      var price = 0;

      var original_price = 0;

      var desc = product.description;

      var images = product.images;

      var variants = product.variants;

      var options = product.options;

      var url = '/products/' + product_handle;

      $('.qv-product-title').text(title);

      $('.qv-product-type').text(type);
      var title = desc;
      
      var shortText = jQuery.trim(title).substring(0, 10).split(" ").slice(0, -1).join(" ") + "...";
      $('.qv-product-description').html(shortText);

      $('.view-product').attr('href', url);
      
      var imageCount = $(images).length; 
        // console.log("imageCount",)
      $(images).each(function (i, image) {
        if (i == imageCount-1) {
          console.log('imageCount-1')
          var image_embed = '<div class="djieyet"><img src="' + image + '" class="lazyload" data-src="' + image + '"></div>';
          image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
          $('.qv-product-images').append(image_embed);

           $('.qv-product-images').slick({

            'dots': false,
            'infinite': false,
            'arrows': true,
   
            'respondTo': 'min',

            'useTransform': false

          }).css('opacity', '1');
          
        } else {
 
          image_embed = '<div class="hidden_Image"><img src="' + image + '" class="lazyload" data-src="' + image + '"></div>';

          image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
          $('.qv-product-images').append(image_embed);
 
        }

      });


      $(options).each(function (i, option) {
// console.log(option.name)
        var opt = option.name;

        var selectClass = '.option.' + opt.toLowerCase();

        $('.qv-product-options').append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><ul class="option-' + i + ' option ' + opt.toLowerCase() + '"></ul></div>');

        $(option.values).each(function (i, value) {

          $('.option.' + opt.toLowerCase()).append('<li value="' + value + '">' + value + '</li>');

        });

      });
        setTimeout(()=>{
let value_get = document.querySelectorAll('ul li[value]')
         $(variants).each(function(i,v){
if(v.available == false) $('.qv-add-button').prop('disabled', true).text('Sold Out')
if(v.available == false) $('[buy_json]').prop('disabled', true)
for(let i=0;i<value_get.length;i++){
  if(value_get[i].innerHTML == v.title ){
              // console.log(v.id,"----",v.title)
  //console.log( value_get[i].innerHTML)
    value_get[i].setAttribute('v_id',v.id)
  }
}
         })

          let v_get = document.querySelectorAll('[v_id]')
for(let i=0;i<v_get.length;i++){
    v_get[i].addEventListener('click',function(){
        let v_id =   v_get[i].getAttribute('v_id')
 $('.addTocart_submit [name="id"]').val(v_id)
    })
  
}

  },1000)

      
      $(product.variants).each(function (i, v) {
        if (v.inventory_quantity == 0) {

          $('.qv-add-button').prop('disabled', true).val('Sold Out');

          $('.qv-add-to-cart').hide();

          $('.qv-product-price').text('Sold Out').show();

          return true

        } else {

          price = parseFloat(v.price / 100).toFixed(2);

          original_price = parseFloat(v.compare_at_price / 100).toFixed(2);

          $('.qv-product-price').text('$' + price);

          if (original_price > 0) {

            $('.qv-product-original-price').text('$' + original_price).show();

          } else {

            $('.qv-product-original-price').hide();
          }

          $('ul.option-0').val(v.option1);

          $('ul.option-1').val(v.option2);

          $('ul.option-2').val(v.option3);

          return false

        }

      });

    });

 

    $(document).on("click", "#quick-view ul>li", function () {

      var selectedOptions = '';

      $('#quick-view ul>li').each(function (i) {

        if (selectedOptions == '') {

          selectedOptions = $(this).val();

        } else {

          selectedOptions = selectedOptions + ' / ' + $(this).val();

        }

      });

      jQuery.getJSON('/products/' + product_handle + '.js', function (product) {

        $(product.variants).each(function (i, v) {
          if (v.title == selectedOptions) {

            var price = parseFloat(v.price / 100).toFixed(2);

            var original_price = parseFloat(v.compare_at_price / 100).toFixed(2);

            var v_qty = v.inventory_quantity;

            var v_inv = v.inventory_management;

            $('.qv-product-price').text('$' + price);

            $('.qv-product-original-price').text('$' + original_price);

            if (v_inv == null) {

              $('.qv-add-button').prop('disabled', false).val('Add to Cart');

            } else {

              if (v.inventory_quantity < 1) {

                $('.qv-add-button').prop('disabled', true).val('Sold Out');

              } else {

                $('.qv-add-button').prop('disabled', false).val('Add to Cart');

              }

            }

          }

        });

      });

    });
    $.fancybox({

      href: '#quick-view',

      maxWidth: 1040,

      maxHeight: 600,

      fitToView: true,

      width: '75%',

      height: '70%',

      autoSize: false,

      closeClick: false,

      openEffect: 'none',

      closeEffect: 'none',

      'beforeLoad': function () {

        var product_handle = $('#quick-view').attr('class');
         //--------------------
      jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
         var qty = $('.qv-quantity').val();
         console.log(qty);
          var selectedOptions = '';

          var var_id = '';

          $('#quick-view ul').each(function (i) {

            if (selectedOptions == '') {

              selectedOptions = $(this).val();

            } else {

              selectedOptions = selectedOptions + ' / ' + $(this).val();

            }

          });
            $(product.variants).each(function (i, v) {

               if (v.title == selectedOptions) {

                var_id = v.id;
                 
                processCart(var_id);

               }

            });

          });
          function processCart(var_id) {
        //  console.log("var_id::var_idvar_idvar_id::",var_id);
          $('.addTocart_submit>input[type="hidden"]').attr("value",var_id);
          }
          $('body').on('click', '.addTocart', function (e) {
            //do some code here i.e
            e.preventDefault();
           
            var btn = $(this);
            $('operror').remove();
            var form = $(this).parents('.addTocart_submit').serialize();
           //  console.log("form data",form);
            // btn.attr('disabled', 'disabled');
            // btn.val("Adding...");
            $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: form,
                dataType: "json",
               success:function(data){
          console.log('succ -- ')
                 $.getJSON('/cart.js',function(v){
    console.log(v.item_count)
                   $('span#cart-count').text(v.item_count)
                   $('.msg-json').css('display','block');
})
          var item_c = data.item_count;
            console.log(item_c);
      
        },
                error: function (jqXHR, textStatus, erorThrown) {
                    var response = $.parseJSON(jqXHR.responseText);
                    let text = response.description;
                }
            })
         
          });
          function addToCartSuccess() {
           
          // $("div#sidebar-cart").attr("aria-hidden","false");
          // $("div#sidebar-cart").attr("tabindex","-1");
          // $(".PageOverlay").addClass("is-visible");
            
          // $.get('/cart', function (data) {
          // $('.main-cart-drawer').addClass('show-cart');
          //   $('.CartItemWrapper').html(data);
          //  console.log("data:::::::::::::::::::::::::::::::::::::",data)
          // })           
          }     

        // });

        $('.fancybox-wrap').css('overflow', 'hidden !important');

      },

      'afterShow': function () {

        $('#quick-view').hide().html(content).css('opacity', '1').fadeIn(function () {

          $('.qv-product-images').addClass('loaded');

        });

      },

      'afterClose': function () {

        $('#quick-view').removeClass().empty();

      }

    });

   
  //  quantity button
  $('.qv-product-price').css('display','none')

 setTimeout(()=>{
   
var review = $(`[quick-node-js="${quick_id}"]`).parent('.quick-view-button').parent('.static').siblings('.product_list_s').children('.spr-badge').html()
$('.review-json-fetch').append(review)
  var quick_p = $(`[quick-node-js="${quick_id}"]`).parent().siblings('p.price').html()
$('.qv-product-price').html(quick_p) 
   $('.qv-product-price').css('display','block')
 },1000)   
$('.qv-content .addTocart_submit [name="id"]').val(data__get_handel.getAttribute('quick-node-js'))

 
};

 

$(window).resize(function () {

  if ($('#quick-view').is(':visible')) {

   $('.qv-product-images').slick('setPosition');
  }
});
 