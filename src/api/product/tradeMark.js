// 获取品牌管理数据的模块
import request from '@/utils/request';

// 获取品牌列表接口
export const reqTradeMarkList = (page,limit) => request({url:`admin/product/baseTrademark/${page}/${limit}`,method: 'get'});

// 处理添加品牌和修改品牌的接口
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    // 判断是否有id,有的话是修改请求,否则是添加请求
    if(tradeMark.id) {
        return request({url:'admin/product/baseTrademark/update',method:'put',data:tradeMark});
    } else {
        return request({url:'admin/product/baseTrademark/save',method:'post',data:tradeMark});
    }
} 

// 处理删除品牌的接口
export const reqDeleteTradeMark = (id) => request({url:`admin/product/baseTrademark/remove/${id}`,method: 'delete'});
