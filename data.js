var docu = '<center><table class="tt"> \
            <tr class="sss"> \
            <th colspan="6" class="top"> \
                <input type="text" placeholder="0" class="tpc" id="tpc"/> \
                <a>과</a> \
            </th> \
        </tr > \
        ';
document.write(docu);

var j = 25;
//href="javascript:talk(' + i + ', 1);"
//href="javascript:talk(' + i + ', 2);"
function write_num(i) {
    var dc = '<tr> \
            <td class="tdnum"><a name="n1" ></a></td> \
            <td class="tdtext"><input type="text" name="e1" class="tinput te" /></td> \
            <td class="tdtext"><input type="text" name="k1" class="tinput tk" /></td> \
             \
            <td class="tdnum"><a name="n2" ></a></td> \
            <td class="tdtext"><input type="text" name="e2" class="tinput te" /></td> \
            <td class="tdtext"><input type="text" name="k2" class="tinput tk" /></td> \
        </tr> ';
    document.write(dc);
}
for (var i = 0; i < j; i++) {
    write_num(i);
    document.getElementsByName('n1')[i].innerHTML = i + 1;
    document.getElementsByName('n2')[i].innerHTML = i + j + 1;

}

function talk(i, p) {
    var en = document.getElementsByName('e' + p)[i].value;
    var ko = document.getElementsByName('k' + p)[i].value;
    console.log(en, ko);
}

var docu = '<tr > \
        <th colspan="6" class="bott"> \
        <a style="font-size: 12px;">ⓒ 치킨무 닷컴</a> \
            </th> \
        </tr > \
    </table > \
         <br />\
            <div class="noprint">\
        <input type="button" value="단어 섞기" class="bt" onclick="mix();"/>\
        <a>&nbsp|&nbsp</a> \
        <input type="button" value="단어 저장" onclick="save();" class="bt"/>\
        <a>&nbsp|&nbsp</a> \
        <input type="button" value="단어 불러오기" class="bt" onclick="openTextFile();"/>\
        <a>&nbsp|&nbsp</a> \
        <input type="button" value="뜻 가리기" class="bt" onclick="sh_ko();"/>\
        <a>&nbsp|&nbsp</a> \
        <input type="button" value="영어 가리기" class="bt" onclick="sh_en();"/>\
         </div>\
</center > ';
document.write(docu);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mix() {
    //console.log('asdf');
    for (var i = 0; i < j; i++) {
        var e1 = document.getElementsByName('e1')[i].value;
        var k1 = document.getElementsByName('k1')[i].value;
        var e2 = document.getElementsByName('e2')[i].value;
        var k2 = document.getElementsByName('k2')[i].value;
        var ran1 = rand(0, j - 1);
        var ran2 = rand(0, j - 1);
        //console.log('asdf');

        document.getElementsByName('e1')[i].value = document.getElementsByName('e1')[ran1].value;
        document.getElementsByName('k1')[i].value = document.getElementsByName('k1')[ran1].value;
        document.getElementsByName('e1')[ran1].value = e1;
        document.getElementsByName('k1')[ran1].value = k1;
        //console.log('asdf');

        document.getElementsByName('e2')[i].value = document.getElementsByName('e2')[ran2].value;
        document.getElementsByName('k2')[i].value = document.getElementsByName('k2')[ran2].value;
        document.getElementsByName('e2')[ran2].value = e2;
        document.getElementsByName('k2')[ran2].value = k2;
        //console.log('asdf');
    }
    for (var i = 0; i < j; i = i + 5){
        var e1 = document.getElementsByName('e1')[i].value;
        var k1 = document.getElementsByName('k1')[i].value;
        var ran1 = rand(0, j - 1);


        document.getElementsByName('e1')[i].value = document.getElementsByName('e2')[ran1].value;
        document.getElementsByName('e2')[ran1].value = e1;
        document.getElementsByName('k1')[i].value = document.getElementsByName('k2')[ran1].value;
        document.getElementsByName('k2')[ran1].value = k1;
    }
}

var shko = 0;
function sh_ko() {
    var g = document.getElementsByClassName('tk');
    if (shko == 0) {
        for (var i = 0; i < g.length; i++) {
            document.getElementsByClassName('tk')[i].style.display = 'none';
        }
        shko = 1;
    }
    else {
        for (var i = 0; i < g.length; i++) {
            document.getElementsByClassName('tk')[i].style.display = 'block';
        }
        shko = 0;
    }
}

var shen = 0;
function sh_en() {
    var g = document.getElementsByClassName('te');
    if (shen == 0) {
        for (var i = 0; i < g.length; i++) {
            document.getElementsByClassName('te')[i].style.display = 'none';
        }
        shen = 1;
    }
    else {
        for (var i = 0; i < g.length; i++) {
            document.getElementsByClassName('te')[i].style.display = 'block';
        }
        shen = 0;
    }
}

function saveToFile_Chrome(fileName, content) {
    var blob = new Blob([content], { type: 'text/plain' });
    objURL = window.URL.createObjectURL(blob);

    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    a.click();
}

function save() {
    var word = new Array(j);
    for (var i = 0; i < word.length; i++) {
        word[i] = new Array(3);
    }
    for (var i = 0; i < j; i++) {
        word[i][0] = document.getElementsByName('e1')[i].value;
        word[i][2] = document.getElementsByName('k1')[i].value;
        word[i][1] = document.getElementsByName('e2')[i].value;
        word[i][3] = document.getElementsByName('k2')[i].value;
    }
    saveToFile_Chrome(document.getElementById('tpc').value + '과.txt', word + ',' + document.getElementById('tpc').value);
}

function openTextFile() {
    var input = document.createElement("input");

    input.type = "file";
    input.accept = "text/plain, text/html, .jsp";

    input.click();
    input.onchange = function (event) {
        processFile(event.target.files[0]);
    };

}

function processFile(file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function () {
        var spc = reader.result;
        spc = spc.split(',');
        //console.log(spc);
        var lg = spc.length;
        var p = 0;
        for (var i = 0; i < j * 4; i = i + 4) {
            document.getElementsByName('e1')[p].value = spc[i];
            document.getElementsByName('k1')[p].value = spc[i + 2];
            document.getElementsByName('e2')[p].value = spc[i + 1];
            document.getElementsByName('k2')[p].value = spc[i + 3];
            p = p + 1;
        }
        document.getElementById('tpc').value = spc[lg - 1];
    };
}
