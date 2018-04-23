/**
 * Created by Sundongdong on 18/4/23.
 */

//获取区间内的随机值
export const getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);

//随机生成0-30的正负值角度
export const get30DegRandom = () => Math.floor(Math.random() * 60 - 30)