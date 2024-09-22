import { Lunar, Solar } from 'lunar-javascript'; // 假设你已经引入了 Solar 类

const heavenlyStemsZh = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranchesZh = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const heavenlyStemsEn = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const earthlyBranchesEn = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

// 获取年、月、日、时的天干地支（基于农历库），天干地支分开
function getGanZhi(lunar, lang = 'zh') {
    const heavenlyStems = lang === 'zh' ? heavenlyStemsZh : heavenlyStemsEn;
    const earthlyBranches = lang === 'zh' ? earthlyBranchesZh : earthlyBranchesEn;

    // 年干支
    const yearGan = lunar.getYearGan();
    const yearZhi = lunar.getYearZhi();

    // 月干支
    const monthGan = lunar.getMonthGan();
    const monthZhi = lunar.getMonthZhi();

    // 日干支
    const dayGan = lunar.getDayGan();
    const dayZhi = lunar.getDayZhi();

    // 时干支
    const timeGan = lunar.getTimeGan();
    const timeZhi = lunar.getTimeZhi();

    // 分开天干和地支返回
    return {
        yearGan: lang === 'zh' ? yearGan : heavenlyStems[heavenlyStemsZh.indexOf(yearGan)],
        yearZhi: lang === 'zh' ? yearZhi : earthlyBranches[earthlyBranchesZh.indexOf(yearZhi)],
        monthGan: lang === 'zh' ? monthGan : heavenlyStems[heavenlyStemsZh.indexOf(monthGan)],
        monthZhi: lang === 'zh' ? monthZhi : earthlyBranches[earthlyBranchesZh.indexOf(monthZhi)],
        dayGan: lang === 'zh' ? dayGan : heavenlyStems[heavenlyStemsZh.indexOf(dayGan)],
        dayZhi: lang === 'zh' ? dayZhi : earthlyBranches[earthlyBranchesZh.indexOf(dayZhi)],
        timeGan: lang === 'zh' ? timeGan : heavenlyStems[heavenlyStemsZh.indexOf(timeGan)],
        timeZhi: lang === 'zh' ? timeZhi : earthlyBranches[earthlyBranchesZh.indexOf(timeZhi)],
    };
}

// 计算生辰八字，返回中英文分隔格式，天干地支分开
export function calculateBazi(year, month, day, hour, lang = 'zh') {
    // 创建公历的 Date 对象
    const solarDate = new Date(year, month, day, hour, 0, 0); // JavaScript 的月份从 0 开始

    console.log(solarDate)

    // 将 Date 对象转换为 Solar 对象
    const solar = Solar.fromDate(solarDate);

    // 先将公历时间转换为农历时间
    const lunar = Lunar.fromSolar(solar);

    const { yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, timeGan, timeZhi } = getGanZhi(lunar, lang);

    // 根据语言格式返回天干地支，确保天干和地支分开
    if (lang === 'zh') {
        return `${yearGan} ${yearZhi} ${monthGan} ${monthZhi} ${dayGan} ${dayZhi} ${timeGan} ${timeZhi}`;
    } else {
        return `${yearGan} ${yearZhi} ${monthGan} ${monthZhi} ${dayGan} ${dayZhi} ${timeGan} ${timeZhi}`;
    }
}


// 计算五行属性并确定缺失元素
export function calculateWuXing(bazi, lang = 'zh') {
    const wuXingMappingZh = {
        甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
        己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
        子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土',
        巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金',
        戌: '土', 亥: '水'
    };

    const wuXingMappingEn = {
        Jia: 'Wood', Yi: 'Wood', Bing: 'Fire', Ding: 'Fire', Wu: 'Earth',
        Ji: 'Earth', Geng: 'Metal', Xin: 'Metal', Ren: 'Water', Gui: 'Water',
        Zi: 'Water', Chou: 'Earth', Yin: 'Wood', Mao: 'Wood', Chen: 'Earth',
        Si: 'Fire', Wu: 'Fire', Wei: 'Earth', Shen: 'Metal', You: 'Metal',
        Xu: 'Earth', Hai: 'Water'
    };

    const wuXingElementsZh = ['木', '火', '土', '金', '水'];
    const wuXingElementsEn = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

    // 根据语言选择相应的五行映射和元素列表
    const wuXingMapping = lang === 'zh' ? wuXingMappingZh : wuXingMappingEn;
    const wuXingElements = lang === 'zh' ? wuXingElementsZh : wuXingElementsEn;

    // 八字现在的格式是每个天干和地支分别，例如 '甲 申 丁 巳 戊 申 辛 酉'
    const baziPairs = bazi.split(' '); // 用空格分隔出每个天干和地支

    // 使用五行映射来获取每个天干地支对应的五行
    const elementsInBazi = baziPairs.map(item => {
        return wuXingMapping[item] || '未知'; // 根据天干或地支获取五行
    });

    console.log('八字:', bazi);
    console.log('五行属性:', elementsInBazi);

    // 初始化每个五行元素的计数
    const elementCount = wuXingElements.reduce((acc, el) => {
        acc[el] = 0;
        return acc;
    }, {});

    // 统计五行属性出现的次数
    elementsInBazi.forEach(el => {
        if (elementCount[el] !== undefined) {
            elementCount[el]++;
        }
    });

    // 找出缺失的五行元素
    const missingElements = wuXingElements.filter(el => elementCount[el] === 0);

    return {
        presentElements: elementsInBazi.length > 0 ? elementsInBazi.join(', ') : (lang === 'zh' ? '未知' : 'Unknown'),
        missingElements: missingElements.length > 0 ? missingElements.join(', ') : (lang === 'zh' ? '无缺失' : 'None missing'),
        suggestion: generateSuggestion(missingElements, lang),
    };
}


