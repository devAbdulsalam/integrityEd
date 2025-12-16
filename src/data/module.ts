import { getVideoUrlByTitle } from './videos';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Module {
	id: number;
	active: boolean;
	title: string;
	description: string;
	progress: number;
	locked: boolean;
	facts: string;
	type: string;
	types: string[];
	analogy: string;
	action: string;
	video: string;
}

export type ModuleSet = Record<Difficulty, Module>;
export type ModulesCollection = Record<string, ModuleSet>;

export const modules: ModulesCollection = {
	module1: {
		easy: {
			id: 1,
			video: getVideoUrlByTitle('module1'),
			active: true,
			title: 'What Is Corruption and Why Should We Care?',
			description:
				'Examines the various definitions and devastating effects of corruption, reviewing different understandings, and analysing approaches to measuring corruption.',
			progress: 0,
			locked: false,
			facts:
				'Corruption is often defined as the abuse of entrusted power for private gain, although expert interpretations vary. It undermines democracy and the rule of law, compromises human rights, and increases poverty and extreme inequalities.',
			type: 'Types of Corruption',
			types: [
				'Bribery: The promise, offering, or giving of an undue advantage to an official, or private sector actor, to influence their actions in the discharge of their duties.',
				"Embezzlement: The misappropriation or theft of property or funds entrusted to one's care, typically by a public official or corporate officer.",
				'Abuse of functions: Misusing public power to obtain a benefit, which can apply to patronage, nepotism, cronyism, and sextortion.',
			],
			analogy:
				'Corruption refers to the sort of decay that leads to destruction. This is exemplified historically by the decline of the Roman Empire, where bribery became the norm.',
			action:
				'To combat corruption, it is vital to utilize various multi-disciplinary anti-corruption measures that focus on addressing underlying systemic problems.',
		},
		medium: {
			id: 1,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Typologies and Costs of Corruption',
			description:
				'Distinguishing between forms of corruption (petty, grand, systemic) and analyzing measurable impacts, particularly economic loss and social inequity.',
			progress: 0,
			locked: true,
			facts:
				'Corruption ranges from isolated, small-scale acts (petty corruption) to large-scale misuse of public funds (grand corruption). Corruption results in significant economic loss, estimated at over $1.5 to $2 trillion globally per year in bribery alone.',
			type: 'Scale of Corruption',
			types: [
				'Petty Corruption: Isolated instances of corruption that do not involve the upper echelons of government leadership.',
				'Grand Corruption: Large-scale corruption involving high-level government or economic power structures.',
				'State Capture: A systemic situation where powerful elites influence or bribe officials to shape laws and policies to their private advantage.',
			],
			analogy:
				'In corrupt systems, wealth is often redistributed to the least needy, making the political system function like a rigged marketplace.',
			action:
				'Beyond criminal law, anti-corruption efforts must target institutional corruption, focusing on systematic practices that cause democratic systems to deviate.',
		},
		hard: {
			id: 1,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Conceptual Critiques and Anti-Corruption Theory',
			description:
				'A deep dive into theoretical debates on defining corruption (political, moral, economic) and critical assessment of anti-corruption measurement methodologies.',
			progress: 0,
			locked: true,
			facts:
				"UNCAC avoids a single definition of corruption, instead defining specific criminal offences due to the concept's polyvalent and transnational nature.",
			type: 'Theoretical Frameworks',
			types: [
				'Political Corruption: Violation of democratic inclusion and political equality.',
				'Moral Corruption: Decline of civic virtue leading to the triumph of private interest over public good.',
				'Legal Corruption: Criminal acts defined by statute, such as the specific offences enumerated in UNCAC.',
			],
			analogy:
				'The challenge of measuring corruption is akin to tracking a subterranean river: perception indices only map surface opinions.',
			action:
				'Effective anti-corruption strategies must employ critical thinking regarding measurement, focusing on direct evidence.',
		},
	},
	module2: {
		easy: {
			id: 2,
			video: getVideoUrlByTitle('module2'),
			active: true,
			title: 'Corruption and Good Governance',
			description:
				'Discusses the various meanings of public sector governance and identifies measures of good governance that can prevent or reduce corruption.',
			progress: 0,
			locked: false,
			facts:
				'Good governance is underpinned by core principles including participation, rule of law, transparency, responsiveness, efficiency, and accountability.',
			type: 'Principles of Good Governance Violated by Corruption',
			types: [
				'Lack of Transparency: Corruption creates secrecy and information barriers.',
				'Lack of Accountability: Corruption allows decision makers to avoid answering for their actions.',
				'Failure of Rule of Law: Corrupt practices violate published standards and obstruct fair enforcement of laws.',
			],
			analogy:
				'Good governance is key to accountability, conceptually similar to having "Good Leaders on a Leash."',
			action:
				'Governance reforms should focus on improving relationships and creating an infrastructure of integrity.',
		},
		medium: {
			id: 2,
			video: getVideoUrlByTitle('module2'),
			active: false,
			title: 'Core Governance Concepts and Accountability Mechanisms',
			description:
				'Explaining the distinction between governance and government and exploring accountability mechanisms.',
			progress: 0,
			locked: true,
			facts:
				'Governance refers to the wider behavioral relationship, structures, and processes by which a State "steers itself."',
			type: 'Governance Principles',
			types: [
				'Participation: Active involvement by all sectors of society in decision-making.',
				'Accountability (Horizontal): Formal mechanisms within government to monitor sound governance.',
				'Accountability (Vertical): Accountability of government towards citizens through elections.',
			],
			analogy:
				'Good governance involves establishing an "infrastructure of integrity" in government activity.',
			action:
				'Reforms should target the interface between government officials and private actors.',
		},
		hard: {
			id: 2,
			video: getVideoUrlByTitle('module2'),
			active: false,
			title: 'Theoretical Debates and Institutional Quality',
			description:
				'Critically examining the measurement of good governance and necessary balance between expertise and democratic legitimacy.',
			progress: 0,
			locked: true,
			facts:
				'The Worldwide Governance Indicators (WGI) quantifies governance based on six aspects.',
			type: 'Conceptual Distinctions',
			types: [
				'Rule of Law: The executive branch is constrained by laws applied equally to all.',
				'Rule by Law: The executive uses law merely as an instrument of power.',
				'Impartiality: Treating all citizens equally before the law.',
			],
			analogy:
				'Achieving governance reform is like steering a ship with many competing interests.',
			action:
				'Move beyond simple anti-corruption to building public integrity.',
		},
	},
	module3: {
		easy: {
			id: 3,
			video: getVideoUrlByTitle('module3'),
			active: true,
			title: 'Corruption and Comparative Politics',
			description:
				'Explores how corruption manifests in different political systems and how institutional design can prevent and combat corruption.',
			progress: 0,
			locked: false,
			facts:
				'Corruption is a "trans-systemic issue" that affects all political regimes.',
			type: 'Syndromes of Corruption in Political Systems',
			types: [
				'Influence Markets: Wealthy actors use wealth to seek influence within strong institutions.',
				'Elite Cartels: Networks of elites exploit institutions for joint power and gain.',
				'Official Moguls: Power is monopolized by a dictator who controls opportunities.',
			],
			analogy:
				'Political elites capturing state institutions is analogous to players colluding with football referees.',
			action:
				'Anti-corruption approaches should prioritize "deep democratization" to empower the population.',
		},
		medium: {
			id: 3,
			video: getVideoUrlByTitle('module3'),
			active: false,
			title: 'Political Corruption Manifestations and Voter Accountability',
			description:
				'Analysis of corruption syndromes and explanations for how democratic accountability mechanisms often fail.',
			progress: 0,
			locked: true,
			facts: 'The level of corruption depends heavily on the political system.',
			type: 'Voter Accountability Challenges',
			types: [
				'Information Hypothesis: Voters lack sufficient information about corrupt activities.',
				'Trade-off Hypothesis: Voters prioritize competent politicians over honest ones.',
				'Oligarch and Clan Corruption: Occurs in weak transitional regimes.',
			],
			analogy:
				'In democratic elections, corruption can operate as a hidden mechanism.',
			action:
				'Anti-corruption requires strengthening both horizontal and vertical accountability.',
		},
		hard: {
			id: 3,
			video: getVideoUrlByTitle('module3'),
			active: false,
			title: 'Institutional Design and Systemic Reform',
			description:
				'Examining deep democratization and the role of institutional structure in curbing corruption.',
			progress: 0,
			locked: true,
			facts:
				'Achieving long-term political resistance to corruption requires deep democratization.',
			type: 'Political Institution Reforms',
			types: [
				'Regulation of Political Finance: Rules establishing limits on private contributions.',
				'Deep Democratization: Empowering society to politically defend its interests.',
				'Executive Structure: Parliamentary systems tend to constrain corruption.',
			],
			analogy:
				'Regulating political finance is vital because parties can evolve into "cartel parties."',
			action:
				'Adopt measures such as merit-based recruitment and transparent political financing regulation.',
		},
	},
	module4: {
		easy: {
			id: 4,
			video: getVideoUrlByTitle('module4'),
			active: true,
			title: 'Public Sector Corruption',
			description:
				'Overview of the most common acts of corruption in the public sector, including high-risk areas like public procurement.',
			progress: 0,
			locked: false,
			facts:
				'Public sector corruption involves the abuse of government resources and leads to misallocation of resources.',
			type: 'High-Risk Areas and Manifestations',
			types: [
				'Public Procurement Corruption: Activities such as collusion, price fixing, and bid rigging.',
				'State-Owned Enterprise Corruption: High risk due to proximity to government.',
			],
			analogy: 'Systemic corruption is explained by Collective Action Theory.',
			action:
				'Prevention requires adhering to principles of rule of law, integrity, and transparency.',
		},
		medium: {
			id: 4,
			video: getVideoUrlByTitle('module4'),
			active: false,
			title: 'Theoretical Models and High-Risk Sectors',
			description: 'Application of key theories to public sector corruption.',
			progress: 0,
			locked: true,
			facts:
				'Public sector corruption typically targets areas involving large sums of money.',
			type: 'Theoretical Explanations',
			types: [
				'Principal-Agent Model: Explains corruption when agent interests diverge from principal.',
				'Collective Action Theory: Explains systemic corruption where corrupt behaviour is perceived as normal.',
				'Abuse of Functions: Includes patronage, nepotism, and cronyism.',
			],
			analogy:
				'Fighting systemic corruption requires moving beyond the Principal-Agent model.',
			action:
				'Mitigate risks in procurement through transparency, competition, and objective criteria.',
		},
		hard: {
			id: 4,
			video: getVideoUrlByTitle('module4'),
			active: false,
			title: 'Systemic Causes and Structural Prevention Strategies',
			description:
				'Analyzing structural causes and assessing advanced preventive measures.',
			progress: 0,
			locked: true,
			facts: 'Systemic causes include lack of rule of law and resource curse.',
			type: 'Preventive Mechanisms',
			types: [
				'Asset and Financial Disclosure Systems: Required by UNCAC to prevent conflicts of interest.',
				'Human Resources Reform: Adopting merit-based systems.',
				'Open Government: Using e-government and ICT.',
			],
			analogy:
				'The fight against corruption should shift to building "public integrity."',
			action:
				'States must enforce anti-corruption norms through asset recovery.',
		},
	},
	module5: {
		easy: {
			id: 5,
			video: getVideoUrlByTitle('module5'),
			active: true,
			title: 'Private Sector Corruption',
			description:
				'Addresses common forms of corruption in the private sector and prevention measures.',
			progress: 0,
			locked: false,
			facts:
				'Private sector corruption abuses private resources and includes commercial bribery.',
			type: 'Forms of Private Sector Corruption',
			types: [
				'Commercial Bribery/Kickbacks: Payments given to secure business advantage.',
				'Extortion/Solicitation: Employee requests payment in return for tasks.',
				'Trading of Information: Offering bribes for confidential information.',
			],
			analogy:
				'Companies face a "prisoner\'s dilemma" when competitors engage in corruption.',
			action:
				'Companies must adopt effective anti-corruption ethics and compliance programmes.',
		},
		medium: {
			id: 5,
			video: getVideoUrlByTitle('module5'),
			active: false,
			title: 'Corporate Liability and Compliance Mechanisms',
			description:
				'Understanding corporate liability and effective anti-corruption compliance programmes.',
			progress: 0,
			locked: true,
			facts:
				'Private corruption results in distorted markets and decreased employee morale.',
			type: 'Responses and Controls',
			types: [
				'Corporate Liability: Holding legal persons accountable for corruption.',
				'Suspension and Debarment: Excluding corrupt suppliers from government contracts.',
				'Compliance Programme: Internal measures to detect and prevent corruption.',
			],
			analogy:
				'Suspension and debarment serve as a deterrent comparable to imprisonment.',
			action: 'Compliance programmes must establish internal control systems.',
		},
		hard: {
			id: 5,
			video: getVideoUrlByTitle('module5'),
			active: false,
			title: 'Structural Causes and Collective Action Strategies',
			description:
				'Analyzing systemic causes and examining collective action against systemic corruption.',
			progress: 0,
			locked: true,
			facts: 'Corruption is perpetuated by toxic corporate culture.',
			type: 'Strategic Approaches',
			types: [
				'Value-Based Programmes: Focus on ethical values.',
				'Risk Management: A continuous process of identifying risks.',
				'Collective Action: Collaborative cooperation between stakeholders.',
			],
			analogy:
				'An effective approach requires balancing sanctions with positive messages.',
			action: 'Companies must utilize collective action initiatives.',
		},
	},
	module6: {
		easy: {
			id: 6,
			video: getVideoUrlByTitle('module6'),
			active: true,
			title: 'Detecting and Investigating Corruption',
			description:
				'Focuses on effective methods for detecting corruption and outlining investigation processes.',
			progress: 0,
			locked: false,
			facts:
				'Detection requires transparency, which lowers information barriers.',
			type: 'Key Detection Mechanisms',
			types: [
				'Whistle-blowing: Disclosure by members of illegal or immoral practices.',
				'Citizen Reporting: The public reports corruption incidents.',
				'Audits: Formal investigations used to review financial situations.',
			],
			analogy:
				"Transparency echoes Bentham's principle that public oversight resists temptation.",
			action:
				'States must establish robust whistle-blowing systems with legal protection.',
		},
		medium: {
			id: 6,
			video: getVideoUrlByTitle('module6'),
			active: false,
			title: 'The Role of Transparency and Reporting Mechanisms',
			description:
				'Detailing how transparency serves as a precondition for detection.',
			progress: 0,
			locked: true,
			facts:
				'Transparency is crucial as it deters corruption by increasing chances of detection.',
			type: 'Reporting Channels and Tools',
			types: [
				'E-government/Open Data: Using ICTs to automate services.',
				'Citizen Reporting Platforms: Websites enabling citizens to report corruption.',
				'Auditing: Formal investigations used to detect corruption.',
			],
			analogy: 'Blockchain technology promises continuous, real-time auditing.',
			action: 'UNCAC Article 10 requires States to enhance transparency.',
		},
		hard: {
			id: 6,
			video: getVideoUrlByTitle('module6'),
			active: false,
			title: 'Whistle-Blowing, Legal Protections, and Investigation Protocols',
			description:
				'Analyzing the complexities of whistle-blowing and investigation protocols.',
			progress: 0,
			locked: true,
			facts: 'Whistle-blowers possess critical insider knowledge.',
			type: 'Investigation Principles',
			types: [
				'Confidentiality and Impartiality: Core principles for all investigations.',
				'Self-Reporting: Incentivized by states through penalty mitigation.',
				'Investigation Responses: Include prosecution, disciplinary actions, and asset recovery.',
			],
			analogy:
				'The difference between a whistle-blower and leaker depends on authorization.',
			action:
				'Investigations must adhere to principles of examining all evidence.',
		},
	},
	module7: {
		easy: {
			id: 7,
			video: getVideoUrlByTitle('module1'),
			active: true,
			title: 'Corruption and Human Rights',
			description:
				'Addresses the interplay between corruption and human rights.',
			progress: 0,
			locked: false,
			facts:
				'Corruption undermines rule of law and acts as a structural obstacle to human rights.',
			type: 'Human Rights Violated by Corruption',
			types: [
				'Right to Equality: Violated when bribes are required for public services.',
				'Right to a Fair Trial: Damaged by corruption in judicial sector.',
				'Right to Education/Health: Violated through embezzlement of social service funds.',
			],
			analogy:
				'Corruption is like a structural failure that compromises the entire foundation.',
			action:
				'A human rights-based approach should be adopted focusing on victims.',
		},
		medium: {
			id: 7,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'State Obligations and Specific Rights Violations',
			description: 'Examining State obligations concerning human rights.',
			progress: 0,
			locked: true,
			facts:
				'Corruption is a structural obstacle to the enjoyment of all human rights.',
			type: 'State Obligations and Violations',
			types: [
				'Obligation to Respect: State interference through bribery.',
				'Obligation to Protect: State failure to prevent third party violations.',
				'Obligation to Fulfil: State failure to proactively provide resources.',
			],
			analogy:
				"The State's failure to enforce laws is like a security guard being bribed.",
			action:
				'Anti-corruption measures must focus on providing remedies to victims.',
		},
		hard: {
			id: 7,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Legal Critiques and the Right to Freedom from Corruption',
			description:
				'Critically analyzing legal debates on corruption and human rights.',
			progress: 0,
			locked: true,
			facts:
				'Establishing a causal link between corruption and violations is often difficult.',
			type: 'Conceptual Linkages',
			types: [
				'Correlation vs. Causation: Corruption may not be the direct cause of deprivation.',
				'Causal Link Approach: Classifies violations as direct, indirect, or remote.',
				'Human Rightism: Risk that blending human rights with anti-corruption dilutes both.',
			],
			analogy:
				'Recognizing the "right to freedom from corruption" is aspirational.',
			action:
				'A coordinated approach between anti-corruption and human rights bodies is needed.',
		},
	},
	module8: {
		easy: {
			id: 8,
			video: getVideoUrlByTitle('module1'),
			active: true,
			title: 'Corruption and Gender',
			description:
				'Explores the influence of gender in corrupt acts and the relationship between gender mainstreaming and corruption mitigation.',
			progress: 0,
			locked: false,
			facts:
				'Gender and corruption are closely linked. Corruption often has a disproportionate impact on women.',
			type: 'Gendered Forms of Corruption',
			types: [
				'Sexual Corruption (Sextortion): Using sex as currency of corruption.',
				'Discriminatory Bribery: Women may be more likely to be asked to pay bribes.',
			],
			analogy:
				'Increasing gender equality can disrupt male-dominated corrupt networks.',
			action:
				'Gender mainstreaming strategies should be used to combat corruption.',
		},
		medium: {
			id: 8,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Gender Roles, Risk, and Corrupt Opportunities',
			description:
				'Examining theories linking gender differences to corruption.',
			progress: 0,
			locked: true,
			facts:
				'Gender differences in corruption are attributed to socialization and risk aversion.',
			type: 'Gendered Impacts',
			types: [
				'Sextortion: Coercive sexual corruption demanding favours for services.',
				'Indirect Victimization: Corruption harms women through poverty exacerbation.',
				'Network Disruption: Women may act opportunistically in corrupt transactions.',
			],
			analogy:
				"Women's reliance on public services means corruption imposes higher costs on them.",
			action:
				"Gender mainstreaming must promote women's participation in monitoring.",
		},
		hard: {
			id: 8,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Institutional Mediation and Advanced Policy',
			description: 'Critiquing assumptions about gender and corruption.',
			progress: 0,
			locked: true,
			facts:
				'The correlation between gender and corruption is mediated by contextual factors.',
			type: 'Institutional Impact',
			types: [
				'Exclusion Explanation: Women have incentive to break corrupt structures.',
				'Gender Quotas: Increasing female representation correlates with corruption mitigation.',
				'Intersectional Analysis: Factors like class compound gender vulnerabilities.',
			],
			analogy: 'The true solution is promoting diversity broadly.',
			action: 'Anti-corruption programs must adopt an intersectional approach.',
		},
	},
	module9: {
		easy: {
			id: 9,
			video: getVideoUrlByTitle('module1'),
			active: true,
			title: 'Corruption in Education',
			description:
				'Discusses corruption in the education sector and strategies to prevent it.',
			progress: 0,
			locked: false,
			facts:
				'Corruption in education undermines the fundamental right to quality education.',
			type: 'Manifestations of Corruption in Education',
			types: [
				'Sexual Corruption: Demanding favours for grades or admission.',
				'Embezzlement: Misappropriating education funds.',
				'Fraudulent Admission: Selling fake degrees.',
			],
			analogy: 'Corruption replaces meritocracy with the ability to pay.',
			action: 'Effective strategies include transparent regulation systems.',
		},
		medium: {
			id: 9,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Costs, Causes, and Detection of Education Corruption',
			description:
				'Analyzing costs and factors driving corruption in education.',
			progress: 0,
			locked: true,
			facts:
				'Corruption in education incurs costs through allocative inefficiencies.',
			type: 'Corruption Drivers',
			types: [
				'High Rate of Return: Hope of high-paying job drives bribery.',
				'Low Salaries: Inadequate educator salaries create incentives for illicit payments.',
				'Sexual Extortion: Demands by educators for grades.',
			],
			analogy: 'Corruption acts like a tax on the poor seeking education.',
			action:
				'Detection methods include Physical Audits and expenditure tracking.',
		},
		hard: {
			id: 9,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Structural Vulnerabilities and Integrated Strategy',
			description:
				'Investigating systemic causes and developing anti-corruption strategies.',
			progress: 0,
			locked: true,
			facts:
				'Systemic corruption is driven by weak ethical norms and poor rule of law.',
			type: 'Strategic Responses',
			types: [
				'Transparency of Standards: Publishing procedures to increase accountability.',
				'Monitoring with Sanctions: CCTV surveillance combined with punishments.',
				'Community Ownership: Greater community involvement in oversight.',
			],
			analogy: 'Anti-corruption must employ a multi-faceted approach.',
			action:
				'Strategies should utilize Rule of Law and Public Administration reform.',
		},
	},
	module10: {
		easy: {
			id: 10,
			video: getVideoUrlByTitle('module1'),
			active: true,
			title: 'Citizen Participation in Anti-Corruption Efforts',
			description:
				'Explores the role of civil society in combating corruption.',
			progress: 0,
			locked: false,
			facts:
				'Citizen participation is crucial because anti-corruption cannot be left solely to the State.',
			type: 'Forms of Citizen Participation',
			types: [
				'Whistle-blowing: Insiders disclosing illegal practices.',
				'Citizen Monitoring: Active engagement using technology.',
				'Investigative Journalism: Media exposing corruption.',
			],
			analogy: 'Active citizens function as effective watchdogs over leaders.',
			action: 'Essential tools include whistle-blowing systems and FOI laws.',
		},
		medium: {
			id: 10,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Accountability, Empowerment, and Media Scrutiny',
			description:
				'Defining social accountability and examining citizen engagement mechanisms.',
			progress: 0,
			locked: true,
			facts:
				'Citizen participation relies on social accountability and social empowerment.',
			type: 'Enabling Mechanisms',
			types: [
				'Freedom of Information Laws: Right to request government records.',
				'Crowdsourcing/Social Media: Platforms for citizen reporting.',
				'Civil Society Organizations: Groups engaging in education and advocacy.',
			],
			analogy:
				'Corruption is fundamentally a violation of democratic inclusion.',
			action: 'Governments must comply with UNCAC Article 13.',
		},
		hard: {
			id: 10,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Challenges, UN Obligations, and Technological Activism',
			description:
				'Analyzing challenges facing CSOs and detailing government obligations.',
			progress: 0,
			locked: true,
			facts:
				'Challenges include political instrumentalization and citizen apathy.',
			type: 'Activist Models',
			types: [
				'Access to Information Activism: Leveraging FOI laws.',
				'Open Data Activism: Facilitating re-use of public data.',
				'Collective Action: CSOs forming coordinated alliances.',
			],
			analogy: 'CSOs often experience challenges from external funding.',
			action:
				'States must establish robust legal protection for whistle-blowers.',
		},
	},
	module11: {
		easy: {
			id: 11,
			video: getVideoUrlByTitle('module1'),
			active: true,
			title: 'Corruption, Peace and Security',
			description: 'Explores how corruption undermines peace and security.',
			progress: 0,
			locked: false,
			facts:
				'Widespread corruption is recognized as an underlying factor that drives conflict.',
			type: 'Corruption in Conflict Settings',
			types: [
				'Defence Sector Corruption: Corruption in procurement can escalate security threats.',
				'Corruption in Peace Operations: Misuse of funds by peacekeepers.',
			],
			analogy: 'Corruption in fragile states acts like a "corruption trap."',
			action:
				'Anti-corruption measures are crucial for post-conflict peacebuilding.',
		},
		medium: {
			id: 11,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Manifestations in Defence and Peacekeeping',
			description:
				'Analyzing how corruption sustains conflict through security sector risks.',
			progress: 0,
			locked: true,
			facts: 'The defence sector is highly vulnerable due to extreme secrecy.',
			type: 'Security Risks',
			types: [
				'Sexual Corruption: Abuse of power where peacekeepers demand favours.',
				'Violent Extremism Fuel: Corruption can provide resources to extremist groups.',
				'Need-Driven Corruption: Low-level servicemen engaging in corruption.',
			],
			analogy:
				'Corruption in defence means funds are misallocated from arms and training.',
			action:
				'Anti-corruption must be a permanent element of peacekeeping mandates.',
		},
		hard: {
			id: 11,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Transitional Justice and Systemic Reform',
			description: 'Examining corruption as a root cause of civil conflict.',
			progress: 0,
			locked: true,
			facts: 'Corruption has been identified as a root cause of civil war.',
			type: 'Post-Conflict Governance',
			types: [
				'Power-Sharing Risks: Corruption in post-conflict governance.',
				'Do No Harm Strategy: Essential during reconstruction.',
				'Transitional Justice: Addressing past corruption.',
			],
			analogy:
				'Systemic corruption in reconstruction creates a corruption trap.',
			action: 'Reforms must overcome collective action problems.',
		},
	},
	module12: {
		easy: {
			id: 12,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'International Legal Frameworks Against Corruption',
			description:
				'Overview of the United Nations Convention Against Corruption (UNCAC).',
			progress: 0,
			locked: true,
			facts:
				'UNCAC is the most comprehensive international anti-corruption treaty.',
			type: 'UNCAC Core Elements',
			types: [
				'Prevention: Establishing preventive anti-corruption policies.',
				'Criminalization: Defining specific corruption offences.',
				'International Cooperation: Mechanisms for cross-border cooperation.',
			],
			analogy: 'UNCAC serves as a global blueprint for fighting corruption.',
			action: 'States must implement UNCAC provisions domestically.',
		},
		medium: {
			id: 12,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'UNCAC Implementation and Regional Frameworks',
			description:
				'Detailing UNCAC implementation mechanisms and regional conventions.',
			progress: 0,
			locked: true,
			facts: 'UNCAC establishes a review mechanism for implementation.',
			type: 'Implementation Mechanisms',
			types: [
				'Review Mechanism: Peer review process for compliance.',
				'Technical Assistance: Support for developing countries.',
				'Regional Conventions: Complementary regional frameworks.',
			],
			analogy: 'UNCAC implementation is like building a house from blueprints.',
			action: 'States should actively participate in the review mechanism.',
		},
		hard: {
			id: 12,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Complex Crimes and Enforcement Challenges',
			description:
				'Examining challenges of illicit enrichment and asset recovery.',
			progress: 0,
			locked: true,
			facts:
				'The crime of illicit enrichment poses challenges related to human rights.',
			type: 'International Cooperation Mechanisms',
			types: [
				'Mutual Legal Assistance: Mechanisms for cross-border evidence.',
				'Extradition: Cooperation in surrendering persons.',
				'Non-Conviction Based Confiscation: Asset recovery without criminal conviction.',
			],
			analogy:
				'Asset recovery is like tracking stolen water across a complex network.',
			action:
				'States must ensure anti-corruption measures are consistent with due process.',
		},
	},
	module13: {
		easy: {
			id: 13,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'National Anti-Corruption Frameworks',
			description:
				'Discusses national policies and institutions for anti-corruption.',
			progress: 0,
			locked: true,
			facts:
				'National frameworks are the domestic structures to implement international obligations.',
			type: 'Key National Institutional Tools',
			types: [
				'Anti-Corruption Agency: Central body coordinating efforts.',
				'Codes of Conduct: Rules defining expected ethical behavior.',
				'Asset Disclosure Systems: Mandates for officials to declare wealth.',
			],
			analogy: 'The national framework is like a custom-built machine shop.',
			action: 'Governments must establish robust national legal systems.',
		},
		medium: {
			id: 13,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Strategic Components and Institutional Roles',
			description:
				'Analyzing multi-pronged approach for effective national strategies.',
			progress: 0,
			locked: true,
			facts:
				'Effective strategies require Rule of Law and Public Administration reform.',
			type: 'Core Strategic Reform Areas',
			types: [
				'Public Procurement Reform: Establishing transparent systems.',
				'Public Financial Management: Systems for managing public funds.',
				'Whistle-Blower Protection: Legal mechanisms for protection.',
			],
			analogy:
				'A national strategy acts like a blueprint for integrity infrastructure.',
			action:
				'National authorities should establish clear, transparent policies.',
		},
		hard: {
			id: 13,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Systemic Implementation and Enforcement Efficacy',
			description: 'Examining challenges related to effective enforcement.',
			progress: 0,
			locked: true,
			facts: 'Reforms must overcome collective action problems.',
			type: 'Advanced Enforcement Measures',
			types: [
				'Corporate Criminal Liability: Holding entities accountable.',
				'Debarment/Blacklisting: Excluding corrupt contractors.',
				'Asset Recovery: Pursuing forfeiture of stolen funds.',
			],
			analogy:
				'A robust framework is like installing a central nervous system.',
			action:
				'Governments must prioritize effective investigation and prosecution.',
		},
	},
	module14: {
		easy: {
			id: 14,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Building Integrity',
			description:
				'Integrating cross-cutting themes, emphasizing culture of integrity and ethics.',
			progress: 0,
			locked: true,
			facts:
				'Building Integrity involves shifting focus from addressing corruption to defining ideals.',
			type: 'Core Integrity Pillars',
			types: [
				'Honesty: Upholding truthfulness in all decisions.',
				'Accountability: Ensuring mechanisms for decision makers to answer.',
				'Transparency: Making processes available for public scrutiny.',
			],
			analogy:
				'Moving from compliance to integrity is like driving safely instinctively.',
			action: 'Promote the rule of law and adopt formal codes of conduct.',
		},
		medium: {
			id: 14,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Organizational Culture and Ethical Leadership',
			description: 'Developing value-based organizational culture.',
			progress: 0,
			locked: true,
			facts:
				'Effective integrity programmes require cultivating a value-based culture.',
			type: 'Value-Based Mechanisms',
			types: [
				'Human Resources Reforms: Implementing merit-based systems.',
				'Internal Control Systems: Policies to detect corruption.',
				'Just Culture: Environment where ethical failures are learning opportunities.',
			],
			analogy: 'Building integrity is like installing a strong immune system.',
			action: 'Organizations must continuously review ethical programmes.',
		},
		hard: {
			id: 14,
			video: getVideoUrlByTitle('module1'),
			active: false,
			title: 'Integrity as a Holistic Governance Objective',
			description:
				'Analyzing integrity as a comprehensive governance objective.',
			progress: 0,
			locked: true,
			facts: 'Public integrity is a broader objective than anti-corruption.',
			type: 'Holistic Integrity Strategies',
			types: [
				'Collective Action: Sustained cooperation to change norms.',
				'Equity and Inclusion: Ensuring all members benefit from services.',
				'Multi-Disciplinary Approach: Integrating perspectives from multiple fields.',
			],
			analogy: 'Public integrity serves as the north star of governance.',
			action: 'Initiatives must be tailored to local contexts.',
		},
	},
};


