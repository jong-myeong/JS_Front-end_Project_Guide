$(function () {
    $(window).scroll(function () {
        var top = $(window).scrollTop();

        if (top > 0) {
            $('#header').addClass('inverted');
        } else {
            $('#header').removeClass('inverted');
        }
    })

    $(window).trigger('scroll');

    // 달력 - 가는날
    var dpFrom = $('#from').datepicker({
        dateFormat: 'yy-mm-dd',
        // minDate : 0은 오늘, 1은 내일, -1은 어제
        minDate: 0
    });
    dpFrom.datepicker('setDate', new Date());

    // 달력 - 오는날
    var dpTo = $('#to').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        // onSelect : 사용자가 특정 날짜를 선택했을 때 호출되는 이벤트 핸들러
        onSelect: function() {
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
        }
    });
    dpTo.datepicker('setDate', 4);

    // submit 이벤트 핸들러
    $('#form-search').submit(function(e) {
        e.preventDefault();

        var from = $('#from').val();
        var to = $('#to').val();

        search(from, to);
    });

});

// 날짜에 맞는 여행지 검색 함수
function search(from, to) {
    var url = 'https://javascript-basic.appspot.com/searchLocation';

    $.getJSON(url, {
        from: from,
        to: to
    }, function(travelList) {
        var $list = $('#list-panel');

        for (var i = 0; i < travelList.length; i++) {
            var data = travelList[i];
            var $item = createListItem(data);

            $list.append($item);
        }

        $('#list-bg').show();
    });
}

// 템플릿 생성 함수
// data : API에서 리턴된 배열의 각 항목
function createListItem(data) {
    var $tmpl = $('#list-item-template').clone().removeAttr('id');

    $tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
    $tmpl.find('.list-item-name').html(data.name);
    $tmpl.find('.list-item-city-name').html(data.cityName);

    // 여행지 상세 보기 이벤트 핸들러
    $tmpl.click(function(e) {
        var url = 'detail.html?id=' + data.id;
        window.location = url;
    });

    return $tmpl;
}