// 根据缺失的五行元素提供建议
function generateSuggestion(missingElements, lang) {
    if (missingElements.length === 0) {
        return lang === 'zh' ? '您的五行齐全，保持平衡即可。' : 'Your Wu Xing is balanced. Maintain balance.';
    }

    const suggestionsZh = {
        木: '缺木：可以通过多接触大自然，特别是绿色的植物或树木来补充。绿色也是有利颜色。',
        火: '缺火：可以通过多接触阳光，或佩戴红色饰品，保持温暖。红色和光亮是有助的。',
        土: '缺土：可以通过待在高地、山地或接触陶瓷、玉石来增强。黄色和棕色是补土的颜色。',
        金: '缺金：可以通过佩戴金属首饰，或多使用白色物品，增加干净整洁的环境来补金。',
        水: '缺水：可以多接触水或听流水的声音。黑色和蓝色的物品也有助于补充水。',
    };

    const suggestionsEn = {
        Wood: 'Missing Wood: Spend more time in nature, especially around green plants or trees. Green is also a beneficial color.',
        Fire: 'Missing Fire: Increase exposure to sunlight, wear red accessories, and stay warm. Red and light are helpful.',
        Earth: 'Missing Earth: Stay in high places or mountains, or engage with ceramics or jade. Yellow and brown are good for Earth.',
        Metal: 'Missing Metal: Wear metal jewelry, use white items, and create a clean, organized environment.',
        Water: 'Missing Water: Spend time near water or listen to flowing water sounds. Black and blue items help restore Water.',
    };

    const suggestions = lang === 'zh' ? suggestionsZh : suggestionsEn;
    return missingElements.map(el => suggestions[el]).join(' ');
}



export function calculateAnimalSign(year, month, day, hour, lang = 'zh') {
    console.log(year, month, day, hour)
    const solarDate_1 = new Date(year, month, day, hour, 0, 0); // JavaScript 的月份从 0 开始
    console.log(solarDate_1)

    // 将 Date 对象转换为 Solar 对象
    const solar_1 = Solar.fromDate(solarDate_1);

    // 先将公历时间转换为农历时间
    const lunar = Lunar.fromSolar(solar_1);

    // 获取农历年份
    const lunarYear = lunar.getYear();

    // 属相列表
    const animalSignsZh = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const animalSignsEn = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

    const animalSigns = lang === 'zh' ? animalSignsZh : animalSignsEn;

    // 基于农历年份计算属相，1924年是鼠年，因此计算差值
    const startYear = 1924; // 1924年是鼠年
    const index = (lunarYear - startYear) % 12;

    // 处理负数的情况
    const correctedIndex = index < 0 ? index + 12 : index;

    return animalSigns[correctedIndex];
}


// 计算五行相生相克
export function calculateElementCycle(wuXing, lang = 'zh') {
    const cycleZh = {
        木: '生火、克土 ',
        火: '生土、克金 ',
        土: '生金、克水 ',
        金: '生水、克木 ',
        水: '生木、克火 ',
    };

    const cycleEn = {
        Wood: 'Generates Fire, overcomes Earth',
        Fire: 'Generates Earth, overcomes Metal',
        Earth: 'Generates Metal, overcomes Water',
        Metal: 'Generates Water, overcomes Wood',
        Water: 'Generates Wood, overcomes Fire',
    };

    const cycle = lang === 'zh' ? cycleZh : cycleEn;

    // 将五行属性分解，并使用 Set 去重
    const uniqueElements = [...new Set(wuXing.split(', '))];

    // 生成对应的五行生克关系
    return uniqueElements.map(el => `${el}: ${cycle[el]}`).join(lang === 'zh' ? '；' : '; ');
}


// 计算属相相生相克
export function calculateAnimalCompatibility(animalSign, lang = 'zh') {
    const compatibilityZh = {
        鼠: '最配龙、猴；不利马、兔',
        牛: '最配蛇、鸡；不利羊、马',
        虎: '最配马、狗；不利猴、蛇',
        兔: '最配羊、猪；不利鸡、鼠',
        龙: '最配鼠、猴；不利狗、兔',
        蛇: '最配牛、鸡；不利猪、虎',
        马: '最配虎、狗；不利鼠、牛',
        羊: '最配兔、猪；不利牛、狗',
        猴: '最配鼠、龙；不利虎、猪',
        鸡: '最配牛、蛇；不利兔、狗',
        狗: '最配虎、马；不利龙、鸡',
        猪: '最配兔、羊；不利蛇、猴',
    };

    const compatibilityEn = {
        Rat: 'Best with Dragon, Monkey; Avoid Horse, Rabbit',
        Ox: 'Best with Snake, Rooster; Avoid Goat, Horse',
        Tiger: 'Best with Horse, Dog; Avoid Monkey, Snake',
        Rabbit: 'Best with Goat, Pig; Avoid Rooster, Rat',
        Dragon: 'Best with Rat, Monkey; Avoid Dog, Rabbit',
        Snake: 'Best with Ox, Rooster; Avoid Pig, Tiger',
        Horse: 'Best with Tiger, Dog; Avoid Rat, Ox',
        Goat: 'Best with Rabbit, Pig; Avoid Ox, Dog',
        Monkey: 'Best with Rat, Dragon; Avoid Tiger, Pig',
        Rooster: 'Best with Ox, Snake; Avoid Rabbit, Dog',
        Dog: 'Best with Tiger, Horse; Avoid Dragon, Rooster',
        Pig: 'Best with Rabbit, Goat; Avoid Snake, Monkey',
    };

    const compatibility = lang === 'zh' ? compatibilityZh : compatibilityEn;
    return compatibility[animalSign] || (lang === 'zh' ? '未知' : 'Unknown');
}