export const getModuleSet = (id: string): ModuleSet | null => {
	return modules[id as keyof typeof modules] || null;
};

export const getAllModuleIds = (): string[] => {
	return Object.keys(modules);
};

/**
 * Get modules filtered by difficulty level
 * @param difficulty - The difficulty level to filter by (easy, medium, hard)
 * @returns Array of modules at the specified difficulty level
 */
export const getModulesByMode = (difficulty: Difficulty = 'easy'): Module[] => {
	return Object.values(modules)
		.map((moduleSet) => moduleSet[difficulty])
		.filter((module) => module !== undefined);
};

/**
 * Get a specific module by module key and difficulty
 * @param moduleKey - The module key (e.g., 'module1', 'module2')
 * @param difficulty - The difficulty level
 * @returns The specific module or undefined if not found
 */
export const getModule = (
	moduleKey: string,
	difficulty: Difficulty = 'easy'
): Module | undefined => {
	return modules[moduleKey]?.[difficulty];
};

/**
 * Get all modules with their available difficulty levels
 * @returns Array of module objects with all difficulty levels
 */
export const getAllModules = (): Array<{
	key: string;
	easy: Module;
	medium: Module;
	hard: Module;
}> => {
	return Object.entries(modules).map(([key, moduleSet]) => ({
		key,
		easy: moduleSet.easy,
		medium: moduleSet.medium,
		hard: moduleSet.hard,
	}));
};

