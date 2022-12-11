console.clear();

const sound = new Howl({src: ['https://fastly.jsdelivr.net/gh/jh2038861379/my@main//assets/sound.mp3']});
const bgm = new Howl({src: ['https://fastly.jsdelivr.net/gh/jh2038861379/my@main//assets/bgm.mp3'], html5:true, loop: true, volume: 0.2});


var ringId = 0;
var bgmId = 0;
let count = 0;
let countFlag = false;

$(".woodenfish .click").click(function (e) {
    run()
});


function run() {
    startAnimate()
    initAnimate() 
    counter()
}

function startAnimate() {
    $(".count").css("transform", "scale(1.5)");
    $(".woodenfish").css('transform', 'scale(.90)');
}

function initAnimate() {
    $(".count").css("transform", "scale(1)");
    $(".woodenfish").css('transform', 'scale(1)');
}

function counter() {
    countFlag = true;
    count++;
    $(".count").html(count);
    startAnimate();
    if (ringId != 0) {
        if (sound.playing()) {
            sound.stop(ringId);
        }
        sound.play(ringId);
    } else {
        ringId = sound.play();
    }
}

var auto_run_data = true;
var auto_run_speed = 50;
function auto_run() {
    setTimeout(() => {
        if(auto_run_data != false) {
            auto_run()
        }
        run()
    }, auto_run_speed);
}

$(document).keydown(function (e) {
    if (e.key == " " && e) {
        if (!countFlag) {
            counter();
        }
    }
});

$(document).keyup(function (e) {
    if (e.key == " " && e) {
        countFlag = false;
        initAnimate();
    }
});

if (typeof window.orientation !== 'undefined') {
    $(".woodenfish").on('touchstart',function(e) {
        counter();
    })
    
    $(".woodenfish").on('touchmove',function(e) {
        initAnimate();
    });
    
    $(".woodenfish").on('touchend',function(e) {
        initAnimate();
    });
}else{
    $(".woodenfish").mouseup(function () {
        initAnimate();
    });
    
    $(".woodenfish").mousedown(function () {
        counter();
    });
}

$(".logo").click(function (e) {
    if (bgm.playing() && bgm.state().toString() == "loaded") {
        bgm.pause(bgmId);
    } else {
        if (bgmId != 0) {
            bgm.play(bgmId);
        } else {
            bgmId = bgm.play();
        }
    }
});
