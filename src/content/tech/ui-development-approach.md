---
title: "A New Approach to UI Development"
date: "April 19, 2026"
excerpt: "Revisiting the traditional UI development workflow and how we've streamlined it for Fast Stack."
readTime: "1 min read"
category: "Design"
---

# A New Approach to UI Development

I am somewhat reluctant to post this article, as most certainly by the time I have posted it, the current state of available options, moving at the speed of AI, will have changed overnight. This literally happened last night with a press release from a new Claude based tool focused on UI related efforts. But, I wanted to share my recent experiences with implementing an AI assisted UI vs past experiences.

My last FT gig was around 2 years ago, a different time, a different place. My core responsibilities were transferring Figma designs into deliverable implementations (React). Figma is great for collaboration, not my favorite go to design tool, but fits a niche. In that particular role we followed standard practice, but overengineered for a b2b app, and to be quite honest put the project hundreds of thousands of dollars into sensless UI structuring. Well intended, fine if you have the budget. 

As per my recent efforts with Fast Stack, I have taken a different approach. I have spent a significant amount of time defining a design system, and then using AI to generate the UI. I have found this approach to be much more efficient, with impressive results. I realize that this approach is based out of necessity, as this effort is a solo bootstrapped effort, however it raises a lot of questions about the future of UI development as we know it, and has resulted in some personal reflection as to the optimal level of effort spent in design. 

My current approach I will share here is producing results at a rate I had never imagined. Weeks worth of UI effort reduced to day, days worth of effort reduced to hours.

## An example effort
This project has consumed a fair amount of my time, I worked in bursts of effort, a few hours at a time, balancing out development with other life events. Recently I completed UI work related to process management. We don&apos;t need to get into the use case however there is a concept of starting and stopping processes, performing updates to properties such as batch sizes, and managing tenant assignment. A fair amount of effort was put into architecting and implementing supporting backend infrastructure, however we basically need a UI for this so I can maintain my sanity.

A bit of midnight oil was spent on a high level concept on simple 8x10 paper, the following morning I woke up early (before my three children), grabbed a cup of coffee, and began my efforts creating the UI. Let's take a look at the result of basically two hours worth of effort. 

[Process list panel || Directory of running microservices || /screen-captures/control-panel/process-list.png]
[Build list panel || Directory of available projects to build || /screen-captures/control-panel/build-list.png]
[Process detail panel || Presents details of a selected process, supports tenant assignment, etc. || /screen-captures/control-panel/process-detail.png]

The above examples are functional up until the point of communicating APIs, for which API interaction has been isolated into dedicated services, which serve static mock data, and emulate delays in response times. Essentially the remaining work is to replace the mock data with actual API calls. Not bad for a morning&apos;s work.

I will declare as a disclaimer, that a fair amount of work went into providing context, detailed context. 

## The current workflow

There was a significant amount of up front effort at the beginning of the project, establishing the design system. I used a few dashboard examples I found appealing to develop some general look and feel. There was a fair amount of tweaking, tuning the overall color scheme to assume a more consistent tone between colors, only introducing contrasting colors in a selective manner that is intended to draw attention to elements which should command attention. 

I initially started with Base44, and had some success, but it felt like it was better suited for pure vibe coding. I had some success with it, but it just didn&apos;t feel right. I then moved on to Builder.io, and have had some success with it. What I found particularly impressive is the ability for the tool to understand feedback on the UI, and to apply it in a manner that is consistent with the overall design system. 

After the color scheme was established, I moved cautiously on to instructing the agent to generate common components, form controls, menus, panels, everything conceivable. This was somewhat of an iterative effort, but an excellent investment of time. I am picky, need things tuned according to my vision, and I am not willing to sacrifice quality for speed. 

My current practice is to initially concept out a new page in builder.io, and then cut and paste the resulting artifacts into the actual project. Yes, a little manual, however I don&apos;t trust the tool enough to work directly with the actual project. Perhaps I am a bit paranoid; my approach to AI assisted development is a skeptical and cautious one. I do provide enough instructions to the initial agent to enable mock API interactions, complete with random delays emulating response times. 

From that point forward, I use a combination of Google Antigravity and Claude for additional refinement. I am using both as a means of comparing answers, and so far they both have proven quite capable of expanding upon the work of the previous agent.

The workflow generally &apos;gets it right&apos; the first time, however I do find myself making tweaks here and there to get things just right. For example, the initial display element for tenant management worked for a handful of tenants, however I left pertinent details about the potentially large number of customers out of context, after which the agent provided a solution that was more scalable. 

## My conclusions

This has been an interesting experience. I have overcome a lot of reluctance for using AI assisted development, the stigmatism of what might be described as vibe coding, and any potential limitations presented by this type of approach. An approach based out of necessity, but an invaluable learning experience. 

I would encourage organizations to question the assumptions about the level of control required for UI development. How much effort is enough? Do you need pixel level control? How much overhead does that require? Is a FT designer needed? Can you get away with a more UI focused engineer or fullstack dev? Think in terms of actual cost in dollars. I could probably argue that roughly two resources on a two week sprint could produce the results of the control panel experience demonstrated here, but a single resource can turn this around in a matter of hours.

I would lend a bit of caution towards teams investing potentially too much effort in the design phase. While stakeholder feedback is important, there should be a conversation around actual costs associated with too much feedback. A potential approach might be to explain that the actual cost for a developer would be around $100 an hour and a typical work day (8 hours) results into just shy of $1,000 in labor costs. Throw in a few iterations of feedback, PR approvals, and you can easily double that cost. How much level of control do we need to share across the team? And be aware, I have observed on numerous occasions where stakeholders are provided with a level of the ability to provide feedback that perhaps is unproductive, especially in scenarios where they have no background in UI, and perhaps have expectations of having a team &apos;just build it so they can use it and then provide feedback&apos;. There are valid cases for this, however there are also other cases where assumptions are made that once something is built it is basically done, and additional revisions should really require minimal effort.
