const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const renewObject=(obj1,obj2)=>{
  let keys1 = (Object.keys(obj1));
  for(let key in obj2){
    let index = keys1.indexOf(key);
    (index>-1)&&(obj1[keys1[index]] = obj2[keys1[index]])
  }
  return obj1;
}
module.exports = {
  formatTime: formatTime,
  renewObject
}
