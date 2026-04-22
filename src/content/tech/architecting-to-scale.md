---
title: "Architecting to Scale"
date: "April 19, 2026"
excerpt: "Exploring the infrastructure decisions required to handle growth and high throughput."
readTime: "6 min read"
category: "Architecture"
---

# Architecting to Scale

This current effort has been interesting. I am not a stranger to application performance analysis, I have learned a lot over my career, and quite frankly by a lot of well intended efforts that turned out to be architectually lacking from an performance perspective. I have writing custom code for bringing visibility into complex logic systems, in some cases dropped out of an ORM level to meet high processing requireemnts, these types of efforts align with my passion for speed, from an software development perspective to even side hobbies such as racing. Performance, efficiency, an exiting thing. Do you need bytecode instrumentation for a Java process, been there done that. This has always been within the scope of a single application, or general effort. 

Gathering metrics for a proccess/application/service is a way different beast than attempting the same for a large number of unrelated apps. It turns out that is hard, especially at scale. My initial draft of the Fast Stack effort was successfull in proving out a concept, helping to definee a problem space, identify api contracts, etc. It was also resulted in identifying scalability issues with my original approach.

Essentially this project space requires a system that needs to scale seemly an an infinite manner, and offer near realtime processing, with no percieved downtime. No pressure here! Coordinating a scheduled downtime for a single organization is realistic, however attempting this with numerous external clients is not, and often not even an option. 

## Selecting a platform/framework

I have spent a lot of time in both the Node and Java (Spring) space, my comfort zone. I admire both, and don't have a particular preference. Java has a long established history, a well developed set of optimization flags for the runtime. It can be considered a bit verbose, there is a tendancy for a bit more boilerplate code, and a learning curve to really 'get it right'. With the introduction of veritual threads, the gap between capacity vs Node implementations is closing. Node is nice in the respect the model offers concurrency by nature. The ability to support a single language for the UI and the backend is an advantage. I admit firsthand to the overhead associated with context switching between front end react and backend Java. They both offer advantages and potential drawbacks. 

So which is the 'right' technical diurection? This is an interesting topic as there isn't really a single anwser as this is dependant on team preferences and skillset as well as other circumstances. The good news is that by following a decomposed application approach instead of a single monolith project, we have the option of swapping out one role specific project from one technology to another. It is well understood that log ingestion is a high use case, and there have been discussions about a Rust implementation, so I can see a potential migration effort for that piece to take place at some point in the future.

I decided for the initial implementation we would be rollowing out with Java, specifically using Spring Boot (fairly standard practice). The tiebreaker was that Java provides the ability to package the application as a jar (archived) artifact. This is an attractive option as I highly expect on premise or more specifically privsate cloud deployments. Sealing the source code provides protection from priating IP, and more importantly preventing a customer from modifying the source code as exposing 'bugs' as a side effect it very attractive. 

## Approaching the scalability aspect

Whereas a lot of approaches involve adding nodes a pool of services behind a proxy to meet performance needs a determination was made that that approach is not ideal. We need to define pools of services, and assigning clients as tennants to pools according to thier usage requirements. This provides a more flexible approach towards allocating compotuing resources according to customers expected workloads. 

So, basically customers 1-10 which would be considered 'low usage' might be assigned to 'cluster a', and customers 11 & 12 whom have much high usage requirements might be assigned to 'cluster b' with let's say double the RAM and processing power assigned to it.

## Supporting uptime

In an ideal world, services would never fail, and usually they generally don't, however deployments do represent an slight interruption in service, and this is an important consideration. 

The system was designed to make use of messaging as a mechanism for application orchestration. This provides support for asynchronous processing. So basically we have a workflow that looks like [log ingestion] --> [log analysis] --> [analytics operations]. A cool aspect of the Otel spec is that they honor the HTTP 429 (too many requests) status code which may be used to indicate backpressure. So we have the ability to tell a client to take a small break so the system may catch up before it can accept more requests. Messaging also provides some flexibility as each step of the workflow is performed in an async manner. So if we need to take down the log ingestor services to deploy a newer version, we don't loose in flight requests. 

I did discover a requirement for implementing the ability to 'gracefully' shut down an individual process. We essentially don't want to hard interrupt the current workload, rather allow it to complete before truly exiting. 

