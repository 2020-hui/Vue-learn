function myBind(context,...args){
    //context = context || globalThis;
    const fn = this;
    return function(...arges){
        return fn.apply(context,[...args,...arges])
    }
}

function myApply(context,arges){
    context = context || globalThis;
    context.fn = this;
    let result = context.fn(...arges); //apply传递的是一个数组对象
    delete context.fn;
    return result;
}

export {myBind,myApply}