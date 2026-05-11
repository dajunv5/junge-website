/* A Concise Introduction to Logic - Patrick Hurley (英文版) */
/* 简明逻辑学导论 - 帕特里克·赫尔利 */
/* 注：内容基于公开教材整理，供学习交流使用 */
var LOGIC_DATA = [
{
    id: 0,
    book: "Chapter 1",
    title: "Basic Concepts",
    subtitle: "第一章：基本概念",
    content: "Logic may be defined as the organized body of knowledge, or science, that evaluates arguments. All sciences are concerned with truth and knowledge, but what distinguishes logic from other sciences is its focus on the evaluation of arguments. An argument, in its simplest form, is a group of statements, one or more of which (the premises) are claimed to provide support for another statement (the conclusion). The statements that provide support are called premises, and the statement that receives support is called the conclusion. The study of logic, therefore, involves two basic questions: What constitutes a good argument, and what constitutes a bad argument? Good arguments are those in which the premises provide strong support for the conclusion. Bad arguments are those in which the premises fail to provide adequate support. Logical analysis enables us to distinguish good arguments from bad ones.",
    translation: "逻辑学可以被定义为评价论证的有组织的知识体系或科学。所有科学都关注真理和知识，但逻辑学与其他科学的区别在于它专注于论证的评价。论证的最简单形式是一组陈述，其中一个或多个（前提）声称为另一个陈述（结论）提供支持。提供支持的陈述称为前提，接受支持的陈述称为结论。因此，逻辑学研究涉及两个基本问题：什么构成好的论证，什么构成坏的论证？好的论证是其前提为结论提供有力支持的论证。坏的论证是其前提未能为结论提供充分支持的论证。逻辑分析使我们能够区分好的论证和坏的论证。"
},
{
    id: 1,
    book: "Chapter 2",
    title: "Analyzing Arguments",
    subtitle: "第二章：分析论证",
    content: "The first step in evaluating an argument is to identify its premises and conclusion. This process is called argument analysis. To analyze an argument, one must first identify the conclusion, then identify the premises that support it. Sometimes the conclusion is stated first, followed by the premises. At other times, the premises are stated first, followed by the conclusion. Still other times, the argument may be arranged in a way that makes identification difficult. In such cases, certain indicator words can help. Conclusion indicators include: therefore, hence, thus, so, consequently, accordingly, it follows that, we may infer that. Premise indicators include: because, since, for, as, given that, assuming that, inasmuch as. Once the premises and conclusion are identified, the argument can be reconstructed in standard form, with each premise stated on a separate line and the conclusion preceded by the word 'therefore.'",
    translation: "评价论证的第一步是识别其前提和结论。这个过程称为论证分析。要分析论证，必须先识别结论，然后识别支持结论的前提。有时结论先陈述，然后是前提。有时前提先陈述，然后是结论。还有些时候，论证的安排方式使得识别变得困难。在这种情况下，某些指示词可以帮助识别。结论指示词包括：therefore（因此）、hence（所以）、thus（因而）、so（所以）、consequently（因此）、accordingly（相应地）、it follows that（由此可见）、we may infer that（我们可以推断）。前提指示词包括：because（因为）、since（既然）、for（由于）、as（正如）、given that（鉴于）、assuming that（假设）、inasmuch as（由于）。一旦前提和结论被识别出来，论证就可以用标准格式重建，每个前提单独一行，结论前面加上'因此'一词。"
},
{
    id: 2,
    book: "Chapter 3",
    title: "Language and Definitions",
    subtitle: "第三章：语言与定义",
    content: "Language plays a crucial role in logical reasoning. The clarity and precision of language directly affect the quality of arguments. One important aspect of language analysis is the study of definitions. A definition is a statement that assigns meaning to a word or phrase. There are several kinds of definitions, each serving a different purpose. A lexical definition reports the meaning that a word already has in a language. A stipulative definition assigns a new meaning to a word or phrase. A precising definition reduces the vagueness of a word that already has a lexical definition. A theoretical definition assigns meaning to a word by relating it to a theory. Finally, an operational definition assigns meaning to a word by specifying the physical operations used to measure or determine it. Understanding these different types of definitions is essential for clear thinking and effective argumentation.",
    translation: "语言在逻辑推理中起着至关重要的作用。语言的清晰度和精确度直接影响论证的质量。语言分析的一个重要方面是定义的研究。定义是为词语或短语赋予意义的陈述。定义有几种不同类型，每种都有不同的目的。词汇定义报告词语在语言中已有的意义。规定性定义为词语或短语赋予新的意义。精确性定义减少已有词汇定义的模糊性。理论定义通过将词语与相关理论联系起来为其赋予意义。最后，操作性定义通过指定用于测量或确定词语的物理操作来为其赋予意义。理解这些不同类型的定义对于清晰思考和有效论证至关重要。"
},
{
    id: 3,
    book: "Chapter 4",
    title: "Fallacies",
    subtitle: "第四章：谬误",
    content: "A fallacy is a defect in an argument that stems from the content of the argument rather than from its form. Fallacies can be divided into two broad categories: fallacies of relevance and fallacies of insufficient evidence. Fallacies of relevance occur when the premises are logically irrelevant to the conclusion. Examples include ad hominem attacks, appeals to emotion, red herrings, and straw man arguments. Fallacies of insufficient evidence occur when the premises, though logically relevant, fail to provide adequate support for the conclusion. Examples include hasty generalizations, false cause, appeal to ignorance, and slippery slope arguments. Recognizing these fallacies is essential for critical thinking, as they often appear in everyday discourse, political debates, and advertising.",
    translation: "谬误是源于论证内容而非形式的论证缺陷。谬误可分为两大类：相关性谬误和证据不足谬误。相关性谬误发生在前提与结论在逻辑上无关时。例子包括人身攻击、诉诸情感、红鲱鱼和稻草人论证。证据不足谬误发生在前提虽然在逻辑上相关，但未能为结论提供足够的支持时。例子包括草率概括、虚假因果、诉诸无知和滑坡论证。识别这些谬误对批判性思维至关重要，因为它们经常出现在日常话语、政治辩论和广告中。"
},
{
    id: 4,
    book: "Chapter 5",
    title: "Categorical Propositions",
    subtitle: "第五章：范畴命题",
    content: "Categorical propositions are statements that relate two classes or categories. They are the building blocks of syllogisms, which are the traditional form of deductive arguments. A categorical proposition has four basic forms: universal affirmative (All S are P), universal negative (No S are P), particular affirmative (Some S are P), and particular negative (Some S are not P). Here, S is the subject term and P is the predicate term. The quality of a proposition is either affirmative or negative, and the quantity is either universal or particular. Understanding categorical propositions is fundamental to traditional logic, as they form the basis for analyzing more complex deductive arguments. The modern symbolic logic developed by Boole and others provides more powerful tools for logical analysis, but categorical logic remains valuable for understanding many everyday arguments.",
    translation: "范畴命题是关联两个类或范畴的陈述。它们是三段论的构建块，三段论是演绎论证的传统形式。范畴命题有四种基本形式：全称肯定命题（所有S都是P）、全称否定命题（没有S是P）、特称肯定命题（有些S是P）和特称否定命题（有些S不是P）。这里，S是主项，P是谓项。命题的性质要么是肯定的，要么是否定的，量要么是全称的，要么是特称的。理解范畴命题对传统逻辑是基础性的，因为它们构成了分析更复杂演绎论证的基础。布尔等人发展的现代符号逻辑为逻辑分析提供了更强大的工具，但范畴逻辑对于理解许多日常论证仍然有价值。"
},
{
    id: 5,
    book: "Chapter 6",
    title: "Categorical Syllogisms",
    subtitle: "第六章：范畴三段论",
    content: "A categorical syllogism is a deductive argument consisting of three categorical propositions: two premises and one conclusion. The three propositions together contain exactly three terms, each appearing twice. The major term is the predicate of the conclusion, the minor term is the subject of the conclusion, and the middle term appears in both premises but not in the conclusion. Syllogisms are evaluated using Venn diagrams or rules of validity. There are 15 valid forms of categorical syllogisms, grouped into four figures based on the position of the middle term. While categorical syllogisms represent an early form of deductive logic, they illustrate important principles of logical structure that remain relevant today. Modern logic has largely supplanted categorical logic for technical purposes, but the basic idea of valid inference continues to be central to logical theory.",
    translation: "范畴三段论是由三个范畴命题组成的演绎论证：两个前提和一个结论。这三个命题总共包含恰好三个词项，每个词项出现两次。大项是结论的谓项，小项是结论的主项，中项在两个前提中都出现但在结论中不出现。三段论使用文恩图或有效性规则进行评价。范畴三段论有15种有效形式，根据中项的位置分为四格。虽然范畴三段论代表了演绎逻辑的早期形式，但它们说明了至今仍然重要的逻辑结构原则。现代逻辑在技术目的上已基本取代了范畴逻辑，但有效推理的基本思想仍然是逻辑理论的核心。"
},
{
    id: 6,
    book: "Chapter 7",
    title: "Propositional Logic",
    subtitle: "第七章：命题逻辑",
    content: "Propositional logic deals with the logical relationships between propositions as wholes. Unlike categorical logic, which analyzes the internal structure of propositions, propositional logic treats propositions as simple units that can be combined using logical connectives. The five basic connectives are negation (~), conjunction (•), disjunction (∨), conditional (⊃), and biconditional (≡). A compound proposition is formed by connecting simple propositions with these connectives. The truth value of a compound proposition depends on the truth values of its component propositions and the logical properties of the connectives. Propositional logic allows us to evaluate arguments using truth tables, which systematically display all possible combinations of truth values. This method provides a mechanical procedure for determining the validity of arguments in propositional logic.",
    translation: "命题逻辑处理命题整体之间的逻辑关系。与范畴逻辑分析命题内部结构不同，命题逻辑将命题视为可以用逻辑连接词组合的简单单元。五个基本连接词是：否定（~）、合取（•）、析取（∨）、条件（⊃）和双条件（≡）。复合命题是通过用这些连接词连接简单命题形成的。复合命题的真值取决于其组成命题的真值和连接词的逻辑性质。命题逻辑允许我们使用真值表评价论证，真值表系统地显示所有可能的真值组合。这种方法为确定命题逻辑中论证的有效性提供了机械程序。"
},
{
    id: 7,
    book: "Chapter 8",
    title: "Natural Deduction",
    subtitle: "第八章：自然演绎",
    content: "Natural deduction is a method of proof that attempts to mimic the reasoning processes people actually use. Instead of relying on truth tables or mechanical rules, natural deduction uses a set of inference rules that correspond to intuitively valid patterns of reasoning. These rules allow us to derive conclusions from premises through a series of logical steps. Common rules include modus ponens, modus tollens, hypothetical syllogism, disjunctive syllogism, and various rules for introducing and eliminating connectives. Natural deduction systems provide a more human-like approach to logical reasoning and are widely used in philosophy, mathematics, and computer science. The method emphasizes clarity of reasoning and justification of each step in a proof.",
    translation: "自然演绎是一种试图模仿人们实际使用推理过程的证明方法。自然演绎不依赖于真值表或机械规则，而是使用一组对应于直观有效推理模式的推理规则。这些规则允许我们通过一系列逻辑步骤从前提推导出结论。常见规则包括肯定前件、否定后件、假言三段论、析取三段论，以及各种引入和消去连接词的规则。自然演绎系统为逻辑推理提供了更像人类的方法，广泛用于哲学、数学和计算机科学。这种方法强调推理的清晰性和证明中每一步的理由。"
},
{
    id: 8,
    book: "Chapter 9",
    title: "Inductive Reasoning",
    subtitle: "第九章：归纳推理",
    content: "Inductive reasoning differs from deductive reasoning in that the conclusion is not guaranteed to be true even if all the premises are true. Instead, inductive arguments aim for probability or likelihood. Inductive arguments are evaluated based on the strength of the evidence provided. Types of inductive reasoning include generalization from samples, statistical syllogism, causal reasoning, analogical reasoning, and prediction. The strength of an inductive argument depends on factors such as sample size, representativeness, and the absence of bias. While deductive logic provides certainty, inductive logic provides the framework for reasoning about empirical matters where certainty is rarely attainable. Scientific reasoning relies heavily on inductive methods to formulate hypotheses and theories based on observational evidence.",
    translation: "归纳推理与演绎推理的不同之处在于，即使所有前提都为真，结论也不一定为真。相反，归纳论证旨在达到可能性或盖然性。归纳论证基于所提供证据的强度进行评价。归纳推理的类型包括从样本进行概括、统计三段论、因果推理、类比推理和预测。归纳论证的强度取决于样本大小、代表性、无偏见等因素。演绎逻辑提供确定性，而归纳逻辑为很少能达到确定性的经验事项的推理提供了框架。科学推理在很大程度上依赖归纳方法来基于观察证据制定假设和理论。"
},
{
    id: 9,
    book: "Chapter 10",
    title: "Scientific Reasoning",
    subtitle: "第十章：科学推理",
    content: "Scientific reasoning combines elements of both deductive and inductive logic. The hypothetico-deductive method involves forming hypotheses, deducing testable consequences from them, and then conducting experiments to test these predictions. Scientific theories are evaluated based on criteria such as falsifiability, predictive accuracy, explanatory power, and simplicity. The logic of scientific discovery involves abduction (inference to the best explanation), as well as controlled experimentation and systematic observation. Science also involves the use of statistical methods to analyze data and draw conclusions. Understanding the logical foundations of scientific reasoning helps us evaluate scientific claims critically and appreciate the strengths and limitations of the scientific enterprise.",
    translation: "科学推理结合了演绎逻辑和归纳逻辑的要素。假设-演绎方法包括形成假设、从中演绎出可检验的后果，然后进行实验来检验这些预测。科学理论基于可证伪性、预测准确性、解释力和简洁性等标准进行评价。科学发现的逻辑涉及溯因推理（最佳解释推理），以及控制实验和系统观察。科学还涉及使用统计方法分析数据和得出结论。理解科学推理的逻辑基础帮助我们批判性地评价科学主张，欣赏科学事业的优势和局限性。"
},
{
    id: 10,
    book: "Appendix",
    title: "Logic in Everyday Life",
    subtitle: "附录：日常生活中的逻辑",
    content: "Logical reasoning is not confined to academic contexts but permeates everyday life. From evaluating advertisements to assessing political claims, from making personal decisions to engaging in professional discussions, we constantly use logical skills. Critical thinking involves applying logical principles to real-world situations, recognizing fallacies in everyday discourse, and constructing well-reasoned arguments. Developing logical literacy enhances our ability to navigate an increasingly complex world filled with competing claims and persuasive messages. The study of logic, therefore, is not merely an academic exercise but an essential skill for informed citizenship and personal empowerment. By learning to think logically, we become better equipped to distinguish truth from falsehood, reason from rhetoric, and evidence from assertion.",
    translation: "逻辑推理不仅限于学术语境，而是渗透到日常生活中。从评价广告到评估政治主张，从做个人决定到参与专业讨论，我们不断使用逻辑技能。批判性思维涉及将逻辑原则应用于现实情况，识别日常话语中的谬误，构建论证充分的论点。发展逻辑素养增强了我们驾驭日益复杂世界的能力，这个世界充满了相互竞争的主张和有说服力的信息。因此，逻辑研究不仅是一项学术练习，而且是知情公民身份和个人赋权的基本技能。通过学习逻辑思考，我们能更好地区辨真伪、理性与修辞、证据与断言。"
}
];