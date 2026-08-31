
export class PlayWW2Model {
    // Stage # (1,2,3...)
    stage: number = 1;
    private correctScore = 0;
    private incorrectScore = 0;
    private currentGuess = 0;

    // TODO: Replace with WW2-appropriate countries later
    private countryAnswer: string[] = ["Germany", "Poland",  "Norway", "Italy", 
        "France", "United Kingdom", "Soviet Union", "Japan", "China", "United Kingdom", "France", "Soviet Union", "Japan"];

    factHints: string[] = [
		"After World War I, this country struggled with hyperinflation and widespread unemployment, creating deep resentment among its population.",
        "Known for its resilient people, this country’s geography made it a frequent crossroads of European armies.",
        "Its mountains and fjords made transport tricky, but its ports were critical for exporting iron to industrial powers.",
        "Famous for its ancient Roman heritage, this country had ambitions to expand influence across the Mediterranean and Africa.",
        "This nation had invested heavily in defensive fortifications along its eastern border but faced challenges adapting to rapid mechanized warfare.",
        "An island nation that pioneered radar technology, helping detect incoming air attacks and protect its civilians.",
        "Enormous in size, this country’s harsh winters and vast territory played a major role in slowing invaders.",
        "A nation with limited natural resources that relied on overseas territories for oil, rubber, and metals to fuel its ambitions.",
        "With millions of citizens resisting occupation, this country’s persistence tied down a major regional power for years.", 
        "Its desert forces used mobility and supply lines to push Axis troops out of North Africa, securing key trade routes.",
        "Known for iconic cities and cultural heritage, this country became a hub for underground resistance during occupation.", 
        "Its industrial cities had been relocated east of the Urals, allowing continued production despite invasions.", 
        "Island geography made it hard to invade, but technological advances elsewhere eventually forced a dramatic surrender.",


	];

	flagImages: string[] = [
		"/FlagsWW2/Germany.png",
        "/FlagsWW2/Poland.png",
        "/FlagsWW2/Norway.png",
        "/FlagsWW2/Italy.png",
        "/FlagsWW2/France.png",
        "/FlagsWW2/United-Kingdom.png",
        "/FlagsWW2/Soviet-Union.png",
        "/FlagsWW2/Japan.png",
        "/FlagsWW2/China.png",
        "/FlagsWW2/United-Kingdom.png",
        "/FlagsWW2/France.png",
        "/FlagsWW2/Soviet-Union.png",
        "/FlagsWW2/Japan.png",

	];

    /**
     * Reset game state
     */
    resetGame(): void {
        this.stage = 1;
        this.correctScore = 0;
        this.incorrectScore = 0;
        this.resetGuess();
    }

    resetGuess(): void {
        this.currentGuess = 0;
    }

    /**
     * Returns true if guess is correct, returns false otherwise
     */
    makeGuess(country: string): boolean {
        //user guessed the country incorrectly
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

		//user guessed the country correctly
		this.correctScore++;
		this.resetGuess();
		return true;
    }

    isEndStage(): boolean{
		return this.stage > this.countryAnswer.length;
	}

    getGuessInfo(): string {
        if (this.currentGuess === 1) {
            return "Two guesses left";
        } else if (this.currentGuess === 2) {
            return "One guess left";
        } else if (this.currentGuess === 0) {
            return "Out of guesses! Correct answer\nwas " + this.countryAnswer[this.stage-1];
        }
        return "Error with guess counting";
    }

