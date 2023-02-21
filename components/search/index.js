import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
import { paginationBev } from '../behaviors/pagination'
const keywordmodel= new KeywordModel()
const bookmodel=new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    word:'',
    loading:false,
    loadingCenter:false
  },
  attached(){
    const historyWords=keywordmodel.getHistory()
    const hotWords=keywordmodel.getHot()
    this.setData({
      historyWords
    })
    hotWords.then(res=>{
      this.setData({
        hotWords:res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      if(!this.data.word){
        return
      }
      if(this.data.loading){
        return
      }
      if(this.hasMore()){
        this.setData({
          loading:true
        })
        bookmodel.search(this.getCurrentStart(),this.data.word).then(res=>{
          this.setMoreData(res.books)
          this.setData({
            loading:false
          })
        },()=>{
          this.setData({
            loading:false
          })
        })
      }
    },
    onCancel(){
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(event){
      this.setData({
        searching:true,
        loadingCenter:true
      })
      const word=event.detail.value||event.detail.text
      bookmodel.search(0,word).then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          word:word
        })
        keywordmodel.addToHistory(word)
        this.setData({
          loadingCenter:false
        })
      })
    },
    onDel(){
      this.initialize()
      this.setData({
        searching:false,
        word:''
      })
    }
  }
})
