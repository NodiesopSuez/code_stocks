'use strict';

{   
    //現在日時の必要な値を取得
    var now= new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; //表示用の為１加算
    var today = now.getDate();
    var month_length = new Date(year, month, 0).getDate(); //今月日数
    var last_day = new Date(year, month, 0).getDay(); //今月末の曜日
    var start_day = new Date(year, month-1, 1).getDay(); //今月初日の曜日
    var last_month = now.getMonth();
    var last_month_date = new Date(year, last_month, 0).getDate(); //前月末の日付
    var last_month_day = new Date(year, last_month, 0).getDay(); //前月末の曜日

console.log(`今日： ${year}年　${month}月 ${today}日`);
console.log(`今月： 日数：${month_length} / 今月末曜日：${last_day} / 今月初曜日：${start_day}`);
console.log(`前月末日：${last_month_date} / 前月末曜日：${last_month_day}`);
    
    var weekly  = [];
    weekly = spliceDatesWeekly(month_length, start_day, weekly);

console.log(weekly);
    rewriteYearMonth(year, month);
    //今月のカレンダーを表示する
    createCalender(year, month, start_day, last_month_date, weekly, last_day);

console.log(now + '/' + month);


    //todayボタンをクリックしたら
    const today_btn = document.getElementById('today');
    today_btn.addEventListener('click',function(){
        removeTrTdElement();
        //現在日時の必要な値を取得
        year = now.getFullYear();
        month = now.getMonth() + 1; //表示用の為１加算
        today = now.getDate();
        month_length = new Date(year, month, 0).getDate(); //今月日数
        last_day = new Date(year, month, 0).getDay(); //今月末の曜日
        start_day = new Date(year, month-1, 1).getDay(); //今月初日の曜日
        last_month = now.getMonth();
        last_month_date = new Date(year, last_month, 0).getDate(); //前月末の日付
        last_month_day = new Date(year, last_month, 0).getDay(); //前月末の曜日
    
    console.log(`今日： ${year}年　${month}月 ${today}日`);
    console.log(`今月： 日数：${month_length} / 今月末曜日：${last_day} / 今月初曜日：${start_day}`);
    console.log(`前月末日：${last_month_date} / 前月末曜日：${last_month_day}`);
        
        var weekly  = [];
        weekly = spliceDatesWeekly(month_length, start_day, weekly);
    
    console.log(weekly);
        rewriteYearMonth(year, month);
        //今月のカレンダーを表示する
        createCalender(year, month, start_day, last_month_date, weekly, last_day);

    });






    //prevボタンをクリックしたら
    const prev = document.getElementById('prev');
    prev.addEventListener('click',function(){
console.log('clickできてるよ！');
        removeTrTdElement();
        month --;

        if(month <= 0){
            year --;
            month = 12;
        }
console.log(`${year}/${month}`);
        rewriteYearMonth(year, month);

        month_length = new Date(year, month, 0).getDate(); //該当月の日数
        last_day = new Date(year, month, 0).getDay(); //該当月末の曜日
        start_day = new Date(year, month-1, 1).getDay(); //該当月初の曜日
        last_month = new Date(year, month-1, 1).getMonth();

        last_month_date = new Date(year, last_month, 0).getDate(); //前月末の日付
        last_month_day = new Date(year, last_month, 0).getDay(); //前月末の曜日

console.log(`該当月日数：${month_length} / 該当月末曜日：${last_day} / 該当月初曜日：${start_day}`);
console.log(`該当月前月：${last_month} / 前月末日付: ${last_month_date} / 前月末曜日：${last_month_day}`);

        weekly = spliceDatesWeekly(month_length, start_day, weekly);
        createCalender(year, month, start_day, last_month_date, weekly, last_day);
console.log(now + '/' + month);
    });


    //nextボタンをクリックしたら
    const next = document.getElementById('next');
    next.addEventListener('click',function(){
console.log('clickできてるよ！');
        removeTrTdElement();
        month ++;

        if(month > 12){
            year ++;
            month = 1;
        }
console.log(`${year}/${month}`);

        rewriteYearMonth(year, month);

        month_length = new Date(year, month, 0).getDate(); //該当月の日数
        last_day = new Date(year, month, 0).getDay(); //該当月末の曜日
        start_day = new Date(year, month-1, 1).getDay(); //該当月初の曜日
        last_month = new Date(year, month-1, 1).getMonth();

        last_month_date = new Date(year, last_month, 0).getDate(); //前月末の日付
        last_month_day = new Date(year, last_month, 0).getDay(); //前月末の曜日

console.log(`該当月日数：${month_length} / 該当月末曜日：${last_day} / 該当月初曜日：${start_day}`);
console.log(`該当月前月：${last_month} / 前月末日付: ${last_month_date} / 前月末曜日：${last_month_day}`);

        weekly = spliceDatesWeekly(month_length, start_day, weekly);
        createCalender(year, month, start_day, last_month_date, weekly, last_day);
    });


//---------------------------------------------------------------------------------------------

    //年と月を書き換える
    function rewriteYearMonth(year, month){
        const title = document.getElementById('title');
        title.textContent = `${year} / ${month}`;
    }

    //週ごとに日付の配列をつくる
    function spliceDatesWeekly(month_length, start_day, weekly){
        var month_dates = [];
        for(let i = 1; i <= month_length; i++){
            month_dates.push(i);
        }
        var array = [];
        for(let i = 0; i <= (6-start_day); i++){
            array.push(month_dates[0]);
            month_dates.splice(0,1);
        }
        weekly.push(array);
        while(month_dates.length > 0){
            weekly.push(month_dates.splice(0,7));
        }
        return weekly;
    };

    //カレンダーを作成する
    function createCalender(year, month, start_day, last_month_date, weekly, last_day){
        //１週目のtrタグを作成
        document.getElementById('calender_body').insertAdjacentHTML('beforeend','<tr></tr>');
        
        //前月末、日曜日からの日付を１列目のtrタグに追加
        var first_week = document.getElementById('calender_body').children[0];
        if(start_day > 0){
            for(let i = 0; i < start_day; i++){
                first_week.insertAdjacentHTML('afterbegin',`<td class="prev_next">${last_month_date}</td>`);
                last_month_date--;
            }
        }

        var this_year = now.getFullYear();
        var this_month = now.getMonth() + 1;
        var today = now.getDate();

        //１週目だけ日付表示
        for(let week of weekly[0]){
            if(this_year === year && month === this_month && week === today){
                first_week.insertAdjacentHTML('beforeend',`<td class="today_date">${week}</td>`);
            }else{
                first_week.insertAdjacentHTML('beforeend',`<td>${week}</td>`);
            }
        }
        weekly.splice(0,1);

        //２週目以降の日付表示
        while(weekly.length > 0){
            document.getElementById('calender_body').insertAdjacentHTML('beforeend','<tr></tr>');
            var created_tr = document.getElementById('calender_body').lastElementChild;
            for(let week of weekly[0]){
                if(this_year === year && month === this_month && week === today){
                    created_tr.insertAdjacentHTML('beforeend',`<td class="today_date">${week}</td>`);
                }else{
                    created_tr.insertAdjacentHTML('beforeend',`<td>${week}</td>`);
                }
            }
            weekly.splice(0,1);
        }

        //翌月月初の日付表示
        var last_week = document.getElementById('calender_body').lastElementChild;
        if(last_day < 6){
            for(let i = 1; i < (7 - last_day); i++){
                last_week.insertAdjacentHTML('beforeend',`<td class="prev_next">${i}</td>`);
            }
        }
    };

    //表示されているカレンダーを空にする(trタグ、tdタグを削除)
    function removeTrTdElement(){
        const tbody = document.getElementById('calender_body');
        tbody.innerHTML = '';        
    };
}