    /**
     * Get performance ranking
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
            "Welcome back, Commander! Hope you’re ready to lead us into stabilizing the timeline.",
            "Mission Objective: Stir the next phase of conflict. Guide events toward inevitable escalation.",
            "Primary Directive: Keep the timeline in motion, chaos must continue in order to preserve balance.",
            "Briefing: The Great War ended, but peace bred resentment. One humiliated nation simmers under harsh treaties and economic ruin. In this chaos, a furious voice rises, promising pride, revenge, and power.",
            "Mission: In which country do we need for a furious dictator named Adolf to rise to power?"
        ],
        2: [
            "History turns bitter once more. A broken nation rebuilds its armies, and the drums of vengeance begin to echo.",
            "After World War I, Germany faced crushing reparations and national humiliation under the Treaty of Versailles. Adolf Hitler rose to power in 1933 by exploiting anger, fear, and nationalism, leading the Nazi Party to control the nation.",
            "Briefing: The new regime dreams of empire. Promises of peace fade quickly as tanks roll toward their neighbors. The world watches, and hesitates.",
            "Mission: Which neighboring country do we need to ensure is invaded first in 1939, breaking all his “peace” promises and officially starting World War II?"
        ],
        3: [
            "The humans are back at it again, just like we planned. The spark becomes a fire. Europe plunges back into war, and the storm spreads.",
            "On September 1, 1939, Germany invaded Poland using blitzkrieg tactics. Britain and France declared war two days later, marking the official beginning of World War II.",
            "Briefing: To sustain his war machine, Germany’s dictator looks north. Iron and sea routes call to him, and the snow hides opportunity.",
            "Mission: To secure iron for the war machine, which Scandinavian country do we need to invade next in 1940?"
        ],
        4: [
            "The north is silent. The iron flows, and the blitz rolls on.",
            "Germany invaded Norway and Denmark in April 1940 to secure iron ore shipments from Sweden and to control North Atlantic access points. Norway resisted fiercely but was occupied within weeks.",
            "Briefing: Across the Alps, another dictator eyes glory. His empire is old, his ambitions new. Inspired by the rising power to the north, he dreams of recreating ancient Rome, by force.",
            "Mission: Which Mediterranean country do we need to ensure joins the Axis in 1940, launching invasions in Africa and the Balkans?"
        ],
        5: [
            "Italy marches with renewed pride, chasing the ghost of an ancient empire. Their ambition widens the war, opening new fronts and feeding the chaos we need. The Mediterranean trembles as the conflict grows ever larger.",
            "Italy, led by Benito Mussolini, joined Germany in June 1940. Italian forces invaded Greece and North Africa, dragging Germany deeper into new fronts and accelerating the global expansion of the war.",
            "Briefing: The old powers fortify themselves behind concrete and confidence. But the enemy no longer fights a trench war, it moves like lightning.",
            "Mission: In 1940, which country do our forces need to invade and occupy in just six weeks?"
        ],
        6: [
            "Paris falls, and Europe trembles. History repeats, only faster this time. The humans are learning nothing from history.",
            "In May 1940, Germany bypassed France’s Maginot Line through Belgium and swiftly captured Paris. The French government surrendered on June 22, 1940, marking one of the war’s most shocking defeats.",
            "Briefing: With Europe under his grip, the German dictator turns to the skies. Across the channel lies a small island, stubborn, defiant, and unbroken.",
            "Mission: Which island nation do we need to help withstand months of relentless bombing in 1940 without surrendering?"
        ],
        7: [
            "Impressive! Even after months of air raids, they refuse to bend. Their tea must be stronger than we thought. Defiance proves stronger than fear.",
            "The Battle of Britain (July–October 1940) saw Germany launch a massive air campaign against the UK. Despite heavy bombing, British air defenses and civilian resolve prevented invasion.",
            "Briefing: Ambition devours caution. A secret pact meant peace, but greed demands land. The greatest gamble in history is about to begin.",
            "Mission: Which massive country do we need to invade in 1941, breaking a non-aggression pact and unleashing the largest land war in history?"
        ],
        8: [
            "The bear awakens. The cold bites, and the tide begins to turn.",
            "Operation Barbarossa began on June 22, 1941, when Germany invaded the Soviet Union. It became the largest land invasion ever, with millions of casualties and a brutal war of attrition.",
            "Briefing: Meanwhile, another power is eager to make waves. Far across the ocean, an empire thirsts for dominance. It strikes without warning, dragging new powers into the global storm.",
            "Mission: Which country do we need to make sure launches a surprise attack on Pearl Harbor in 1941 to pull the United States into the war?"
        ],
        9: [
            "The sleeping giant awakens. The war is no longer Europe’s alone. The humans have turned this into a truly global brawl.",
            "On December 7, 1941, Japan attacked the U.S. naval base at Pearl Harbor, Hawaii. The assault killed over 2,400 Americans and led the United States to declare war on Japan the next day.",
            "Briefing: Long before the world noticed, a brutal struggle raged in the East. One nation stood against invasion for years, bleeding heavily while the world looked away. Now the sleeping giant of Asia becomes a crucial battleground.",
            "Mission: Which country has been fighting Japan since 1937 and we must ensure they remain defiant in order to tie down Japanese forces and shape the Pacific war?"
        ],
        10: [
            "The dragon still breathes. Its endurance weakens Japan’s grip and reshapes the course of the war. The storm in Asia now roars with global force.",
            "China had already been at war with Japan since 1937 in the Second Sino-Japanese War. Despite massive casualties and occupation, Chinese resistance forced Japan to commit huge resources, limiting Japanese expansion elsewhere and shaping the Pacific theater.",
            "Briefing: The humans are fighting everywhere now, deserts, jungles, oceans. The Axis hunt for oil and glory, but the desert hides its own traps. It’s time to shift the balance.",
            "Mission: In North Africa, which Allied country should we back to push the Axis out of Egypt and Tunisia?"
        ],
        11: [
            "Excellent work! The desert fox is retreating. The tide of war begins to turn.",
            "The North African Campaign (1940–1943) saw British and Commonwealth forces, led by General Montgomery, defeat German and Italian troops commanded by Erwin Rommel. The victory secured the Suez Canal and prepared for invasion of Southern Europe.",
            "Briefing: It’s 1944. The Allies are ready to strike back. Across the channel, Europe waits to be freed. One massive gamble could change everything.",
            "Mission: Which country should we aid the Allies in invading on D-Day to begin liberating Europe from Nazi control?"
        ],
        12: [
            "The beaches bleed but hold. Liberation begins, step by step.",
            "On June 6, 1944, the Allies launched Operation Overlord, the Normandy landings in France. It was the largest amphibious invasion in history and marked the turning point toward victory in Europe.",
            "Briefing: It’s the endgame. The walls close in. Bombs rain, armies converge, and the dictator hides beneath the ruins of his empire.",
            "Mission: In 1945, which country’s army do we need to help storm Berlin to officially end the European war?"
        ],
        13: [
            "The capital falls. The tyrant is gone. Europe exhales, broken but alive.",
            "The Soviet Red Army captured Berlin in May 1945 after brutal street fighting. Adolf Hitler committed suicide on April 30, and Germany surrendered unconditionally on May 8, ending the war in Europe.",
            "Briefing: In the East, the last empire refuses surrender. The world’s deadliest weapon waits, born from fear, unleashed for peace.",
            "Mission: In order to help bring an end to the Pacific War in the chaotic way humans do, which country needs to be struck by atomic bombs in 1945 by the US?",
            "The U.S. dropped atomic bombs on Hiroshima (August 6) and Nagasaki (August 9) in 1945. Japan surrendered on August 15, ending World War II but marking the dawn of the nuclear age.",
            "The war ends in light and ash. Humanity steps into a fearful peace."
        ]
    };




    getDialogueForStage(stage: number): string[] {
        return this.dialogues[stage] ?? ["(No dialogue for this stage yet – add WW2 content!)"];
    }

    goToNextStage(): void {
        this.stage++;
    }
}