/**
 * Check if a module is unlocked based on user progress
 * @param module - The module to check
 * @param userProgress - User's overall progress percentage
 * @returns Whether the module is unlocked
 */
export const isModuleUnlocked = (
	module: Module,
	userProgress: number
): boolean => {
	// Easy modules are always unlocked
	if (module.id === 1 && module.title.includes('What Is Corruption')) {
		return true;
	}

	// Medium modules unlocked at 30% progress
	if (
		module.title.includes('Typologies') ||
		module.title.includes('Core Governance')
	) {
		return userProgress >= 30;
	}

	// Hard modules unlocked at 60% progress
	if (
		module.title.includes('Conceptual Critiques') ||
		module.title.includes('Theoretical Debates')
	) {
		return userProgress >= 60;
	}

	// Default to true for easy modules
	return module.progress === 0 || !module.locked;
};

/**
 * Calculate total progress across all modules
 * @param difficulty - Optional difficulty filter
 * @returns Total progress percentage
 */
export const calculateTotalProgress = (difficulty?: Difficulty): number => {
	const allModules = difficulty
		? getModulesByMode(difficulty)
		: Object.values(modules).flatMap((moduleSet) => [
				moduleSet.easy,
				moduleSet.medium,
				moduleSet.hard,
		  ]);

	if (allModules.length === 0) return 0;

	const totalProgress = allModules.reduce(
		(sum, module) => sum + module.progress,
		0
	);
	return Math.round(totalProgress / allModules.length);
};

