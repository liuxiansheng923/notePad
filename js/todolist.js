// $(function(){
//     load();
//     // 1.按下回车把完整数据 存储到本地存储里面
//     // 存储数据的格式 var todolist = [{title: "xxx",done: false}]
//     $("#title").on("keydown",function(event){
//         if(event.keyCode === 13){
//             if($(this).val() === ""){
//                 alert("请输入你想要的内容...");
//             }
//             else{
//             // 读取数据
//             var local = getData();

//             // 把最新数据追加给local数组
//              local.push({title: $(this).val(),done: false});
//             // console.log(local);x
//             // 存储到本地
//             saveData(local);
//             $(this).val("");
//             load();
//             }
            
//         }
//     });

//     // 删除元素
//     $('#todolist,#donelist').on('click','a',function(){
//         // 先获取本地存储
//         var data = getData();
//         // 修改数据
//         data.splice($(this).attr('id'),1);
//         // 保存本地存储
//         saveData(data);
//         // 重新渲染
//         load();
//     });
    
//     // 完成事件
//     $('#todolist,#donelist').on('click','input',function(){
//         // 获取数据
//         var data = getData();
//         // 获取索引号
//         var num = $(this).siblings('a').attr('id');
//         data[num].done = $(this).prop('checked');
//         // 保存到本地存储
//         saveData(data);
//         // 重新渲染
//         load();

//         // if($(this).prop('checked')){
//         //     $(this).parent().remove();
//         //     $.each(data,function(index,Ele){
//         //         if(num === index){
//         //             var li = $('<li><input type="checkbox"><p>'+(Ele.title)+'</p><a href="javascript:;" id='+(index)+'></a></li>');
//         //             $('#donelist').prepend(li);
//         //         }
//         //     });
//         //     load();
        
//     });



//     //  封装一个读取本地数据的函数
//     function getData(){
//         var data = localStorage.getItem("todolist");
//         if(data !== null){
//             return JSON.parse(data);
//         } 
//         else{
//             return [];
//         }
//     }

//     // 封装一个保存数据到本地的函数
//     function saveData(data){
//         localStorage.setItem("todolist", JSON.stringify(data));
//     }

//     // 加载页面
//     function load(){
//         $('#todolist').empty();
//         $('#donelist').empty();
//         var data = getData();
//         // console.log(data);
//         var doneNode = 0;
//         var todoNode = 0;
//         $.each(data,function(index,Ele){
//             // console.log(li);
//             if(Ele.done){
//                 var li = $('<li><input type="checkbox" checked="checked"><p>'+(Ele.title)+'</p><a href="javascript:;" id='+(index)+'></a></li>');
//                 $('#donelist').prepend(li);
//                 doneNode++;
//             }
//             else{
//                 var li = $('<li><input type="checkbox"><p>'+(Ele.title)+'</p><a href="javascript:;" id='+(index)+'></a></li>');
//                 $('#todolist').prepend(li);
//                 todoNode++;
//             }
//             $('#todocount').html(todoNode);
//             $('#donecount').html(doneNode);
//         });
//     }
// })







$(function(){
    load();
    $('#title').on('keydown',function(event){
        if(event.keyCode === 13){
            // alert(1);
            if($(this).val() === ""){
                alert("请输入你想要的内容...");
            }
            else{
                // 获取本地数据
                var data = getData();
                // 增加数据
                data.push({title: $(this).val(),done: false});
                $(this).val("");
                // 保存
                saveData(data);
                // 渲染
                load();
            }
        }
    });

    // 删除操作
    $('#todolist,#donelist').on('click','a',function(){
        var data = getData();
        var index = $(this).attr('id');
        data.splice(index,1);
        saveData(data);
        load();
    });

    // 待办事项和已完成事项
    $('#todolist,#donelist').on('click','input',function(){
        var data = getData();
        if($(this).prop('checked')){
            var index = $(this).siblings('a').attr('id');
            data[index].done = true;
        }
        else{
            var index = $(this).siblings('a').attr('id');
            data[index].done = false;
        }
        saveData(data);
        load();
    });

    // 获取
    function getData(){
        var data = localStorage.getItem('test');
        if(data !== null){
            return JSON.parse(data);
        }
        else{
            return [];
        }
    }

    // 保存
    function saveData(data){
        localStorage.setItem('test',JSON.stringify(data));
    }

    // 渲染
    function load(){
        $('#todolist,#donelist').empty();
        var todocount = 0;
        var donecount = 0;
        var data = getData();
        $.each(data,function(index,Element){
            if(Element.done){
                var li = $("<li><input type='checkbox' checked='checked'><p>"+(Element.title)+"</p><a href='javascript:;' id="+(index)+"></a></li>");
                $('#donelist').append(li);
                donecount++;
            }
            else{
                var li = $("<li><input type='checkbox'><p>"+(Element.title)+"</p><a href='javascript:;' id="+(index)+"></a></li>");
                $('#todolist').append(li);
                todocount++;
            }
            
        });
        $('#donecount').text(donecount);
        $('#todocount').text(todocount);
    }
})
