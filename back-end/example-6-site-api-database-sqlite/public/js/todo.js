
(function ($) {
    'use strict';
    function createTodoItem(item, todoListItem, buildTodoItem, todoListInput) {
        fetch('/api/todo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                todo: item,
                completed: false,
                userId: 1,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((data) => {
                todoListItem.append(buildTodoItem(data));
                todoListInput.val("");
            })
            .catch((res) => {
                res.json().then(data => {
                    console.log('Error', data);
                    //TODO implementar
                })
            });
    }

    function listTodos(todoListItem)
    {
        fetch('/api/todo', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    document.querySelector('#list-loading').remove();
                    data.forEach((item) => {
                        todoListItem.append(buildTodoItem(item));
                    });
                }
            })
            .catch((res) => {
                res.json().then(data => {
                    console.log('Error', data);
                    //TODO implementar
                })
            });
    }

    function buildTodoItem(data) {
        const id = data.id || 0;
        const todo = data?.todo || '';
        return "" +
            "<li>" +
            "<div class='form-check'>" +
            "<label class='form-check-label' for='todo-item-" + id + "'>" +
            "<input class='checkbox' type='checkbox' id='todo-item-" + id + "'/>" + todo + "<i class='input-helper'></i>" +
            "</label>" +
            "</div>" +
            "<i class='remove mdi mdi-close-circle-outline'></i>" +
            "</li>";
    }

    $(function () {

        var todoListItem = $('.todo-list');
        var todoListInput = $('.todo-list-input');

        listTodos(todoListItem);


        $('.todo-list-add-btn').on("click", function (event) {
            event.preventDefault();

            var item = $(this).prevAll('.todo-list-input').val();

            if (item) {
                createTodoItem(item, todoListItem, buildTodoItem, todoListInput);
            }
        });

        todoListItem.on('change', '.checkbox', function () {
            if ($(this).attr('checked')) {
                $(this).removeAttr('checked');
            } else {
                $(this).attr('checked', 'checked');
            }

            $(this).closest("li").toggleClass('completed');

        });

        todoListItem.on('click', '.remove', function () {
            $(this).parent().remove();
        });

    });
})(jQuery);