/**
 * Get recommended next module based on progress
 * @param currentProgress - User's current progress
 * @returns Recommended module to work on next
 */
export const getRecommendedModule = (currentProgress: number): Module => {
	const allEasyModules = getModulesByMode('easy');
	const allMediumModules = getModulesByMode('medium');
	const allHardModules = getModulesByMode('hard');

	if (currentProgress < 30) {
		// Recommend next unfinished easy module
		const unfinishedEasy = allEasyModules.find(
			(module) => module.progress < 100
		);
		return unfinishedEasy || allEasyModules[0];
	} else if (currentProgress < 60) {
		// Recommend next unfinished medium module
		const unfinishedMedium = allMediumModules.find(
			(module) => module.progress < 100
		);
		return unfinishedMedium || allMediumModules[0];
	} else {
		// Recommend next unfinished hard module
		const unfinishedHard = allHardModules.find(
			(module) => module.progress < 100
		);
		return unfinishedHard || allHardModules[0];
	}
};

/**
 * Update module progress
 * @param moduleKey - The module key
 * @param difficulty - The difficulty level
 * @param progress - New progress percentage (0-100)
 * @returns Updated modules collection
 */
export const updateModuleProgress = (
	moduleKey: string,
	difficulty: Difficulty,
	progress: number
): ModulesCollection => {
	if (!modules[moduleKey]?.[difficulty]) {
		console.warn(`Module ${moduleKey} at ${difficulty} difficulty not found`);
		return modules;
	}

	const updatedModules = { ...modules };
	updatedModules[moduleKey][difficulty] = {
		...updatedModules[moduleKey][difficulty],
		progress: Math.min(100, Math.max(0, progress)),
	};

	// Unlock next module if progress is complete
	if (progress >= 100) {
		const nextModule = getNextModule(moduleKey, difficulty);
		if (nextModule) {
			nextModule.module.locked = false;
			nextModule.module.active = true;
		}
	}

	return updatedModules;
};

