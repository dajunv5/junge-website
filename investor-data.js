/* The Intelligent Investor - Benjamin Graham (1949) */
/* 聪明的投资者 - 本杰明·格雷厄姆 */
/* 注：本书内容基于公开摘要和评论，完整版请购买正版书籍 */
var INVESTOR_DATA = [
{
    id: 0,
    book: "第1章",
    title: "投资与投机：结果可视化的智慧",
    subtitle: "Chapter 1: Investment versus Speculation",
    content: "投资操作是以深入分析为基础，确保本金的安全，并获得适当的回报。不满足这些条件的操作就是投机。投资者和投机者之间最现实的区别，在于他们对股市运动的态度。投资者的兴趣主要在以适当的价格取得和持有适当的股票；投机者的兴趣主要在预测市场波动，并从中获利。",
    translation: "Investment operation is one which, upon thorough analysis, promises safety of principal and an adequate return. Operations not meeting these requirements are speculative. The distinction between the investor and the speculator is primarily one of attitude, not of technique."
},
{
    id: 1,
    book: "第2章",
    title: "投资者与通货膨胀",
    subtitle: "Chapter 2: The Investor and Inflation",
    content: "通货膨胀是投资者必须面对的现实。长期来看，通货膨胀会侵蚀购买力。投资者应该通过持有股票等资产来对抗通货膨胀，因为股票价格通常会随着物价上涨而上涨。债券和现金在通货膨胀环境中表现较差。",
    translation: "Inflation is a reality that investors must face. Over time, inflation erodes purchasing power. Investors should combat inflation by holding stocks and other assets whose prices typically rise with general price levels."
},
{
    id: 2,
    book: "第3章",
    title: "一个世纪的股市历史：1972年年初的股价水平",
    subtitle: "Chapter 3: A Century of Stock Market History",
    content: "回顾股市历史，我们可以看到市场周期的重复性。1929年大崩盘、1970年代的滞胀、1987年黑色星期一等都是重要的历史节点。投资者应该从历史中学习，但不要试图预测短期市场走势。",
    translation: "A review of stock market history shows the repetitive nature of market cycles. The 1929 crash, 1970s stagflation, 1987 Black Monday are important historical markers. Investors should learn from history but not attempt to predict short-term market movements."
},
{
    id: 3,
    book: "第4章",
    title: "投资者的最佳选择：防御型投资者如何选择股票",
    subtitle: "Chapter 4: General Portfolio Policy: The Defensive Investor",
    content: "防御型投资者应该遵循简单的策略：分散投资、低费用、长期持有。建议配置：50-50的债券和股票，或者更简单的——直接购买低成本指数基金。不要试图挑选个股或择时交易。",
    translation: "The defensive investor should follow a simple strategy: diversify, keep costs low, hold for the long term. Recommended allocation: 50-50 bonds and stocks, or even simpler—buy low-cost index funds. Don't try to pick individual stocks or time the market."
},
{
    id: 4,
    book: "第5章",
    title: "防御型投资者的股票选择",
    subtitle: "Chapter 5: The Defensive Investor and Common Stocks",
    content: "防御型投资者选择股票时应考虑：1) 适当的分散化（至少10-30只股票）；2) 选择大型、知名、财务稳健的公司；3) 每个公司应有长期连续支付股息的记录；4) 限制市盈率（不超过25倍）。",
    translation: "The defensive investor should consider: 1) Adequate diversification (at least 10-30 stocks); 2) Selection of large, prominent, conservatively financed companies; 3) Long record of continuous dividend payments; 4) Limit on price-earnings ratio (not more than 25 times)."
},
{
    id: 5,
    book: "第6章",
    title: "积极型投资者的股票选择",
    subtitle: "Chapter 6: Portfolio Policy for the Enterprising Investor",
    content: "积极型投资者可以承担更多风险以追求更高回报，但仍需遵循价值投资原则。可以关注：被低估的股票、特殊情况（如分拆、重组）、成长股（但需谨慎估值）。关键是要有足够的知识和时间进行研究。",
    translation: "The enterprising investor may assume more risk for higher returns but must still follow value investing principles. May focus on: undervalued stocks, special situations (spin-offs, reorganizations), growth stocks (but careful valuation). Key is having sufficient knowledge and time for research."
},
{
    id: 6,
    book: "第7章",
    title: "积极型投资者的股票选择：第二部分",
    subtitle: "Chapter 7: The Enterprising Investor and Common Stocks",
    content: "成长股投资需要特别注意估值。很多投资者为高增长付出过高价格，最终遭受损失。格雷厄姆建议：关注那些市场暂时忽视的优质公司，等待市场认识到其价值。耐心是积极投资者的核心品质。",
    translation: "Growth stock investing requires special attention to valuation. Many investors overpay for high growth and eventually suffer losses. Graham suggests: focus on quality companies temporarily overlooked by the market, wait for the market to recognize their value. Patience is the core quality of the enterprising investor."
},
{
    id: 7,
    book: "第8章",
    title: "投资者与市场波动",
    subtitle: "Chapter 8: The Investor and Market Fluctuations",
    content: "市场波动既是风险也是机会。聪明的投资者利用市场波动，而不是被它吓倒。当市场价格远低于内在价值时买入，当价格远高于价值时卖出。但要记住：'市场先生'是情绪化的，他的报价只应在对您有利时才接受。",
    translation: "Market fluctuations are both risk and opportunity. The intelligent investor takes advantage of market fluctuations, not intimidated by them. Buy when market price is well below intrinsic value, sell when price is well above value. Remember: 'Mr. Market' is emotional; his quotes should only be accepted when they serve your interest."
},
{
    id: 8,
    book: "第9章",
    title: "基金投资",
    subtitle: "Chapter 9: Investing in Investment Funds",
    content: "共同基金可以为普通投资者提供便利和分散化。但需要注意：1) 费用比率（越低越好）；2) 过往业绩不代表未来回报；3) 指数基金通常优于主动管理基金；4) 警惕高销售费用。对于大多数防御型投资者，低成本指数基金是最佳选择。",
    translation: "Mutual funds can provide convenience and diversification for average investors. But note: 1) Expense ratio (lower is better); 2) Past performance doesn't guarantee future returns; 3) Index funds usually outperform actively managed funds; 4) Beware of high sales loads. For most defensive investors, low-cost index funds are the best choice."
},
{
    id: 9,
    book: "第10章",
    title: "投资者与投资顾问",
    subtitle: "Chapter 10: The Investor and His Advisers",
    content: "选择投资顾问时要谨慎。很多顾问更关心赚取佣金，而不是客户的最佳利益。如果您需要顾问，选择收费-only的 fiduciary（受托责任）顾问。更好的方法是学习投资知识，成为自己的顾问。记住：没有人比您更关心您的钱。",
    translation: "Choose investment advisers with caution. Many advisers care more about earning commissions than their clients' best interests. If you need an adviser, choose a fee-only fiduciary. Better yet, learn about investing and be your own adviser. Remember: no one cares more about your money than you do."
},
{
    id: 10,
    book: "第11章",
    title: "证券分析的两个方法：定性与定量",
    subtitle: "Chapter 11: Security Analysis for the Layman",
    content: "证券分析需要同时考虑定量和定性因素。定量因素包括：财务报表数据、比率分析、估值指标。定性因素包括：公司竞争优势、行业前景、管理水平。格雷厄姆更强调定量因素，因为可以客观衡量。但他也承认定性因素的重要性，特别是在评估成长股时。",
    translation: "Security analysis requires consideration of both quantitative and qualitative factors. Quantitative includes: financial statement data, ratio analysis, valuation metrics. Qualitative includes: company's competitive advantage, industry prospects, management quality. Graham emphasized quantitative factors more because they can be objectively measured."
},
{
    id: 11,
    book: "第12章",
    title: "对每股利润的思考",
    subtitle: "Chapter 12: Things to Consider About Per-Share Earnings",
    content: "每股利润（EPS）是公司盈利能力的重要指标，但需要谨慎解读。需要注意：1) 会计方法的差异；2) 一次性收益/损失的剔除；3) 股份数的变化（回购或增发）；4) 行业周期性。华尔街往往过度关注季度EPS，导致短期主义。长期投资者应关注多年平均收益。",
    translation: "Earnings per share (EPS) is an important metric of company profitability, but requires careful interpretation. Note: 1) Differences in accounting methods; 2) Exclusion of one-time gains/losses; 3) Changes in share count (buybacks or issuance); 4) Industry cyclicality. Wall Street often over-focuses on quarterly EPS, leading to short-termism."
},
{
    id: 12,
    book: "第13章",
    title: "结论",
    subtitle: "Chapter 13: A Comparison of Four Listed Companies",
    content: "通过分析具体公司案例，格雷厄姆展示了如何应用价值投资原则。关键要点：1) 比较市盈率、市净率、股息率；2) 评估财务稳健性；3) 考虑盈利稳定性；4) 不要只看表面数字，要理解业务本质。投资需要判断力和独立思考，不能盲从他人。",
    translation: "Through analysis of specific company cases, Graham demonstrates how to apply value investing principles. Key points: 1) Compare P/E, P/B, dividend yield; 2) Assess financial soundness; 3) Consider earnings stability; 4) Don't just look at surface numbers, understand the business essence."
},
{
    id: 13,
    book: "第14章",
    title: "防御型投资者的股票选择：股息记录",
    subtitle: "Chapter 14: Stock Selection for the Defensive Investor",
    content: "防御型投资者应优先选择有长期稳定股息记录的公司。连续支付股息20年以上的公司通常具有：稳定的现金流、成熟的企业模式、对股东友好的文化。这些特质降低了投资风险。同时，避免那些不支付股息但账面上有大量现金的公司——它们可能管理不善。",
    translation: "Defensive investors should prioritize companies with long records of stable dividend payments. Companies paying dividends for 20+ years typically have: stable cash flow, mature business model, shareholder-friendly culture. These traits reduce investment risk."
},
{
    id: 14,
    book: "第15章",
    title: "积极型投资者的股票选择：成长股",
    subtitle: "Chapter 15: Stock Selection for the Enterprising Investor",
    content: "成长股投资的核心难题是：如何为未来增长定价？格雷厄姆建议的方法：1) 选择有至少过去10年成绩记录的公司；2) 确保公司属于成长型行业；3) 计算'成长调整后的市盈率'——把预期增长纳入估值；4) 要有安全边际。大多数成长股被高估，耐心等待低估机会。",
    translation: "The core difficulty of growth stock investing: how to price future growth? Graham's suggested method: 1) Choose companies with at least 10 years of track record; 2) Ensure the company is in a growth industry; 3) Calculate 'growth-adjusted P/E ratio'; 4) Have a margin of safety."
},
{
    id: 15,
    book: "第16章",
    title: "可转换证券",
    subtitle: "Chapter 16: Convertible Issues and Warrants",
    content: "可转换债券和权证可以提供上行参与和下行保护的组合。但格雷厄姆警告：这些工具通常定价过高，而且可能使投资者承担不必要的风险。对于大多数投资者，直接购买普通股或优质债券更简单、更透明。如果您不懂复杂的证券，就不要买。",
    translation: "Convertible bonds and warrants can provide a combination of upside participation and downside protection. But Graham warns: these instruments are often overpriced and may expose investors to unnecessary risk. For most investors, simply buying common stocks or quality bonds is simpler and more transparent."
},
{
    id: 16,
    book: "第17章",
    title: "四个非常有启发的案例",
    subtitle: "Chapter 17: Four Extremely Instructive Cases",
    content: "通过四个真实案例，格雷厄姆说明了投资原则的实际应用：1) 洛克菲勒中心的失败——过度杠杆化的危险；2) 施乐公司的成功——成长股投资需要耐心和判断力；3) 紧急融资的案例——当公司陷入困境时，老股东往往损失惨重；4) 套利机会——需要专业知识和快速决策。",
    translation: "Through four real cases, Graham illustrates practical application of investment principles: 1) Failure of Rockefeller Center - danger of excessive leverage; 2) Success of Xerox - growth stock investing requires patience and judgment; 3) Distressed financing cases; 4) Arbitrage opportunities."
},
{
    id: 17,
    book: "第18章",
    title: "对第八版的点评（1972年）",
    subtitle: "Chapter 18: A Commentary on the 1972 Revision",
    content: "在1972年版的点评中，格雷厄姆反思了自1949年初版以来市场的变化。主要内容：1) 机构投资者的崛起改变了市场结构；2) 有效市场假说的影响；3) 对'成长股陷阱'的警告依然有效；4) 价值投资原则永恒不变，但具体方法需要适应时代。",
    translation: "In the 1972 commentary, Graham reflects on market changes since the 1949 first edition. Key points: 1) Rise of institutional investors changed market structure; 2) Impact of efficient market hypothesis; 3) Warning about 'growth stock trap' still valid; 4) Value investing principles are timeless, but methods must adapt."
},
{
    id: 18,
    book: "第19章",
    title: "收益的来源：股息与资本利得",
    subtitle: "Chapter 19: Shareholders and Dividends",
    content: "投资者收益来自两个来源：股息收入和资本利得。长期来看，股息通常占总回报的很大一部分。格雷厄姆建议：不要自动 reinvest 股息，而是将其视为现金收入。如果股价被低估，用股息买更多股票；如果股价高估，将股息用于其他投资或消费。",
    translation: "Investor returns come from two sources: dividend income and capital gains. Over the long term, dividends usually constitute a large portion of total return. Graham suggests: don't automatically reinvest dividends; treat them as cash income."
},
{
    id: 19,
    book: "第20章",
    title: "作为投资中心原理的安全边际",
    subtitle: "Chapter 20: Margin of Safety as the Central Concept",
    content: "安全边际是价值投资的核心概念。意思是：以远低于内在价值的价格购买资产，为判断错误和市场波动留出缓冲空间。计算方法：内在价值 - 购买价格 = 安全边际。安全边际越大，投资风险越小。这是格雷厄姆给所有投资者的最重要建议。",
    translation: "Margin of safety is the central concept of value investing. It means: buy assets at prices well below their intrinsic value, leaving a buffer for errors in judgment and market fluctuations. The larger the margin of safety, the smaller the investment risk."
},
{
    id: 20,
    book: "附录",
    title: "格雷厄姆-多德式的超级投资者",
    subtitle: "Appendix: The Superinvestors of Graham-and-Doddsville",
    content: "本附录由沃伦·巴菲特撰写，证明了价值投资的有效性。巴菲特展示了多位成功的'格雷厄姆-多德式'投资者的业绩记录，包括他自己、沃尔特·施洛斯、汤姆·科拿普等。他们的共同特点：都遵循格雷厄姆的价值投资原则，都取得了超越市场的长期回报。这证明了价值投资不是运气，而是可复制的方法。",
    translation: "This appendix, written by Warren Buffett, demonstrates the effectiveness of value investing. Buffett shows the track records of several successful 'Graham-and-Dodd' investors, including himself, Walter Schloss, Tom Knapp, etc. Their common trait: all follow Graham's value investing principles and achieve long-term returns exceeding the market."
}
];
