define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'course/clabelong/index',
                    add_url: 'course/clabelong/add',
                    edit_url: 'course/clabelong/edit',
                    del_url: 'course/clabelong/del',
                    multi_url: 'course/clabelong/multi',
                    table: 'clabelong',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name')},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'u_id', title: __('U_id')},
                        {field: 'del_time', title: __('Del_time')},
                        {field: 'fronimage', title: __('Fronimage'), formatter: Table.api.formatter.image},
                        {field: 'suit', title: __('Suit')},
                        {field: 'board_id', title: __('Board_id')},
                        {field: 'type', title: __('Type')},
                        {field: 'free', title: __('Free'), visible:false, searchList: {"3":__('Free 3')}},
                        {field: 'free_text', title: __('Free'), operate:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});