/**
 * Get the next module in sequence
 * @param currentModuleKey - Current module key
 * @param currentDifficulty - Current difficulty
 * @returns Next module and its key or null if none
 */
const getNextModule = (
	currentModuleKey: string,
	currentDifficulty: Difficulty
): { key: string; module: Module } | null => {
	const moduleKeys = Object.keys(modules);
	const currentIndex = moduleKeys.indexOf(currentModuleKey);

	// Try same difficulty, next module
	if (currentIndex < moduleKeys.length - 1) {
		const nextKey = moduleKeys[currentIndex + 1];
		const nextModule = modules[nextKey]?.[currentDifficulty];
		if (nextModule) {
			return { key: nextKey, module: nextModule };
		}
	}

	// Try next difficulty level
	const difficultyOrder: Difficulty[] = ['easy', 'medium', 'hard'];
	const currentDifficultyIndex = difficultyOrder.indexOf(currentDifficulty);

	if (currentDifficultyIndex < difficultyOrder.length - 1) {
		const nextDifficulty = difficultyOrder[currentDifficultyIndex + 1];
		const nextModule = modules[currentModuleKey]?.[nextDifficulty];
		if (nextModule) {
			return { key: currentModuleKey, module: nextModule };
		}
	}

	return null;
};

/**
 * Get module statistics
 * @returns Object with module statistics
 */
