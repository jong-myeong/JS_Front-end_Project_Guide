var lottoNumList = [];

for (i = 1; i <= 45; i++) {
    lottoNumList.push(i);
}

var result = [];

for (i = 0; i < 6; i++) {
    var index = Math.floor(Math.random() * lottoNumList.length);

    // 랜덤으로 선택된 인덱스의 값
    var num = lottoNumList[index];

    // 배열에서 인덱스의 값 제거
    lottoNumList.splice(num, 1);

    result.push(num);
}

result.sort(function (a, b) {
    return a - b;
});

for (var i = 0; i < result.length; i++) {
    document.write('<span class="ball">' + result[i] + '</span>');
}