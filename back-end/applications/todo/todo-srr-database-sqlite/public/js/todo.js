(function($) {
    'use strict';
    $(function() {
        var todoListItem = $('.todo-list');
        var todoListInput = $('.todo-list-input');
        var todoForm = $('#todo-form');
        $('.todo-list-add-btn').on("click", function(event) {

            event.preventDefault();

            var item = $(this).prevAll('.todo-list-input').val();

            if (item) {
               todoForm.submit();
            }

        });

        todoListItem.on('change', '.checkbox', function() {
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
            } else {
                $(this).attr('checked', 'checked');
            }

            $(this).closest("li").toggleClass('completed');

        });

        todoListItem.on('click', '.remove', function() {
            $(this).parent().remove();
        });

    });
})(jQuery);