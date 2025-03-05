const isObject = val => val !==null && typeof val === 'object'; //判断是对象
const proxyMap = new WeakMap();  //储存代理对象 同时防止重复创建导致的内存泄漏 保证引用的一致性
export function reactive(target){
    //如果不是对象 直接将其返回
    if(!isObject(target)){
        return target;
    }
    if(proxyMap.has(target)){  //如果存在已有代理，直接返回   ----同时 循环引用检测
        return proxyMap.get(target);
    }   
    //标记当前对象正在被处理
    proxyMap.set(target,null)
    const handler = {
        get(target,key,receiver){
            console.log(`获取的${key}属性值`) 
            let result = Reflect.get(target,key,receiver)
            //如果key属性是引用类型，则递归 返回的是一个代理对象 进一步再访问属性
            if(isObject(result)){
                return reactive(result)
            }
            return result
        },
        set(target,key,value,receiver){
            console.log(`进行设置的${key}属性值`)
            //获取旧值
            const oldValue = Reflect.get(target,key,receiver)
            let result = true //set函数需要返回布尔值
            if(oldValue !==value){
                //更新操作
            }
            return result
        }
    }
    const proxy = new Proxy(target,handler)
    proxyMap.set(target,proxy)  //调用过的缓存一下代理对象  更新为真实代理
    return proxy
}