export const getModuleStats = () => {
	const totalModules = Object.values(modules).flatMap((moduleSet) =>
		Object.values(moduleSet)
	).length;
	const completedModules = Object.values(modules)
		.flatMap((moduleSet) => Object.values(moduleSet))
		.filter((module) => module.progress === 100).length;
	const unlockedModules = Object.values(modules)
		.flatMap((moduleSet) => Object.values(moduleSet))
		.filter((module) => !module.locked).length;

	return {
		total: totalModules,
		completed: completedModules,
		unlocked: unlockedModules,
		completionRate: Math.round((completedModules / totalModules) * 100),
		availableRate: Math.round((unlockedModules / totalModules) * 100),
	};
};

// Utility function to format module data for display
export const formatModuleData = (module: Module) => {
	return {
		...module,
		difficultyLabel:
			module.title.includes('Conceptual') ||
			module.title.includes('Theoretical')
				? 'Advanced'
				: module.title.includes('Typologies') ||
				  module.title.includes('Core Governance')
				? 'Intermediate'
				: 'Beginner',
		estimatedTime:
			module.title.includes('Conceptual') ||
			module.title.includes('Theoretical')
				? '45-60 min'
				: module.title.includes('Typologies') ||
				  module.title.includes('Core Governance')
				? '30-45 min'
				: '20-30 min',
		icon: module.title.includes('Corruption')
			? '🎯'
			: module.title.includes('Governance')
			? '🏛️'
			: '📊',
		prerequisites:
			module.progress > 0
				? [`Complete ${module.progress}% of previous module`]
				: [],
	};
};
