const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { title, questions } = req.body;
		if (!title || !questions || !Array.isArray(questions)) {
			return res
				.status(400)
				.json({ error: "Quiz title and a list of questions are required." });
		}

		const newQuiz = await prisma.quiz.create({
			data: {
				title,
				questions: {
					create: questions.map((q) => ({
						text: q.text,
						questionType: q.questionType,
					})),
				},
			},
			include: {
				questions: true,
			},
		});
		res.status(201).json(newQuiz);
	} catch (error) {
		console.error("Error creating quiz:", error);
		res.status(500).json({ error: "Failed to create quiz." });
	}
});

router.get("/", async (req, res) => {
	try {
		const quizzes = await prisma.quiz.findMany({
			select: {
				id: true,
				title: true,
				_count: {
					select: { questions: true },
				},
			},
		});

		const formattedQuizzes = quizzes.map((quiz) => ({
			id: quiz.id,
			title: quiz.title,
			numberOfQuestions: quiz._count.questions,
		}));
		res.status(200).json(formattedQuizzes);
	} catch (error) {
		console.error("Error fetching quizzes:", error);
		res.status(500).json({ error: "Failed to retrieve quizzes." });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const quiz = await prisma.quiz.findUnique({
			where: { id: parseInt(id) },
			include: { questions: true },
		});

		if (!quiz) {
			return res.status(404).json({ error: "Quiz not found." });
		}
		res.status(200).json(quiz);
	} catch (error) {
		console.error("Error fetching quiz:", error);
		res.status(500).json({ error: "Failed to retrieve quiz details." });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedQuiz = await prisma.quiz.delete({
			where: { id: parseInt(id) },
		});
		res.status(200).json({
			message: `Quiz with ID ${deletedQuiz.id} deleted successfully.`,
		});
	} catch (error) {
		if (error.code === "P2025") {
			return res.status(404).json({ error: "Quiz not found." });
		}
		console.error("Error deleting quiz:", error);
		res.status(500).json({ error: "Failed to delete quiz." });
	}
});

module.exports = router;
