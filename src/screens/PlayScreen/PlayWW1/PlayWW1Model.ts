// src/screens/PlayScreen/PlayWW1/PlayWW1Model.ts

export class PlayWW1Model {
    // Stage # (1,2,3...)
    stage: number = 1;
	private countryAnswer: string[] = ["Austria-Hungary", "Kingdom of Serbia", "Belgium", "United Kingdom", "Russian Empire", "French Republic", "Empire-of-Japan", "Belgium", "French Republic", "Ottoman Empire", "French Republic", 
		"Kingdom of Italy", "German Empire", "United States", "Russian Empire", "French Republic", "French Republic", "Republic-of-China"];
	// List of possible answers for reference: "Ottoman Empire", "United States", "German Empire", "Kingdom of Italy", 
    //    					  "United Kingdom", "French Republic", "Austria-Hungary", "Japan", "China", "Russian Empire", "Serbia", "Belgium"

	// Hint Section
	factHints: string[] = [
		"This country is known for its rich cultural heritage, including classical music composers like Mozart and Beethoven.",
		"With growing unrest from this country against the Austrian-Hungarian control of Slavic territories, they also had Bosnia annexed from them in 1908.",
		"Despite being neutral, the Schleiffen Plan required invasion of this country to reach the French Republic.",
		"This country is known for it's historic monarchy and was also an ally to both the French Republic and Belgium",
		"As an ally of Serbia, they both share a Slavic heritage and Orthodox Christian faith.",
		"With the support of the United Kingdom, this country was able to repel the German advance to recapture a capital city that was previously shortly occupied by the German Empire.",
		"The seizure of German-held territories by this empire in East Asia solidified its status as a major global power which it was seeking for.",
		"The Christmas Truce of 1914 occurred in this country, located in the front lines between the German Empire and the Allied Powers.",
		"Following the First Battle of the Marne, both the German Empire and this country dug extensive trench systems north of the Aisne river.",
		"This empire is known for it's long and rich history as it controlled much of the Middle East and parts of North Africa for centuries.",
		"With the trench stalemate, this country was the site of two major battles (Verdun and Somme) in 1916 that resulted in over one million casualties combined.",
		"As a surprise, this kingdom decided to betray the Central Powers and declare war on the German Empire in 1916 in protest of an offensive war.",
		"This country was known for its advanced U-Boat submarine fleet that threatened Allied supply lines across the Atlantic Ocean.",
		"Neutral due to distance but joined the Allied Powers in 1917 after public outrage over submarine attacks on their ships.",
		"Under Tsar Nicholas II, this empire faced massive unrest at home, leading to revolution and their exit from the war in 1917.",
		"This Allied Power force led the final counterattack during the Hundred Days Offensive in 1918 that ultimately ended the war.",
		"The war concludes here where the initial invasion had also taken place in 1914.",
		"With rights of their own territory held by the Japanese empire, this republic would go on to not sign the Treaty of Versailles in protest."
	];

	flagImages: string[] = [
		"/FlagsWW1/Austria-Hungary.png",
		"/FlagsWW1/Serbia.png",
		"/FlagsWW1/Belgium.png",
		"/FlagsWW1/GB.png",
		"/FlagsWW1/Russian-Empire.png",
		"/FlagsWW1/French-Republic.png",
		"/FlagsWW1/Empire-of-Japan.png",
		"/FlagsWW1/Belgium.png",
		"/FlagsWW1/French-Republic.png",
		"/FlagsWW1/Ottoman-Empire.png",
		"/FlagsWW1/French-Republic.png",
		"/FlagsWW1/KOI.png",
		"/FlagsWW1/German-Empire.png",
		"/FlagsWW1/United-States.png",
		"/FlagsWW1/Russian-Empire.png",
		"/FlagsWW1/French-Republic.png",
		"/FlagsWW1/French-Republic.png",
		"/FlagsWW1/Republic-of-China.png"

	];
    private correctScore = 0;
    private incorrectScore = 0;
    private currentGuess = 0;

	private currentMissionText = "";

	setCurrentMission(text: string) {
        this.currentMissionText = text;
    }

    getCurrentMission(): string {
        return this.currentMissionText;
	}

	/**
	 * Reset game state
	 */
	resetGame(): void {
        this.stage = 1;
		this.correctScore = 0;
        this.incorrectScore = 0;
        this.resetGuess();
	}

	resetGuess(): void{
		this.currentGuess = 0;
	}

	/**
	 * Returns true if guess is correct, returns false otherwise
	 */
	makeGuess(country:string): boolean{
		// If user guessed the country incorrectly
		console.log("User guessed " + country);
		console.log("Correct answer is " + this.countryAnswer[this.stage-1])
		if(country != this.countryAnswer[this.stage-1]) {
			this.currentGuess++;
			if(this.currentGuess == 3) {
				this.incorrectScore++;
				this.resetGuess();
			}
			return false;
		}

		//If the user guessed the country correctly
		this.correctScore++;
		this.resetGuess();
		return true;
	}

