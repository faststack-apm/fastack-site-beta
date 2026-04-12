export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "concept-to-implementation",
    title: "How did we ever arrive here?",
    date: "April 8, 2026",
    excerpt: "Exploring the journey of how we went from a whiteboard session to a high-performance analytics engine.",
    readTime: "6 min read",
    category: "Engineering",
    content: `
# From Concept to Implementation: Building Fast Stack

	Just six months ago, a vision was formed after years of frustration with the current solutions available on the market. A vision was born, a blueprint defined, and work began on transferring that vision into a reality. Endless nights, weekends, and just about any time in between resulted in what might be called an what might be considered an 24 hours a day effort, with a few small brakes between development cycles.  

	It turns out, digiesting metrics is relatively easy, scaling that effort is hard, and providing effective visualizations into those metrics is even harder. An initial server side architecture was developed in under a week. Rough, functional, an effective draft. This provided a great foundation for establishing API contracts. It was well understood that the effort would be an 'disposable' one. What was not expected was that two additional separate efforts were made, battle tested, and untilately dismanteled. Load testing quickly exposed design flaws. This has been an intersting excersize in that we are not ingesting metrics for a single application, however creating a solution for ingesting metrics for hundreds if not thousands of applications. 

	Beyond scalability concearns, uptime is another important topic. Configuration changes, deployments, etc need to be performed in realtime. Interrupting service to customers for these types of changes is not acceptable. I becomes neccesary to establish a solution where changes may be introduced in an asynchronous (hot reload) manner, where inbound requests support backpressure. Essntially we need a system that scales infinately, and aims to provide a no downtime experience. It's hard than it might initially appear.   

    `
  },
  {
    slug: "onboarding-experience",
    title: "A Redefined Onboarding Experience",
    date: "April 5, 2026",
    excerpt: "Turning the typical onboarding process upside down.",
    readTime: "4 min read",
    category: "Product",
    content: `
# A Redefined Onboarding Experience

Today we have reached a significant milestone in our product release cycle: the onboarding process for our initial product release, **Fast Stack Flow**, a modern solution for HTTP log analysis. We wanted to turn the traditional signup and onboarding experience upside down.

## Streamline the process of collecting initial data
We wanted to collect all essential data early on in the process. We conceptualized an experience where the user is guided through the initial data entry process, rather than presenting traditional form-based inputs. Less of a focus on technical data entry, and a shift towards an approachable conversation.

## Minimize the initial onboarding learning curve
Adopting a new solution requires effort and an investment of time. Ingesting metrics, defining users, and configuring dashboards are common tasks for products in this space; however, each solution approaches this differently. We wanted to take information provided during the signup process and perform some of the initial setup steps in an automated fashion, reducing the amount of manual effort on the new customer's part. 

The end goal: collect information up front, validate the inputs, seed data, and make it available immediately through role-specific dashboards. We’ve replaced the manual slog with a <span className="font-bold text-foreground">guided, automated experience</span>. 

Our goal is to collect a minimal amount of data up front, and then launch you immediately into a usable product, seeded with your data. Hit the ground running.

## Interactive troubleshooting
Security is a large concern in modern applications. Threats are ever-present, and tactics used are becoming increasingly complex. Firewall rules and security policies can become obstacles for establishing a successful integration. A traditional approach might result in a scenario where a new account is created and the billing cycle started, but the customer is unable to begin immediately using the product. This is not an optimal experience.

We have introduced the ability to validate the customer's log format and the ability to integrate seamlessly with our infrastructure.

[VIDEO_CTA:Onboarding Flow & Data Ingestion Demo:/flow_product_onboarding.mp4:/flow-onboarding.png]
    `

  },
  {
    slug: "initial-product-release",
    title: "Announcing Our Initial Product Release",
    date: "April 1, 2026",
    excerpt: "An iniital milestone as we prepare for our first beta release.",
    readTime: "3 min read",
    category: "Announcements",
    content: `
# Announcing Our Initial Product Release

We have reached a point where our initial product offering, **Fast Stack Flow**, is reaching a near beta phase. This is a significant milestone, as this effort required extensive foundational work alongside product-specific features. This represents a disproportionate level of commitment to getting the base platform right.

## Beyond Log Analysis
While the core focus of Fast Stack Flow is HTTP log analysis, we have built in support for integrated future product offerings. While Flow is intended for more marketing-centric roles, simply identifying slow-performing pages does not provide full visibility into the underlying root causes. Our long-term vision is to allow any resource to "drill into" performance hot spots and dive deeper into the stack to locate the root cause.

## Bridging the Gap: Marketing to Engineering
Imagine a scenario where a marketing team, focused on campaign performance and user experience, identifies a particular performance issue. That role focuses on performance from an end-user perspective. The ability to determine if a bottleneck is related to client-side logic or infrastructure is key, as it determines how the issue should be escalated.

From within the **Flow IDE**, the user is able to make an initial assessment. They can determine if the issue should be routed to a technical resource and gather critical initial details:
- Is the performance issue related to traffic levels?
- Is it intermittent or consistent?
- How recently did this start occurring?

## Holistic Performance Measurement
All too often, page performance is measured solely by the initial loading of the request's HTML resource. But how does that relate to the combined set of all referenced assets? What percentage of the entire request flow is spent on client-side vs. server-side code? Where should optimization efforts truly be focused? These are the questions Fast Stack Flow is built to answer.
    `

  }
];