### Defining tuning parameters
A common mistake is to perform operations at an individual level. So, after a metric is collected and placed onto the bus, the next step will be to pull it from the queue, perform some analysis, and then write some data to a persistent store (i.e. a database). This 'could' be performed as a chain of operations, however large amounts of small operations like individual reads and individual writes are generally non performant at scale. Most APIs support batch operations for efficiency. So for example an individual write operation may take pnly 5ms leading to 100ms for 20 back to back write operations, however a bulk write operation might be able to write 20 records at once in under 10. This is attributed to that fact there are small performance hits associated at the transaction level (auth, network handshake an wire transfer). This is a recognized common practice, however you would be surprised how often this is overlooked in the field. In one particular case, I took an ELT process responsible for a large amount ingestion of records from a 4 hour process down to around 20 minutes. 

Simply performing batch operations is not a performance guarantee. These types of operations typically support the ability to provide a desired batch size. There are not necessarily any hard and fast rules here, but there are some general guidelines. There is a relation between record size and optimizal batch size, and you really need to observe this at runtime and tun accordingly. That said, the ability to set batch sizes, monitoring related perforamnce results, and update them in a 'hot' manner at runtime was baked in.

An administrative 'constrol panel' was developed so that process performance data could be observed in a graphical manner. Yes, that is right, application performance management for the appliction performance management tool. The messaging bus was also used as a mechanism for notifying invidiaul processes of tuning parameter updates, and also for supporting the ability for the individual processes to report the associated performance related data. The message based approach towards interprocess communication was choosen over direct gRpc channels as the asynch nature provides a bit more flexibility.

## Process mangement

So the initial architecture establishes around 10 types of services, If we simply double instances of each required service then we already reach a total of 20 processes to tune, monitor, support deployments for. This begins to become a management nightmare, implementing additional VPS instances only compounds the problems.

Command line, os level, vps level mangement becomes questionable. A requirement for an more streamlined approach presents itself. This resulted in an effort to support an GUI based approach, supported by a series of command line tools.   

These tools provide the foundation for a series of API wrappers were established to support an UI effort. 

Let's take a brief look at some command line interfaces for the initial effort. All commands return json formatted results, correclated logs, etc. for visibility.

[code: Raw command line interfaces]
	
    // Let's build a project...
    ./bin/build-faststack-apm-agent-federation

    // Let's terminate a running process
    ./bin/terminate-faststack-apm-agent-federation

    // And finally, redeplo/deployy.
    ./bin/deploy-faststack-apm-agent-federation

[/code]

Note on the above example, a build/terminate/redeploy sequence is a time, conditional multi- step process. These are low level hooks into functions, isolated, independant of the larger scope of the higher level context.   

And perhaps a few a endpoints to represent higher level functions. These are low level, step by step implementations.

[code: API endpoints]
	curl https://domain/api/service/list
    curl https://domain/api/service/[id]/build
    curl https://domain/api/service/[id]/shutdown
    ...

[/code]

And now an API wrapper to support the management / visibility ty efforts. A higher level orchestration piece, presenting high level use cases for end operator requests, translating actionable API level calls to to the os level commands required to completed the work.  

[Build Management || UI driven build management approach, not your standard build pipeline, very use case specific || /screen-captures/control-panel/build-mgmnt-thumb.png || https://youtu.be/yGCMi2WI_7Q]
[Service Management || Visibility into process management, hot configuration reloading (i.e. thread allocations, tennant assignment, etc.) || /screen-captures/control-panel/service-mgmnt-thumb.png || https://youtu.be/vkng8prTrcw]


## The system design

[Backend System Architecture (fancy polished infographic) || A high-level overview of the distributed microservices architecture, including log ingestion, analysis, and analytics pipelines. || /backend-architecture.png]

Apologies up front for the stereotypical inforgraphic above, overkill, perhaps, but it does illustrate the overall approach.In all transparency, I am not 100% sold on a pure Kaftka approach. Impressive technology, yes, high throughput, yes, is it the best fit for interprocess communication? Perhaps, noted that there are certain types of events that are infrequent (we don't switch tenants frequently, so there are a few design trade-offs to consider moving forward i.e. 'do we really need an additional messaging bus vs do we really need to avoid specialized supporting middleware for spealized use cases...  