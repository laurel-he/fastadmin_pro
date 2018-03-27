define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'course/classes/index',
                    add_url: 'course/classes/add',
                    edit_url: 'course/classes/edit',
                    del_url: 'course/classes/del',
                    multi_url: 'course/classes/multi',
                    table: 'classes',
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
                        {field: 'u_id', title: __('U_id')},
                        {field: 'c_type', title: __('C_type'), visible:false, searchList: {"3":__('C_type 3')}},
                        {field: 'c_type_text', title: __('C_type'), operate:false},
                        {field: 'keywords', title: __('Keywords')},
                        {field: 'o_price', title: __('O_price')},
                        {field: 'n_price', title: __('N_price')},
                        {field: 'creat_time', title: __('Creat_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'post_time', title: __('Post_time')},
                        {field: 'baimage', title: __('Baimage'), formatter: Table.api.formatter.image},
                        {field: 're_type', title: __('Re_type'), visible:false, searchList: {"0":__('Re_type 0'),"1":__('Re_type 1'),"2":__('Re_type 2')}},
                        {field: 're_type_text', title: __('Re_type'), operate:false},
                        {field: 'souce_route', title: __('Souce_route')},
                        {field: 'check', title: __('Check'), visible:false, searchList: {"0":__('Check 0'),"1":__('Check 1'),"2":__('Check 2')}},
                        {field: 'check_text', title: __('Check'), operate:false},
                        {field: 'type', title: __('Type'), visible:false, searchList: {"3":__('Type 3')}},
                        {field: 'type_text', title: __('Type'), operate:false},
                        {field: 'del_time', title: __('Del_time')},
                        {field: 'board_id', title: __('Board_id')},
                        {field: 'learntimes', title: __('Learntimes')},
                        {field: 'belongs', title: __('Belongs')},
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