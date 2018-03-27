<?php

namespace app\index\controller;
use app\common\controller\Frontend;
use think\Db;

class Money extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    public function _initialize()
    {
        parent::_initialize();
    }
    //系列课程列表页
    public function index()
    {   
        $page=1;
        $total=5;
        $list='';
        $count=0;
        if($this->request->isGet()){
            $id=$this->request->get('id');
        }
        if($this->request->isAjax()){
            $id=$this->request->post('type');
            $page=$this->request->post('page');      
        }
        $all=($page-1)*$total;  
        $list=Db::name('clabelong a')
                  ->field('a.id,a.name,a.fronimage,b.name teach,b.id t_id')
                  ->join('tech b','a.u_id=b.id')
                  ->limit($all,$total)
                  ->where('a.type',$id)
                  ->where('a.del_time',0)
                  ->order('a.create_time')
                  ->select();
         // dump($list);return;
        if($list){
            $count=count($list,COUNT_NORMAL);
            $num='';
            foreach ($list as $k => $v) {
                $num=Db::name('classes')
                    ->where('belongs',$v['id'])
                    ->where('del_time',0)
                    ->where('check',1)
                    ->select();
                if($num){
                    $list[$k]['num']=count($num,COUNT_NORMAL);
                    $hits=0;
                    $old=0;
                    $now=0;
                    foreach ($num as $ke => $va) {
                        $hits+=$va['learntimes'];
                        $old+=$va['o_price'];
                        $now+=$va['n_price'];
                    }
                    $list[$k]['hits']=$hits;
                    $list[$k]['old']=$old;
                    $list[$k]['now']=$now;
                }
                else{
                    $list[$k]['num']=0;
                    $list[$k]['hits']=0;
                    $list[$k]['old']=0;
                    $list[$k]['now']=0;
                }
            }
        }
        if($this->request->isAjax()){
            return $list;exit();
        }
        // dump($count);return;
        $name=Db::name('types')->field('name,id')->where('del_time',0)->where('id',$id)->find();//系列名称
        // dump($name);return;
        return $this->view->fetch('',['list'=>$list,'name'=>$name,'count'=>$count]);
    }
    // 系列课程详情页
    public function details()
    {
        $page=1;
        $total=5;
        $list='';
        $d_id='';
        $count=0;
        if($this->request->isGet()){
            $id=$this->request->get('id');
            if($this->request->get('d_id')){
                $d_id = $this->request->get('d_id');
            }
            // dump($id);return;
        }
        if($this->request->isAjax()){
            $id=$this->request->post('type');
            $page=$this->request->post('page');
            // dump($id);return;
        }
        $all=($page-1)*$total;
         $list=Db::name('clabelong a')
                  ->field('a.*,b.name teach,b.avatar,b.id t_id')
                  ->join('tech b','a.u_id=b.id')
                  ->where('a.del_time',0)
                  ->where('a.id',$id)
                  ->find();
//         dump($list);return;
        if($list){
            $list['num']=0;
            $list['collect']=Db::name('collect')
                            ->where('del_time',0)
                            ->where('c_id',$list['id'])
                            ->where('type',0)
                            ->count();
            $c_num=0;
            $c_num=Db::name('comn')
                ->where('text_id',$list['id'])
                ->where('del_time',0)
                ->where('check',0)
                ->where('com_type',0)
                ->count();
            $num='';//课程数目
            $num=Db::name('classes')
                ->where('belongs',$list['id'])
                ->where('del_time',0)
                ->where('check',1)
                ->limit($all,$total)
                ->order('creat_time desc')
                ->select();
            $conut=count($num,COUNT_NORMAL);
            $collect='';
            $collect=Db::name('comn')
                ->where('set_id',$list['id'])
                ->where('del_time',0)
                ->where('check',0)
                ->where('com_type',0)
                ->limit($all,$total)
                ->order('create_time desc')
                ->select();
            if($collect){
                $count=count($collect,COUNT_NORMAL);
                foreach ($collect as $k => $v) {
                    $time=explode(' ',$v['create_time'])[1];
                    $tim=explode('-',explode(' ',$v['create_time'])[0]);
                    $collect[$k]['create_time']=$tim[1].'-'.$tim[2].' '.$time;
                    if($v['type']==0){
                        $collect[$k]['name']=Db::name('stu')->field('avatar,id,name')->where('id',$v['u_id'])->find();
                    }
                    else{
                        $collect[$k]['name']=Db::name('tech')->field('avatar,id,name')->where('id',$v['u_id'])->find();
                    }
                }
            }
            if($this->request->isAjax()){
                if($this->request->post('kind')==0){
                    return $num;exit();
                }
                return $collect;exit();
            }
            // dump($num);return;
            if($num){
                $list['num']=count(Db::name('classes')
                ->where('belongs',$list['id'])
                ->where('del_time',0)
                ->where('check',1)
                ->order('creat_time desc')
                ->select(),COUNT_NORMAL);
                $hits=0;//学习人数
                $old=0;//原价
                $now=0;//现价
                foreach ($num as $ke => $va) {
                    $time=explode('-',explode(' ',$va['creat_time'])[0]);
                    $num[$ke]['creat_time']=$time[1].'月'.$time[2].'日';
                    $hits+=$va['learntimes'];
                    $old+=$va['o_price'];
                    $now+=$va['n_price'];
                }
                $list['hits']=$hits;
                $list['old']=$old;
                $list['now']=$now;
            }
            else{
                $list['num']=0;
                $list['hits']=0;
                $list['old']=0;
                $list['now']=0;
            }
        }
        $n_num = '';
        if($d_id&&$id)
        {
            $n_num=Db::name('classes')
                ->where(['belongs'=>$id,'del_time'=>0,'check'=>1,'id'=>$d_id])
                ->select();
        }
//        dump($num);return;
//        $d_id = isset($d_id)?$d_id:$id;
        return $this->view->fetch('',['n_num'=>$n_num,'id'=>$id,'list'=>$list,'num'=>$num,'collect'=>$collect,'cnum'=>$c_num,'count'=>$conut,'coun'=>$count]);
    }
    // 课程播放页面
    public function play(){
        return $this->details();
    }
    public function news()
    {
        $newslist = [];
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.fastadmin.net?ref=news']);
    }

}
