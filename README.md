# AIMFROST 

**Aimfrost** is a high-velocity, web-based security reconnaissance framework designed to bridge the gap between complex command-line security tools and modern, intuitive web interfaces. Built for researchers who prioritize data intelligence over syntax memorization.

##  Key Features

- **Automated Multi-Module Execution**: Run complex recon pipelines with a single click.
- **Visualized Infrastructure Mapping**: View your target's digital footprint in a structured, readable format.
- **Zero Environment Prep**: No root access or local dependencies required. Access professional tools from any browser.
- **Bypass Complexity**: Automatically handles tool flags, output parsing, and data correlation.

## Intelligence Modules

### 1. Discovery & Passive Intelligence
- **SubDomain Finder**: Aggregates data from 50+ sources including CT logs and search engines.
- **Deep Crawler**: Recursive mapping of web application directory structures.
- **Profile Hunter**: Cross-platform digital footprint identification across 2000+ platforms.

### 2. Analysis & HTTP Interrogation
- **Firewall Detector (WAF)**: Fingerprints over 100 WAF solutions like Cloudflare and Akamai.
- **DNS Enumeration**: Analyzes MX, TXT, and CNAME records for misconfigurations.
- **Cloud Provider ID**: Identifies underlying hosting infrastructure (AWS, GCP, Azure).

### 3. Security & Infrastructure Auditing
- **TLS Engine (TLSx)**: Audits cryptographic health and SSL/TLS configurations.
- **Traffic Balancer (LBD)**: Detects Load Balancers and server clusters.
- **Port Scanner**: Identifies open services and potential entry points.

## Installation (Local Development)

```bash
# Clone the repository
git clone [https://github.com/Nass0x/Aimfrost.git](https://github.com/Nass0x/Aimfrost.git)

# Install dependencies
npm install

# Start the development server
npm run dev
