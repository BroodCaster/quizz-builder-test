# quizz-builder-test

# Quiz Builder Test

A modern quiz creation and management application built with Next.js, featuring dynamic question types and a clean, dark-themed interface.

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BroodCaster/quizz-builder-test.git
cd quizz-builder-test
```

### 2. Install Dependencies

#### Frontend Dependencies

```bash
# Install frontend dependencies
npm install
# or
yarn install
```

#### Backend Dependencies (if separate)

```bash
# If backend is in a separate directory
cd backend
npm install
# or
yarn install
```

### 3. Environment Configuration

Create environment files for both frontend and backend:

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/
```

#### Backend (.env)

```env
DATABASE_URL=postgresql://username:password@localhost:5432/quiz_builder
PORT=3001
```

## 🗄️ Database Setup

### Database Migration

If using a migration system like Prisma:

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run start

# Backend will run on http://localhost:3001
```

### Start Frontend Application

```bash
cd frontend
npm run dev

# Frontend will run on http://localhost:3000
```

### Development URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Database**: localhost:5432

## 📝 Creating Sample Quiz Data

1. Navigate to http://localhost:3000
2. Go to the quiz creation page
3. Fill in quiz title and questions
4. Save the quiz
5. View your created quiz

## 🎯 API Endpoints

| Method | Endpoint       | Description                      |
| ------ | -------------- | -------------------------------- |
| GET    | `/quizzes`     | Get all quizzes                  |
| GET    | `/quizzes/:id` | Get specific quiz with questions |
| POST   | `/quizzes`     | Create new quiz                  |
| DELETE | `/quizzes/:id` | Delete quiz                      |

## 🧪 Testing Sample Quiz

1. Start both backend and frontend servers
2. Create a sample quiz
3. Navigate to `http://localhost:3000/quizz/1` (replace 1 with your quiz ID)
4. Test the different question types:
   - **Input questions**: Type in text answers
   - **Boolean questions**: Click Yes/No buttons
   - **Checkbox questions**: Check/uncheck options
