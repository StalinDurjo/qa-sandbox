# QA Sandbox

QA Sandbox is a utility tool designed to streamline repetitive testing activities through task automation and mock data generation.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Mock Request](#mock-request)
    - [Default Mock API Endpoints](#default-mock-api-endpoints)
    - [Creating Custom Mock Projects](#creating-custom-mock-projects)
    - [Mock Implementation Structure](#mock-implementation-structure)
    - [Mocker Library Reference](#mocker-library-reference)
  - [Actions](#actions)
    - [Creating Action Projects](#creating-action-projects)
    - [Action Parameters](#action-parameters)
    - [Action Scripts](#action-scripts)
    - [Action Script Structure](#action-script-structure)
    - [API Endpoints](#api-endpoints)
    - [Parameter Override](#parameter-override)
- [Contributing](#contributing)

## Features

- **Actions**: Automates repetitive UI and API tasks using the Playwright library
- **Mock Request**: Generates consistent, relational mock data for testing purposes
- **Dependency Version Tracker**: Monitors and notifies users of dependency updates across multiple projects

## Prerequisites

- NodeJS v20.12.2 LTS
- Playwright Browsers
- Git

## Installation

1. Install Playwright Browsers:

```bash
npx playwright install
```

2. Clone the repository:

```bash
git clone https://github.com/StalinDurjo/qa-sandbox.git
```

3. Configure environment:

```bash
cp .env.example .env
```

4. Set the `PORT` in `.env` file (defaults to `3000` if left blank)

5. Install dependencies:

```bash
cd qa-sandbox
npm install
```

6. Start project:

```bash
npm run dev
```

## Project Structure

```
includes/
├── actions/
├── mocker/
└── version-tracker/
out/
pages/
src/
├── core/
├── lib/
├── server/
├── service/
├── constant.ts
├── index.ts
└── type.d.ts
.env.sample
test.config.ts
```

## Usage

### Mock Request

#### Default Mock API Endpoints

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | /mocker/full-user-details | Get full users details |
| POST   | /mocker/user-details      | Get limited details    |
| POST   | /mocker/bank-details      | Get bank details       |

Example usage:

```bash
curl -X POST http://localhost:3000/mocker/full-user-detail \
     -H "Content-Type: application/json" \
     -d '{"locale":"BD"}'
```

Note: The request body accepts a `locale` property (2-digit country code, defaults to "US").

#### Creating Custom Mock Projects

1. Create a new folder in `includes/mocker/project/` (folder name becomes the project name)
2. Create an `index.ts` file in the new folder

#### Mock Implementation Structure

The mock parameter has two main components:

1. **Endpoint Definition**: The `endpoint` property must be defined with a value that will serve as the REST API route
2. **Data Object**: `data` - Provides access to the payload of the API request and the built-in `mocker` library. This mocker library will be used to generate the mock data. The payload (or request body) is passed on to the function to allow for custom logic implementation.

**Function Return**: The function must return a value that will serve as the response body

```typescript
export async function customMock({ endpoint, data }) {
  // Implementation
  return mockData;
}
```

Example implementation:

```typescript
export async function bankDetails({ endpoint = '/bank-details', data }) {
  return {
    ...(await data.mocker.bankAccount.fullBankDetails())
  };
}
```

The final endpoint pattern will be: `/mocker/{project-name}/{endpoint}`

Once implemented and the application is restarted, the routes are dynamically added on application start.

#### Mocker Library Reference

The library provides structured mock data with maintained entity relationships. For fallback data, the fakerjs library is used.

Note: Fallback data will not maintain proper data relations.

Currently available features:

- Person: names, email, phone, nationality
- Location: addresses, zip codes, street names, states, countries
- Employee: job title, occupation, company
- Bank: name, BIC, SWIFT code
- Bank Account: account type, IBAN, routing number, currency

Example usage:

```typescript
const mocker = await new Mocker({ locale: 'US' }).initialize();
const postcode = await mocker.location.postcode(); // 10451
const address = await mocker.location.fullAddress(); // 400 S Orange Ave, Orlando, 11101, US
const bankName = await mocker.bank.name(); // Bank of America
```

### Actions

#### Creating Action Projects

1. Create a folder in `includes/actions/project/`
2. Create `index.ts` with action step functions

```typescript
export async function customActionStep({ actionStepName, page, parameter: { baseUrl } }) {
  // Implementation
}
```

Example implementation:

```typescript
import PermalinkSettingsPage from '@pages/woocommerce/wp-admin/settings/permalink-settings.page';

export async function changePermalink({ actionStepName = 'change-permalink', page, parameter: { permalinkType, baseUrl } }) {
  const permalinkSettingsPage = new PermalinkSettingsPage(page);
  await page.goto(baseUrl + '/wp-admin/options-permalink.php');
  await permalinkSettingsPage.selectPermalinkStructure(permalinkType);
  await permalinkSettingsPage.clickOnSaveChanges();
}
```

#### Action Parameters

The action parameters object contains three main properties:

1. **Action Step** (`actionStepName`): Name of the action step used in the script file
2. **Object**: Supports Playwright's `Page` or `Request` fixtures
3. **Parameter** (`parameter`): Contains script-defined parameters passed to the action step during runtime

Note: `baseUrl` is automatically included in parameters for convenience (e.g., `http://localhost:3000`)

#### Action Scripts

Create a YAML file in `includes/actions/script/` with the `.action.yaml` extension.

#### Action Script Structure

The action script defines the following components:

1. **Project Name**: Identifies the project for action definition
2. **Action** (`actionName`): Defines the action block
3. **Action Type** (`actionType`): Either 'UI' or 'API', determining the Playwright fixture type
4. **Repeat**: Number of times to repeat the action
5. **Action Steps**: List of steps to execute (matches functions in the action project)
6. **Parameters**: Parameters passed to each action step in sequential order

Example implementation:

```yaml
project: 'wordpress'
actions:
  - actionName: 'Change Permalink'
    actionType: 'UI'
    repeat: 1
    actionSteps:
      - 'login-to-admin'
      - 'change-permalink'
    parameter:
      - username: 'admin'
        password: '01Test01!'
      - permalinkType: 'Post name'
```

Note: For action steps without parameters, include an empty list item in the parameter list.

#### API Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | /action/run-single | Run single action    |
| POST   | /action/run-batch  | Run multiple actions |

Single action example:

```bash
curl -X POST http://localhost:3000/action/run-single \
     -H "Content-Type: application/json" \
     -d '{
            "project": "wordpress",
            "actionName": "Set Anyone Can Register"
         }'
```

#### Parameter Override

Action script properties can be overridden via API request parameters:

```bash
curl -X POST http://localhost:3000/action/run-single \
     -H "Content-Type: application/json" \
     -d '{
            "project": "wordpress",
            "actionName": "Change Permalink",
            "repeat": "5",
            "username": "root"
         }'
```

This will override the default values (e.g., repeat: 1, username: "admin") with the new values specified in the request.
