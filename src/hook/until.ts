//生成指定长度的唯一ID
export function GenNonDuplicateID(randomLength: number) {
  return Number(
    Math.random().toString().substr(3, randomLength) + Date.now()
  ).toString(36);
}
