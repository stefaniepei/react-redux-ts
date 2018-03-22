import axios from '../axios'
import Configs from '../../common/Configs'
import { NEW_API_SUCESS, API_SUCESS } from '../../utils/constant'
import Storage from '../../utils/storage'

/**
 * 获取API访问令牌sign
 * @api 于士博
 * @裴俊柯
 */
export async function getOpenApiBySign(url, params) {
  const userId = parseInt(Storage.getItem('userId')) || 0
  const userToken = Storage.getItem('userToken') || ''
  params.appId = params.appId || Configs.DEFAULT.APPID
  // mark
  // console.log(userId)
  // params.sign = '123123'
  // params.timestamp = 123123
  // return await axios.post(url, params, { headers: { 'Authorization': 'Bearer ' + userToken } })

  let signData = await axios.post('/sign/createSign',
    {
      userId: userId,
      requestData: JSON.stringify(params),
      apiType: 'token',// 把base_url指向backend的服务器
    }, { headers: { 'Authorization': 'Bearer ' + userToken } })

  if ((signData as any).code === NEW_API_SUCESS || (signData as any).code === API_SUCESS) {
    params.sign = signData.data.sign || 1
    params.timestamp = signData.data.timestamp || 1
    return await axios.post(url, params, { headers: { 'Authorization': 'Bearer ' + userToken } })
  }
}
