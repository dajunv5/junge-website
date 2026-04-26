/* 西游记阅读器 - 修复版 */
(function(){
'use strict';

var _pwd = 'JunGe@2026';
var _devUnlocked = false;

function _initProtection(){
    if(_devUnlocked) return;
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
    document.addEventListener('keydown', function(e){
        if(_devUnlocked) return;
        if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].indexOf(e.key) !== -1) || (e.ctrlKey && ['u','s'].indexOf(e.key) !== -1)){
            e.preventDefault();
        }
    });
}

/* ========== 书籍数据 ========== */
var BOOKS = {
    xiyouji: {
        id: 'xiyouji',
        title: '西游记',
        author: '吴承恩',
        dynasty: '明',
        totalChapters: 100,
        chapters: [
            {
                id: 1,
                title: '灵根育孕源流出　心性修持大道生',
                titleEn: 'The Spiritual Root Bears Fruit',
                content: '第一回　灵根育孕源流出　心性修持大道生\n\n盖闻天地之数，有十二万九千六百岁为一元。将一元分为十二会，乃子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥之十二支也。每会该一万八百岁。\n\n感盘古开辟，三皇治世，五帝定伦，世界之间，遂分为四大部洲：曰东胜神洲，曰西牛贺洲，曰南赡部洲，曰北俱芦洲。\n\n这部书单表东胜神洲。海外有一国土，名曰傲来国。国近大海，海中有一座名山，唤为花果山。此山乃十洲之祖脉，三岛之来龙，自开清浊而立，鸿蒙判后而成。\n\n真个好山！有词赋为证，赋曰：\n\n势镇汪洋，威宁瑶海。势镇汪洋，潮涌银山鱼入穴；威宁瑶海，波翻雪浪蜃离渊。木火方隅高积土，东海之处耸崇巅。丹崖怪石，削壁奇峰。丹崖上，彩凤双鸣；削壁前，麒麟独卧。峰头时听锦鸡鸣，石窟每观龙出入。林中有寿鹿仙狐，树上有灵禽玄鹤。瑶草奇花不谢，青松翠柏长春。仙桃常结果，修竹每留云。一条涧壑藤萝密，四面原堤草色新。正是百川会处擎天柱，万劫无移大地根。\n\n那座山正当顶上，有一块仙石。其石有三丈六尺五寸高，有二丈四尺围圆。三丈六尺五寸高，按周天三百六十五度；二丈四尺围圆，按政历二十四气。上有九窍八孔，按九宫八卦。\n\n四面更无树木遮阴，左右倒有芝兰相衬。盖自开辟以来，每受天真地秀，日精月华，感之既久，遂有灵通之意。内育仙胞，一日迸裂，产一石卵，似圆球样大。因见风，化作一个石猴，五官俱备，四肢皆全。便就学爬学走，拜了四方。目运两道金光，射冲斗府。\n\n惊动高天上圣大慈仁者玉皇大天尊玄穹高上帝，驾座金阙云宫灵霄宝殿，聚集仙卿，见有金光焰焰，即命千里眼、顺风耳开南天门观看。二将果奉旨出门外，看了一番，方回奏道："臣奉旨观听金光之处，乃东胜神洲海东傲来小国之界，有一座花果山，山上有一仙石，石产一卵，见风化一石猴，在那里拜四方，眼运金光，射冲斗府。如今服饵水食，金光将潜息矣。"\n\n玉帝垂赐恩慈曰："下方之物，乃天地精华所生，不足为异。"\n\n那猴在山中，却会行走跳跃，食草木，饮涧泉，采山花，觅树果；与狼虫为伴，虎豹为群，獐鹿为友，猕猿为亲；夜宿石崖之下，朝游峰洞之中。\n\n真是"山中无甲子，寒尽不知年"。一朝天气炎热，与群猴避暑，都在松阴之下顽耍。你看他一个个——\n\n耍了一会，却去那山涧中洗澡。见那股涧水奔流，真个似滚瓜涌溅。忽见一阵风过，把他那一群猴都吓了一跳。只见那瀑布从悬崖上飞流直下，响如雷霆，声闻数里。\n\n众猴拍手称扬道："好水！好水！原来此处远通山脚之下，直接大海之波。"又说："哪一个有本事的，钻进去寻个源头出来，不伤身体者，我等即拜他为王。"\n\n连呼了三声，忽见丛杂中跳出一个石猴，应声高叫道："我进去！我进去！"\n\n好猴！也是他今日芳名显，时来运转，有分有缘。他瞑目蹲身，将身一纵，径跳入瀑布泉中。忽睁睛抬头观看，那里边却无水无波，明明朗朗的一架桥梁。他住了身，定了神，仔细再看，原来是座铁板桥。桥下之水，冲贯于石窍之间，倒挂流出去，遮闭了桥门。\n\n他又欠身上桥头，再走再看，却似有人家住处一般，真个好所在。但见那——\n\n翠藓堆蓝，白云浮玉，光摇片片烟霞。虚窗静室，滑凳板生花。乳窟龙珠倚挂，萦回满地奇葩。锅灶傍崖存火迹，樽罍每底看书札。几榻无尘，箫鼓绝音，朝真坛畔，一盏明灯照洞府；炼丹炉边，千年瑞草隐瑶阶。\n\n看罢多时，跳过桥中间，左右观看，只见正当中有一石碣。碣上有一行楷书大字，镌着"花果山福地，水帘洞洞天"。\n\n石猿喜不自胜，急抽身往外便走，复瞑目蹲身，跳出水外，打了两个呵呵道："大造化！大造化！"\n\n众猴把他围住，问道："里面怎么样？水有多深？"石猴道："没水！没水！原来是一座铁板桥。桥那边是一座天造地设的家当。"众猴道："怎见得是个家当？"石猴笑道："这股水乃是桥下冲贯石桥，倒挂下来遮闭门户的。桥边有花有树，乃是一座石房。房内有石锅、石灶、石碗、石盆、石床、石凳。中间一块石碣上，镌着\'花果山福地，水帘洞洞天\'。真个是我们安身之处。里面且是宽阔，容得千百口老小。我们都进去住，也省得受老天之气。"\n\n众猴听得，个个欢喜。都道："你还先走，带我们进去，进去！"石猴却又瞑目蹲身，往里一跳，叫道："都随我进来！进来！"\n\n那些猴有胆大的，都跳进去了；胆小的，一个个伸头缩颈，抓耳挠腮，大声叫喊，缠一会，也都进去了。跳过桥头，一个个抢盆夺碗，占灶争床，搬过来，移过去，正是猴性顽劣，再无一个宁时，只搬得力倦神疲方止。\n\n石猿端坐上面道："列位呵，\'人而无信，不知其可\'。你们才说有本事进得来，出得去，不伤身体者，就拜他为王。我如今进来又出去，出去又进来，寻了这一个洞天与列位安眠稳睡，何不拜我为王？"\n\n众猴听说，即拱伏无违。一个个序齿排班，朝上礼拜，都称"千岁大王"。自此，石猴高登王位，将"石"字儿隐了，遂称美猴王。\n\n有诗为证。诗曰：\n\n三阳交泰产群生，仙石胞含日月精。\n借卵化猴完大道，假他名姓配丹成。\n内观不识因无相，外合明知作有形。\n历代人人皆属此，称王称圣任纵横。\n\n美猴王领一群猿猴、通臂猿猴、赤尻马猴，分派了君臣佐使，朝游花果山，暮宿水帘洞，合契同情，不入飞鸟之丛，不从走兽之类，独自为王，不胜欢乐。\n\n一日，与群猴喜宴之间，忽然忧恼，堕下泪来。众猴慌忙罗拜道："大王何为烦恼？"猴王道："我虽在欢喜之时，却有一点儿远虑，故此烦恼。"众猴又笑道："大王好不知足！我等日日欢会，在仙山福地，不伏麒麟辖，不伏凤凰管，又不伏人间王位所拘束，自由自在，乃无量之福，何为远虑？"\n\n猴王道："今日虽不归人王法律，不惧禽兽威服，将来年老血衰，暗中有阎王老子管着，一旦身亡，可不枉生世界之中，不得久住天人之内？"\n\n众猴闻此言，一个个掩面悲啼，俱以无常为虑。\n\n只见那班部中，忽跳出一个通背猿猴，厉声高叫道："大王若是这等说，就是道心开发也。如今五虫之内，惟有三等名色，不伏阎王老子所管。"\n\n猴王道："你知那三等人？"猿猴道："乃是佛与仙与神圣三者，躲过轮回，不生不灭，与天地山川齐寿。"\n\n猴王道："此三者居于何所？"猿猴道："他只在阎浮世界之中，古洞仙山之内。"\n\n猴王闻之，满心欢喜道："我明日就辞汝等下山，云游海角，远涉天涯，务必访此三者，学一个不老长生，常躲过阎君之难。"\n\n噫！这句话，顿教跳出轮回网，致使齐天大圣成。\n\n毕竟明日去何方寻访，且听下回分解。'
            },
            {
                id: 2,
                title: '悟彻菩提真妙理　断魔归本合元神',
                titleEn: 'Awakening to the Sublime Truth',
                content: '第二回　悟彻菩提真妙理　断魔归本合元神\n\n话表美猴王天生聪慧，才过三年，便辞了猴群，独自依前跳出水帘洞外，至那花果山边界，观看景致。\n\n忽听得一声呼唤，回头观觑，原来是那崩、芭二将，领十数个杂色毛虫，在那山顶上嘻笑。美猴王道："你是何人？敢在此处胡为？"那伙毛虫道："我等是山前山后的小妖，闻知大王在此修行，特来服侍。"\n\n猴王大喜，遂领他们回转水帘洞。只见那洞中风光依旧，却不似人间光景。猴王坐下，群猴罗拜，进上花果、山桃、雪梨、火枣，各各献上。\n\n猴王受了，问左右道："我闻说人王法律，是用来管百姓的；阎王生死簿，是用来管众生的。我如今超出三界外，不在五行中，已不伏他管了。只是我这身子，还是血肉之躯，不知几时才得长生不老？"\n\n话毕，忽然见那洞外有一老猴，年纪极老，须发如银，走上前，跪下道："大王若要长生，可去古洞仙山，参访佛仙神圣，求得长生之道。"\n\n猴王道："我即去，但不知从何方而去？"老猴道："此去向东，有茫茫大海，海外有南北二瞻部洲，又过西海，乃西牛贺洲地界。那州中有一座山，名唤灵台方寸山，山中有座斜月三星洞，那洞中有一个神仙，称名须菩提祖师。那祖师出去的徒弟，也不计其数，现今还有三四十人从他修行。大王若去那里，拜他为师，学他手段，定得长生。"\n\n猴王听闻，满心欢喜，道："你去与我打个头阵，我随后就来。"老猴道："大王差矣。我等是胎生的，如何走得？大王既是老爷，必能神通变化，须得自己前去。"\n\n猴王笑道："不须你们去。我自有本事，说走就走，说去就去。"好猴王，即起身换了衣服，拿了一根铁棒，径出洞府，跳上云端，径向东海而去。\n\n毕竟不知向后如何，且听下回分解。'
            },
            {
                id: 3,
                title: '四海千山皆拱伏　九幽十类尽除名',
                titleEn: 'All under Heaven Submits',
                content: '第三回　四海千山皆拱伏　九幽十类尽除名\n\n却说美猴王，自得菩提祖师传授，学会了七十二般变化，筋斗云一纵十万八千里，心中大喜。\n\n一日，祖师道："你既通法性，会得根源，说起来，你也只是个砍材的出身，如何能成得了正果？"猴王道："徒弟怎的不成正果？"祖师道："你虽得了长生不老之方，但这生死簿上，还注得有你的名字。你若不消去这名头，终久还要到阴间去。"\n\n猴王道："师父，如何能消去这名头？"祖师道："这事容易。你如今回去，寻那十代冥王，讨将生死簿来，把名字一笔勾销，便没事了。"\n\n猴王谢了师恩，即日回山。到了花果山水帘洞，只见那群猴正在洞门外玩耍。见了猴王，个个欢喜，都上前参拜。\n\n猴王问道："我走后，可有甚么事么？"众猴道："也没甚事，只是近日有个混世魔王，占了我们的水帘洞，掳了许多子侄去，又不许我们进去。大王若回去，必要与他争竞一番。"\n\n猴王大怒道："这泼魔，敢如此无礼！"即带领群猴，径奔水帘洞。只见那洞门紧闭，上有铁钉密布。猴王上前，厉声高叫道："开门！开门！你大王回来了！"\n\n那魔王在里面听得，即披挂出来，手持大刀，开门便砍。猴王侧身躲过，拔出一把毫毛，叫声"变！"变作三二百个小猴，把魔王围在中间。魔王措手不及，被猴王一棒打死。\n\n猴王收回毫毛，安抚了群猴，复入水帘洞，依旧做他的大王。正是：\n\n修成隐身法，学就长生方。\n扫荡妖魔辈，威名四海扬。\n\n却说猴王，自夺回水帘洞，威风大振，四方猴子都来归顺。不一日，有两个赤尻马猴，献上"赭黄袍"一领，告道："大王，如今既做了皇帝，也该置些马匹军器，方像个模样。"\n\n猴王道："你说得是。但我这山上，却没有甚么顺手的兵器。"正说话间，只见那东洋大海，波涛滚滚。猴王道："我闻龙宫里宝贝最多，我去问老龙王讨一件来用用。"\n\n好猴王，即跳至东洋海里。那巡海的夜叉，见了猴王，上前喝道："你是何人，敢在此惊扰龙宫？"猴王道："我乃花果山水帘洞洞主，姓孙名悟空。因为你这海里的龙王，是我老孙的邻居，特来拜访。"\n\n夜叉随即进宫通报。东海龙王敖广，即出宫迎接。相见毕，猴王道："老邻居，我今特来，别无他意，只因我缺少一件兵器，闻知你这海里宝贝最多，特来借一件用用。"\n\n龙王道："这个容易。"即便命左右抬出一杆三千六百斤重的九股叉来。猴王接在手中，道："轻！轻！轻！不称手！再觅重些的。"\n\n龙王又命抬出那七千二百斤重的方天画戟来。猴王接在手中，丢了一个解数，道："轻！轻！轻！还是不称手！再觅重些的。"\n\n龙王道："这个却是海中最大的兵器了。"正说处，龙婆、龙女上前道："大王，我们这海藏中，那一块天河定底的神珍铁，这几日霞光艳艳，瑞气腾腾，莫不是该遇此仙？"\n\n龙王道："那是大禹治水之时，定江海浅深的一个定子，是一块神铁，能中何用？"龙婆道："管他中用不中用，且抬将他来看看。"\n\n于是龙王领猴王来到海藏中间，只见那一块神珍铁，斗来粗细，二丈有余，霞光艳艳，瑞气腾腾。猴王道："这块铁，倒也不小，只是太粗太长了些。"他一边说，一边走上前，摸了一摸，道："若再短些、细些，便好用了。"\n\n说毕，那铁棒果然就短了几尺，细了一围。猴王又道："再短些！再细些！"他便又掣下来，如推金梭，不觉得手，呵一口气，叫声"再短些！再细些！"那宝贝真个又短了几寸，细了一围。\n\n猴王拿在手中，仔细一看，两头是两个金箍，中间是一段乌铁，紧挨着箍，有镌成的一行字，唤做"如意金箍棒"，重一万三千五百斤。\n\n猴王心中欢喜，拿出外面，丢了一个解数，嫌大，便叫声"小！小！小！"那棒就化作绣花针儿一般，可以塞在耳朵里面藏下。\n\n龙王见了，吓得魂飞魄散，道："这厮却把我的镇海神珍，都拿去了！"即便命人抬出奏乐，送猴王出去。\n\n猴王出了龙宫，坐在水帘洞中，取出金箍棒，叫声"长！"就长得高万丈，粗如山岳。他在洞中，摆弄神通，惊动了四方。\n\n毕竟不知向后如何，且听下回分解。'
            }
        ]
    }
};

