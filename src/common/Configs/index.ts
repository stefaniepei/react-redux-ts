import configs from '../../../configs'
export enum LOCALE { zh_CN, en_US }

const appId = 2001

// open api host
const host = {
  'production': 'https://prod.com/v1',
  'qa': 'http://qa.com/v1',
  'development': 'http://dev.com/v1',
}

// sso api host
const ssoHost = {
  'production': 'https://prod.com/v1',
  'qa': 'http://qa.com/v1',
  'development': 'http://dev.com/v1',
}

// backend api host
const tokenHost = {
  'production': 'https://prod.com/v1',
  'qa': 'http://qa.com/v1',
  'development': 'http://dev.com/v1',
}

// upload api host
const uploadHost = {
  'production': 'https://prod.com/v1',
  'qa': 'http://qa.com/v1',
  'development': 'http://dev.com/v1',
}

class Configs {
  private static _env: string = configs.env // 运行环境
  private static _locale: string = LOCALE[LOCALE.zh_CN] // 语言
  private static _server: { [key: string]: any } = host[configs.env] // API服务
  private static _ssoServer: { [key: string]: any } = ssoHost[configs.env] // 单点登录服务
  private static _tokenServer: { [key: string]: any } = tokenHost[configs.env] // 获取sign
  private static _uploadServer: { [key: string]: any } = uploadHost[configs.env] // 获取sign

  public static get DEFAULT(): { [key: string]: any } {
    return {
      APPID: appId,
      ENV: this._env,
      LOCALE: this._locale,
      SERVER: this._server,
      SSO_SERVER: this._ssoServer,
      TOKEN_SERVER: this._tokenServer,
      UPLOAD_SERVER: this._uploadServer,
    }
  }
}

export default Configs
