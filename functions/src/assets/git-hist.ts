export const gitHistContent = [
    {
        subject: "Data Entry Automation",
        branch: "Developer",
        tag: "",
        techStack: [
            "AutoIt",
            "Access",
            "SQL"
        ],
        description: 'Just a brief reference to very early in my career, before I was even a "developer". I had a job doing data entry, copying data from one format to another. When I noticed the repetitive nature of the tasks, I became curious if I could script a program that would do the same. Ultimately, I actually got admonished because I completed 3 weeks of work in a couple hours and had nothing left in my backlog. But my drive to write code took off from that point.',
        images: [],
        link: []
    },
    {
        subject: "The Boss App",
        branch: "Fun",
        tag: "2011",
        techStack: [
            "PHP",
            "Android",
            "Java",
            "MySQL",
        ],
        description: "This was one of my first publically distributed apps, Android and IOS integration with a PHP host and windows app. I'm not even sure I have the source-code today but it was never too complex. The mobile apps detected activity from gyros and sent a simple request to a server which would then push to the correct user an event to be recieved by the windows application. If nothing else enjoy the reference to Nexus 1 and Farmville as nostalgia for early 2010s.",
        images: [
            "assets/images/boss/boss_app_short.mp4",
        ],
        "link": ["https://www.youtube.com/watch?v=8yMsrFMZ3CU"],
        merge: "Developer"
    },
    {
        subject: "Business Automation Tools",
        branch: "Developer",
        tag: "",
        techStack: [
            "AutoIt",
            "Access",
            "SQL",
            "VB",
            "API"
        ],
        description: 'Working in the Health Insurance industry at the time, this was an extensive suite of tools built in VB to manage document generation, claims mgmt, event mgmt, user/group mgmt, DB and Message Queuing interoperability, among many other business processes. Over the course of my time here the work I contributed saved the company the efforts of 53 salaried employees by handling these processes programmatically.',
        images: [],
        link: []
    },
    {
        subject: "Get Next",
        branch: "Developer",
        tag: "",
        techStack: [
            "VB",
            "SQL",
            "Service Bus",
            "API"
        ],
        description: 'A Custom, in-house, workflow management tool. This application was windows based and created a communcation hub of work effort between multiple depertments within our company allowing for easy tracking, queueing, and reporting of progress of work items.',
        images: [],
        link: []
    },
    {
        subject: "JFT",
        branch: "Fun",
        tag: "2015",
        techStack: [
            "Android",
            "Java"
        ],
        description: 'Simple Android app. Experimental in interface design and staying up to date with mobile app development at the time. Just proving to myself that I still could. I had been working for so long with VB and VBA, I wanted to stretch myself a bit in an area where I felt less confident. I would love to continue building mobile apps today, but it just hasn\'t been at the top of my list',
        images: [
            "assets/images/jft/jft_1.jpg",
            "assets/images/jft/jft_2.jpg"
        ],
        link: [],
        merge: "Developer"
    },
    {
        subject: "Motion Controlled Sphero",
        branch: "Engineer",
        tag: "2017",
        techStack: [
            ".NET Core",
            "Express JS",
            "API",
        ],
        description: "Result of a 'Hackathon' hosted by a previous employer. I had 24 hrs to build <i>something</i>. Ended up integrating an xbox kinect as controller to track hand-movements and navigate this robotic smart-toy around a space. Have since given a few Boys&Girls Club of America demonstrations on engineering and development with this project as the premise.",
        images: [
            "assets/images/sphero/sphero.mp4",
            "assets/images/sphero/sphero_1.jpeg",
        ],
        "link": [],
        merge: "Developer"
    },
    {
        subject: "Billing Console",
        branch: "Developer",
        tag: "",
        techStack: [
            ".NET",
            "C#",
            "Angular",
            "Javascript",
            "API",
            "Azure",
            "SQL",
            "AWS"
        ],
        description: "I hope you'll appreciate I'm limited in what I can share about this and some other internal tools. This was an exclusively internal app created within 4 weeks as an emergency stop gap for a failed billing system that needed <i>some</i> automation and option to manual review. We spent much of the next 2-3 years iterating and eventually rebuilding the app in a modern stack.",
        images: [],
        link: []
    },
    {
        subject: "StreamOne Cloud Marketplace",
        branch: "Developer",
        tag: "",
        techStack: [
            "PHP",
            "Javascript",
            "SQL",
            "NoSQL",
            "API",
            "AWS"
        ],
        description: 'This PHP app was my primary focus for my first few years with Tech Data. A cloud service marketplace which created a hub for interaction between cloud vendors, resellers, and endusers. In addition to facilitating sales and subscriptions of the available services, SCM was an improvised billing data hub for integration to SAP as well as a reporting platform for usage.',
        images: [],
        link: []
    },
    {
        subject: "DataFix Tools",
        branch: "Architect",
        tag: "2018",
        techStack: [
            "PHP",
            "SQL",
            "NoSQL",
            "OAuth",
            "API",
            "Azure",
            "AWS"
        ],
        description: 'When first brought on to TechData, the team I was working with had just had a massive failure in billing (2015 Holidays). In addition to the "Billing Console" application created, we had <i>thousands</i> of records needing fixed data, and sadly, it wasn\'t just going to be one query. Without direction, I found opportunities to simplify all of the common mongo and postgresql queries needed and generated a set of internal utilities which allowed for us to clear our queue (avg 800 tickets) within just a couple weeks.',
        images: [],
        link: [],
        merge: "Developer"
    },
    {
        subject: "StreamOne Ion Cloud eCommerce",
        branch: "Developer",
        tag: "",
        techStack: [
            "Angular",
            "CMS",
            "C#",
            ".NET",
            "Javascript",
            "API",
            "SQL",
            "OAuth",
            "Azure",
            "ADF",
        ],
        description: 'With the success of StreamOne Cloud Marketplace, our team was given an opportunity to rebuild the ecommerce platform. This was my first officially with a role as Development Team Lead tasked with leading some of the efforts, in total, one of six concurrent teams. Sadly, through failures in planning and poorly managed scope, this one fell into development hell and never released past beta when the decision was made to scrap the effort and license an existing platform.',
        images: [
            "assets/images/ebc/bc_old.png",
            "assets/images/ebc/bc_old_2.png",
            "assets/images/ebc/ebc_1.png",
        ],
        link: []
    },
    {
        subject: "Enterprise Billing Connector",
        branch: "Developer",
        tag: "",
        techStack: [
            "C#",
            ".NET Core",
            "Angular",
            "Javascript",
            "SQL",
            "AWS",
            "OAuth",
            "Azure",
            "ADF",
        ],
        description: "The was the rebuild of the billing console application. An attempt to create a more modular application which was designed from the ground up to integrate with various ERP systems and supporting vendor subscription billing practices. Again, a measured success creating the space for our team to develop the collective 'StreamOne Enterprise Apps' suite.",
        images: [
            "assets/images/ebc/bc_old.png",
            "assets/images/ebc/bc_old_2.png",
            "assets/images/ebc/ebc_1.png",
        ],
        "link": []
},
    {
        subject: "Smart Mirror",
        branch: "Engineer",
        tag: "2021",
        techStack: [
            "Raspbian",
            "GCP",
            "AWS",
            "Node JS"
        ],
        description: "Started at home as a challenge to myself, prior to this most of my work had been exclusively software. The Mirror hosts a ras-pi, integration with Google and AWS for AI Assistants, and a demonstration of current events, news, weather, photos, daily quotes, and to-do lists",
        images: [
            "assets/images/mirror/mirror.mp4",
            "assets/images/mirror/mirror_1.jpg",
            "assets/images/mirror/mirror_2.jpg",
        ],
        "link": [],
        merge: "Developer"
    },
    {
        subject: "Shib CoOp",
        branch: "Architect",
        tag: "",
        techStack: [
            "Angular",
            "Typescript",
            "Node JS",
            "SQL",
            "MSA",
            "Express JS",
            "Solidity",
            "GCP",
            "Web3",
            "Python",
            "Azure",
            "Docker",
        ],
        description: "The CoOp was a side project where I partnered with a very talented UI/UX dev to create multiple functional Web3 Utilites from the ground up, including a web3 marketplace, interactive map, token swap, and more. I had a blast building the CoOp Apps, and look forward to finding unique ways to explore these applications further in the future.",
        images: [
            "assets/images/coop/coOp_6.jpg",
            "assets/images/coop/coOp_7.jpg",
            "assets/images/coop/coOp_3.jpg",
            "assets/images/coop/coOp_1.jpg",
        ],
        "link": ["https://shibcoop.io"]
    },
    {
        subject: "S1 Ent. Apps",
        branch: "Developer",
        tag: "",
        techStack: [
            "C#",
            "Angular",
            "Typescript",
            ".NET Core",
            "SQL",
            "NoSQL",
            "MSA",
            "Azure",
            "Service Bus",
            "OAuth",
            "Kubernetes",
            "API",
            "ADF",
        ],
        description: 'A collection of Microservices used to facilitate an expansion of the Billing Connector. Credit monitoring and management, Identity and Authorization Mgmt, Application Gateway, etc. Closely following Microsoft\'s design guidelines for structure and interaction, this has been a successful endeavor of my recent years.',
        images: [
            "assets/images/arch/arch_1.png",
            "assets/images/arch/arch_2.png",
            "assets/images/arch/arch_3.png",
            "assets/images/arch/arch_4.png",
        ],
        link: []
    },
    {
        subject: "FlowFrenz",
        branch: "Architect",
        tag: "2023",
        techStack: [
            "Angular",
            "Typescript",
            "Node JS",
            "SQL",
            "Babylon",
            "API",
            "Solidity",
            "Web3",
            "NoSQL",
            "Python",
            "GCP",
            "Docker"
        ],
        description: "FlowFrenz is still under development today. Another web3 marketplace using babylon.js for creating a 3d-space for integration and UI elements. Between this and CoOP, I had opportunities to iterate and perfect the functionality required.",
        images: [
            "assets/images/flow/flow_3.jpg",
            "assets/images/flow/flow_2.jpg",
            "assets/images/flow/flow_1.jpg",
        ],
        "link": [],
        merge: "Fun"
    },
    {
        subject: "AI Bots Discord/Telegram",
        branch: "Fun",
        tag: "Fun",
        techStack: [
            "AI",
            "API",
            "Node JS",
            "Web3",
            "Javascript",
            "Docker",
        ],
        description: 'A collection of Node bots with AI integration through a custom GPT to support real-time data about the cryptocurrency space. Natural Language processing, consolidated current events, and analysis/review of the financial industries associated. Also, just a bit of "flavor" through personalities to add some joy.',
        images: [
            "assets/images/bots/bots_1.jpg",
            "assets/images/bots/bots_2.jpg",
        ],
        link: []
    },
    {
        subject: "Giant Etch-a-Sketch",
        branch: "Engineer",
        tag: "2024",
        techStack: [
            "Raspbian",
            "Python"
        ],
        description: "This was a side-project volunteered for a Christmas celebration in my area. The ask was to create a giant Etch-a-Sketch with working controls. The stack is a ras-pi, with a simple rotary controller running on python connected to an express server. Was very fun to build, working with a close friend well experienced in DevOps and Hardware.",
        images: [
            "assets/images/etch/etch_3.mp4",
            "assets/images/etch/etch_4.gif",
            "assets/images/etch/etch_1.jpg",
            "assets/images/etch/etch_2.jpg",
        ],
        "link": [],
        merge: "Developer"
    },
    {
        subject: "Mission City",
        branch: "Developer",
        tag: "Developer",
        techStack: [
            "Angular",
            "Typescript",
            "PHP",
            "Node JS",
            "PHP",
            "MySQL",
            "CMS",
            "NoSQL",
            "Azure",
            "Docker",
        ],
        description: "Mission City has been an opportunity for me to volunteer some of my skills over the years. While much of their website is hosted and managed through a page-builder named \"Subsplash\", I've recently had a chance to build some custom web-apps to expand on the functionality of the website over time. I also manage all IT here in my free time.",
        images: [
            "assets/images/mcc/mcc_2.jpg",
            "assets/images/mcc/mcc_1.jpg",
        ],
        "link": ["https://missioncitychurch.com/"]
    },
    {
        subject: "Harry Potter Wand Box",
        branch: "Engineer",
        tag: "Engineer",
        techStack: [
            "Raspbian",
            "Python",
            "AI"
        ],
        description: "Started as a side-project for my daughter specifically, though I'm now iterating on more efficient builds that I can package and distribute. Another ras-pi project, machine learning algorithm to identify specific wand motions, computer vision to interpret IR reflectors, and python code internally for processing and handling. Servos included to open/close the box when the right 'spell' is cast. :)",
        images: [
            "assets/images/wand/wand.mp4",
            "assets/images/wand/wand_1.jpg",
            "assets/images/wand/wand_2.jpg",
        ],
        "link": []
    },
    {
        subject: "Notification Service",
        branch: "Architect",
        tag: "Architect",
        techStack: [
            "C#",
            ".NET Core",
            "Angular",
            "NoSQL",
            "Kubernetes",
            "Docker",
            "API",
            "Azure",
            "Service Bus",
            "OAuth",
            "MSA"
        ],
        description: "Notification Service was an Azure MSA component used for internal communcation through multiple distribution methods for pre-defined system events. My responsibilities here were architecture, documentation, and Proof of Concept to design from greenfield to release this kubernetes hosted solution.",
        images: [
            "assets/images/notif/notif_1.jpg",
            "assets/images/notif/notif_5.jpg",
            "assets/images/notif/notif_2.jpg",
            "assets/images/notif/notif_6.jpg",
        ],
        "link": []
    },
]