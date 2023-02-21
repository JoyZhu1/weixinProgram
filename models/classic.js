import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(res)=>{
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  getClassic(index,NextorPrevious,sCallback){
    let key=NextorPrevious=='next'?this._getkey(index+1):this._getkey(index-1)
    let classic=wx.getStorageSync(key)
    if(!classic){
      this.request({
        url:'classic/'+index+'/'+NextorPrevious,
        success:(res)=>{
          wx.setStorageSync(this._getkey(res.index),res) 
          sCallback(res)
        }
      })
    }
    else{
      sCallback(classic)
    }
  }

  isFirst(index){
    return index===1?true:false
  }

  isLatest(index){
    let latestIndex=this._getLatestIndex
    return latestIndex===index?true:false
  }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex(){
    let index=wx.setStorageSync('latest')
    return index
  }

  _getkey(index){
    let key='classic-'+index
    return key
  }
}

export { ClassicModel }