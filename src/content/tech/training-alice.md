---
title: "Training Alice"
date: "April 22, 2026"
excerpt: "A deep dive into the specialized training process for our metrics-focused AI model."
readTime: "5 min read"
category: "AI"
---

We have witnessed a surge in adoption of AI over the past serveral years. There is little doubt that recent advances in this space offer tremendous potential for unprecident gains in productivity. That said, developing an 'AI product' is as straightforward as obtaining an API key from a vendor such as OpenAI, wrappering a few API calls around a user interface, and launching. In fact, with a modest amount of effort and prompting, you can have an actual AI agent generate the source for you. The end result, a somewhat customized view into an AI engine, and the larger and more advanced to model, the better, right?

It turns out that is not exactly the case. AI, although promising in it's capabilities, it expensive. Efficient, focused utilization is key to cost optimization. Smaller, task focused models offer a lot of opportunity to take an optimized approach. Usage (token usage) needs to be carefully managed. Conveying usage to end users in the form of tokens is somewhat of an difficult task as translating processing to token usage is not necessarily a direct correlation. 

We arrived at the concept of not just an AI tool, but an virtual asistant. We wanted to brand the technology with a personal touch. A core value of Fast Stack is to provide an intuitve, user friendly experience. Overwhelming the end user with bloated dashboards and overdelivering on the proposed value of an AI assisted process is exactly what we would like to avoid. We want to present the most relevant data in a concise manner, and shift technical implementation details 'behind the scenes', allowing the user to focus on task specific efforts.

Our initial effort with Alice was to utilize the tool to streamline the onboarding process. Adopting and configuring a new product involves time and effort, and can at times be a frustrating experience. We wanted to not only streamline this process, but also begin a relationship with Alice as well, from the start. Gathering metrics is enough (if properly collected) to establish a foundation for analyzing application performance. Manually analyzing metrics will reveal behavioral patterns, however this requires effort and specialized knowledge. Many product offerings in this space offer proprietary query languages in order to grep through metrics. We wanted to utilize Alice in a manner where this process is more of a streamlined experience, where the platform does most of the 'heavy lifting'.

There is no shorage of tutorials available online detailing how to connect to an AI engine and simply proxy conversations through an API. There appears to be significantly less content available related to more complex scenarios. In this article I will share a few experiences from recent efforts, i.e. an first hand account direct from the trenches, a few observations and lessons learned.

# Lessons from the Trenches: Training Alice

## Data Quality > Model Size
Early on, the temptation is to reach for the largest parameter model available. However, Alice taught us that contextual relevance beats raw horsepower every time.

The Lesson: We spent more time refining our "telemetry-to-text" pipeline than we did tweaking hyperparameters.

Takeaway: An AI model is only as smart as the structured data it consumes. By cleaning our telemetry ingestion early, Alice was able to identify "Server Vitality" issues with significantly higher precision than a generic model ever could.

## The "Hallucination" Guardrail is Human-Centric
In a technical SaaS environment, a "creative" AI is a dangerous AI. If Alice hallucinates a server failure, it triggers unnecessary panic.

The Lesson: We implemented a multi-stage validation layer. Alice proposes a hypothesis based on the Pulse heartbeat, but it must be cross-referenced against the raw Core metrics before it is presented to the user.

Takeaway: Engineering "humility" into the model—teaching it to say "I don't have enough data to be certain"—is a feature, not a bug.

## Latency is the Ultimate User Experience Killer
When you are building a "Unified Intelligence," users expect real-time interaction. A 10-second wait for an AI analysis feels like an eternity in a production crisis.

The Lesson: We shifted from heavy, centralized processing to a more distributed approach, optimizing our deployment pipelines to ensure Alice’s insights are delivered at the speed of the data flow.

Takeaway: High-performance AI isn't just about the weights; it’s about the infrastructure surrounding them.


## Alice Training Pillars

[An overview of the Alice training pillars||/alice-training-pillars.jpeg]

# Integration with Open Telemetry

## The Temporality Trap: Delta vs. Cumulative
One of the first technical hurdles in OTel metric consumption is deciding between Delta and Cumulative temporality.

Cumulative: Metrics (like a Counter) report the total value since the process started.

Challenge for Alice: If the process restarts, the counter drops to zero. Alice needs to detect this "reset" so she doesn't interpret a crash as a sudden drop in user activity.

Delta: Metrics report only the change since the last export.

Benefit for Alice: This is much easier for training time-series models (like LSTMs or Transformers) because the data is already pre-differentiated. We don't have to calculate the "rate" manually; the OTel collector does it for us.

## Managing High Cardinality
In a microservices architecture, it’s tempting to tag every metric with a user_id or request_id. This leads to cardinality explosion, where the number of unique time-series data points grows exponentially.

The Alice Approach: For AI training, high cardinality is "noise." We use Attribute Dropping in our OTel pipeline to strip away ephemeral tags (like specific request IDs) before the data reaches Alice’s training set.

Structured Aggregation: We rely on Histograms rather than simple Gauges. Alice analyzes the distribution of latencies (p95, p99) across the entire cluster, which provides a much richer feature set for detecting "silent" failures than a simple average.

## Semantic Conventions as a Feature Store
The beauty of OTel is its Semantic Conventions. By sticking to standardized names (e.g., http.server.duration instead of my_app.latency), we turned OTel into a ready-made Feature Store for Alice.

# What’s Next for Alice?
As we continue to refine the orchestration between Beam and Flow, Alice will transition from a reactive assistant to a proactive orchestrator—anticipating bottlenecks before they impact the global heartbeat.

# A Quick Product Tour

[Comprehensive Alerting || Alice's proactive monitoring identifies anomalies and triggers smart alerts before they impact your users. || /screen-captures/alerting.png]
[Intelligent Triage || Rapidly identify the root cause of issues with Alice's automated analysis and triage workflows. || /screen-captures/triage.png]
[Customizable Dashboards || Tailor your observability experience with flexible, data-driven dashboard layouts. || /screen-captures/customizable-dashboard-layouts.png]