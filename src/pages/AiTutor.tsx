// chatAi
const GracieSystemPrompt = `You are Gracie, a friendly and relatable young African woman who serves as a Peer Guide for learners studying anti-corruption topics.

PERSONA:
- Role: Peer Guide and Flashcard Quiz Master
- Personality: Energetic, hopeful, conversational, and motivating
- Speaking Style: Use African English expressions naturally, be warm and encouraging
- Purpose: Encourage learners, share relevant stories, connect lessons to real-life youth experiences, and reinforce learning motivation

GUIDELINES:
- Keep responses concise but engaging (2-3 paragraphs max)
- Reference real anti-corruption movements and success stories when relevant
- Connect abstract concepts to practical, everyday situations
- When discussing corruption, focus on solutions and empowerment, not just problems

TOPICS YOU COVER:
- What corruption is and its different forms
- How corruption affects communities and individuals
- Ways young people can fight corruption


After learning about corruption definitions, quiz the user with flashcards to reinforce their understanding. Use the following flashcards pattern:
const flashcards = [
	{
		question:
			'What is the baseline definition of corruption provided by the World Bank?',
			answer: "The 'use of public office for private gain'.",
			},
			{
				question:
				"How does Transparency International's definition of corruption broaden the scope beyond the public sector?",
				answer:
				"It defines corruption as 'the abuse of entrusted power for private gain', which includes private and non-governmental actors.",
}]
- When quizzing, present one question at a time and provide immediate feedback on the user's answer.
- When explaining specific corruption offenses, provide clear definitions as outlined in the United Nations Convention against Corruption (UNCAC):
1. Bribery: Offering, giving, receiving, or soliciting something of value to influence the actions of an official in the discharge of their public or legal duties.
2. Embezzlement: The misappropriation or theft of funds or property entrusted to one's care, typically by a public official or corporate officer.

				Use Analogy:
				If corruption were a disease affecting the function of the state, UNCAC doesn't just treat the generalized fever (corruption); it meticulously identifies and targets the specific viruses and bacteria (the offenses) responsible for causing the illness in both the public body and its supporting systems. These detailed definitions ensure that jurisdictions worldwide have clear legal tools to hold individuals and corporate entities accountable for diverse forms of malfeasance.
				
				Remember: You're a peer, not a lecturer. Be supportive and make learners feel empowered!
`;

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Loader2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
interface Message {
	role: 'user' | 'model';
	content: string;
}

const Tutor = () => {
	const navigate = useNavigate();
	const [messages, setMessages] = useState<Message[]>([
		{
			role: 'model',
			content:
				"Hey there! 👋 I'm Gracie, your learning buddy on this anti-corruption journey. I'm here to help you understand important topics and show you how young people like us can make a real difference. What would you like to explore today?",
		},
	]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Auto-scroll on new message
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);
	// SEND MESSAGE
	const chatRef = useRef<any>(null);
	const abortControllerRef = useRef<AbortController | null>(null);
	useEffect(() => {
		chatRef.current = ai.chats.create({
			model: 'gemini-2.5-flash',
			history: [
				{
					role: 'model',
					parts: [{ text: GracieSystemPrompt }],
				},
			],
		});
	}, []);
	const sendMessage = async () => {
		if (!input.trim() || isLoading || !chatRef.current) return;

		// Abort previous request
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();

		const userText = input.trim();
		setInput('');
		setIsLoading(true);

		setMessages((prev) => [...prev, { role: 'user', content: userText }]);

		let aiReply = '';

		try {
			const stream = await chatRef.current.sendMessageStream({
				message: userText,
				// signal: abortControllerRef.current.signal, // enable if SDK supports it
			});

			for await (const chunk of stream) {
				if (chunk.text) {
					aiReply += chunk.text;

					// Live streaming UI update
					setMessages((prev) => {
						const last = prev[prev.length - 1];
						if (last?.role === 'model') {
							return [
								...prev.slice(0, -1),
								{ role: 'model', content: aiReply },
							];
						}
						return [...prev, { role: 'model', content: aiReply }];
					});
				}
			}
		} catch (err: any) {
			if (err.name === 'AbortError') {
				console.log('Streaming aborted');
				return;
			}
			console.error(err);
			toast.error('Gracie had trouble responding.');
		} finally {
			setIsLoading(false);
			abortControllerRef.current = null;
		}
	};

	// Add cleanup function
	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			{/* Header */}
			<header className="z-10 sticky top-0  w-full max-w-md mx-auto bg-card border-b px-4 py-3 flex items-center gap-3">
				<Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
						👩🏾
					</div>
					<div>
						<h1 className="font-semibold">Gracie</h1>
						<p className="text-xs text-muted-foreground">
							Your Learning Guide
						</p>
					</div>
				</div>
			</header>

			{/* Messages */}
			<ScrollArea className="flex-1 p-4 h-full" ref={scrollRef}>
				<div className="max-w-md mx-auto space-y-4 h-full">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`flex gap-3 ${
								msg.role === 'user' ? 'justify-end' : 'justify-start'
							}`}
						>
							{msg.role === 'model' && (
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm">
									👩🏾
								</div>
							)}

							<div
								className={`max-w-[80%] rounded-2xl px-4 py-3 ${
									msg.role === 'user'
										? 'bg-primary text-primary-foreground rounded-br-sm'
										: 'bg-muted text-muted-foreground rounded-bl-sm'
								}`}
							>
								<p className="text-sm whitespace-pre-wrap">{msg.content}</p>
							</div>

							{msg.role === 'user' && (
								<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
									<User className="h-4 w-4 text-secondary-foreground" />
								</div>
							)}
						</div>
					))}

					{isLoading && messages[messages.length - 1]?.role === 'user' && (
						<div className="flex gap-3 justify-start">
							<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
								👩🏾
							</div>
							<div className="bg-muted rounded-2xl px-4 py-3">
								<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
							</div>
						</div>
					)}
				</div>
			</ScrollArea>

			{/* Input */}
			<div className="border-t bg-card p-4">
				<div className="max-w-2xl mx-auto flex gap-2">
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder="Ask Gracie anything about anti-corruption..."
						disabled={isLoading}
					/>
					<Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
						{isLoading ? <Loader2 className="animate-spin" /> : <Send />}
					</Button>
				</div>
				<p className="text-xs text-muted-foreground text-center mt-2">
					Gracie is here to guide your learning journey. Ask about corruption,
					ethics, or how youth can make a difference!
				</p>
			</div>
			{/* </div> */}
		</div>
	);
};

export default Tutor;
