var api = require('../../utils/httpUtils.js')
Page({

  data: {
    bannerList: [],
    projectsTree: [],
    projectsIcons: [
      "../../imgs/author_pic1.jpg",
      "../../imgs/author_pic2.jpg",
      "../../imgs/author_pic3.jpg",
      "../../imgs/author_pic4.jpg",
      "../../imgs/author_pic5.jpg",
      "../../imgs/author_pic6.jpg",
      "../../imgs/author_pic7.jpg",
      "../../imgs/author_pic8.jpg",
    ],
    hotActicleList: [],
    wxAuthorList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000

  },
  onLoad: function() {
    this.getBanner();
    this.getSystem();
    this.getIndexArticle();
    this.getWxAuthorList();
  },
  // 获取banner数据
  getBanner: function(e) {
    api.get("/banner/json").then(res => {
      this.setData({
        bannerList: this.bannerList = res
      })
      console.log(this.bannerList)
    }).catch(e => {
      console.log(e.message)
    })
  },
  /// 获取项目数据
  getSystem: function(e) {
    api.get("/project/tree/json")
      .then(res => {
        this.setData({
          projectsTree: this.projectsTree = res.slice(0, 8),
        })
      }).catch(e => {
        console.log(e.message)
      })
  },
  /// 获取首页文章
  getIndexArticle: function(e) {
    api.get("/article/list/0/json")
      .then(res => {
        this.setData({
          hotActicleList: this.hotActicleList = res.datas
        })
      }).catch(e => {
        console.log(e.message)
      })
  },
  /// 获取公众号列表
  getWxAuthorList: function(e) {
    api.get("/wxarticle/chapters/json")
      .then(res => {
        this.setData({
          wxAuthorList: this.wxAuthorList = res,
        })
      }).catch(e => {
        console.log(e.message)
      })
  },

  toProjectsList: function(e) {
    console.log(e.currentTarget.dataset.proid)
    wx.navigateTo({
      url: '../projectsList/projectsList',
    })
  }
})