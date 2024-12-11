# AI Pull Request Reviewer

AI Pull Request Reviewer is a cutting-edge Node.js-based application that harnesses the power of artificial intelligence to review pull requests. By accepting a URL for a pull request, it analyzes the files and code, providing feedback on errors, code formatting, and potential issues. The application uses the Gemini model for the analysis.

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
- Node.js (>= 18.x)
- PostgreSQL
- Gemini API Key for code analysis.

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/ai-pull-request-reviewer.git
cd ai-pr-reviewer
npm install
```

## Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```
API_KEY=your_gemini_api_key
DB_URL=postgresql://username:password@localhost:5432/mydb
```

## Run the project
```
npm run dev
```
