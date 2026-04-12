# FastStack Signup Process

## Background
This is a frontend application intended to support the ability to signup process for an SASS series of products I am currently working on. This product will fit into the web analytics and APM space. 

The name of the company is called FastStack.

## technologies
- nextjs
- typescript
- rest
- unit testing

### The signup process
I want to create a unqiue approach to the initial signup process. I don't believe that a customer should signup, and immediately begin getting charged. basically we would be guiding the new customer through a setup and trial process. this allows them to validate integration steps and become familliar with the tool. we would follow up a few days later and actually collect billing information at that point, and start the billing cycle.

a key driver for this approach is that we want to start a personalized dialog with the customer. the client facing code should emulate a chat like session with an ai agent. we prefer carefully guided prompting over a traditional form entry. 

a customer may be an individual or an business entity.

customer accounts are associated with one or more individual user accounts. 

user accounts have assigned permissions, currently the only defined are 'admin' and 'user'. admin level accounts have permissions to billing and account management functions. 

the signup process will be an interactive one where an LLM agent will prompt the user for key pieces of information. interactons will be sent to an REST endpoint where the API will communicate with an trained AI engine. 
 
the strategy is to provide a friendly, guided experience, where essentially, ideally given them a working product, essentaiily an informal trial period is the priority. we will follow up with collecting billing information at a later phase, beyond the scope of this conversation. 

## flow for collecting information for the 'FastStack Flow' product 
Step 1: collect introductory information
	we need to collect the following:
		current users name, organization name, and contact information
		their role (power user, a person interested in marketing operations, a technical resource in charge of setting up the product)


		we need an email address for the immediate user as well, perhaps an optional cell phone number

		we need to collect the name of the domain(s) that we will be collecting metrics for. the product name is called FastStack flow, and each subscription is per domain.

		collect any additional information about other users. so for example, 'are there other team members that will be using the product, if so, what are their names'. we do not charge per seat, and this initial process should streamline the default process of manual account creation through a form. a very informal approach.

Step 2: Product selection confirmation
	
	a brief opportunity to confirm the selected product and subscription level
	basically we offer 4 different tiers, each with additional features, and set usage levels. overages are possible, however for additional charges. so basically 'package a' might allow for ingestion of 10,000 log entries, and an additional cost of 'x' for perhaps 1k additional entries. 

	as a safety check here, we work with the customer to ensure they understand an expected monthly average level of traffic and then attempt to illustrate projected overage costs (if any) for the selected package.


Step 3: Identify log ingestion approach
	three options exist here, manual upload (anticipating not often used, pushed from a client to an API enpoint, or OTEL integration, i.e. realtime)

	the goal of this step is to validate that the data may be ingested. so for example, if we are file uploading, upload a file to seed data. if the preferred method is to ingest data via an API, let's validate that the customer can upload a log record at this point in the API, and of course for otel integration let's stop at this step and have them validate a configuration on the clients end, and ensure they can send metrics via their instrumentation. this is important as firewall rules, etc. can interrupt the handshake and the customer may need help from it resources in order to resolve issues on their end. 

	they key thing we are attempting to avoid here is allowing the customer to create an account, start a billing cycle, and then loose usage cycles while performing configuration tasks. 

Step 4: 
	configuration validation of all above steps, and a chance to refine them. we also need to identify the billing contact, however we will not collect billing data at this point. 


The end result should be a json payload wa can send off to an REST endpoint to create the account and get the subscription rolling into a trial period mode.


	
	
### Product offerings
The following are my current product offerings
- FastStack flow: aggregates http logs and provides dashboards for traffic analytics, both file upload, API provided, and OTEL (Realtime)
- FastStack pulse: uptime monitor. performs periodic checks against http endpoints and paths, offers escalation tasks such as alerts (SMS, emails, slack, etc)

## Project 

This is a typescript application/NextJS application. 

SEO for this subdomain (https://signup.fastack.cloud) is not a concearn and the nature of the signup process that this project will service is an very interactive client logic heavy process.

All requsts for code to be generated should be represented by services under the app/service. we need to define a method under the /app/utils folder named 'mock-utils.ts' which features a method that will emulate an delay between the time period of a min and max value. all service calls will be REST calls, however when services are created we need to mock the actual call, so we would perform the following:
1. create a new service that returns a promise
2. call the above util method that will invoke a random delay between 1 - 3 seconds, thish is a mock of an actual API call
3. return a promise, as the actual implementation would via http fetch api.

