/* books-data.js - 统一书籍数据索引（用于搜索功能） */
var BOOKS_DATA = [
    // ===== 语文/语言类 =====
    {
        id: 'primer',
        title: '麦加菲启蒙读本',
        titleEn: 'McGuffey Eclectic Primer',
        author: '威廉·H·麦加菲',
        authorEn: 'William H. McGuffey',
        category: 'language',
        categoryName: '语文',
        readerUrl: 'reader.html',
        description: '美国百年经典教材，从零开始学英语',
        tags: ['英语', '启蒙', '教材', '美国', '经典']
    },
    {
        id: 'sanguo',
        title: '三国演义',
        titleEn: 'Romance of the Three Kingdoms',
        author: '罗贯中',
        authorEn: 'Luo Guanzhong',
        category: 'language',
        categoryName: '语文',
        readerUrl: 'sanguo-reader.html',
        description: '中国古典四大名著之一，描写三国时期的英雄故事',
        tags: ['古典文学', '名著', '历史小说', '中国']
    },
    {
        id: 'shuihu',
        title: '水浒传',
        titleEn: 'Water Margin',
        author: '施耐庵',
        authorEn: 'Shi Nai\'an',
        category: 'language',
        categoryName: '语文',
        readerUrl: 'shuihu-reader.html',
        description: '中国古典四大名著之一，描写108位好汉的故事',
        tags: ['古典文学', '名著', '侠义', '中国']
    },
    {
        id: 'honglou',
        title: '红楼梦',
        titleEn: 'Dream of the Red Chamber',
        author: '曹雪芹',
        authorEn: 'Cao Xueqin',
        category: 'language',
        categoryName: '语文',
        readerUrl: 'honglou-reader.html',
        description: '中国古典四大名著之一，描写贾宝玉和林黛玉的爱情故事',
        tags: ['古典文学', '名著', '爱情', '中国']
    },
    
    // ===== 金融类 =====
    {
        id: 'wealth',
        title: '国富论',
        titleEn: 'The Wealth of Nations',
        author: '亚当·斯密',
        authorEn: 'Adam Smith',
        category: 'finance',
        categoryName: '金融',
        readerUrl: 'wealth-reader.html',
        description: '现代经济学之父的经典著作，探讨国民财富的本质和成因',
        tags: ['经济学', '经典', '自由市场', '英国']
    },
    {
        id: 'investor',
        title: '聪明的投资者',
        titleEn: 'The Intelligent Investor',
        author: '本杰明·格雷厄姆',
        authorEn: 'Benjamin Graham',
        category: 'finance',
        categoryName: '金融',
        readerUrl: 'investor-reader.html',
        description: '价值投资之父的经典著作，被沃伦·巴菲特誉为"有史以来最好的投资书"',
        tags: ['投资', '价值投资', '股票', '美国', '经典']
    },
    
    // ===== 科学类 =====
    {
        id: 'nasa1',
        title: 'NASA太阳系指南',
        titleEn: 'NASA Solar System Guide',
        author: 'NASA',
        authorEn: 'NASA',
        category: 'science',
        categoryName: '科学',
        readerUrl: 'nasa-reader.html?book=solar',
        description: 'NASA官方太阳系科普，探索八大行星和太阳',
        tags: ['太空', '太阳系', 'NASA', '科普']
    },
    {
        id: 'nasa2',
        title: 'NASA恒星与星系',
        titleEn: 'NASA Stars and Galaxies',
        author: 'NASA',
        authorEn: 'NASA',
        category: 'science',
        categoryName: '科学',
        readerUrl: 'nasa-reader.html?book=stars',
        description: '探索恒星的诞生、演化和死亡，以及星系的奥秘',
        tags: ['太空', '恒星', '星系', 'NASA', '科普']
    },
    
    // ===== 历史类 =====
    {
        id: 'xiyouji',
        title: '西游记',
        titleEn: 'Journey to the West',
        author: '吴承恩',
        authorEn: 'Wu Cheng\'en',
        category: 'history',
        categoryName: '历史',
        readerUrl: 'xiyouji-reader.html',
        description: '中国古典四大名著之一，描写孙悟空保护唐僧西天取经的故事',
        tags: ['古典文学', '名著', '神话', '中国']
    },
    {
        id: 'logic',
        title: 'A Concise Introduction to Logic',
        titleEn: 'A Concise Introduction to Logic',
        author: 'Patrick J. Hurley',
        authorEn: 'Patrick J. Hurley',
        category: 'science',
        categoryName: '科学',
        readerUrl: 'logic-reader.html?chapter=0',
        description: '帕特里克·赫尔利经典逻辑学教材，系统介绍演绎推理、归纳推理和科学方法论',
        tags: ['逻辑学', '教材', '英文原版', '思维训练']
    }
];

/* 搜索函数 */
function searchBooks(query) {
    if (!query || query.trim() === '') return [];
    
    const lowerQuery = query.toLowerCase().trim();
    const results = [];
    
    BOOKS_DATA.forEach(book => {
        const searchText = 
            book.title + ' ' + 
            book.titleEn + ' ' + 
            book.author + ' ' + 
            book.authorEn + ' ' + 
            book.description + ' ' + 
            book.tags.join(' ') + ' ' +
            book.categoryName;
        
        if (searchText.toLowerCase().includes(lowerQuery)) {
            results.push(book);
        }
    });
    
    return results;
}
