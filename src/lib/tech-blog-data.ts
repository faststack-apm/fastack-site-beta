export interface TechBlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
}

export const TECH_BLOG_POSTS: TechBlogPost[] = [
  {
    slug: "launching-a-product",
    title: "Launching a Product",
    date: "April 10, 2026",
    excerpt: "When a builder builds...",
    readTime: "5 min read",
    category: "Product",
    content: `
# Launching a Product

My career has been an interesting ride. I by any means am not the smartest person you might meet. I like to problem solve, I guess that is a measurement of &nbsp;smart&nbsp;, however I pride myself in surrounding myself with people smarter than me. A key influence in my life was Walt Disney, who held the same philosophy. I was &nbsp;extremely&nbsp; fortunate early in my career to meet a class of people from many different backgrounds that were talented beyond any measure. I learned things, tricks of the trade, quick to listen, quick to learn. 

Looking back, I have been building dreams, products for my entire career. That is the way I view it. Making things for other people, and not ashamed of it. I am a productive member of a team effort. In large corporate environments, you play a role, hopefully a critical one. In small scale operations, i.e. startups, you have the potential to make more of a direct impact.

The job market is rough these days, really rough. Creating a side project used to be a good move in terms of marketing yourself as an software engineer, however these days the ability to vibe code a solution pollutes the waters. The lines between what a developer can actually produce have been somewhat blurred. By producing a production grade commercial product offering, I think I am establishing a great opportunity to showcase my true capabilities. 

I am particularly excited about this project as I have to push the limits of my UX capabilities, take on the roles of a marketer, and business owner. This should prove to be a challenge, one which I am deeply engaged with.

    `
  },
  {
    slug: "Learning-by-Failure",
    title: "Learning by Failure",
    date: "April 8, 2026",
    excerpt: "Process of continual refinement...",
    readTime: "4 min read",
    category: "Reflection",
    content: `

Process of continual refinement...

Building is easy, comfort zones are a great place to land, specializing in any given area is a safe landing zone. My initial attempt at architecting was a POC, intended to be thrown away. Just getting something to work in order to flsh out potential design issues and defining API contracts provided value. As a logical next step, an effort was made to establish a long term implementation. The end result, a solution that would not meet the potential scalability requirements. 'A' for effort, however not exactly where I needed to land. 

Building a service that handles streaming data from numerous other services presents a challenge. The amount of processing and throughput is inherently more complex then an isolated application. I have never built anything at this scale before. While it was immediately apparent that a messaging option would be required to support asynchronous processing, my initial decision to use Rabbit MQ proved to be somewhat shortsighted. It would most likely not scale to the level I needed. I based that decision on the fact I am proficient with it, and was attempting to avoid taking on a new technology. It turns out Kaftka made more sense in this context. Scalable, built for high throughput, and as an added bonus provides the ability to 'go back' historically. 

I am really not clear as to why so many job postings emphasize 'x' number of years experience with Rabbit or Kaftka. I was able to pick up Rabbit from day one in a previous role. I think the ability to pick things up quickly is a key skill, and should carry a lot of weight. Sometimes we overlook the fact that a duration of time with a given technology does not necessarily equate to expertise. In my previous role, I implemented an async process, once it was in place, I never really touched it again, but I can mark that off as '2 years experience with RabbitMQ'. Does that make me more experienced than someone with only 1 years experience working with it? Not necessarily. I think the fact that I was able to pick it up, and the extent of how it was used should stand out. 

I ended up sinking my first formal attempt at the infrastructure. A little painfull, however better to start off with a clean slate. I probably lost around 2 or 3 weeks of development time, however I chalked that off as a learning experience. I am a hands on, visual person. This approach allows me form a proper perspective. I am analytical, I tend to rip through and critique my efforts. I don't walk around with a large ego, and interpret events where I prove myself wrong as a learning experience. I love to cook, a true passion of mine. I have honed my skills in this area over the years. I produce restaurant quality dishes on a regular basis, however I screw up all of the time. It's because I try, I take risks, sometimes I fail, and I learn. It's a continual process. 

My second iteration addressed some key points I had overlooked. Most of the improvements focused on tenant reassignment and hot deployments, as constant uptime is critical. This goes beyond simply pooling a collection of servers behind a proxy. Processes need to be shut down in a 'graceful manner', allowing in-flight requests to complete prior to final termination. 

I am very pleased with the final architecture. In this case, the third time is a charm. Java 21 virtual threads look promising, and given a modular architecture, a future enhancement would be to possibly swap out the Java implementation for the OTEL gateway for a Rust based version (assuming we might get a performance gain here). Sometimes it makes sense to scrap an effort before you get too far down the path, and start over.   



`
  },
  {
    slug: "lessons-from-ai-driven-ui-development",
    title: "Lessons Learned from AI Driven UI Development",
    date: "April 1, 2026",
    excerpt: "Personal observtions from in the trenches...",
    readTime: "7 min read",
    category: "AI",
    content: `



This particular effort has been an interesting one as I have focused a lot of time over the past 24 months working with AI as an assistant. I am particular about how to structure code, and have high expectations from a UI perspective. I am not willing to sacrifice anything for a possible AI assisted productivity boost. 

For the most part, I have had stellar luck in what has been generated. I attribute this to very well defined specs. I have spent countless hours defining specs, and working with agents. It almost seems like this detracts from the overall productity gain, however this is a critical step. 

When asked what tools I am using, it is kind of a hard question to answer. Things in the AI space are constantly changing. It almost seems like I find myself coding at night, only to wake up in the morning with a fresh cup of coffee only to read the news about what had changed in the field overnight. I am somewhat reluctant to detail out my workflow, as this is an ever changing process, however I will share some details here, that reflects my current practices as of today, no gurantees if that changes tomorrow.

UX
	I am probably going to bruise a few egos here... My approach is a little different from other roles I have participated in. I am not a big fan of Figma. I view it as somewhat difficult to work with. It's good for sharing design specs, but not an ideal design environment for me. I also really don't care about pixel perfect level CSS. I have personally witness so many waisted cycles on that level of detail trying to fine tune the UI to perfection. So if a spec says 5px, and for some reason the source reflects 7px, this might get flagged in a PR, kick backed to the developer, and submitted again. Developers seem to over focus on this. If management at my last role know that small events such as these were costing (literally) $500 per occurance, only to stroke the ego of over zealous developers and designers, I think they would have shut that practice down. 

	I don't want to deemphasize the UI effort, however my approach was to invest a significant effort establishing a design template, panels, form elements, menus and everything I could possibly concieve, and then let AI handle the implementation details. No Figma. I can get away with this as I am the only stakeholder, but with such a streamlined process, I think everyone should rethink the overall defacto workflow practies for these type of efforts. My UI looks good, really good. I have given up a little control of the design process, but the tradeoff is significant. 

	I find that Builder.io has yielded 'great' results. I had some success with Base 44, but that experience left me with the feeling that is better suited for pure vibe coding. My workflow is a bit unusual in that I find myself producing artifacts in builder.io, and then cutting and paisting the source iunto the actual project. The flow is unidirection, and I make no attempt to update the master design project in builder with any changes made in the actual deployable project. This might be an opportunity for improvement here, however this basically works, and so far using claude and or gemini to generate new pages is really working out. These tools appear to 'get the UI right', as if they understand the desired look and feel. I am particularly impressed by this behavior.

Strategy
	I have spent a lot of time working on strategy in the form of countless flowcharts, and dialogs with AI agents. Gemini and Claude come into play here, and I often find myself working with both to compare answers. I have had never implemented a cyclical billing routine, but after a few sessions was able to develop a solid strategy for an implementation. This is not so much a process of 'build me something that does this', but one where I invest a fair amount of effort defining goals and requirements, and establishing an interactive working session with the agents, often asking for 2-3 options and probing for potential issues. This level of effort is key to success. Sometimes the agents are incorrect, or overlook certain aspects. I am not a semi technical person delegating the thinking to an agent, I am fully capable to doing this type of work without an agent, however I can also hammer nails, but prefer to use an numatic nailgun as it it much more efficient. 


Code generation

	I have been working with Claude code, probably considered a 'gold standard' at this point in time, however I am using Google Antigravity, and am quite pleased with it. I never was a big fan of Eclipse, I just got uesd to it. Heavyweight and a clunky experience. I never was a huge fan of IntelliJ as well, it just seemed awkward for some reason. I did like Sun Microsystems NetBeans. Yeah, I am that old, I worked with NetBeans, deployed to Jeeves, on Sun hardware. Good times. I am quite happy with Visual Studio Code, my go to ediutor, and am pleased that I have a common IDE for both serv er side and UI development.

	I instruct the agent to produce unit tests when appropriate. Methods need to be small, testable, and serve a concise purpose. The agents usually get things 'right', however I frequenly find myself adding additional unit tests for additional scenarios. 

	I also find myself breaking down development efforts into steps, and generting source accordingly. This often involves instructing the agents to stub methods so I can incrementally test the functionality. This approach lends the opportunity to not get too far down the road, lending the ability to course correct as needed.


The end result? I am about 10x more productive. I consider myself pretty damn productve to beging with, however this is like riding a rocket powered skaeboard. At my last FT role we had a team of developers billing out at 40k weekly. Based on my current throughput, I would compare my output as that of 4 of their developers, and am not sure I would attempt this effort if I had to implement everything from scratch.`
  }
];
