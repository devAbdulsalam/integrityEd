import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { glossaryTerms } from '@/data/glossary';
type GlossaryTerm = {
	term: string;
	meaning: string;
};

const Glossary = () => {
	const navigate = useNavigate();
	// const query = new URLSearchParams(window.location.search);
	const [search, setSearch] = React.useState('');

	const filteredTerms = glossaryTerms.filter(
		(item) =>
			item.term.toLowerCase().includes(search.toLowerCase()) ||
			item.meaning.toLowerCase().includes(search.toLowerCase())
	);
	const groupedTerms = filteredTerms.reduce<Record<string, GlossaryTerm[]>>(
		(acc, item) => {
			const letter = item.term.charAt(0).toUpperCase();
			if (!acc[letter]) acc[letter] = [];
			acc[letter].push(item);
			return acc;
		},
		{}
	);

	// const ratings = [1, 2, 3, 4, 5];

	// gracei rate,   content, tone, character,

	

	 

	return (
		<div className="min-h-screen bg-background pb-20">
			<div className="max-w-md mx-auto p-6 space-y-6">
				<div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
					{/* <div className="flex items-center  p-4 pb-2 justify-between"> */}
					<div className="flex items-center justify-between mb-6">
						<button onClick={() => navigate(-1)}>
							<ArrowLeft className="w-6 h-6 text-foreground" />
						</button>
						<div className=" text-foreground flex size-12 shrink-0 items-center"></div>
						<h2 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
							Glossary
						</h2>
						<div className=" text-foreground flex size-12 shrink-0 items-center"></div>
					</div>
					<div className="sticky top-0  z-10 px-4 py-3">
						<label className="flex flex-col min-w-40 h-12 w-full">
							<div className="flex w-full flex-1 items-stretch rounded-lg h-full">
								<div className=" text-foreground flex border border-r-0 border-text-[#F0F0F0] dark:border-text-[#283339]  items-center justify-center pl-4 rounded-l-lg">
									<span className="material-symbols-outlined"></span>
								</div>
								<input
									className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border border-l-0 h-full px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
									placeholder="Search for a term..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</label>
					</div>
					<div className="flex flex-1">
						<div className="flex-1 pr-10">
							{Object.keys(groupedTerms)
								.sort()
								.map((letter) => (
									<div key={letter} id={letter}>
										<h4 className="text-[#003366] text-2xl font-bold leading-normal tracking-[0.015em] px-4 py-2">
											{letter}
										</h4>

										{groupedTerms[letter].map((term) => (
											<>
												<div
													key={term.term}
													className="flex items-center gap-4 px-4 min-h-[72px] py-2"
												>
													<div className="flex flex-col justify-center">
														<p className="text-foreground text-base font-bold leading-normal">
															{term.term}
														</p>
														<p className="text-foreground/80 text-sm font-normal leading-normal">
															{term.meaning}
														</p>
													</div>
												</div>
												<div className="my-2 h-px bg-border mx-4"></div>
											</>
										))}
									</div>
								))}
						</div>
						<div className="fixed right-0 top-1/2 -translate-y-1/2 pr-2">
							<div className="flex flex-col items-center space-y-1 text-sm">
								<a className="text-[#003366] font-bold" href="#">
									A
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									B
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									C
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									D
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									E
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									F
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									G
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									H
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									I
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									J
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									K
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									L
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									M
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									N
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									O
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									P
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									Q
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									R
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									S
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									T
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									U
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									V
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									W
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									X
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									Y
								</a>
								<a
									className=" text-foreground/70 hover:text-[#003366]"
									href="#"
								>
									Z
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Glossary;
