// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number,
      observer:function(newVal,oldVal,changedPath) {
        let val=newVal<10?'0'+newVal:newVal
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '壹月','贰月','叁月','肆月','伍月','陸月','柒月','捌月','玖月','拾月','冬月','腊月',
    ],
    year:0,
    month:'',
    _index:''
  },
  attached:function () {
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()
    this.setData({
      month:this.data.months[month],
      year:year
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
