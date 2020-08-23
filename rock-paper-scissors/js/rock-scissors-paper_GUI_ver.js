var SCISSORS = '가위',
    ROCK = '바위',
    PAPER = '보';

// 버튼 클릭 핸들러
function btnClick(userInput) {
    var computerInput;
    var randomValue = Math.random();

    // random 값으로 컴퓨터의 가위, 바위, 보 결정
    if (randomValue < 0.33) {
        computerInput = SCISSORS;
    } else if (randomValue >= 0.33 && randomValue < 0.66) {
        computerInput = ROCK;
    } else {
        computerInput = PAPER;
    }

    // 가위, 바뷔, 보 결과
    var result = '컴퓨터: ' + computerInput;

    switch(userInput) {
        case SCISSORS:
            switch(computerInput) {
                case SCISSORS:
                    result += ' - 컴퓨터와 비겼습니다.';
                    break;
                case ROCK:
                    result += ' - 컴퓨터에게 졌습니다...';
                    break;
                default:
                    result += ' - 컴퓨터를 이겼습니다!';
                    break;
            }
            break;

        case ROCK:
            switch(computerInput) {
                case SCISSORS:
                    result += ' - 컴퓨터를 이겼습니다!';
                    break;
                case ROCK:
                    result += ' - 컴퓨터와 비겼습니다.';
                    break;
                default:
                    result += ' - 컴퓨터에게 졌습니다...';
                    break;
            }
            break;
            
        default:
            switch(computerInput) {
                case SCISSORS:
                    result += ' - 컴퓨터에게 졌습니다...';
                    break;
                case ROCK:
                    result += ' - 컴퓨터를 이겼습니다!';
                    break;
                default:
                    result += ' - 컴퓨터와 비겼습니다.';
                    break;
            }
            break;
    }
    alert(result);       
}
