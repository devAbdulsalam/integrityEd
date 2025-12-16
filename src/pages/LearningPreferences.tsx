import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Bell, Clock, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProfile {
	username: string;
	ageRange: string;
	learningStyle: string;
	avatar: string;
	progress: number;
}

interface Preferences {
  learningStyles: string[];
  notificationsEnabled: boolean;
  notificationFrequency: string;
  contentDifficulty: number;
}

const learningStyleOptions = [
  { id: "visual", label: "Visual", description: "Videos and infographics" },
  { id: "auditory", label: "Auditory", description: "Podcasts and audio lessons" },
  { id: "reading", label: "Reading/Writing", description: "Articles and case studies" },
  { id: "kinesthetic", label: "Kinesthetic", description: "Interactive simulations" },
];

const LearningPreferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Preferences>({
    learningStyles: ["visual", "reading"],
    notificationsEnabled: true,
    notificationFrequency: "daily",
    contentDifficulty: 1,
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("user_profile");
    if (storedProfile) {
      const profile: UserProfile = JSON.parse(storedProfile);
      setPreferences(prev => ({
        ...prev,
        learningStyles: profile.learningStyle ? [profile.learningStyle] : ["visual"],
      }));
    }

    const storedPrefs = localStorage.getItem("learning_preferences");
    if (storedPrefs) {
      setPreferences(JSON.parse(storedPrefs));
    }
  }, []);

  const toggleLearningStyle = (styleId: string) => {
    setPreferences(prev => ({
      ...prev,
      learningStyles: prev.learningStyles.includes(styleId)
        ? prev.learningStyles.filter(s => s !== styleId)
        : [...prev.learningStyles, styleId],
    }));
  };

  const handleReset = () => {
    setPreferences({
      learningStyles: ["visual"],
      notificationsEnabled: true,
      notificationFrequency: "daily",
      contentDifficulty: 1,
    });
    toast.info("Preferences reset to defaults");
  };

  const handleSave = () => {
    localStorage.setItem("learning_preferences", JSON.stringify(preferences));
    
    // Also update user profile with primary learning style
    const storedProfile = localStorage.getItem("user_profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      profile.learningStyle = preferences.learningStyles[0] || "visual";
      localStorage.setItem("user_profile", JSON.stringify(profile));
    }
    
    toast.success("Preferences saved successfully!");
    navigate(-1);
  };

  const getDifficultyLabel = (value: number) => {
    switch (value) {
      case 0: return "Beginner";
      case 1: return "Intermediate";
      case 2: return "Expert";
      default: return "Intermediate";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-6 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Learning Preferences</h1>
          <button onClick={handleReset} className="text-primary text-sm font-medium">
            Reset
          </button>
        </div>

        {/* Preferred Learning Style */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Preferred Learning Style
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Select how you learn best. We'll tailor content to your style.
          </p>
          
          <div className="space-y-1">
            {learningStyleOptions.map((style, index) => (
              <Card
                key={style.id}
                className={`p-4 bg-card border-border cursor-pointer transition-all ${
                  index < learningStyleOptions.length - 1 ? "border-b-0 rounded-b-none" : ""
                } ${index > 0 ? "rounded-t-none" : ""}`}
                onClick={() => toggleLearningStyle(style.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{style.label}</p>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    preferences.learningStyles.includes(style.id)
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                  }`}>
                    {preferences.learningStyles.includes(style.id) && (
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Notification Settings
          </h2>
          
          <Card className="p-4 bg-card border-border mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">Enable Notifications</span>
              </div>
              <Switch
                checked={preferences.notificationsEnabled}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, notificationsEnabled: checked }))
                }
              />
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-foreground">Notification Frequency</span>
              </div>
              <Select
                value={preferences.notificationFrequency}
                onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, notificationFrequency: value }))
                }
              >
                <SelectTrigger className="w-28 border-0 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Content Difficulty */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Content Difficulty
          </h2>
          
          <div className="px-2">
            <Slider
              value={[preferences.contentDifficulty]}
              onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, contentDifficulty: value[0] }))
              }
              max={2}
              step={1}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={preferences.contentDifficulty === 0 ? "text-primary font-medium" : ""}>
                Beginner
              </span>
              <span className={preferences.contentDifficulty === 1 ? "text-primary font-medium" : ""}>
                Intermediate
              </span>
              <span className={preferences.contentDifficulty === 2 ? "text-primary font-medium" : ""}>
                Expert
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleSave}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPreferences;