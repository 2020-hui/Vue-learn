/*
 * @Author: your name
 * @Date: 2025-03-10 22:24:49
 * @LastEditors: your name
 * @LastEditTime: 2025-03-10 22:39:03
 * @Description: 
 * @FilePath: \Vue-learn\Js-handle\myCall.js
 */
//this是一个特殊的关键字，指的是当前执行上下文的对象，this的指向取决于它是如何调用的，分为默认绑定、隐式绑定、显示绑定、new绑定
//默认绑定 在非严格模式下指向全局对象 浏览器是window  node中是global
//隐式绑定 指向调用该方法的对象
//显示绑定 通过 call、bind、apply实现
//绑定原型链的实现
Function .prototype.myCall = function(context,...arges){
    const context = context || globalThis  //指向传入的对象 若不存在则是全局对象
    context.fn = this; //利用隐士绑定特性，指向的是调用该方法的对象 而call的使用调用该方法的是对应的函数
    const result = context.fn(...arges); //执行该方法 重新利用隐隐式绑定改变指向
    delete context.fn;
    return result;
}