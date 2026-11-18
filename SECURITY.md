# Security and responsible demonstration

This project is an archived educational capstone, not a production application.

- Do not commit any real `.env` files, JWT signing secrets, database connection strings with passwords, merchant API tokens, AWS credentials, email passwords, or access tokens.
- Use local `.env.example` templates with placeholder values only.
- Client-side Expo `EXPO_PUBLIC_` values are public; never store secrets in them.
- Rotate any original credentials that were used during development or committed to historical repositories.
- Review dependencies, authorization, database permissions and service integration credentials before attempting a new deployment.
- Do not use real customer or payment information for demo testing.
