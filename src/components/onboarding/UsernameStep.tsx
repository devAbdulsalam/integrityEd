import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface UsernameStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const UsernameStep = ({ value, onChange, onNext }: UsernameStepProps) => {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!value.trim()) {
      setError("Please enter your name");
      return;
    }
    if (value.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    setError("");
    onNext();
  };

  return (
		<div className="flex-1 flex flex-col justify-between">
			<div className="flex-1 flex flex-col items-center justify-center">
				<div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8">
					<User className="w-12 h-12 text-primary" />
				</div>

				<h1 className="text-2xl font-bold text-foreground text-center mb-2 capitalize">
					What's your name?
				</h1>
				<p className="text-muted-foreground text-center mb-8">
					Let's personalize your learning experience
				</p>

				<div className="w-full max-w-sm">
					<Input
						placeholder="Enter your name"
						value={value}
						onChange={(e) => {
							onChange(e.target.value);
							setError('');
						}}
						className="text-center text-lg h-14 bg-card border-border"
						maxLength={50}
					/>
					{error && (
						<p className="text-destructive text-sm text-center mt-2">{error}</p>
					)}
				</div>
			</div>

			<Button
				onClick={handleNext}
				className="w-full h-14 text-lg font-semibold capitalize"
				size="lg"
			>
				Continue
			</Button>
		</div>
	);
};

export default UsernameStep;
