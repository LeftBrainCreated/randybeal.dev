export const contentData =

    [
        {
            section: "dev-preview",
            buttons: [
                {
                    name: "Billing Console",
                    techStack: [
                        "C# .NET 4.6",
                        "AngularJS",
                        "MS SQL Server",
                        "REST",
                        "SOAP XML",
                        "AWS Lambda",
                        "ADO Pipelines"
                    ],
                    description: "I hope you'll appreciate I'm limited in what I can share about this. This was an exclusively internal app created within 4 weeks as an emergency stop gap for a failed billing system that needed <i>some</i> automation and option to manual review. We spent much of the next 2-3 years iterating and eventually rebuilding the app in a modern stack as a modern solution.",
                    images: [
                        "assets/images/ebc/bc_old.png",
                        "assets/images/ebc/bc_old_2.png",
                        "assets/images/ebc/ebc_1.png",
                    ],
                    "link": []
                },
                {
                    name: "Notification Service",
                    techStack: [
                        "C# .NET Core",
                        "Angular",
                        "Mongo DB",
                        "Kubernetes",
                        "REST",
                        "Azure Service Bus"
                    ],
                    description: "Another situation where I can only share so much, Notification Service was an Azure MSA component used for internal communcation through multiple distribution methods for pre-defined system events. This was one of my first opportunities as an architect to design from greenfield to release this k8s hosted solution.",
                    images: [
                        "assets/images/notif/notif_1.jpg",
                        "assets/images/notif/notif_5.jpg",
                        "assets/images/notif/notif_2.jpg",
                    ],
                    "link": []
                },
                {
                    name: "Shib CoOp",
                    techStack: [
                        "Angular",
                        "Typescript",
                        "Node JS",
                        "Azure SQL Server",
                        "REST/Express",
                        "Solidity",
                        "Firebase Functions"
                    ],
                    description: "This is one where I have the opportunity to share as much as I'd like, This was a side project where I partnered with a very talented UI/UX dev to create multiple functional Web3 Utilites from the ground up, including a web3 marketplace, interactive map, token swap, and more. I had a blast building the CoOp Apps, and look forward to finding unique ways to explore these applications further in the future.",
                    images: [
                        "assets/images/coop/coOp_6.jpg",
                        "assets/images/coop/coOp_7.jpg",
                        "assets/images/coop/coOp_3.jpg",
                        "assets/images/coop/coOp_1.jpg",
                    ],
                    "link": ["https://shibcoop.io"]
                },
                {
                    name: "Mission City",
                    techStack: [
                        "Angular/Typescript",
                        "PHP",
                        "Node JS",
                        "PHP MySQL",
                        "Subsplash",
                        "NoSQL DB",
                        "Azure Linux"
                    ],
                    description: "Mission City has been an opportunity for me to volunteer some of my skills over the years. While much of their website is hosted and managed through a page-builder named \"Subsplash\", I've recently had a chance to build some custom web-apps to expand on the functionality of the website over time. I also manage all IT here in my free time.",
                    images: [
                        "assets/images/mcc/mcc_2.jpg",
                        "assets/images/mcc/mcc_1.jpg",
                    ],
                    "link": ["https://missioncitychurch.com/"]
                },
                {
                    name: "Flow Frenz",
                    techStack: [
                        "Angular",
                        "Typescript",
                        "Node JS",
                        "Azure SQL Server",
                        "Babylon",
                        "REST",
                        "Solidity"
                    ],
                    description: "FlowFrenz is still under development today. Another web3 marketplace using babylon.js for creating a 3d-space for integration and UI elements. Between this and CoOP, I had opportunities to iterate and perfect the functionality required.",
                    images: [
                        "assets/images/flow/flow_3.jpg",
                        "assets/images/flow/flow_2.jpg",
                        "assets/images/flow/flow_1.jpg",
                    ],
                    "link": []
                },
                {
                    name: "Boss App",
                    techStack: [
                        "PHP",
                        "Android Java",
                        "MySql",
                        "REST",
                    ],
                    description: "This was one of my first publically distributed apps, Android and IOS integration with a PHP host and windows app. I'm not even sure I have the source-code today but it was never too complex. If nothing else enjoy the reference to Nexus 1 and Farmville as nostalgia for early 2010s.",
                    images: [
                        "assets/images/boss/boss_app_short.mp4",
                    ],
                    "link": ["https://www.youtube.com/watch?v=8yMsrFMZ3CU"]
                },
                {
                    name: "PGW",
                    techStack: [
                        "PHP",
                        "Javascript",
                        "REST"
                    ],
                    description: "Built as a favor for a friend, this one came out pretty clean. There's not a whole lot of scripting or development here, just a PHP site with a lot of static content.",
                    images: [
                        "assets/images/pgw/pgw_2.jpg",
                        "assets/images/pgw/pgw_1.jpg",
                    ],
                    "link": ["http://performanceglassworks.com/index.php"]
                }
            ]
        },
        {
            section: "eng-preview",
            buttons: [
                {
                    name: "Harry Potter Wand Box",
                    techStack: [
                        "Raspbian",
                        "Python",
                        "PiCamera",
                        "SVM Machine Learning",
                        "CV2 (Computer Vision)",
                        "Servo Controllers"
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
                    name: "Smart Mirror",
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
                    "link": []
                },
                {
                    name: "Giant Etch-a-Sketch",
                    techStack: [
                        "Raspbian",
                        "Python",
                        "Servo Controllers",
                        "GIT Auto Deployers"
                    ],
                    description: "This was another side-project volunteered for a Christmas celebration in my area. The ask was to create a giant Etch-a-Sketch with working controls. The stack is a ras-pi, with a simple rotary controller running on python connected to an express server. Was very fun to build, working with a close friend well experienced in DevOps and Hardware.",
                    images: [
                        "assets/images/etch/etch_3.mp4",
                        "assets/images/etch/etch_4.gif",
                        "assets/images/etch/etch_1.jpg",
                        "assets/images/etch/etch_2.jpg",
                    ],
                    "link": []
                },
                {
                    name: "Motion Controlled Sphero",
                    techStack: [
                        ".NET Core",
                        "Express JS",
                        "MS Kinect",
                        "Sphero API"
                    ],
                    description: "Result of a 'Hackathon' hosted by a previous employer. I had 24 hrs to build <i>something</i>. Ended up integrating an xbox kinect as controller to track hand-movements and navigate this robotic smart-toy around a space. Have since given a few Boys&Girls Club of America demonstrations on engineering and development with this project as the premise.",
                    images: [
                        "assets/images/sphero/sphero.mp4",
                        "assets/images/sphero/sphero_1.jpeg",
                    ],
                    "link": []
                }
            ]
        },
        {
            section: "arc-preview",
            buttons: [
                {
                    name: "Enterprise Apps",
                    techStack: [
                        "GPT / AI",
                        ".NET Core",
                        "Docker",
                        "Jenkins",
                        "OAuth",
                        "ADF",
                        "Visio"
                    ],
                    description: "I've developed for fortune 100 in-house and cloud based enterprise applications managing big data, transactions, analytics and reporting. Recently focused on AI adoption and integration. I'm well experienced in enterprise level architecture and design patterns with hands-on centered on reseller platforms, messaging solutions, plug-n-play billing integration systems, all drenched in security, risk mgmt and Disaster Recovery and mitigation.",
                    images: [
                        "assets/images/arch/arch_1.png",
                        "assets/images/arch/arch_2.png",
                        "assets/images/arch/arch_3.png",
                        "assets/images/arch/arch_4.png",
                    ],
                    "link": []
                },
                {
                    name: "MicroService Messaging",
                    techStack: [
                        ".NET Core",
                        "Azure Service Bus",
                        "Azure Functions",
                        "Kubernetes",
                        "Multiple Individual App Components"
                    ],
                    description: "Mostly Azure ServiceBus and functions And IBM Websphere MQ, knowledge of how to manage no-fail messaging systems and their interactions with multiple components in-house and externally. Supporting one-time only processing and failover handling.",
                    images: [
                        "assets/images/notif/notif_1.jpg",
                        "assets/images/notif/notif_3.jpg",
                        "assets/images/notif/notif_4.jpg",
                        "assets/images/notif/notif_6.jpg",
                    ],
                    "link": []
                },
                {
                    name: "Web 3 / Blockchain",
                    techStack: [
                        "Angular/Typescript",
                        "Express/Node JS",
                        "GPT / AI Comms & Planning",
                        "Figma",
                        "Discord/Twitter/Telegram API Integrations"
                    ],
                    description: "Honestly, I don't know that this one provides much value today, but is was an area where I took interest around lockdowns. If nothing else, just a reminder that no technolgy is out of reach and with a bit of dedication, any new tech can be adopted and manipulated to fit a defined goal.",
                    images: [
                        "assets/images/web3/web3_1.jpg",
                        "assets/images/web3/web3_2.jpg",
                    ],
                    "link": []
                }
            ]
        }
    ]
