import {HTTP} from '../util/http-p.js'

class BookModel extends HTTP{
  getHotList(){
    return this.request({
      url:'book/hot_list',
      data:{

      },
      method:'GET'
    })
  }

  search(start,q){
    return this.request({
      url:'book/search?summary=1',
      data:{
        q:q,
        start:start
      }
    })
  }

  getMyBookCount(){
    return this.request({
      url:'book/favor/count'
    })
  }

  getMyFavor(){
    return this.request({
      url:'classic/favor'
    })
  }

  getDetail(bid){
    return this.request({
      url:`book/${bid}/detail`
    })
  }

  getLikeStatus(bid){
    return this.request({
      url:`book/${bid}/favor`
    })
  }

  getComments(bid){
    return this.request({
      url:`book/${bid}/short_comment`
    })
  }

  postComment(bid,comment){
    return this.request({
      url:'book/add/short_comment',
      method:'post',
      data:{
        book_id:bid,
        content:comment
      }
    })
  }
}

export { BookModel }