	/**
	 * Determines if play ww1 level has been completed or not
	 */
	isEndStage(): boolean{
		return this.stage > this.countryAnswer.length;
	}

	/**
	 * Provides information on the number of 
	 * guesses left before correct answer is revealed
	 */
	getGuessInfo(): string {
		if (this.currentGuess == 1) {
			return "Two guesses left";
		} else if (this.currentGuess == 2) {
			return "One guess left";
		} else if (this.currentGuess == 0) {
			return "Out of guesses! Correct answer\nwas " + this.countryAnswer[this.stage-1];
		}
		return "Error with guess counting";
	}

	/**
	 * Get performance ranking in terms of number of stars
	 */
	getRank(): number {
		let fraction = this.correctScore / (this.correctScore + this.incorrectScore);
		console.log("Performance: " + fraction);
		if (fraction >= 0.9) return 5;
		if (fraction >= 0.75) return 4;
		if (fraction >= 0.6) return 3;
		if (fraction >= 0.4) return 2;
		if (fraction >= 0.2) return 1;
		return 0;
	}

    // Dialogue scripts
    private dialogues: Record<number, string[]> = {
        1: [
            "Commander!! Puny humans have gotten too comfortable! We need to shake things up for them. Go take out the Archduke Franz Ferdinand HAHAHAH!",
            "Or kidnap him, you know, whatever fits your style…",
            "Anyways, back to 1914 you go, good luck captain.",
            "Mission: Kidnap Archduke Franz Ferdinand — where can we find him?"
        ],

        2: [
            "Well done, Commander! We’ve convinced Austria that Serbia is behind Franz Ferdinand being gone. Both countries are mobilizing troops as we speak.",
			"We’ve really stirred the pot, but the humans just need another small push to spark a war.",
			'This time, we need to make sure that the Austrian-Hungarians strike back at the "Serbian" retaliation hard enough to draw in their allies.',
			"Mission: We’ve forged an ultimatum from Austria-Hungary. Let's lure out the Serbians to ensure a full scale war MUAHAHAHA!"
        ],

        3: [
            "Amazing! We’ve caused a chain reaction — the French Republic, the German Empire, and the Russian Empire are all being dragged in. Exactly as planned.",
			"The dominoes are falling, commander. Now, we need a border violation to enrage Britain and guarantee a continental war.",
			"Go make sure a neighboring country to the German Empire gets 'accidentally' invaded. That should do the trick.",
			"Mission: Germany plans to march through a neutral nation to invade France. Which country should we “suggest” they go through?"
        ],

		4: [
			"Splendid! Germany’s invasion of Belgium has outraged the world.",
			"However, this comes at the great displeasure of Belgium and the French Republic's ally",
			"We need a new ally to join the fight against the Central Powers to ensure the war drags on.",
			"Encourage one of the Allied nations to fully commit to the war effort.",
			"Mission: Which country should we persuade to join the Allies in response to Germany’s violation of Belgian neutrality?"
		],

		5: [
			"Wow, just wow, commander! Britain has declared war on Germany. The humans are falling right into our trap.",
			"And the German Empire is now fully committed to a two-front war. Delicious chaos!",
			"And wow, the German Empire is really good at this war thing.",
			"They even make quick work on the Eastern Front",
			"Mission: Who should lose in the Battle of Tannenberg to ensure a decisive German victory in the Eastern Front?"
		],

		6: [
			"Excellent! Britain’s entered the war to defend Belgian neutrality. The humans are fully entangled now.",
			"Our chaos is spreading beautifully, but we need to make sure the war doesn’t end too soon.",
			"Next, we need to ensure that France is fully committed to the war effort. We can do this by targeting a key French city.",
			"Go ahead and orchestrate an attack on Paris to rally the French people behind the war.",
			"Mission: At the First Battle of the Marne, which country’s army should we support to hold off Germany and keep the war alive?"
		],

		7: [
			"A surprise contender has entered the war! It seems that this empire has seized German-held territories in East Asia.",
			"This will surely stretch the Central Powers thin. Excellent!",
			"They sure made quick work of Tsingdao in Shandong, the Marianas, Carolines, and Marshall Islands.",
			"However, we need to make sure that this new empire is fully committed to the war effort.",
			"Encourage them to join the Allies and open up a new front against the Central Powers.",
			"Mission: Which country should we manipulate into joining the Allies to further strain the Central Powers?"
		],

		8: [
			"Hm? What is that singing that I hear?",
			"Why are the the soldiers from both sides laying down their arms and singing carols together?",
			"This is highly irregular. We can’t have this kind of camaraderie in the trenches!",
			"The troops are much too jolly and comfortable. However, I'll allow it for now.",
			"I love Christmas too much to be a grinch about it.",
			"Mission: During the Christmas Truce of 1914, where does this spontaneous ceasefire take place?"
		],

		9: [
			"Good work, commander. The Germans stopped short of Paris, and both sides are digging in. We’ve birthed the age of trenches!",
			"Time to make this war eternal! Humans love routine misery.",
			"Let’s ensure that both sides are too entrenched to make any significant advances.",
			"Encourage the construction of extensive trench systems along the Western Front.",
			"Mission: Where should we seed the first large-scale trench systems to trap both sides in endless stalemate?"
		],

		10: [
			"Perfect! The Western Front is a muddy maze. Every inch will now cost thousands of lives — deliciously inefficient.",
			"Some humans think they can outsmart the deadlock. Let’s prove them wrong.",
			"We need to bring in a new player to tip the scales and prolong the conflict.",
			"Let's welcome our new empire to join the Central Powers and open up new fronts.",
			"Mission: Which country should we persuade to join the Central Powers and expand the war?"
		],

		11: [
			"Brilliant! The Ottomans are in, and the war is sprawling in Gallipoli. The humans are in for a long haul now.",
			"However, the Allies are looking for ways to break the stalemate. We need to distract them further.",
			"Wait.",
			"War fatigue is setting in. The Germans intend to 'bleed the French army white' with a massive offensive.",
			"Mission: In 1916, where will we orchestrate two of the most brutal battles — Verdun and the Somme — to drain both sides’ strength?"
		],

		12: [
			"Hm, a sudden switch in alliance from this Kingdom. How interesting.",
			"They’ve decided to betray the Central Powers and join the Allies in 1916.",
			"This will surely complicate matters for the German Empire and Austria-Hungary.",
			"Sudden betrayals always make wars more fun.",
			"Mission: Which country should we guide to launch an offensive against Austria-Hungary and the German Empirein 1916?"
		],

		13: [
			"Whew, that took a while and a lot of lives, but the battles of Verdun and the Somme have bled both sides dry.",
			"Supplies, supplies! Humans can’t fight without them. Let’s threaten their sea lanes and stir up even more outrage.",
			"We should encourage one to use unrestricted submarine warfare to cut off Allied supplies.",
			"Yes, very evil and a violation of international law and the rules of war.",
			"Mission: Which country’s submarines should we encourage to attack neutral ships across the Atlantic?",
			
		],

		14: [
			"Splendid! They’ve sunk passenger liners and enraged the world. Now why would they go and do that. Someone’s bound to join the fray soon…",
			"Our opportunity has arrived! We need fresh blood in this conflict — and lots of it.",
			"One of our contacts suggests we encourage a neutral country with strong ties to the Allies to enter the war.",
			"They seemed most outraged by the submarine attacks on their ships.",
			"Now what were those German U-boats thinking?!",
			"Mission: Which new powerhouse nation should we manipulate into joining the Allies in 1917 after public outrage over submarine attacks?",
		],
		
		15: [
			"Beautifully done. The Americans are mobilizing. More humans to feed the trenches!",
			"While the West explodes, let’s make sure the East collapses.",
			"What a surprise! The Tsar is facing massive unrest at home.", 
			"Their internal strife could lead to them exiting the war entirely.",
			"We can’t have that! A quick end to the war would ruin everything.",
			"It seems that poverty, food shortages, and political discontent is giving rise to Bolsheviks.",
			"Mission: Which country should we destabilize through revolution so it drops out of the war entirely?"
		],
		
		16: [
			"Marvelous. Civil war rages there — they’ve left the fight, freeing Germany to focus westward.",
			"And they seem to have had some success with the German spring offensive",
			"However, with the new American troops arriving, the Allies are regaining their footing.",
			"Hm, it seems the Allies are planning a major offensive to push back the Germans.",
			"Well, unfortunately for the German Empire, it looks like they’re going to be on the losing side of this war.",
			"Let's just figure out where the Allies will strike to ensure their victory.",
			"Mission: In 1918, during the final Allied push known as the Hundred Days Offensive, which country’s forces should we guide to lead the counterattack that ends the war?",
		],

		17: [
			"Outstanding! The Central Powers collapse, and the humans prepare to “make peace.” Heh… as if.",
			"Peace? Fools! Now we craft the perfect ending — one that guarantees future chaos.",
			"Our work here is done for now, commander. The Great War has ravaged Europe, and the world will never be the same.",
			"I think we have set the stage for even greater conflicts to come.",
			"Let's just conclude the signing of the Treaty of Versailles.",
			"Mission: Where should we hold the treaty talks to impose punishing reparations and redraw borders unjustly?",
		],

		18: [
			"It seems that this republic has been left out of the Treaty of Versailles negotiations.",
			"They are quite displeased with having their territorial rights in East Asia ignored.",
			"This could lead to future unrest and conflict, which is exactly what we want.",
			"They even seem to be protesting the treaty by not signing it at all.",
			"Excellent. Let’s just make sure this republic remains dissatisfied and isolated.",
			"Prepare the ship… we’ll return in 20 years for Round Two.",
			"Mission: Which country should we encourage to protest the Treaty of Versailles by refusing to sign it?",
		]
    };

    getDialogueForStage(stage: number): string[] {
        return this.dialogues[stage] ?? ["(No dialogue for this stage)"];
    }

    goToNextStage(): void {
		console.log("Progressed to stage " + (this.stage + 1));
        this.stage++;
    }
}
