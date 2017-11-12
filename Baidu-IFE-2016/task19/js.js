const $ = (selectors) => (document.querySelector(selectors));

const [numInput, leftIn, rightIn, leftOut, rightOut, bubble, showCont]
    = [$('#num'), $('#left-in'), $('#right-in'), $('#left-out'), $('#right-out'), $('#bubble'), $('#show')];

function tranValue() {
    let value = numInput.value.trim();
    if (showCont.children.length >= 60) {
        alert('队列中元素已超过60个');
        return false;
    } else if (!/^[0-9]+$/.test(value)) {
        alert('请输入正整数');
        return false;
    } else if (parseInt(value, 10) < 10 || parseInt(value, 10) > 100) {
        alert('输入的数值应该在10-100之间');
        return false;
    } else {
        return parseInt(value, 10);
    }

}

function leftInHander() {
    if (!tranValue()) {
        return false;
    }
    showCont.insertAdjacentHTML('afterbegin', `<li style="height: ${tranValue() * 2}px">${tranValue()}</li>`);
}

function rightInHander() {
    if (!tranValue()) {
        return false;
    }
    showCont.insertAdjacentHTML('beforeend', `<li style="height: ${tranValue() * 2}px">${tranValue()}</li>`);
}

function leftOutHander() {
    if (showCont.children.length === 0) { alert('队列为空，请先向添加项'); return false; }
    alert(showCont.children[0].textContent);
    showCont.removeChild(showCont.children[0]);
}

function rightOutHander() {
    if (showCont.children.length === 0) { alert('队列为空，请先向添加项'); return false; }
    alert(showCont.children[showCont.children.length - 1].textContent);
    showCont.removeChild(showCont.children[showCont.children.length - 1]);
}

function delItem(event) {
    if (showCont.children.length === 0) { return false; }
    alert(event.target.textContent);
    showCont.removeChild(event.target);
}

function sweep(ele1, ele2) {
    const ele1_height = ele1.style.height;
    const ele1_textContent = ele1.textContent;

    ele1.textContent = ele2.textContent;
    ele1.style.height = ele2.style.height;
    ele2.textContent = ele1_textContent;
    ele2.style.height = ele1_height;

    // 如果只是相邻元素swap，可以使用下面这个方法直接交换dom元素
    // 但是考虑到非冒泡排序算法使用swap时不一定是交换相邻元素(比
    // 如插入排序)，所以使用交换高度的方法。注意ele.style.height
    // 和ele.offsetHeight都需要互换

    // ele1.parentNode.insertBefore(ele2, ele1);
}
function bubbleSort(queue) {
    let eles = queue.children;
    let len = eles.length;
    let i = len - 1;
    let j = 0;

    if (len === 0) {
        alert('队列中没有元素');
        return false;
    }

    let timer = setInterval(function () {
        if (i === 0) {
            clearInterval(timer);
        }
        if (j === i) {
            j = 0;
            i--;
        }
        if (parseInt(eles[j].textContent, 10) > parseInt(eles[j + 1].textContent, 10)) {
            // [eles[j],eles[j + 1]] = [eles[j + 1],eles[j]];
            // eles[j].parentNode.insertBefore(eles[j+1], eles[j]);
            sweep(eles[j], eles[j + 1]);
        }
        j++;

    }, 300)
}
leftIn.addEventListener('click', leftInHander, false);
rightIn.addEventListener('click', rightInHander, false);
leftOut.addEventListener('click', leftOutHander, false);
rightOut.addEventListener('click', rightOutHander, false);
showCont.addEventListener('click', function (event) {
    event = event ? event : window.event;
    if (event.target.nodeName.toLowerCase() === 'li') { delItem(event); }
}, false);
bubble.addEventListener('click', function () {
    bubbleSort(showCont);
}, false);

