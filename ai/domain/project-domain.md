
## Project purpose
- The purpose of this project is to provide an REST API that will support the signup/onboarding process of for new customrs.

Users struggle with:
- Complex and noisy log data
- Difficult setup of observability pipelines
- Lack of immediate feedback after onboarding
-
## The signup process

### Signup Process Overview

The FastStack Flow product is an SAAS offering that collects logs from http servers, (Apache, Nginx, etc). The goal is to collect enough information through an interactive session to ensure a successful experience from the start of product activation. It is important to note that we offer an short ‘onboarding time period’ that will allow the user to integrate their logs and via metrics for essentially a trial period.

The process is an interactive one, where information is collected in a step by step manner.  We for the most part will collect information in a free text entry input, rather than presenting traditional form controls.

The Flow product will consume http server log files via one of three methods: logs posted to a gateway in OTELl format (realtime), scheduled uploads posted by the customer to an dedicated API endpoint, and manual file uploads. The latter two approaches are batch approaches, whereas the initial one is considered realtime or semi realtime.

We have branded the AI experience as ‘Alice’, and would like to present her as a helpful companion.

The product offers 4 different subscription tiers, each tier has different price points, features, and usage levels. In most cases, a tier will offer the ability to expand the usage levels for an additional fee. For example the ‘pro tier’ might offer a monthly ingestion of 500,000 log entries per billing cycle, however the user would have the option let’s say to purchase 1,000 additional entries for let’s say $10.

We don’t charge per seat, so in theory a customer might enter up to 50 users..

We offer the ability to validate the ability to perform an OTEL connection, post log data to an API, or manually upload a sample log file. The goal here is to allow the customer to validate log format and connectivity. Ideally they would be ready for this step, hower one possible scenario is where the customer signs up, however a more technical resource may need to modify firewall rules to allow the connection. So this is an recommended, however optional step.

### Signup flow

Agent introduces herself, and prompts the user for their name, their role (technical or more marketing focused) and organization name. We want to profile the user so we can set up role specific dashboards upon signup completion.
As a next step, an email must be provided and optionally a phone number
We collect a domain name for the user
We present the ability for the user to provide other user accounts for the product. This will streamline the process of defining other users, however this can always be performed at a later time within the product. There are two basic sets of permissions, administrators, and read only accounts. Administrators have the ability to create other user accounts, configure data import settings, and define billing and usage related information. Read-only accounts are just able to view metrics.
We prompt the user for which method of log ingestion they would like to implement. This step can be skipped, and configured at a later time, however it is recommended that this step is at least attempted.
If the user elects to manually upload log files, we present the opportunity for the user to perform an upload, at which point the format of the log entries is validated. Should they select the API option, we provide an API endpoint, and will allow the user to post a log file to that endpoint. And finally, should the user select an OTEL option, we provide information for the OTEL gateway, allow the user to attempt to make server configuration changes. The latter two options are not only intended to validate formatting options, they provide the ability to identify any potential connectivity issues. This step is recommended, however optional.
We collect the estimated number of log entries per cycle will be ingested, and compare that with the currently selected tier. If there is a potential discrepancy between the log entry estimation and the limitations of the tier we would indicate to the user that they may elect to select another package, and present possible overage charges as to be transparent with what the actual charges will be. This step possibly will allow the user to select another tier.
Final order confirmation

We attempt to simplify the data collection process as a 3 step process.  This presents an impression that the setup process is simple, even though it is a series of more than 3 steps.

Organization information (steps 1-4)
Log ingestion method and configuration/connectivity validation (step 5, step 6) validation (step 
Product selection/confirmation: (step 7, step 8)

# AI Responsibilities

The AI assistant is responsible for:
- Interpreting user-provided configuration
- Suggesting corrections for misconfigurations
- Summarizing log ingestion results
- Guiding users through onboarding steps

The AI must NOT:
- Persist data
- Act as a source of truth
- Replace backend validation logic




