window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //////////////////////////////////////////    PRE-LOADER

    let loader = document.querySelector('.preload');
    function loaderOff() {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }
    setTimeout(loaderOff, 2000);




    ////////////////////////////////////////    DATE



    function todayDate(){
        let date = new Date(),
            dateArea = document.querySelector(".date"),
            day = date.getDate(),
            month = date.toLocaleString('en', { month: 'long' }),
            year = date.getFullYear(),
            hours = date.getHours(),
            minutes = date.getMinutes();
        if (minutes<10){
            minutes = "0" + minutes
        }
        if (hours<10){
            hours = "0" + hours
        }
        dateArea.innerHTML = ` Today: ${day} ${month} ${year}`;
    }
    todayDate();


    //////////////////////////////////////////    MAIN


    let button = document.querySelector('.todo-submit'),
        toDoText = document.querySelector('.todo-text'),
        hint = document.querySelector('.hint'),
        massageArea = document.querySelector('.todo-massages'),
        list = [];


    function saveMassage(massageText){
        if(massageText === "" || massageText[0] === " "){
            hint.style.opacity = "1"
        } else {
            hint.style.opacity = "0";

            let div = document.createElement('div'),
                btn = document.createElement('div'),
                time = document.createElement('div'),
                str = document.createElement("p"),
                date = new Date(),
                day = date.getDate(),
                month = date.toLocaleString('en', { month: 'long' }),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                temp = {},
                i = list.length;


            if (minutes<10){
                minutes = "0" + minutes
            }
            if (hours<10){
                hours = "0" + hours
            }


            btn.classList.add('delete-massage');
            div.classList.add('massage');
            time.classList.add('massage-time');
            str.classList.add('massage-text');
            str.textContent = massageText;
            time.innerHTML = `${day} ${month} ${hours}:${minutes}`;
            massageArea.appendChild(div);
            div.appendChild(str);
            div.appendChild(btn);
            div.appendChild(time);
            temp.todo = massageText;
            temp.check = false;
            temp.time = time.textContent;
            list[i] = temp;
            toDoText.value = "";
            localStorage.setItem("todo", JSON.stringify(list));

    }
    }




/////////////////////////////////////////    REFRESH ALL


    let refreshBtn = document.querySelector(".img-refresh");
    refreshBtn.addEventListener("click",function () {
        refreshBtn.style.transition = "1.5s";
        refreshBtn.style.transform = "rotate(-720deg)";
        setTimeout(()=>{
            refreshBtn.style.transform = "rotate(0deg)";
            refreshBtn.style.transition = "-1s"
        }, 2000);

        let deleteMassages = document.querySelectorAll(".massage");

        deleteMassages.forEach((mas)=>mas.remove());

        localStorage.clear();
    });


/////////////////////////////////////////    DELETE DONE MASSAGE



    massageArea.addEventListener('click', function (e) {
        let event = e.target;
        if(event.classList.contains("massage")){
            event.classList.toggle("done");
            list.forEach((txt, index) => {
                if(txt.todo + txt.time === event.textContent && list[index].check !== true){
                        list[index].check = true;
                        localStorage.setItem("todo", JSON.stringify(list))
                } else if (txt.todo + txt.time === event.textContent && list[index].check === true){
                    list[index].check = false;
                    localStorage.setItem("todo", JSON.stringify(list))
                }
            });
        }
        else if (event.classList.contains("massage-text")){
            event.closest(".massage").classList.toggle("done");
            list.forEach((txt, index) => {
                if(txt.todo + txt.time === event.textContent && list[index].check !== true){
                    list[index].check = true;
                    localStorage.setItem("todo", JSON.stringify(list))
                }else if (txt.todo + txt.time === event.textContent && list[index].check === true){
                    list[index].check = false;
                    localStorage.setItem("todo", JSON.stringify(list))
                }
            });
        }
        else if (event.classList.contains("delete-massage")){
            list.forEach((txt, index) => {
                if(txt.todo + txt.time === event.closest(".massage").textContent )  {
                    list.splice(index ,1);
                    event.closest(".massage").remove();
                    localStorage.setItem("todo", JSON.stringify(list))
                }
            });

        }
        else if (event.classList.contains("massage-time")){
            event.closest(".massage").classList.toggle("done");
            list.forEach((txt, index) => {
                if(txt.todo + txt.time === event.textContent && list[index].check !== true){
                    list[index].check = true;
                    localStorage.setItem("todo", JSON.stringify(list))
                }else if (txt.todo === event.textContent && list[index].check === true){
                    list[index].check = false;
                    localStorage.setItem("todo", JSON.stringify(list))
                }
            });
        }
    })
    /////////////////////////////////////////    SAVE MASSAGE ONCLICK
    button.addEventListener('click', ()=> {saveMassage(toDoText.value)} );

    document.onkeyup = function (e) {
        if(e.code === "Enter"){
            saveMassage(toDoText.value)
        }
    }

    /////////////////////////////////////////    LOCAL STORAGE
    
    if(localStorage.getItem('todo') !== null){
        list = JSON.parse(localStorage.getItem('todo')) ;
        list.forEach(txt =>{
            let div = document.createElement('div'),
                btn = document.createElement('div'),
                str = document.createElement("p"),
                time = document.createElement('div');
            btn.classList.add('delete-massage');
            div.classList.add('massage');
            str.classList.add('massage-text');
            time.classList.add('massage-time');
            str.textContent = txt.todo;
            time.textContent = txt.time;
            massageArea.appendChild(div);
            div.appendChild(str);
            div.appendChild(time);
            div.appendChild(btn);
            if (txt.check === true){
                div.classList.toggle('done');
            }
        })
    }

});