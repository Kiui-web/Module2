function muestra_oculta(id){
    if (document.getElementById){ //se obtiene el id
    const el = document.getElementById(id); //se define la variable "el" igual a nuestro div
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
    }
    }
    window.onload = function(){/*hace que se cargue la función lo que predetermina que div estará oculto hasta llamar a la función nuevamente*/
    muestra_oculta('nav-show');/* "contenido_a_mostrar" es el nombre que le dimos al DIV */
    }



    $(function() {
        'use strict';
      
        var body = $('body');
      
        function goToNextInput(e) {
          var key = e.which,
            t = $(e.target),
            sib = t.next('input');
      
          if (key != 9 && (key < 48 || key > 57)) {
            e.preventDefault();
            return false;
          }
      
          if (key === 9) {
            return true;
          }
      
          if (!sib || !sib.length) {
            sib = body.find('input').eq(0);
          }
          sib.select().focus();
        }
      
        function onKeyDown(e) {
          var key = e.which;
      
          if (key === 9 || (key >= 48 && key <= 57)) {
            return true;
          }
      
          e.preventDefault();
          return false;
        }
        
        function onFocus(e) {
          $(e.target).select();
        }
      
        body.on('keyup', 'input', goToNextInput);
        body.on('keydown', 'input', onKeyDown);
        body.on('click', 'input', onFocus);
      
      })