/* ========== 全局状态 ========== */
var currentBook = null;
var currentChapterIdx = 0;
var touchStartX = 0;
var touchStartY = 0;

/* ========== 初始化 ========== */
function init() {
    _initProtection();
    applyTheme();
    parseURL();
    render();
    initTouchSwipe();
    initKeyboard();
    initChapterSelect();
}

function parseURL() {
    var params = new URLSearchParams(location.search);
    var bookId = params.get('book') || 'xiyouji';
    var ch = parseInt(params.get('chapter'));
    if (isNaN(ch)) ch = 0;
    currentChapterIdx = Math.max(0, ch);
    currentBook = BOOKS[bookId];
    if (!currentBook) currentBook = BOOKS['xiyouji'];
}

/* ========== 渲染 ========== */
function render() {
    var book = currentBook;
    var chapter = book.chapters[currentChapterIdx];

    document.title = '第' + numToChinese(chapter.id) + '回 ' + chapter.title + ' - 西游记 - 私人订制书窗';

    // 导航栏标题
    var titleEl = document.querySelector('.book-title');
    if (titleEl) titleEl.textContent = '西游记 · 第' + numToChinese(chapter.id) + '回';

    // 渲染正文
    renderChapter(chapter);

    // 更新底部信息
    updateNavState();
}

