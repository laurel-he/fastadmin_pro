<?php

namespace app\admin\model;

use think\Model;

class Clabelong extends Model
{
    // 表名
    protected $name = 'clabelong';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'del_time_text',
        'free_text'
    ];
    

    
    public function getFreeList()
    {
        return ['3' => __('Free 3')];
    }     


    public function getDelTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['del_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getFreeTextAttr($value, $data)
    {        
        $value = $value ? $value : $data['free'];
        $list = $this->getFreeList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected function setDelTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }


}
