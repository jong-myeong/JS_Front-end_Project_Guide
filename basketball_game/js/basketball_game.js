var comScore = 0;                   // computer 점수
var userScore = 0;                  // user 점수
var isComputerTurn = true;          // 슛 차례 초기화
var shotsLeft = 15;                 // 슛 남은 횟수 초기화

function computerShoot() {
    // computer 차례가 아니면 함수 실행 안 함
    if (!isComputerTurn) {
        return;
    }

    var textElem = document.getElementById('text');
    var comScoreElem = document.getElementById('computer-score');
    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (shootType === 2) {
        if (Math.random() < 0.5) {
            textElem.innerHTML = '컴퓨터가 2점슛을 성공시켰습니다!';
            comScore += 2;
            comScoreElem.innerHTML = comScore;
        } else {
            textElem.innerHTML = '컴퓨터가 2점슛을 실패했습니다.'
        }
    } else {
        if (Math.random() < 0.33) {
            textElem.innerHTML = '컴퓨터가 3점슛을 성공시켰습니다!'
            comScore += 3;
            comScoreElem.innerHTML = comScore;
        } else {
            textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.'
        }
    }

    // computer가 슛을 한 뒤 컴퓨터 차례 false 처리
    isComputerTurn = false;

    // computer가 슛을 한 뒤 버튼 비활성화
    var computerButtons = document.getElementsByClassName('btn-computer');
    for (var i = 0; i < computerButtons.length; i++) {
        computerButtons[i].disabled = true;
    }

    // computer가 슛을 한 뒤 user 버튼 활성화
    var userButtons = document.getElementsByClassName('btn-user');
    for (var i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = false;
    }

    // 슛 남은 횟수 감소
    shotsLeft--;

    // 남은 횟수 화면 표시
    var shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = shotsLeft;

    // 승부 판정
    if (shotsLeft === 0) {
        if (userScore > comScore) {
            textElem.innerHTML = '승리했습니다!';
        } else if (userScore < comScore) {
            textElem.innerHTML = '아쉽게도 졌습니다...';
        } else {
            textElem.innerHTML = '비겼습니다';
        }

        for (var i = 0; i < computerButtons.length; i++) {
            computerButtons[i].disabled = true;
        }

        for (var i = 0; i < userButtons.length; i++) {
            userButtons[i].disabled = true;
        }
    }
}

function userShoot(shootType) {
    // user 차례가 아니면 함수 실행 안 함
    if (isComputerTurn) {
        return;
    }

    var textElem = document.getElementById('text');
    var userScoreElem = document.getElementById('user-score');

    if (shootType === 2) {
        if (Math.random() < 0.5) {
            textElem.innerHTML = '2점슛이 성공했습니다!!';
            userScore += 2;
            userScoreElem.innerHTML = userScore;
        } else {
            textElem.innerHTML = '2점슛이 실패했습니다.'
        }
    } else {
        if (Math.random() < 0.33) {
            textElem.innerHTML = '3점슛이 성공했습니다!'
            userScore += 3;
            userScoreElem.innerHTML = userScore;
        } else {
            textElem.innerHTML = '3점슛이 실패했습니다.'
        }
    }

    // user가 슛을 한 뒤 컴퓨터 차례 true 처리
    isComputerTurn = true;

    // user가 슛을 한 뒤 computer 버튼 활성화
    var computerButtons = document.getElementsByClassName('btn-computer');
    for (var i = 0; i < computerButtons.length; i++) {
        computerButtons[i].disabled = false;
    }

    // user가 슛을 한 뒤 버튼 비활성화
    var userButtons = document.getElementsByClassName('btn-user');
    for (var i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = true;
    }
}