function renderChapter(chapter) {
    var container = document.getElementById('chapterContent');
    if (!container) return;

    var html = '';
    html += '<div class="chapter-header">';
    html += '<div class="chapter-idx">第' + numToChinese(chapter.id) + '回</div>';
    html += '<h1 class="chapter-title">' + escapeHtml(chapter.title) + '</h1>';
    if (chapter.titleEn) html += '<div class="chapter-title-en">' + escapeHtml(chapter.titleEn) + '</div>';
    html += '</div>';

    // 按行分割内容
    var lines = chapter.content.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line) continue;
        if (line.indexOf('第') === 0 && /回　/.test(line)) {
            // 跳过章节标题行（已在header中显示）
            continue;
        }
        if (line.indexOf('且听下回分解') !== -1 || line.indexOf('毕竟') !== -1) {
            html += '<p class="chapter-end">' + escapeHtml(line) + '</p>';
        } else {
            html += '<p class="chapter-para">' + escapeHtml(line) + '</p>';
        }
    }

    container.innerHTML = html;
}

/* ========== 翻页 ========== */
function goToChapter(idx) {
    if (idx < 0 || idx >= currentBook.chapters.length) return;
    currentChapterIdx = idx;
    render();
    scrollToTop();
    updateURL();
}

function nextChapter() {
    goToChapter(currentChapterIdx + 1);
}

