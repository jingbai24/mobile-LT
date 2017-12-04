// 1 进入页面 获取搜索历史。若无历史记录 显示文字提示；若有历史记录 显示历史记录
// 2 输入搜索词 点击搜索按钮 把搜索词加入历史记录
// 3 点击删除按钮 对历史记录进行删除
// 4 显示所有的历史记录

// localStorage 本地存储（实际为客户端存储）
// 

$(function () {
  //  setHistoryData(nike)
  showHistoryData()

  // 2 输入搜索词 点击搜索按钮 把搜索词加入历史记录
  var searchInput = $('.search-box input')
  $('#search-btn').on('tap', function () {
    var keyWord = searchInput.val()
    setHistoryData(keyWord)
    location.href = './searchList.html?proName=' + keyWord
    showHistoryData()
  })

  // 3 点击删除按钮 对历史记录进行删除
  $('#clear-history').on('tap', function () {
    localStorage.removeItem('ltHistory')
  })

  // 4 点击删除按钮 删除一条数据
  $('.search-history-list').on('tap', 'i', function () {
    var deleteData = $(this).siblings('span').html() 
      removeHistoryData(deleteData)
      showHistoryData()  
  })

  // 5 点击历史列表中的字 把这个字放到地址栏中跳转进行搜索
  $('.search-history-list').on('tap', 'span', function () {
    var keyWord = $(this).html()
    location.href = './searchList.html?proName=' + keyWord
  })
})



// 获取历史记录
var getHistoryData = function () {
  return JSON.parse(window.localStorage.getItem('ltHistory') || '[]')
}
// console.log(getHistoryData())

// 
// 设置搜索记录 key = value
var setHistoryData = function (value) {
  // 获取历史记录
  var list = getHistoryData()
  // 去重
  $.each(list, function (i, item) {
    if (value == item) {
      list.splice(i, 1)
    }
  })

  list.push(value)
  localStorage.setItem('ltHistory', JSON.stringify(list))
}


// 删除数据 
var removeHistoryData = function (value) {
  // 先获取到历史记录
  var list = getHistoryData()
  // 找到历史记录中某条相同的数据 删掉
  $.each(list, function(i, item) {
    if(value == item) {
      list.splice(i, 1)
    }
  })

  // 把切掉的数据放回到历史记录中
  window.localStorage.setItem('ltHistory', JSON.stringify(list))
}

// 显示历史记录
var showHistoryData = function () {
  var list = getHistoryData()
  if (list.length == 0) {
    $('.empty-history').show()
    $('.search-history').hide()
  } else {
    // 展示历史记录
    var historyList = template('historyTemplate', { list: list })

    $('.search-history-list').html(historyList)
    $('.search-history').show()
    $('.empty-history').hide()

  }
}