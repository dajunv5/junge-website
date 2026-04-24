/* ===== 私人订制书窗 - NASA科普双语阅读器 ===== */

(function() {
    'use strict';

    const _pwd = 'JunGe@2026';
    let _devUnlocked = false;
    let _warningShown = false;

    function _initProtection() {
        if (_devUnlocked) return;
        document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
        document.addEventListener('keydown', function(e) {
            if (_devUnlocked) return;
            if (e.key === 'F12') { e.preventDefault(); return; }
            if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return; }
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); return; }
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) { e.preventDefault(); return; }
        });
        document.addEventListener('selectstart', function(e) {
            if (_devUnlocked) return;
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            e.preventDefault();
        });
        document.addEventListener('dragstart', function(e) { if (!_devUnlocked) e.preventDefault(); });
    }

    // ===== 3本NASA书的双语课程数据 =====
    const BOOKS = {
        earth: {
            id: 'earth',
            titleEn: "All About Earth: Our World on Stage",
            titleCn: "关于地球：我们的世界大舞台",
            lessons: [
                {
                    id: 1, titleEn: "The School Play", titleCn: "学校话剧",
                    words: [
                        { en: "Earth system", cn: "地球系统" },
                        { en: "geosphere", cn: "岩石圈" },
                        { en: "hydrosphere", cn: "水圈" },
                        { en: "atmosphere", cn: "大气圈" },
                        { en: "biosphere", cn: "生物圈" }
                    ],
                    text: [
                        { en: "It is showtime! The students have been making costumes and practicing their lines for weeks.", cn: "演出时间到了！同学们已经做了好几周的服装，排练了好几遍台词。" },
                        { en: "Each student is playing the role of a different part of the Earth system in the school play.", cn: "在学校话剧里，每个同学扮演地球系统中的一个不同角色。" },
                        { en: "Simon is the Geosphere. He wears a rocky costume covered with soil, sand, and mountain shapes.", cn: "西蒙扮演岩石圈。他穿着一件布满泥土、沙子和山脉形状的岩石服装。" },
                        { en: "Anita is the Hydrosphere. Her costume flows like water, blue and shimmering.", cn: "安妮塔扮演水圈。她的服装像水一样流动，蓝色闪亮。" },
                        { en: "Dennis is the Atmosphere. He is wrapped in wispy clouds and carries a fan for wind.", cn: "丹尼斯扮演大气圈。他裹着薄薄的云雾，手里拿着一把扇子代表风。" },
                        { en: "And there is the Biosphere — all the living things on Earth, from tiny bugs to giant trees.", cn: "还有生物圈——地球上所有活着的东西，从微小的虫子到巨大的树木。" },
                        { en: "But wait, every actor thinks they have the most important role! Who is the real star of the show?", cn: "等等，每个演员都觉得自己演的角色最重要！到底谁才是这场戏的真正主角呢？" }
                    ]
                },
                {
                    id: 2, titleEn: "Geosphere Speaks", titleCn: "岩石圈发言",
                    words: [
                        { en: "mountain", cn: "山" },
                        { en: "volcano", cn: "火山" },
                        { en: "erosion", cn: "侵蚀" },
                        { en: "mineral", cn: "矿物" },
                        { en: "soil", cn: "土壤" }
                    ],
                    text: [
                        { en: "Simon steps forward. I am the Geosphere, the solid Earth beneath your feet!", cn: "西蒙走上前来。我是岩石圈，就是你们脚下坚实的地球！" },
                        { en: "Without me, there would be no land to stand on, no mountains to climb, no valleys to explore.", cn: "没有我，就没有可以站立的陆地，没有可以攀登的高山，没有可以探索的峡谷。" },
                        { en: "I hold all the minerals and rocks. Volcanoes erupt from deep within me, building new land.", cn: "我蕴藏着所有的矿物和岩石。火山从我深处喷发，建造新的陆地。" },
                        { en: "Rain and wind slowly wear me down, turning rock into soil where plants can grow.", cn: "雨水和风慢慢侵蚀我，把岩石变成土壤，让植物可以生长。" },
                        { en: "Everything starts with me! I am the foundation of the Earth system. I must be the star!", cn: "一切都从我开始！我是地球系统的基础。我一定才是主角！" }
                    ]
                },
                {
                    id: 3, titleEn: "Hydrosphere Speaks", titleCn: "水圈发言",
                    words: [
                        { en: "ocean", cn: "海洋" },
                        { en: "river", cn: "河流" },
                        { en: "glacier", cn: "冰川" },
                        { en: "evaporation", cn: "蒸发" },
                        { en: "water cycle", cn: "水循环" }
                    ],
                    text: [
                        { en: "Anita steps forward gracefully. Oh really, Simon? What about me, the Hydrosphere?", cn: "安妮塔优雅地走上前来。哦，是吗，西蒙？那我呢，水圈呢？" },
                        { en: "Water covers most of the Earth's surface. Oceans, rivers, lakes, and even ice — they are all part of me.", cn: "水覆盖了地球表面的大部分。海洋、河流、湖泊，甚至冰——它们都是我的一部分。" },
                        { en: "Without water, nothing could live. Plants need me to grow, animals need me to drink.", cn: "没有水，什么都活不了。植物需要我才能生长，动物需要我才能解渴。" },
                        { en: "I travel around the world through the water cycle. I evaporate from the ocean, form clouds, and fall as rain.", cn: "我通过水循环周游世界。我从海洋蒸发，形成云朵，然后化作雨水降落。" },
                        { en: "I shape the land by carving rivers and canyons. I am the star of this show!", cn: "我通过冲刷河流和峡谷来塑造大地。我才是这场戏的主角！" }
                    ]
                },
                {
                    id: 4, titleEn: "Atmosphere Speaks", titleCn: "大气圈发言",
                    words: [
                        { en: "oxygen", cn: "氧气" },
                        { en: "weather", cn: "天气" },
                        { en: "greenhouse effect", cn: "温室效应" },
                        { en: "wind", cn: "风" },
                        { en: "protect", cn: "保护" }
                    ],
                    text: [
                        { en: "Dennis waves his fan proudly. Wait, wait, wait! You both need me!", cn: "丹尼斯骄傲地挥动扇子。等等，等等！你们都需要我！" },
                        { en: "I am the Atmosphere, the invisible blanket of air that surrounds the Earth.", cn: "我是大气圈，包裹着地球的看不见的空气毯子。" },
                        { en: "I hold the oxygen you breathe and the carbon dioxide plants need. Without me, there is no breathing!", cn: "我承载着你们呼吸的氧气和植物需要的二氧化碳。没有我，就无法呼吸！" },
                        { en: "I protect the Earth from the Sun's harmful rays. I keep the planet warm enough to live on.", cn: "我保护地球免受太阳有害射线的伤害。我让地球保持足够温暖来维持生命。" },
                        { en: "I create weather — wind, rain, snow, and storms. Life would be impossible without me. I am the real star!", cn: "我创造天气——风、雨、雪和暴风雨。没有我，生命根本不可能存在。我才是真正的主角！" }
                    ]
                },
                {
                    id: 5, titleEn: "Biosphere and the Sun", titleCn: "生物圈和太阳",
                    words: [
                        { en: "energy", cn: "能量" },
                        { en: "photosynthesis", cn: "光合作用" },
                        { en: "food chain", cn: "食物链" },
                        { en: "habitat", cn: "栖息地" },
                        { en: "sunlight", cn: "阳光" }
                    ],
                    text: [
                        { en: "Now the Biosphere steps forward. I am all the living things on Earth — every plant, animal, and tiny microbe.", cn: "现在生物圈走上前来。我是地球上所有活着的东西——每一棵植物、每一只动物和每一个微小的细菌。" },
                        { en: "I depend on the Geosphere for soil, on the Hydrosphere for water, and on the Atmosphere for air.", cn: "我依赖岩石圈提供土壤，依赖水圈提供水，依赖大气圈提供空气。" },
                        { en: "But wait, where does the energy come from that makes everything work? The Sun!", cn: "但是等等，让一切运转的能量从哪里来？太阳！" },
                        { en: "Plants capture the Sun's energy through photosynthesis. Animals eat plants. The energy flows through the food chain.", cn: "植物通过光合作用捕获太阳的能量。动物吃植物。能量沿着食物链流动。" },
                        { en: "Without the Sun, there would be no warmth, no light, no food. The Sun is what makes the whole Earth system go!", cn: "没有太阳，就没有温暖，没有光明，没有食物。太阳是驱动整个地球系统的力量！" }
                    ]
                },
                {
                    id: 6, titleEn: "We All Need Each Other", titleCn: "我们彼此需要",
                    words: [
                        { en: "connected", cn: "相连的" },
                        { en: "interact", cn: "相互作用" },
                        { en: "balance", cn: "平衡" },
                        { en: "system", cn: "系统" },
                        { en: "together", cn: "一起" }
                    ],
                    text: [
                        { en: "The actors look at each other. They realize something important.", cn: "演员们互相看了看。他们意识到了一件重要的事情。" },
                        { en: "The Geosphere needs water to shape the land. The Hydrosphere needs the atmosphere to carry water as clouds.", cn: "岩石圈需要水来塑造地形。水圈需要大气圈把水变成云朵运来运去。" },
                        { en: "The Atmosphere needs plants to make oxygen. The Biosphere needs soil, water, and air to survive.", cn: "大气圈需要植物来制造氧气。生物圈需要土壤、水和空气才能生存。" },
                        { en: "And everything needs the Sun's energy to keep going.", cn: "而一切都需要太阳的能量才能持续运转。" },
                        { en: "They are all connected! No single part can work alone. The Earth system is like a team where every player matters.", cn: "它们都是相连的！没有任何一个部分能单独运转。地球系统就像一支队伍，每个队员都很重要。" },
                        { en: "The students smile and take a bow together. There is no single star — the Earth system is the star!", cn: "同学们笑了，一起鞠躬。没有单独的主角——地球系统才是主角！" }
                    ]
                }
            ]
        },
        clouds: {
            id: 'clouds',
            titleEn: "Do You Know That Clouds Have Names?",
            titleCn: "你知道云也有名字吗？",
            lessons: [
                {
                    id: 1, titleEn: "Looking Up", titleCn: "仰望天空",
                    words: [
                        { en: "cloud", cn: "云" },
                        { en: "sky", cn: "天空" },
                        { en: "observe", cn: "观察" },
                        { en: "shape", cn: "形状" },
                        { en: "altitude", cn: "高度" }
                    ],
                    text: [
                        { en: "Simon, Anita, and Dennis are lying on the grass, looking up at the sky.", cn: "西蒙、安妮塔和丹尼斯躺在草地上，仰望着天空。" },
                        { en: "Look at that cloud! It looks like a fluffy sheep! says Anita.", cn: "看那朵云！它看起来像一只毛茸茸的绵羊！安妮塔说。" },
                        { en: "And that one looks like a horse's tail, says Simon, pointing at a thin, wispy cloud high above.", cn: "那朵看起来像马尾巴，西蒙指着一朵高高飘浮的纤细云彩说。" },
                        { en: "Do clouds have names? Dennis wonders. Just like we have names for animals and plants?", cn: "云有名字吗？丹尼斯好奇地问。就像我们给动物和植物起名字一样？" },
                        { en: "Yes! Clouds do have names. Let me tell you about them! says a friendly park ranger walking by.", cn: "有！云确实有名字。让我来告诉你们吧！一位路过的友善的公园管理员说。" }
                    ]
                },
                {
                    id: 2, titleEn: "Cirrus Clouds", titleCn: "卷云",
                    words: [
                        { en: "cirrus", cn: "卷云" },
                        { en: "wispy", cn: "纤细的" },
                        { en: "ice crystal", cn: "冰晶" },
                        { en: "high altitude", cn: "高海拔" },
                        { en: "mare's tail", cn: "马尾云" }
                    ],
                    text: [
                        { en: "The highest clouds are called cirrus clouds. The word cirrus means curl of hair.", cn: "最高的云叫做卷云。卷云这个词的意思是"一缕头发"。" },
                        { en: "Cirrus clouds look like thin, wispy strands — like a horse's tail blowing in the wind.", cn: "卷云看起来像细细的、轻柔的丝线——就像在风中飘动的马尾巴。" },
                        { en: "Because they are so high up, they are made of tiny ice crystals instead of water droplets.", cn: "因为它们很高，所以是由微小的冰晶而不是水滴组成的。" },
                        { en: "You can see cirrus clouds on a clear, sunny day, way up high in the sky.", cn: "在晴朗的日子里，你可以在天空中很高的地方看到卷云。" },
                        { en: "When you see cirrus clouds, it often means a change in the weather is coming.", cn: "当你看到卷云时，通常意味着天气将要变化。" }
                    ]
                },
                {
                    id: 3, titleEn: "Cumulus Clouds", titleCn: "积云",
                    words: [
                        { en: "cumulus", cn: "积云" },
                        { en: "puffy", cn: "蓬松的" },
                        { en: "cauliflower", cn: "花菜" },
                        { en: "fair weather", cn: "好天气" },
                        { en: "convect", cn: "对流" }
                    ],
                    text: [
                        { en: "Cumulus clouds are the puffy, white clouds that look like cotton balls or cauliflower.", cn: "积云是蓬松的白云，看起来像棉花球或花菜。" },
                        { en: "The word cumulus means heap or pile in Latin. These clouds are piled up with flat bottoms.", cn: "积云这个词在拉丁语中是"堆"的意思。这些云堆叠起来，底部平坦。" },
                        { en: "Cumulus clouds usually mean fair weather. They are the happy clouds on a nice day!", cn: "积云通常意味着好天气。它们是晴朗日子里快乐的云！" },
                        { en: "But if cumulus clouds grow very tall, they can turn into cumulonimbus clouds — thunderstorm clouds!", cn: "但如果积云长得非常高，它们就可能变成积雨云——雷暴云！" },
                        { en: "Warm air rises and creates these clouds. The higher the warm air goes, the taller the cumulus grows.", cn: "温暖的空气上升形成这些云。暖空气升得越高，积云就长得越高。" }
                    ]
                },
                {
                    id: 4, titleEn: "Stratus Clouds", titleCn: "层云",
                    words: [
                        { en: "stratus", cn: "层云" },
                        { en: "layer", cn: "层" },
                        { en: "blanket", cn: "毯子" },
                        { en: "overcast", cn: "阴天" },
                        { en: "fog", cn: "雾" }
                    ],
                    text: [
                        { en: "Stratus clouds form a flat, gray layer across the sky, like a blanket covering everything.", cn: "层云在天空中形成一层平坦的灰色，像一条毯子覆盖着一切。" },
                        { en: "The word stratus means layer. These clouds often cover the whole sky on an overcast day.", cn: "层云这个词的意思是"层"。在阴天，这些云经常覆盖整个天空。" },
                        { en: "When stratus clouds are very low, they touch the ground — that is what we call fog!", cn: "当层云非常低时，它们会接触地面——那就是我们所说的雾！" },
                        { en: "Stratus clouds usually bring gentle rain or drizzle, not heavy storms.", cn: "层云通常带来细雨或毛毛雨，而不是猛烈的暴风雨。" },
                        { en: "On a gray, cloudy day, you are probably looking at stratus clouds.", cn: "在灰蒙蒙的阴天，你看到的很可能就是层云。" }
                    ]
                },
                {
                    id: 5, titleEn: "Clouds That Bring Rain", titleCn: "带来雨的云",
                    words: [
                        { en: "nimbus", cn: "雨云" },
                        { en: "cumulonimbus", cn: "积雨云" },
                        { en: "nimbostratus", cn: "雨层云" },
                        { en: "thunderstorm", cn: "雷暴" },
                        { en: "lightning", cn: "闪电" }
                    ],
                    text: [
                        { en: "Some clouds bring rain, snow, or storms. The word nimbus means rain cloud.", cn: "有些云会带来雨、雪或暴风雨。nimbus这个词就是雨云的意思。" },
                        { en: "Cumulonimbus clouds are the giants of the sky — tall, dark, and full of energy.", cn: "积雨云是天空中的巨人——又高又暗，充满能量。" },
                        { en: "They bring thunderstorms with heavy rain, lightning, and sometimes even tornadoes!", cn: "它们带来雷暴，伴随着暴雨、闪电，有时甚至会带来龙卷风！" },
                        { en: "Nimbostratus clouds are dark gray layers that bring steady, long-lasting rain.", cn: "雨层云是深灰色的云层，带来持续不断的雨。" },
                        { en: "When you see dark clouds building up, it might be time to go inside!", cn: "当你看到乌云密布的时候，可能就该进屋了！" }
                    ]
                },
                {
                    id: 6, titleEn: "Contrails — Human-Made Clouds", titleCn: "航迹云——人造的云",
                    words: [
                        { en: "contrail", cn: "航迹云" },
                        { en: "airplane", cn: "飞机" },
                        { en: "exhaust", cn: "排气" },
                        { en: "persistent", cn: "持续的" },
                        { en: "spread", cn: "扩散" }
                    ],
                    text: [
                        { en: "Have you ever seen a long white line across the sky left by an airplane? That is a contrail!", cn: "你有没有见过飞机在天上留下的长长白线？那就是航迹云！" },
                        { en: "Contrails are human-made clouds. They form when hot, moist air from the airplane engine meets the cold air high up.", cn: "航迹云是人造的云。当飞机引擎排出的又热又湿的空气遇到高空的冷空气时，它们就形成了。" },
                        { en: "There are three types of contrails. Short-lived ones disappear quickly, like writing in the sky that fades away.", cn: "航迹云有三种。短存的航迹云很快就会消失，就像写在天空中的字慢慢褪去。" },
                        { en: "Persistent contrails stay in the sky as long white lines. They do not fade quickly.", cn: "持续的航迹云作为长长的白线留在天空中。它们不会很快消失。" },
                        { en: "Persistent spreading contrails grow wider and wider, eventually turning into thin cirrus clouds!", cn: "持续扩散的航迹云越变越宽，最终变成薄薄的卷云！" }
                    ]
                }
            ]
        },
        iss: {
            id: 'iss',
            titleEn: "Amazing International Space Station",
            titleCn: "神奇的国际空间站",
            lessons: [
                {
                    id: 1, titleEn: "What Is the ISS?", titleCn: "国际空间站是什么？",
                    words: [
                        { en: "International Space Station", cn: "国际空间站" },
                        { en: "orbit", cn: "轨道" },
                        { en: "astronaut", cn: "宇航员" },
                        { en: "laboratory", cn: "实验室" },
                        { en: "microgravity", cn: "微重力" }
                    ],
                    text: [
                        { en: "High above the Earth, traveling at 17,500 miles per hour, circles the International Space Station, or ISS.", cn: "在地球上方，以每小时17500英里的速度运行着的，就是国际空间站，简称ISS。" },
                        { en: "The ISS is a giant laboratory floating in space. Astronauts from many countries live and work there.", cn: "国际空间站是一个漂浮在太空中的巨大实验室。来自许多国家的宇航员在那里生活和工作。" },
                        { en: "It orbits about 250 miles above the Earth — about as far as Dallas is from Houston, only straight up!", cn: "它在距地球约250英里的轨道上运行——大约和达拉斯到休斯顿的距离一样远，只不过是垂直向上！" },
                        { en: "In the microgravity environment of the ISS, things float! Water forms spheres, and flames burn differently.", cn: "在空间站的微重力环境中，东西会飘浮！水会形成球体，火焰燃烧的方式也不同。" },
                        { en: "You can actually see the ISS from the ground! It is brighter than the planet Venus in the night sky.", cn: "你其实可以从地面上看到国际空间站！它在夜空中比金星还要亮。" }
                    ]
                },
                {
                    id: 2, titleEn: "Parts of the Space Station", titleCn: "空间站的组成部分",
                    words: [
                        { en: "solar array", cn: "太阳能电池板" },
                        { en: "module", cn: "舱段" },
                        { en: "truss", cn: "桁架" },
                        { en: "radiator", cn: "散热器" },
                        { en: "robotic arm", cn: "机械臂" }
                    ],
                    text: [
                        { en: "The ISS is like a giant erector set in space, with many parts connected together.", cn: "国际空间站就像太空中的巨大积木，由许多部件连接在一起。" },
                        { en: "Solar arrays stretch out like giant wings, turning sunlight into electricity to power everything.", cn: "太阳能电池板像巨大的翅膀一样伸展出去，把阳光变成电力来驱动一切。" },
                        { en: "Modules are the rooms where astronauts live, sleep, eat, and do experiments. They are shaped like big soup cans.", cn: "舱段是宇航员生活、睡觉、吃饭和做实验的房间。它们的形状像大大的汤罐头。" },
                        { en: "The truss is a giant beam that holds everything together — solar arrays, radiators, and modules.", cn: "桁架是一根巨大的横梁，把所有东西固定在一起——太阳能电池板、散热器和舱段。" },
                        { en: "Canada's robotic arm can move people, equipment, and even spacecraft around the station!", cn: "加拿大的机械臂可以在空间站周围移动人员、设备，甚至航天器！" }
                    ]
                },
                {
                    id: 3, titleEn: "Life on the Space Station", titleCn: "空间站上的生活",
                    words: [
                        { en: "weightless", cn: "失重的" },
                        { en: "exercise", cn: "锻炼" },
                        { en: "sleeping bag", cn: "睡袋" },
                        { en: "space food", cn: "太空食品" },
                        { en: "spacewalk", cn: "太空行走" }
                    ],
                    text: [
                        { en: "Life on the ISS is very different from life on Earth. Everything floats in microgravity!", cn: "国际空间站上的生活和地球上完全不同。在微重力环境中，一切都会漂浮！" },
                        { en: "Astronauts sleep in sleeping bags strapped to the wall, so they do not float around while sleeping.", cn: "宇航员睡在固定在墙上的睡袋里，这样睡觉时就不会飘来飘去。" },
                        { en: "Food comes in special packages. Astronauts eat tortillas instead of bread because bread crumbs would float everywhere!", cn: "食物装在特殊的包装里。宇航员吃玉米饼而不是面包，因为面包屑会到处飘！" },
                        { en: "They must exercise for at least two hours every day to keep their muscles and bones strong.", cn: "他们每天必须锻炼至少两个小时，才能保持肌肉和骨骼强壮。" },
                        { en: "Sometimes astronauts go outside for a spacewalk to repair equipment or do experiments. They wear special suits to protect them.", cn: "有时宇航员会进行太空行走到外面修理设备或做实验。他们穿着特殊的宇航服来保护自己。" }
                    ]
                },
                {
                    id: 4, titleEn: "Countries Working Together", titleCn: "各国携手合作",
                    words: [
                        { en: "partner", cn: "合作伙伴" },
                        { en: "spacecraft", cn: "航天器" },
                        { en: "Dragon", cn: "龙飞船" },
                        { en: "Soyuz", cn: "联盟号" },
                        { en: "collaborate", cn: "合作" }
                    ],
                    text: [
                        { en: "The ISS is the result of many countries working together — the United States, Russia, Japan, Europe, and Canada.", cn: "国际空间站是许多国家共同合作的成果——美国、俄罗斯、日本、欧洲和加拿大。" },
                        { en: "Over 100,000 people around the world worked together to make the Space Station possible.", cn: "全世界超过10万人共同努力，才使空间站成为可能。" },
                        { en: "Different countries provide different spacecraft. Russia sends the Soyuz to carry astronauts.", cn: "不同的国家提供不同的航天器。俄罗斯发送联盟号来运送宇航员。" },
                        { en: "The United States sends the Dragon spacecraft to bring supplies and astronauts to the station.", cn: "美国发送龙飞船来运送物资和宇航员到空间站。" },
                        { en: "When people from different countries collaborate, amazing things can happen!", cn: "当来自不同国家的人们合作时，就能创造奇迹！" }
                    ]
                },
                {
                    id: 5, titleEn: "Space Station Fun Facts", titleCn: "空间站趣味知识",
                    words: [
                        { en: "fact", cn: "事实" },
                        { en: "wiring", cn: "线路" },
                        { en: "computer", cn: "计算机" },
                        { en: "vaccine", cn: "疫苗" },
                        { en: "research", cn: "研究" }
                    ],
                    text: [
                        { en: "The ISS has about 8 miles of electrical wiring running through it!", cn: "国际空间站里有大约8英里长的电线！" },
                        { en: "Over 50 computers keep all the station's systems running smoothly.", cn: "超过50台计算机保持空间站所有系统顺利运行。" },
                        { en: "The living space is about the size of a six-bedroom house, with a gym and amazing views!", cn: "生活空间大约相当于一栋六居室的房子，有健身房和令人惊叹的景色！" },
                        { en: "Toilets on the ISS work like vacuum cleaners, and most water is recycled — even from sweat and breath!", cn: "空间站上的厕所像吸尘器一样工作，大部分水都被回收利用——甚至包括汗水和呼吸中的水！" },
                        { en: "Research on the station has helped create a possible vaccine for salmonella, a dangerous food-poisoning illness.", cn: "空间站上的研究帮助研发了一种可能对抗沙门氏菌的疫苗，这是一种危险的食物中毒疾病。" }
                    ]
                },
                {
                    id: 6, titleEn: "The Future of Space", titleCn: "太空的未来",
                    words: [
                        { en: "Moon", cn: "月球" },
                        { en: "Mars", cn: "火星" },
                        { en: "explore", cn: "探索" },
                        { en: "discover", cn: "发现" },
                        { en: "mission", cn: "任务" }
                    ],
                    text: [
                        { en: "The ISS is helping us learn how to live and work in space for long periods.", cn: "国际空间站帮助我们学习如何在太空中长期生活和工作。" },
                        { en: "What we learn on the ISS will help us travel farther — to the Moon and even to Mars!", cn: "我们在空间站学到的知识将帮助我们走得更远——到月球，甚至到火星！" },
                        { en: "New rockets are being designed to carry astronauts on these exciting missions.", cn: "新型火箭正在设计之中，将搭载宇航员执行这些令人兴奋的任务。" },
                        { en: "Maybe one day, you will be the astronaut looking down at Earth from a spaceship!", cn: "也许有一天，你将成为从宇宙飞船上俯瞰地球的宇航员！" },
                        { en: "The stars are waiting. Keep learning, keep dreaming, and reach for the sky!", cn: "星星在等待着你。继续学习，继续梦想，向天空进发吧！" }
                    ]
                }
            ]
        }
    };

    // ===== State =====
    let currentBook = null;
    let currentLesson = 1;
    let fontSize = 16;
    let isLightTheme = false;
    let speechRate = 0.35;
    let activeParagraph = -1;

    // ===== Voice Selection (甜美女声) =====
    let _cnVoice = null, _enVoice = null;
    function _findMandarinVoice() {
        if (_cnVoice) return _cnVoice;
        if (!window.speechSynthesis) return null;
        const voices = window.speechSynthesis.getVoices();
        if (!voices.length) return null;
        const femaleNames = ['xiaoXiao','xiaoxiao','XiaoYi','xiaoyi','ting-ting','Ting-Ting','lili','Lili','yaoyao','Google 普通话'];
        for (const name of femaleNames) {
            const found = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()) && (v.lang === 'zh-CN' || v.lang.startsWith('cmn') || (v.lang.startsWith('zh') && !v.lang.includes('HK') && !v.lang.includes('TW'))));
            if (found) { _cnVoice = found; return _cnVoice; }
        }
        _cnVoice = voices.find(v => v.lang === 'zh-CN') || voices.find(v => v.lang.startsWith('cmn'));
        return _cnVoice;
    }
    function _findEnglishFemaleVoice() {
        if (_enVoice) return _enVoice;
        if (!window.speechSynthesis) return null;
        const voices = window.speechSynthesis.getVoices();
        if (!voices.length) return null;
        const femaleNames = ['samantha','karen','victoria','zira','hazel','susan','fiona','Google US English','Microsoft Zira'];
        for (const name of femaleNames) {
            const found = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()) && v.lang.startsWith('en'));
            if (found) { _enVoice = found; return _enVoice; }
        }
        _enVoice = voices.find(v => v.lang === 'en-US');
        return _enVoice;
    }
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = function() { _cnVoice = null; _enVoice = null; _findMandarinVoice(); _findEnglishFemaleVoice(); };
        _findMandarinVoice(); _findEnglishFemaleVoice();
    }

    // ===== Text cleaning =====
    function _cleanText(text, lang) {
        if (lang === 'en') return text.replace(/[^a-zA-Z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim();
        return text.replace(/[^\u4e00-\u9fff\u3400-\u4dbf0-9a-zA-Z\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // ===== Speech functions =====
    window._speakWord = function(word) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const clean = _cleanText(word, 'en');
        if (!clean) return;
        const u = new SpeechSynthesisUtterance(clean);
        const enVoice = _findEnglishFemaleVoice();
        if (enVoice) u.voice = enVoice;
        u.lang = 'en-US'; u.rate = Math.max(0.3, speechRate * 0.85); u.pitch = 1.15;
        window.speechSynthesis.speak(u);
    };
    window._speakPara = function(el) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const rawText = el.getAttribute('data-text');
        const lang = el.getAttribute('data-lang');
        const clean = _cleanText(rawText, lang);
        if (!clean) return;
        const u = new SpeechSynthesisUtterance(clean);
        if (lang === 'en') {
            const enVoice = _findEnglishFemaleVoice();
            if (enVoice) u.voice = enVoice;
            u.lang = 'en-US'; u.rate = Math.max(0.3, speechRate * 0.85); u.pitch = 1.15;
        } else {
            const cnVoice = _findMandarinVoice();
            if (cnVoice) u.voice = cnVoice;
            u.lang = 'zh-CN'; u.rate = Math.max(0.3, speechRate * 0.9); u.pitch = 1.1;
        }
        el.classList.add('speaking');
        u.onend = function() { el.classList.remove('speaking'); };
        u.onerror = function() { el.classList.remove('speaking'); };
        window.speechSynthesis.speak(u);
    };
    window._speakAll = function(lang) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const bodyId = lang === 'en' ? 'enBody' : 'cnBody';
        const paras = document.querySelectorAll('#' + bodyId + ' .text-paragraph');
        if (!paras.length) return;
        let fullText = '';
        paras.forEach(p => { const clean = _cleanText(p.getAttribute('data-text'), lang); if (clean) fullText += clean + '  '; });
        fullText = fullText.trim();
        if (!fullText) return;
        const u = new SpeechSynthesisUtterance(fullText);
        if (lang === 'en') {
            const enVoice = _findEnglishFemaleVoice(); if (enVoice) u.voice = enVoice;
            u.lang = 'en-US'; u.rate = Math.max(0.3, speechRate * 0.85); u.pitch = 1.15;
        } else {
            const cnVoice = _findMandarinVoice(); if (cnVoice) u.voice = cnVoice;
            u.lang = 'zh-CN'; u.rate = Math.max(0.3, speechRate * 0.9); u.pitch = 1.1;
        }
        window.speechSynthesis.speak(u);
        paras.forEach(p => p.classList.remove('speaking'));
        if (paras[0]) paras[0].classList.add('speaking');
        const rateFactor = 1.0 / Math.max(0.3, speechRate);
        let accTime = 0;
        paras.forEach((p, i) => {
            const charCount = p.getAttribute('data-text').length;
            const delay = (lang === 'en' ? charCount * 65 + 300 : charCount * 90 + 300) * rateFactor;
            accTime += delay;
            setTimeout(() => { paras.forEach(pp => pp.classList.remove('speaking')); if (i + 1 < paras.length) paras[i + 1].classList.add('speaking'); }, accTime);
        });
        setTimeout(() => { paras.forEach(p => p.classList.remove('speaking')); }, accTime + 2000);
    };

    // ===== Paragraph click (notes not needed for NASA, just highlight) =====
    window._onParaClick = function(el) { /* no-op for NASA books */ };

    // ===== Main App =====
    function renderApp() {
        // Determine book from URL
        const params = new URLSearchParams(window.location.search);
        const bookId = params.get('book') || 'earth';
        currentBook = BOOKS[bookId] || BOOKS.earth;
        const TOTAL = currentBook.lessons.length;

        // Restore state
        const savedFont = localStorage.getItem('nasa_fontsize');
        if (savedFont) fontSize = parseInt(savedFont);
        const savedSpeed = localStorage.getItem('nasa_speed');
        if (savedSpeed) speechRate = parseFloat(savedSpeed);
        const savedTheme = localStorage.getItem('nasa_theme');
        if (savedTheme === 'light') { isLightTheme = true; document.body.classList.add('light-theme'); }
        const lessonParam = params.get('lesson');
        if (lessonParam) { const n = parseInt(lessonParam); if (n >= 1 && n <= TOTAL) currentLesson = n; }

        // Build UI
        const root = document.getElementById('app-root');
        root.innerHTML = `
            <nav class="reader-nav">
                <a href="index.html" class="nav-back"><i class="fas fa-chevron-left"></i> <span>返回首页</span></a>
                <div class="book-title" id="bookTitle">${currentBook.titleCn}</div>
                <div class="nav-controls" style="position:relative;">
                    <select class="lesson-select" id="lessonSelect">
                        ${currentBook.lessons.map(l => `<option value="${l.id}">${l.titleEn} / ${l.titleCn}</option>`).join('')}
                    </select>
                    <button class="nav-btn" id="themeBtn" title="切换主题"><i class="fas fa-moon"></i></button>
                    <div style="position:relative;">
                        <button class="nav-btn" id="fontBtn" title="字体大小"><i class="fas fa-text-height"></i></button>
                        <div class="font-panel" id="fontPanel">
                            <div class="font-panel-label">字体大小</div>
                            <input type="range" class="font-slider" id="fontSlider" min="12" max="24" step="1">
                            <div class="font-size-preview" id="fontPreview">16px</div>
                        </div>
                    </div>
                    <div style="position:relative;">
                        <button class="nav-btn" id="speedBtn" title="朗读速度"><i class="fas fa-gauge-high"></i></button>
                        <div class="speed-panel" id="speedPanel">
                            <div class="font-panel-label">朗读速度</div>
                            <input type="range" class="font-slider" id="speedSlider" min="2" max="20" step="1">
                            <div class="font-size-preview" id="speedPreview">0.4x</div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="progress-bar-container"><div class="progress-bar" id="progressBar"></div></div>
            <div class="reader-page" id="readerPage"><div class="reader-content" id="readerContent"></div></div>
            <div class="reader-footer">
                <button class="footer-nav-btn" id="prevBtn"><i class="fas fa-chevron-left"></i> <span class="nav-label">上一课</span></button>
                <div class="footer-info"><span id="progressText">1 / ${TOTAL}</span></div>
                <button class="footer-nav-btn" id="nextBtn"><span class="nav-label">下一课</span> <i class="fas fa-chevron-right"></i></button>
            </div>`;

        document.title = currentBook.titleCn + ' - 私人订制书窗';

        // Setup controls
        const select = document.getElementById('lessonSelect');
        select.value = currentLesson;
        select.addEventListener('change', function() { navigateTo(parseInt(this.value)); });

        document.getElementById('themeBtn').addEventListener('click', toggleTheme);
        updateThemeIcon();

        // Font
        const fontBtn = document.getElementById('fontBtn'), fontPanel = document.getElementById('fontPanel');
        const fontSlider = document.getElementById('fontSlider'), fontPreview = document.getElementById('fontPreview');
        fontBtn.addEventListener('click', e => { e.stopPropagation(); fontPanel.classList.toggle('show'); document.getElementById('speedPanel').classList.remove('show'); });
        document.addEventListener('click', e => { if (!fontPanel.contains(e.target) && e.target !== fontBtn) fontPanel.classList.remove('show'); });
        fontSlider.value = fontSize; fontPreview.textContent = fontSize + 'px';
        fontSlider.addEventListener('input', function() { fontSize = parseInt(this.value); fontPreview.textContent = fontSize + 'px'; document.documentElement.style.setProperty('--reader-font-size', fontSize + 'px'); localStorage.setItem('nasa_fontsize', fontSize); });
        document.documentElement.style.setProperty('--reader-font-size', fontSize + 'px');

        // Speed
        const speedBtn = document.getElementById('speedBtn'), speedPanel = document.getElementById('speedPanel');
        const speedSlider = document.getElementById('speedSlider'), speedPreview = document.getElementById('speedPreview');
        speedBtn.addEventListener('click', e => { e.stopPropagation(); speedPanel.classList.toggle('show'); fontPanel.classList.remove('show'); });
        document.addEventListener('click', e => { if (!speedPanel.contains(e.target) && e.target !== speedBtn) speedPanel.classList.remove('show'); });
        speedSlider.value = Math.round(speechRate * 10); speedPreview.textContent = speechRate.toFixed(1) + 'x';
        speedSlider.addEventListener('input', function() { speechRate = parseInt(this.value) / 10; speedPreview.textContent = speechRate.toFixed(1) + 'x'; localStorage.setItem('nasa_speed', speechRate); });

        // Navigation
        document.getElementById('prevBtn').addEventListener('click', () => { if (currentLesson > 1) navigateTo(currentLesson - 1); });
        document.getElementById('nextBtn').addEventListener('click', () => { if (currentLesson < TOTAL) navigateTo(currentLesson + 1); });
        document.addEventListener('keydown', e => {
            if (e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowLeft' && currentLesson > 1) navigateTo(currentLesson - 1);
            if (e.key === 'ArrowRight' && currentLesson < TOTAL) navigateTo(currentLesson + 1);
        });

        _initProtection();
        renderLesson(currentLesson);
    }

    function navigateTo(lessonId) {
        currentLesson = lessonId;
        renderLesson(lessonId);
        document.getElementById('lessonSelect').value = lessonId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const url = new URL(window.location);
        url.searchParams.set('lesson', lessonId);
        history.replaceState(null, '', url);
    }

    function renderLesson(lessonId) {
        const lesson = currentBook.lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        const content = document.getElementById('readerContent');
        const TOTAL = currentBook.lessons.length;
        let html = `<div class="lesson-header"><div class="lesson-number">${lesson.titleEn}</div><div class="lesson-title">${lesson.titleEn}</div><div class="lesson-title-cn">${lesson.titleCn}</div></div>`;

        if (lesson.words && lesson.words.length > 0) {
            html += `<div class="words-section"><div class="words-label"><i class="fas fa-spell-check"></i> New Words / 生词</div><div class="words-grid">${lesson.words.map(w => `<div class="word-tag" onclick="window._speakWord('${w.en.replace(/'/g, "\\'")}')"><span class="word-en">${w.en}</span><span class="word-cn">${w.cn}</span><span class="word-speak"><i class="fas fa-volume-up"></i></span></div>`).join('')}</div></div>`;
        }

        html += `<div class="bilingual-layout">
            <div class="lang-column">
                <div class="lang-header en"><i class="fas fa-font"></i> English <button class="speak-all-btn" onclick="window._speakAll('en')" title="朗读全部英文"><i class="fas fa-volume-up"></i></button></div>
                <div class="lang-body" id="enBody">${lesson.text.map((t, i) => `<div class="text-paragraph" data-idx="${i}" data-lang="en" data-text="${t.en.replace(/"/g, '&quot;')}"><span class="para-text">${t.en}</span><button class="para-speak" onclick="event.stopPropagation(); window._speakPara(this.parentElement)" title="朗读此句"><i class="fas fa-volume-up"></i></button></div>`).join('')}</div>
            </div>
            <div class="lang-column">
                <div class="lang-header cn"><i class="fas fa-language"></i> 中文 <button class="speak-all-btn" onclick="window._speakAll('cn')" title="朗读全部中文"><i class="fas fa-volume-up"></i></button></div>
                <div class="lang-body" id="cnBody">${lesson.text.map((t, i) => `<div class="text-paragraph" data-idx="${i}" data-lang="cn" data-text="${t.cn.replace(/"/g, '&quot;')}"><span class="para-text">${t.cn}</span><button class="para-speak" onclick="event.stopPropagation(); window._speakPara(this.parentElement)" title="朗读此句"><i class="fas fa-volume-up"></i></button></div>`).join('')}</div>
            </div>
        </div>`;

        content.innerHTML = html;

        // Progress
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        progressBar.style.width = (lessonId / TOTAL * 100) + '%';
        progressText.textContent = lessonId + ' / ' + TOTAL;
        document.getElementById('prevBtn').disabled = lessonId <= 1;
        document.getElementById('nextBtn').disabled = lessonId >= TOTAL;

        // Paragraph hover
        setupParagraphHover();
    }

    function setupParagraphHover() {
        const enParas = document.querySelectorAll('#enBody .text-paragraph');
        const cnParas = document.querySelectorAll('#cnBody .text-paragraph');
        enParas.forEach((p, i) => { p.addEventListener('mouseenter', () => { enParas.forEach((pp, j) => pp.classList.toggle('active', j === i)); cnParas.forEach((pp, j) => pp.classList.toggle('active', j === i)); }); p.addEventListener('mouseleave', () => { enParas.forEach(pp => pp.classList.remove('active')); cnParas.forEach(pp => pp.classList.remove('active')); }); });
        cnParas.forEach((p, i) => { p.addEventListener('mouseenter', () => { enParas.forEach((pp, j) => pp.classList.toggle('active', j === i)); cnParas.forEach((pp, j) => pp.classList.toggle('active', j === i)); }); p.addEventListener('mouseleave', () => { enParas.forEach(pp => pp.classList.remove('active')); cnParas.forEach(pp => pp.classList.remove('active')); }); });
    }

    function toggleTheme() {
        isLightTheme = !isLightTheme;
        document.body.classList.toggle('light-theme', isLightTheme);
        localStorage.setItem('nasa_theme', isLightTheme ? 'light' : 'dark');
        updateThemeIcon();
    }
    function updateThemeIcon() {
        const btn = document.getElementById('themeBtn');
        if (!btn) return;
        btn.innerHTML = isLightTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    document.addEventListener('DOMContentLoaded', renderApp);
})();
