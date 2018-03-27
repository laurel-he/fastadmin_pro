<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Db;
class Index extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        $page=1;
        $total=4;
        $all=($page-1)*$total;
        $list='';//板块
        $list=Db::name('board')->field('id,name')->where('del_time',0)->order('orde')->select();
        if($this->request->isAjax()){
            $post=$this->request->post();
            $page=$post['page'];
            $all=($page-1)*$total;
        }
        // dump($list);return;
        if($list){
            foreach ($list as $k => $v) {
                $list[$k]['list']=Db::name('clabelong a')
                                  ->field('a.*,b.name teach,b.avatar,b.id t_id')
                                  ->join('tech b','a.u_id=b.id')
                                  ->join('bclabe c','a.id=c.clabe')
                                  ->where('a.del_time',0)
                                  ->where('c.board',$v['id'])
                                  ->order('a.create_time desc')
                                  ->limit($all,$total)
                                  ->select();
                // dump($list);return;
                if($list[$k]['list']){
                    $num='';
                    foreach ($list[$k]['list'] as $ke => $va) {
                        $num=Db::name('classes')
                            ->where('belongs',$va['id'])
                            ->where('del_time',0)
                            ->where('check',1)
                            ->select();
                        $hits=0;
                        $old=0;
                        $now=0;
                        if($num){
                            $list[$k]['list'][$ke]['num']=count($num,COUNT_NORMAL);
                            foreach ($num as $key => $val) {
                                $hits+=$val['learntimes'];
                                $old+=$val['o_price'];
                                $now+=$val['n_price'];
                            }                           
                        }
                        $list[$k]['list'][$ke]['num']=0;
                        $list[$k]['list'][$ke]['hits']=$hits;
                        $list[$k]['list'][$ke]['old']=$old;
                        $list[$k]['list'][$ke]['now']=$now;
                    }
                }
            }
        }
        if($this->request->isAjax()){
            if($post['type']==0){
                return $list[0]['list'];exit();
            }
            return $list[1]['list'];exit();
        }
        //获取轮播图
        $imgs = Db::name('img')->where('type',0)->order('create_time desc')->limit(1)->find();
        if($imgs)
        {
            if($imgs['fimages'])
            {
                $fimg = explode(',',$imgs['fimages']);
            }
        }
        //获取分类
        $types = Db::name('types')->where('del_time',0)->limit(10)->select();
        // dump($list);return;
        return $this->view->fetch('',['fimg'=>$fimg,'types'=>$types,'hot'=>$list[0],'free'=>$list[1]]);
    }

    public function news()
    {
        $newslist = [];
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.fastadmin.net?ref=news']);
    }
    public function search()
    {
        return $this->view->fetch();
    }

}
