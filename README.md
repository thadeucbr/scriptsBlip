# SafraPay WhatsApp Chatbot Development Repository

This repository aims to standardize the development of the SafraPay WhatsApp chatbot.

## Table of Contents
- [SafraPay WhatsApp Chatbot Development Repository](#safrapay-whatsapp-chatbot-development-repository)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Folder Structure](#folder-structure)
  - [Usage](#usage)
  - [GPT/json-analyzer](#gptjson-analyzer)

## Description
The purpose of this repository is to provide a standardized approach to developing the WhatsApp chatbot for SafraPay. It includes ready-to-use scripts and functions for creating chatbot components such as lists and buttons, as well as validation functions for testing and making modifications.

## Folder Structure
The repository is organized into the following folders:

- `copiaECola`: Contains ready-to-use scripts that can be copied and pasted into your chatbot.
  - `blocosProntos`: Includes pre-built blocks with list and button components, complete with validations and tracking.
  - `scriptsProntos`: Contains various scripts that can be copied and pasted.

- `dynamicContents`: Contains JavaScript functions for creating WhatsApp list and button components.

- `templates`: Currently, this folder only contains one file for creating a chatbot flow from scratch. Simply upload the provided JSON file to Blip to have the initial bot structure ready.

- `validações`: Includes JavaScript files with validation functions for testing or making modifications.

- `GPT/json-analyzer`: Contains scripts and files for analyzing large JSON files using OpenAI GPT.
  - `analises`: Directory containing analysis results.
  - `app.js`: Main script for running the JSON analysis.
  - `package.json`: Project configuration file.

## Usage
To use this repository, simply clone or download the code and access the relevant folders for the scripts, functions, or templates you need.

## GPT/json-analyzer
The `GPT/json-analyzer` folder is designed to analyze large JSON files using OpenAI GPT.

### Purpose
The purpose of the `GPT/json-analyzer` folder is to provide tools for detailed analysis of large JSON files, leveraging the capabilities of OpenAI GPT.

### Main Files
- `app.js`: The main script for running the JSON analysis.
- `package.json`: Contains the project configuration and dependencies.
- `analises`: Directory where the analysis results are stored.

### Usage
1. **Configure the `.env` file**: Ensure you have a `.env` file in the `GPT/json-analyzer` folder with the necessary API keys.
2. **Run the `app.js` script**: Execute the `app.js` script to start the analysis process.
