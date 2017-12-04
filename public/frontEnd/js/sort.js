$(function() {
  var getFirstData = function(){
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      data: {},
      success:function(data) {
        // console.log(data)

        var firstResult = template('firstTemplate',data)
        $('.lt-sort-left ul').html(firstResult)
        
      }
    })
  }
  // 调用！！！
  getFirstData()


  var getSecondData = function(id) {
    $.ajax({
      type: 'get',
      url: ' /category/querySecondCategory',
      data: {
        id: id
      },
      success:function (data) {
        // console.log(data)
        var secondResult = template('secondTemplate', data)
        $('.brandList').html(secondResult)
      }
    })
  }

  // getSecondData()


  $('.lt-sort-left ul').on('tap', 'a', function(){
    $('.lt-sort-left').find('a').removeClass('active')
    $(this).addClass('active')
    // console.log(1)
    var id = $(this).attr('data-id')
    // console.log(id)
    getSecondData(id)

  })

})