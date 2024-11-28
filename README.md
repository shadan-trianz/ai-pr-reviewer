# AI Pull Request Reviewer

AI Pull Request Reviewer is a cutting-edge Node.js-based application that harnesses the power of artificial intelligence to review pull requests. By accepting a URL for a pull request, it analyzes the files and code, providing feedback on errors, code formatting, and potential issues. The application uses Ollama's CodeGemma model running locally for the analysis.

## Features
- **Pull Request Analysis**: Automatically reviews pull requests and provides AI-driven feedback.
- **Error Detection**: Identifies syntax and runtime errors in the code.
- **Code Formatting**: Ensures the code follows the specified coding standards and formats it accordingly.
- **Potential Issues**: Highlights potential issues and best practices violations.

## Benefits of Using Artificial Intelligence
- **Efficiency**: Automates the code review process, saving valuable time for developers.
- **Consistency**: Provides consistent feedback, eliminating human error and subjectivity.
- **Insight**: Leverages advanced models to identify subtle issues and provide detailed analysis.
- **Scalability**: Easily scales to review multiple pull requests simultaneously.

## Prerequisites
- Node.js (>= 14.x)
- PostgreSQL
- A GitHub account and a GitHub token with appropriate permissions.
- Ollama's CodeGemma model running locally.

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/ai-pull-request-reviewer.git
cd ai-pull-request-reviewer
npm install
```

## Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```
API_URL=http://localhost:11434/api/generate
DB_URL=postgresql://username:password@localhost:5432/mydb
```

## Run the project
```
npm run dev
```
