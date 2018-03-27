define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'tech/index',
                    add_url: 'tech/add',
                    edit_url: 'tech/edit',
                    del_url: 'tech/del',
                    multi_url: 'tech/multi',
                    table: 'tech',
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
                        {field: 'avatar', title: __('Avatar')},
                        {field: 'ID_num', title: __('Id_num')},
                        {field: 'see_num', title: __('See_num')},
                        {field: 'type', title: __('Type'), visible:false, searchList: {"0":__('Type 0'),"1":__('Type 1')}},
                        {field: 'type_text', title: __('Type'), operate:false},
                        {field: 'mark', title: __('Mark')},
                        {field: 'creat_time', title: __('Creat_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'del_time', title: __('Del_time')},
                        {field: 'status', title: __('Status'), visible:false, searchList: {"0":__('Status 0'),"1":__('Status 1')}},
                        {field: 'status_text', title: __('Status'), operate:false},
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