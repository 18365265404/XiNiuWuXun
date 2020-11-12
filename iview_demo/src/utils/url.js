// 接口汇总
//服务器地址

// const server = 'http://192.168.1.98:8100/'; //测式地址
const server = 'http://47.100.237.163:8100/'; //正式地址



// 七牛
const qiniuH='http://img.xiniuwuxun.com/'//正式地址
// const qiniuH='http://test.huashenghl.com/'//测式地址


// 获取验证码
const userLoginGetVerificationCode='user/login/getVerificationCode/'
                              
// 注册
const userLoginRegister='user/login/register'
// 刷新token
const oauthTokenGetNewAccessToken='oauth/token/getNewAccessToken'



// 退出登录
const userLoginOutLogin='user/login/outLogin'

// 登录
const userLoginGoLogin='user/login/goLogin'

// 修改密码 忘记密码 重置密码
const userUserUpdatePasswordById='user/user/updatePasswordById'

// 修改用户信息
const userUserUpdateUserById='user/user/updateUserById'

//忘记密码 重置密码
const userUserUpdatePassword='user/user/updatePassword'

// 首页
// 查询分类侧导航列表 
const goodsClassifySelectClassifyList='goods/classify/selectClassifyList'

// 首页查询轮播图列表
const platformCarouselSelectCarouselList='platform/carousel/selectCarouselList'

// 首页查询四大分类各类别要展示的十个商品
const goodsGoodsSelectGoodsSixByClassifyOne='goods/goods/selectGoodsSixByClassifyOne'

// 友情链接
const platformLinksSelectLinksList='platform/links/selectLinksList'
// 备案信息
const platformRecordInformationGetRecordInformation='platform/recordInformation/getRecordInformation'


// 创建收货地址
const userReceivingAddressInsertReceivingAddress= 'user/receivingAddress/insertReceivingAddress'
// 查询收货地址
const userReceivingAddressSelectReceivingAddressList= 'user/receivingAddress/selectReceivingAddressList/'
// 修改收货地址
const userReceivingAddressUpdateReceivingAddressById= 'user/receivingAddress/updateReceivingAddressById'
// 删除收货地址
const userReceivingAddressDeleteReceivingAddressById= 'user/receivingAddress/deleteReceivingAddressById/'


// 发票收货地址
const userDeliveryAddressInsertDeliveryAddress= 'user/deliveryAddress/insertDeliveryAddress' //增

const userDeliveryAddressDeleteDeliveryAddressById= 'user/deliveryAddress/deleteDeliveryAddressById/' //删除
const userDeliveryAddressUpdateDeliveryAddressById= 'user/deliveryAddress/updateDeliveryAddressById' //改
const userDeliveryAddressSelectDeliveryAddressList= 'user/deliveryAddress/selectDeliveryAddressList/' //查


// 省市区三级联动
const basicProvinceSelectProvinceList= 'basic/province/selectProvinceList'//省
const basicCitySelectCityListByProvinceCode= 'basic/city/selectCityListByProvinceCode/'//市
const basicAreaSelectAreaListByCityCode= 'basic/area/selectAreaListByCityCode/'//区

// 发票的增删改查
const userInvoiceTitleInsertInvoiceTitle= 'user/invoiceTitle/insertInvoiceTitle' //增
const userInvoiceTitleDeleteInvoiceTitleById= 'user/invoiceTitle/deleteInvoiceTitleById/' //删除
const userInvoiceTitleUpdateInvoiceTitleById= 'user/invoiceTitle/updateInvoiceTitleById' //改
const userInvoiceTitleSelectInvoiceTitleList= 'user/invoiceTitle/selectInvoiceTitleList/' //查

// 分类导航点进去的页面内容
const goodsClassifySelectCriteriaMapByClassifyId= 'goods/classify/selectCriteriaMapByClassifyId/' //查

// 查询所有商品列表
const goodsgoodsSelectGoodsList= 'goods/goods/selectGoodsList' //查

// 查询商品详情
const goodsGoodsSelectGoodsDetailsByGoodsId= 'goods/goods/selectGoodsDetailsByGoodsId/' //查

// 查询订单号
const paySelectAlipayOrderById= 'pay/selectAlipayOrderById/' //查


// 订单信息
const orderConfirmOrderInsetConfirmOrder= 'order/pretreatmOrder/confirmOrder' //新增确认订单信息
const orderConfirmOrderGetConfirmOrderByUserId= 'order/pretreatmOrder/getConfirmOrderByUserId/' //获取确认订单信息

