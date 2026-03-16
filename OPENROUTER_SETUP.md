# OpenRouter setup for Cursor

## 1. Cursor Settings → Models
Add custom OpenAI-compatible provider with:

Provider name:
OpenRouter

Base URL:
https://openrouter.ai/api/v1

API Key:
<your sk-or-v1 key>

## 2. Enable models in Cursor
Add / enable these models:
- anthropic/claude-3.5-sonnet
- deepseek/deepseek-coder
- openai/gpt-4o
- mistralai/mistral-large

## 3. Usage
For agent prompts, start with:
"Read AI_CONTEXT.md and AGENT_RULES.md first."

## 4. Recommended mapping
- refactor → Claude Sonnet
- code generation → DeepSeek Coder
- architecture → GPT-4o
- small edits → Mistral Large
