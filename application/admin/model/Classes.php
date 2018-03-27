<?php

namespace app\admin\model;

use think\Model;

class Classes extends Model
{
    // 表名
    protected $name = 'classes';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'c_type_text',
        'post_time_text',
        're_type_text',
        'check_text',
        'type_text',
        'del_time_text'
    ];
    

    
    public function getCTypeList()
    {
        return ['3' => __('C_type 3')];
    }     

    public function getReTypeList()
    {
        return ['0' => __('Re_type 0'),'1' => __('Re_type 1'),'2' => __('Re_type 2')];
    }     

    public function getCheckList()
    {
        return ['0' => __('Check 0'),'1' => __('Check 1'),'2' => __('Check 2')];
    }     

    public function getTypeList()
    {
        return ['3' => __('Type 3')];
    }     


    public function getCTypeTextAttr($value, $data)
    {        
        $value = $value ? $value : $data['c_type'];
        $list = $this->getCTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPostTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['post_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getReTypeTextAttr($value, $data)
    {        
        $value = $value ? $value : $data['re_type'];
        $list = $this->getReTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getCheckTextAttr($value, $data)
    {        
        $value = $value ? $value : $data['check'];
        $list = $this->getCheckList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getTypeTextAttr($value, $data)
    {        
        $value = $value ? $value : $data['type'];
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getDelTimeTextAttr($value, $data)
    {
        $value = $value ? $value : $data['del_time'];
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setPostTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

    protected function setDelTimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }


}
