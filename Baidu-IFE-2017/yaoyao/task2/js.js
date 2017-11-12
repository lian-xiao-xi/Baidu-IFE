var $ = function(selectors) {
    return document.querySelectorAll(selectors);
};

/**
 * 如果字符是拉丁字母则返回true,反之则返回false
 */
function isASCII(s) {
    return s.codePointAt(0) <= 0xFF;
}

function getStrLen(str) {
    var zhLen = 0,
        enLen = 0;
    for (let s of str) {
        if (isASCII(s)) {
            enLen++;
        } else {
            zhLen++;
        }
    }
    return enLen + zhLen * 2;
}

var nameInput = $('#name')[0],
    passInput = $('#password')[0],
    passCofInput = $('#confrim-pass')[0],
    emailInput = $('#email')[0],
    telnumInput = $('#telnum')[0],
    submitBtn = $('#subBtn')[0];

nameInput.addEventListener('focusin', function() {
    focusIn(nameInput);
}, false);
nameInput.addEventListener('focusout', function() {
    var text = nameInput.value.trim();
    var result = getStrLen(text) >= 4 && getStrLen(text) <= 16;
    focusOut(nameInput, result);
}, false);

passInput.addEventListener('focusin', function() {
    focusIn(passInput);
}, false);
passInput.addEventListener('focusout', function() {
    var result = passwordJudge();
    console.log(result);
    if (!result) {
        passCofInput.disabled = 'true';
    } else {
        // passCofInput.disabled = 'false';
        passCofInput.removeAttribute('disabled');
    }
    focusOut(passInput, result);
}, false);

passCofInput.addEventListener('focusin', function() {
    focusIn(passCofInput);
}, false);
passCofInput.addEventListener('focusout', function() {
    var result = passwordCofrim();
    focusOut(passCofInput, result);
}, false);

emailInput.addEventListener('focusin', function() {
    focusIn(emailInput);
}, false);
emailInput.addEventListener('focusout', function() {
    var result = emailJudge();
    focusOut(emailInput, result);
}, false);

telnumInput.addEventListener('focusin', function() {
    focusIn(telnumInput);
}, false);

submitBtn.addEventListener('click', function() {
    var result = submitHander();
    if (result) {
        alert('提交成功');
    } else {
        alert('提交失败');
    }
}, false);

/**
 * focusIn();
 * 输入框获得焦点时的事件函数
 */
function focusIn(targetInput) {
    var dataName = '[data-name=' + '"' + targetInput.id + '"' + ']';
    if (!!(targetInput.value) === false) {
        $(dataName)[0].classList.remove('hidden');
    }
}

/**
 * focusOut()
 * 以输入框元素和内容经过正则匹配后的结果作为两个参数
 * 对相应的提示内容作出 DOM 操作
 */
function focusOut(targetInput, judgeResult) {
    var dataName = '[data-name=' + '"' + targetInput.id + '"' + ']';
    if (!!(targetInput.value.trim()) === false) {
        // 如果输入框是必填项
        if (targetInput.dataset.required !== 'no') {
            $(dataName)[0].textContent = '*不能为空';
            targetInput.dataset.result = 'false';
            $(dataName)[0].dataset.judge = 'false';
        }
    } else if (judgeResult === true) {
        targetInput.dataset.result = 'true';
        $(dataName)[0].dataset.judge = 'true';
        $(dataName)[0].textContent = '*格式正确';
    } else if (judgeResult === false) {
        targetInput.dataset.result = 'false';
        $(dataName)[0].dataset.judge = 'false';
        if (targetInput === passCofInput) {
            $(dataName)[0].textContent = '*格式错误，两次输入的值不相同';
        } else {
            $(dataName)[0].textContent = '*格式错误';
        }
    } else {
        targetInput.dataset.result = 'true';
        $(dataName)[0].dataset.judge = 'true';
        switch (judgeResult) {
            case 'powerful':
                $(dataName)[0].textContent = '*格式正确，密码强度强';
                break;
            case 'general':
                $(dataName)[0].textContent = '*格式正确，密码强度中';
                break;
            case 'weak':
                $(dataName)[0].textContent = '*格式正确，密码强度弱';
                break;
            default:
                $(dataName)[0].textContent = '*格式正确';
                break;
        }
    }
}

/**
 * passwordJudge(inputEle)
 * 判断密码输入框的值是否合理，合理时再进行强度判断并返回相应的字符串值
 */
function passwordJudge() {
    // 强、中、弱三种种密码强度的匹配模式
    // var pattern_powerful = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/g,
    //   pattern_general = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/g,
    //   pattern_weak = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/g;

    // 强：字母+数字+特殊字符
    // 中：字母+数字，字母+特殊字符，数字+特殊字符
    // 弱：纯数字，纯字母，纯特殊字符
    var pattern_powerful = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,20}$/;
    pattern_general = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,20}$/,
        pattern_weak = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){8,20}$/;

    if (pattern_powerful.test(passInput.value)) {
        return 'powerful';
    } else if (pattern_general.test(passInput.value)) {
        return 'general';
    } else if (pattern_weak.test(passInput.value)) {
        return 'weak';
    } else {
        return false;
    }
}
/**
 * passwordCofrim()
 * 判断再次输入的密码与密码框中的值是否相同，并返回一个布尔值
 */
function passwordCofrim() {
    return passInput.value === passCofInput.value;
}

/**
 * emailJudge()
 * 判断Email输入框的值是否合理，并返回一个布尔值
 */
function emailJudge() {
    var emailPattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    return emailPattern.test(emailInput.value);
}

/**
 * submit()
 * 提交按钮事件函数
 */
function submitHander() {
    var inputList = [];
    var inputGroup = document.querySelectorAll('.form-box .input-group input');
    for (var i = 0; i < inputGroup.length; i++) {
        if (inputGroup[i].dataset.required !== 'no') {
            inputList.push(inputGroup[i].dataset.result);
        }
    }
    var globalRes = inputList.every(function(item, index, array) {
        return item === 'true';
    });
    return globalRes && (passInput.value === passCofInput.value);
}
