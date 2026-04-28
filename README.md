# SAP-samples/commerce-cloud-erp-extensibility-samples

# Containing Files

1. The LICENSE file:
In most cases, the license for SAP sample projects is `Apache 2.0`.

2. The REUSE.toml file: 
The [Reuse Tool](https://reuse.software/) must be used for your samples project. You can find the REUSE.toml in the project initial. Please replace the parts inside the single angle quotation marks < > by the specific information for your repository.

3. The README.md file (this file):
Please edit this file as it is the primary description file for your project. You can find some placeholder titles for sections below.

# SAP Commerce Cloud ERP Extensibility Samples
<!-- Please include descriptive title -->

<!--- Register repository https://api.reuse.software/register, then add REUSE badge:
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/REPO-NAME)](https://api.reuse.software/info/github.com/SAP-samples/REPO-NAME)
-->


## Description

This repository provides sample extensibility configurations for SAP Commerce Cloud with ERP integration.

## Requirements

- SAP Commerce Cloud SaaS
- Additional requirements are documented in the respective sample folders. Please review each sample's `README.md` for prerequisites and setup steps.

## How to Find the Right Sample

This repository contains service provider integration samples. Use the table below to find the sample that best fits your needs.

| Business Use Case | Description | Architectural Pattern | Location |
| :--- | :--- | :--- | :--- |
| **Real-time Tax Simulation** | Integrate with Avalara to simulate sales tax at checkout. | Service Provider Integration | [`./service-provider-integrations/avalara-tax-sample-plugin`](./service-provider-integrations/avalara-tax-sample-plugin) |
| **Address Validation** | Validate and cleanse customer addresses using DQM microservices. | Service Provider Integration | [`./service-provider-integrations/dqm-microservices-sample-plugin`](./service-provider-integrations/dqm-microservices-sample-plugin) |

## Content Structure

- **service-provider-integrations/**: Contains samples that integrate with existing third-party service providers. These customizations are primarily focused on configuration and data mapping.

## Download and Installation

Clone this repository and review the `README.md` files inside each sample folder for setup and usage instructions.

## How to obtain support
[Create an issue](https://github.com/SAP-samples/commerce-cloud-erp-extensibility-samples/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing

If you'd like to contribute code, fixes, or improvements, please create a pull request. Due to legal reasons, contributors must accept a DCO. When you create your first pull request to this project, you are automatically asked to accept the DCO. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Code of Conduct

Members, contributors, and leaders pledge to make participation in our community a harassment-free experience. By participating in this project, you agree to always abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