function prevChapter() {
    goToChapter(currentChapterIdx - 1);
}

function goToChapterBySelect() {
    var sel = document.getElementById('chapterSelect');
    if (sel) goToChapter(parseInt(sel.value));
}

function updateNavState() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var footerInfo = document.getElementById('footerInfo');
    var progress = document.getElementById('progressBar');
    var sel = document.getElementById('chapterSelect');

    if (prevBtn) prevBtn.disabled = (currentChapterIdx === 0);
    if (nextBtn) nextBtn.disabled = (currentChapterIdx === currentBook.chapters.length - 1);
    if (footerInfo) footerInfo.textContent = (currentChapterIdx + 1) + ' / ' + currentBook.chapters.length;
    if (progress) {
        var pct = ((currentChapterIdx + 1) / currentBook.chapters.length * 100).toFixed(1);
        progress.style.width = pct + '%';
    }
    if (sel) sel.value = currentChapterIdx;
}

function scrollToTop() {
    var el = document.getElementById('chapterContent');
    if (el) el.scrollTop = 0;
    window.scrollTo(0, 0);
}

function updateURL() {
    var newUrl = location.pathname + '?chapter=' + currentChapterIdx;
    history.replaceState(null, '', newUrl);
}

/* ========== 章节选择下拉 ========== */
function initChapterSelect() {
    var sel = document.getElementById('chapterSelect');
    if (!sel) return;
    sel.innerHTML = '';
    var book = currentBook;
    for (var i = 0; i < book.chapters.length; i++) {
        var ch = book.chapters[i];
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = '第' + numToChinese(ch.id) + '回 ' + ch.title;
        if (i === currentChapterIdx) opt.selected = true;
        sel.appendChild(opt);
    }
    sel.addEventListener('change', goToChapterBySelect);
}

