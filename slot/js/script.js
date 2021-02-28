'use strict';

{
    const panel_section = document.querySelectorAll('.panel'); //panelセクション

    const stop_btns = document.querySelectorAll('.stop'); //stopボタン
    const spin_btn = document.getElementById('spin'); //spinボタン

    const img_array = ['img/cow.png', 'img/money.png', 'img/seven.png', 'img/pig.png', 'img/duck.png']; //絵柄の配列

    let random_array = [];
    let random_array2 = [];
    let random_array3 = [];

    //絵柄の配列をランダムにする
    function createRandomImgArray(random_img_array){
        let img_array = ['img/cow.png', 'img/money.png', 'img/seven.png', 'img/pig.png', 'img/duck.png']; //絵柄の配列
        for(let i = img_array.length; i > 0; i --){
            let num = Math.floor(Math.random() * img_array.length); //ランダムなインデックスを取得
            random_img_array.push(img_array[num]); //画像urlを配列に追加
            img_array.splice(num, 1); //追加した要素をベースの配列から削除
        }
        return random_img_array;
    };

    class Panel{
        constructor(random_array, section){
            this.random_img_array = createRandomImgArray(random_array); //絵柄をランダムに並べ替え
            this.slot_section = section;
            this.stop_btn = this.slot_section.lastElementChild;
            this.index = 0;
            
        }

        startSpin(){
            let index = this.index;
            let random_img_array = this.random_img_array;
            let slot_section = this.slot_section;
            let stop_btn = this.stop_btn;
            spin_btn.addEventListener('click', function(){
                slotMoving(index, random_img_array, slot_section, stop_btn);
            })
        }
    }    

    let first_slot = new Panel(random_array, panel_section[0]);
    first_slot.startSpin();

    let second_slot = new Panel(random_array2, panel_section[1]);
    second_slot.startSpin();

    let third_slot = new Panel(random_array3, panel_section[2]);
    third_slot.startSpin();

    
    //絵柄を変える
    function slotMoving(index, random_img_array, slot_section, stop_btn){
        var changeImg = setTimeout(()=> {
            let panel_img = slot_section.firstElementChild;
            //画像の配列のインデックスをループさせる
            if(index >= img_array.length -1){
                index = 0;
            }else{
                index ++;
            }
            panel_img.setAttribute('src', random_img_array[index]);
            changeImg = slotMoving(index, random_img_array, slot_section, stop_btn);
        }, 50); 
        stop_btn.addEventListener('click', function(){
            clearTimeout(changeImg);
        });
    };

}