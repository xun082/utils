// 将减数和被减数扩大n倍，然后相见，最后结果在缩小n倍。
// 这里扩大缩小不能直接使用乘法和除法(依然有精度丢失问题)
function accuracy(left, right, operate = "-") {
  // 转为字符串
  let leftStr = left.toString();
  let rightStr = right.toString();

  // 字符串分割,转为数组
  let leftArray = leftStr.split(".");
  let rightArray = rightStr.split(".");

  // 小数点的长度
  let leftLength = leftArray[1] ? leftArray[1].length : 0;
  let rightLength = rightArray[1] ? rightArray[1].length : 0;

  // 获取最后的小数位数
  let maxLength = Math.max(leftLength, rightLength);

  // 小数点位数取最大
  leftStr = parseFloat(leftStr).toFixed(maxLength);
  rightStr = parseFloat(rightStr).toFixed(maxLength);

  leftStr = leftStr.split(".").join("");
  rightStr = rightStr.split(".").join("");

  // 加减法操作
  let result =
    operate === "-"
      ? parseFloat(leftStr) - parseFloat(rightStr)
      : parseFloat(leftStr) + parseFloat(rightStr);

  // 从尾巴往前 maxLength 位置就是小数点插入位置
  // 转为字符串,然后转为数组,然后再翻转....骚
  result = result.toString().split("").reverse();
  result.splice(maxLength, 0, ".");
  // 翻转并转为字符串
  result = result.reverse().join("");

  result = result.replace(/^([-]?\.)/g, function (left, right) {
    // 这个 a 是正则匹配的结果
    // 这个 b 是正则第一个模式匹配的结果（第一个括号）
    let array = right.split("");
    if (array.length === 1) {
      return "0" + right;
    } else if (array.length === 2) {
      return array[0] + "0" + array[1];
    }
  });
  return Number(result);
}
console.log(accuracy(2.23, 2)); // 0.23
console.log(2.23 - 2); // 0.2299999999

console.log(accuracy(0.1, 0.2, "-"));
console.log(0.1 - 0.2);

console.log(accuracy(0.1, 0.2, "+"));
console.log(0.1 + 0.2);
