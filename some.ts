function solution1(array) {
  const stringArr = array.map(item => item.toString()).join('');
  var answer = 0;
  for (let i = 0; i < stringArr.length; i++) {
    if (stringArr[i] == '7') answer++;
  }
  return answer;
  // array를 그냥 join하면 문자열로 다붙음. split 하면 7기준으로  7빼고 배열로 쪼개짐 그러면 그 배열의개수에서-1하면된다!
  return array.join('').split('7').length - 1;
}

function solution2(my_str, n) {
  var answer = [];
  for (let i = 0; i < my_str.length; i += n) {
    answer.push(my_str.slice(i, i + n));
  }
  return answer;
  return my_str.match(new RegExp(`.{1,${n}}`, 'g'));
  //`.{1, ${n}}`, "g"
  // . : 모든 문자열 탐색,
  // {a, b}: a개 이상 b개 이하씩 탐색(a개 이상인 이유는 마지막에 n개보다 작게 나오는 경우 커버 위함
  // "g": 전역 탐색
}
function solution3(array, n) {
  return array.filter(item => item == n).length;
}

function solution4(array, height) {
  const sorted = array.sort((a, b) => b - a);
  var answer = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] <= height) {
      answer = i;
      break;
    }
    if (i == array.length - 1) answer = array.length;
  }
  return answer;
}
// sort할 필요없이 그냥 큰게 있으면 숫자 더하기!!
function solution44(array, height) {
  let count = 0;

  for (const a of array) {
    if (a > height) count += 1;
  }

  return count;
}
solution4([189, 189], 180);

//-------------
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(el => el.split(' ').map(Number));

function solution(input) {
  const [a, b, c] = input;
  const answerValue = (a * b * c).toString().split('');
  const answerArr = new Array(10).fill(0);
  for (let i = 0; i < answerValue.length; i++) {
    answerArr[answerValue[i].charCodeAt(0) - 48]++;
    // answerArr[Number(answerValue[i])]++;
  }
  for (let j = 0; j < 10; j++) {
    console.log(answerArr[j]);
  }
}

solution(input);
solution([150, 266, 427]);
