---
title: "Learning by Failure"
date: "April 8, 2026"
excerpt: "Process of continual refinement..."
readTime: "4 min read"
category: "Reflection"
---

# Learning by Failure

Process of continual refinement...

Building is easy, comfort zones are a great place to land, specializing in any given area is a safe landing zone. My initial attempt at architecting was a POC, intended to be thrown away. Just getting something to work in order to flush out potential design issues and defining API contracts provided value. As a logical next step, an effort was made to establish a long term implementation. The end result, a solution that would not meet the potential scalability requirements. 'A' for effort, however not exactly where I needed to land. 

Building a service that handles streaming data from numerous other services presents a challenge. The amount of processing and throughput is inherently more complex than an isolated application. I have never built anything at this scale before. While it was immediately apparent that a messaging option would be required to support asynchronous processing, my initial decision to use Rabbit MQ proved to be somewhat shortsighted. It would most likely not scale to the level I needed. I based that decision on the fact I am proficient with it, and was attempting to avoid taking on a new technology. It turns out Kafka made more sense in this context. Scalable, built for high throughput, and as an added bonus provides the ability to 'go back' historically. 

I am really not clear as to why so many job postings emphasize 'x' number of years experience with Rabbit or Kafka. I was able to pick up Rabbit from day one in a previous role. I think the ability to pick things up quickly is a key skill, and should carry a lot of weight. Sometimes we overlook the fact that a duration of time with a given technology does not necessarily equate to expertise. In my previous role, I implemented an async process, once it was in place, I never really touched it again, but I can mark that off as '2 years experience with RabbitMQ'. Does that make me more experienced than someone with only 1 years experience working with it? Not necessarily. I think the fact that I was able to pick it up, and the extent of how it was used should stand out. 

I ended up sinking my first formal attempt at the infrastructure. A little painful, however better to start off with a clean slate. I probably lost around 2 or 3 weeks of development time, however I chalked that off as a learning experience. I am a hands on, visual person. This approach allows me form a proper perspective. I am analytical, I tend to rip through and critique my efforts. I don't walk around with a large ego, and interpret events where I prove myself wrong as a learning experience. I love to cook, a true passion of mine. I have honed my skills in this area over the years. I produce restaurant quality dishes on a regular basis, however I screw up all of the time. It's because I try, I take risks, sometimes I fail, and I learn. It's a continual process. 

My second iteration addressed some key points I had overlooked. Most of the improvements focused on tenant reassignment and hot deployments, as constant uptime is critical. This goes beyond simply pooling a collection of servers behind a proxy. Processes need to be shut down in a 'graceful manner', allowing in-flight requests to complete prior to final termination. 

I am very pleased with the final architecture. In this case, the third time is a charm. Java 21 virtual threads look promising, and given a modular architecture, a future enhancement would be to possibly swap out the Java implementation for the OTEL gateway for a Rust based version (assuming we might get a performance gain here). Sometimes it makes sense to scrap an effort before you get too far down the path, and start over.