/* ========== 触摸滑动 ========== */
function initTouchSwipe() {
    var container = document.getElementById('chapterContent');
    if (!container) return;

    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        var touchEndY = e.changedTouches[0].screenY;
        var dx = touchEndX - touchStartX;
        var dy = touchEndY - touchStartY;

        // 水平滑动超过80px，且水平距离大于垂直距离
        if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                prevChapter(); // 向右滑 → 上一回
            } else {
                nextChapter(); // 向左滑 → 下一回
            }
        }
    }, { passive: true });
}

/* ========== 键盘翻页 ========== */
function initKeyboard() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevChapter(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); nextChapter(); }
        if (e.key === ' ') { e.preventDefault(); nextChapter(); }
    });
}

/* ========== 工具函数 ========== */
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function numToChinese(num) {
    var chars = ['零','一','二','三','四','五','六','七','八','九','十'];
    if (num <= 10) return chars[num];
    if (num < 20) return '十' + (num % 10 === 0 ? '' : chars[num % 10]);
    if (num < 100) {
        return chars[Math.floor(num / 10)] + '十' + (num % 10 === 0 ? '' : chars[num % 10]);
    }
    return String(num);
}

function applyTheme() {
    var theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'light') document.body.classList.add('light-theme');
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

/* 启动 */
document.addEventListener('DOMContentLoaded', init);

/* 暴露函数给HTML内联onclick使用 */
window.prevChapter = prevChapter;
window.nextChapter = nextChapter;
window.toggleTheme = toggleTheme;
window.goToChapterBySelect = goToChapterBySelect;
})();