// 预下订单
const orderPretreatmOrderInsertPretreatOrder= 'order/pretreatmOrder/insertPretreatOrder' //新增确认订单信息
// 下订单
const orderOrderInsertOrder= 'order/order/insertOrder' //新增确认订单信息

// 查询订单列表
const orderOrderSelectOrderList= 'order/order/selectOrderList/' 

// 查询订单列表
const orderOrderUpdateByOrderId= 'order/order/updateByOrderId' 


// 调取支付宝
const payPay= 'pay/pay' //查

// 验证库存
const stockStockGetStockNum= 'stock/stock/getStockNum/'

// 购物车的增删改查
const goodsShoppingCartUpdateShoppingCart= 'goods/shoppingCart/updateShoppingCart' //增
const goodsShoppingCartDeleteShoppingCart= 'goods/shoppingCart/deleteShoppingCart/' //删除
const goodsShoppingCartSelectShoppingCartCount= 'goods/shoppingCart/selectShoppingCartCount/' //查询购物车的总数量
const goodsShoppingCartSelectShoppingCartList= 'goods/shoppingCart/selectShoppingCartList/' //查

// 灵感
const platformInspirationSelectInspirationList= 'platform/inspiration/selectInspirationList/' //查
const platformInspirationDetailsSelectInspirationDetailsList= 'platform/inspirationDetails/selectInspirationDetailsList/' //查


// 对公业务
const platformCorporateBankingGetCorporateBanking= 'platform/corporateBanking/getCorporateBanking/' //查

// 收藏
const goodsFavoritesInsertFavorites= 'goods/favorites/insertFavorites' //增
const goodsFavoritesDeleteFavoritesById= 'goods/favorites/deleteFavoritesById/' //删除
const goodsFavoritesSelectFavoritesListById= 'goods/favorites/selectFavoritesListById/' //查

export default{
    userLoginOutLogin,
    server,
    qiniuH,
    oauthTokenGetNewAccessToken,
    userLoginGetVerificationCode,
    userLoginRegister,
    userLoginGoLogin,
    userUserUpdateUserById,
    userUserUpdatePasswordById,
    userUserUpdateUserById,
    userUserUpdatePassword,
    goodsClassifySelectClassifyList,
    userReceivingAddressInsertReceivingAddress,
    userReceivingAddressSelectReceivingAddressList,
    userReceivingAddressUpdateReceivingAddressById,
    userReceivingAddressDeleteReceivingAddressById,
    basicProvinceSelectProvinceList,
    basicCitySelectCityListByProvinceCode,
    basicAreaSelectAreaListByCityCode,
    userDeliveryAddressInsertDeliveryAddress,
    userDeliveryAddressDeleteDeliveryAddressById,
    userDeliveryAddressUpdateDeliveryAddressById,
    userDeliveryAddressSelectDeliveryAddressList,
    userInvoiceTitleInsertInvoiceTitle,
    userInvoiceTitleDeleteInvoiceTitleById,
    userInvoiceTitleUpdateInvoiceTitleById,
    userInvoiceTitleSelectInvoiceTitleList,
    goodsClassifySelectCriteriaMapByClassifyId,
    goodsgoodsSelectGoodsList,
    goodsGoodsSelectGoodsDetailsByGoodsId,
    orderConfirmOrderInsetConfirmOrder,
    orderConfirmOrderGetConfirmOrderByUserId,
    payPay,
    platformCarouselSelectCarouselList,
    goodsGoodsSelectGoodsSixByClassifyOne,
    platformLinksSelectLinksList,
    platformRecordInformationGetRecordInformation,
    paySelectAlipayOrderById,
    orderPretreatmOrderInsertPretreatOrder,
    orderOrderInsertOrder,
    stockStockGetStockNum,
    orderOrderSelectOrderList,
    goodsShoppingCartUpdateShoppingCart,
    goodsShoppingCartDeleteShoppingCart,
    goodsShoppingCartSelectShoppingCartCount,
    goodsShoppingCartSelectShoppingCartList,
    platformInspirationSelectInspirationList,
    platformInspirationDetailsSelectInspirationDetailsList,
    platformCorporateBankingGetCorporateBanking,
    orderOrderUpdateByOrderId,
    goodsFavoritesInsertFavorites,
    goodsFavoritesDeleteFavoritesById,
    goodsFavoritesSelectFavoritesListById
}