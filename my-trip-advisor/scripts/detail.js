var map;

$(function() {
    var id = parseId(window.location.search);

    getDetail(id);

    showMap();
});

// URL에서 상세보기 페이지 속성값 parsing
function parseId(str) {
    var s = str.substring(1);
    var args = s.split('&');

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var tokens = arg.split('=');

        if (tokens[0] === 'id') {
            return tokens[1];
        }
    }

    return null;
}

// 상세 정보 화면 출력
function getDetail(id) {
    var url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url, {
        id: id
    }, function (locationDetail) {
        // 여행지 정보 출력
        $('.detail-header-name').html(locationDetail.name);
        $('.detail-header-city-name').html(locationDetail.cityName);
        $('.detail-desc-text').html(locationDetail.desc);

        // 여행지 이미지 출력
        var $gallery = $('#detail-images');
        var images = locationDetail.subImageList;

        for (var i = 0; i < images.length; i++) {
            var $image = $('<img src="' + images[i] + '" />');
            $gallery.append($image);
        }

        // Galleria 라이브러리 사용
        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');

        showMarker(locationDetail.position.x, locationDetail.position.y);

        $('.btn-save').click(function() {
            var myTrips = Cookies.getJSON('MYTRIPS');

            // 존재하지 않을 경우 빈 배열로 초기화
            if (!myTrips) {
                myTrips = [];
            }
            // 여행지를 myTrips에 추가
            myTrips.push({
                id: id,
                name: locationDetail.name,
                cityName: locationDetail.cityName,
                x: locationDetail.x,
                y: locationDetail.y
            });

            Cookies.set('MYTRIPS', myTrips);

            alert('여행지가 등록되었습니다!')
        });
    });
}

// 지도 출력 함수
function showMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 33.3617,
            lng: 126.5292
        }
    });
}

// 지도 위에 Marker 표시
function showMarker(lat, lng) {
    var pos = {
        lat: lat,
        lng: lng
    };

    new google.maps.Marker({
        position: pos,
        map: map
    });

    map.panTo(pos);
}