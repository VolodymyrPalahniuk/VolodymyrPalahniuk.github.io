var tab;
var tabContent;

window.onload=function() {
    tabContent=document.getElementsByClassName('tabContent');
    tab=document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for (var i=a; i<tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick= function (event){
    var target=event.target;
    if (target.className=='tab') {
        for (var i=0; i<tab. length; i++){
            if (target == tab [i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

function generate(tabNumber) {
    // Отримуємо значення з повзунків для конкретної вкладки
    var rtl = document.getElementById(`rtl${tabNumber}`)?.value || 0;
    var rtr = document.getElementById(`rtr${tabNumber}`)?.value || 0;
    var rbr = document.getElementById(`rbr${tabNumber}`)?.value || 0;
    var rbl = document.getElementById(`rbl${tabNumber}`)?.value || 0;
    var maxWidth = document.getElementById(`maxWidth${tabNumber}`)?.value || 100;
    var opacity = document.getElementById(`opacity${tabNumber}`)?.value || 1;

    // Оновлюємо текстові поля для активної вкладки
    document.getElementById(`ttl${tabNumber}`) && (document.getElementById(`ttl${tabNumber}`).value = rtl);
    document.getElementById(`ttr${tabNumber}`) && (document.getElementById(`ttr${tabNumber}`).value = rtr);
    document.getElementById(`tbr${tabNumber}`) && (document.getElementById(`tbr${tabNumber}`).value = rbr);
    document.getElementById(`tbl${tabNumber}`) && (document.getElementById(`tbl${tabNumber}`).value = rbl);
    document.getElementById(`maxWidthValue${tabNumber}`) && (document.getElementById(`maxWidthValue${tabNumber}`).value = maxWidth);
    document.getElementById(`opacityValue${tabNumber}`) && (document.getElementById(`opacityValue${tabNumber}`).value = opacity);

    // Застосовуємо стилі до блоку конкретної вкладки
    var activeBlock = document.getElementById(`block${tabNumber}`);
    if (activeBlock) {
        activeBlock.style.borderRadius = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;
        activeBlock.style.maxWidth = `${maxWidth}px`;
        activeBlock.style.opacity = opacity;
    }

    // Виводимо CSS код тільки для активної вкладки
    var cssOutput = document.getElementById(`cssOutput1`);
    if (cssOutput) {
        cssOutput.value = `border-radius: ${rtl}px ${rtr}px ${rbr}px ${rbl}px;`;
    }

    var cssOutput = document.getElementById(`cssOutput2`);
    if (cssOutput) {
        cssOutput.value = `max-width: ${maxWidth}px;`;
    }

    var cssOutput = document.getElementById(`cssOutput3`);
    if (cssOutput) {
        cssOutput.value = `opacity: ${opacity};`;
    }
}

