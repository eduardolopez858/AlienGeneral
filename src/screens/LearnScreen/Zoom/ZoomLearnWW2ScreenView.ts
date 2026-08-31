import { SetupZoomLearnScreenView, type CountryConfig } from "./SetupZoomLearnScreenView";
/**
 * This file is where we make the view and fill in the specifics of each 
 * zoom screen for our WW2 level
 */

/**
 * North America
 */
const northAmericaConfig: CountryConfig = {
  headerLeft: "LEARN MODE",
  headerRight: "WORLD WAR 2: AMERICA",

  mapImageSrc: "/WorldWar2America.png",
  pins: [
    // edit placement            name
    { x: 440, y: 400, name: "United States" },
  ],
  countryInfo: {
    // name            name and Info Excerpt
    "United States": "----------- Role: -----------\n• Industrial and military powerhouse of the Allies.\n\n----------- Key Events & Dates: -----------\n• 7 Dec 1941: Enters war after Pearl Harbor attack from Japan.\n• 1942–1945: Pacific island-hopping campaign.\n• Nov 1942: Enters North Africa and European operations.\n• 6 June 1944: Participates in D-Day.\n• 1945: Drops atomic bombs on Japan; helps secure Allied victory.\n\n----------- Tech & Tactics: -----------\n• Atomic bomb (Manhattan Project).\n• Massive industrial production.\n• Amphibious warfare innovations.\n• Long-range bombers (B-17, B-29).\n• Proximity fuzes and radar.\n\n----------- Homefront & Intelligence: -----------\n• “Arsenal of Democracy.”\n• Manhattan Project.\n• OSS created (precursor to CIA).\n• Internment of Japanese Americans.\n\n----------- Outcome and Legacy: -----------\n• Emerges as superpower.\n• Leads Marshall Plan reconstruction.\n• Beginning of the Cold War.",
  },
};

export class ZoomNorthAmericaLearnWW2ScreenView extends SetupZoomLearnScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, northAmericaConfig);
  }
}

/**
 * Europe
 */
const europeConfig: CountryConfig = {
  headerLeft: "LEARN MODE",
  headerRight: "WORLD WAR 2: EUROPE",

  mapImageSrc: "/WorldWar2Europe.png",
  pins: [
    // edit placement        name
    { x: 350, y: 435, name: "Germany" },
    { x: 380, y: 510, name: "Italy" },
    { x: 260, y: 370, name: "United Kingdom" },
    { x: 285, y: 470, name: "France" },
    { x: 440, y: 410, name: "Poland" },
    { x: 340, y: 290, name: "Norway" },
    { x: 600, y: 370, name: "Soviet Union" },
  ],
  countryInfo: {
    // name            name and Info Excerpt
    "Germany": "----------- Role: -----------\n• Leading Axis power; initiated the war in Europe.\n\n----------- Key Events & Dates: -----------\n• 1933: Adolf Hitler becomes Chancellor; Nazi expansion begins.\n• 1 Sept 1939: Invades Poland, triggering WWII.\n• 1940: Conquers France, Belgium, Netherlands, Denmark, and Norway.\n• Apr 1940: Invades Norway and Denmark to secure iron ore and Atlantic access.\n• May 1940: Bypasses Maginot Line through Belgium; captures Paris.\n• July–Oct 1940: Battle of Britain—fails to defeat the UK.\n• 22 June 1941: Launches Operation Barbarossa against the USSR.\n• Dec 1941: Declares war on the United States.\n• 6 June 1944: D-Day Allied landings in France.\n• 8 May 1945: Berlin falls; Germany surrenders (V-E Day).\n\n----------- Tech & Tactics: -----------\n• Blitzkrieg (“lightning war”).\n• V-1 and V-2 rockets.\n• Advanced U-boats (wolfpack tactics).\n• Jet aircraft prototypes (Me 262).\n• Enigma machine encryption.\n\n----------- Homefront & Intelligence: -----------\n• Gestapo and SS intelligence networks.\n• Propaganda and total war mobilization.\n• Resistance movements suppressed (e.g., White Rose).\n\n----------- Outcome and Legacy: -----------\n• Nazi regime destroyed; total defeat.\n• Divided into East and West Germany until 1990.\n• Nuremberg Trials set precedent for war crimes law.",
    "Italy": "----------- Role: -----------\n• Axis power until 1943; switched sides afterward.\n\n----------- Key Events & Dates: -----------\n• June 1940: Enters war under Mussolini.\n• 1940–1941: Failures in Greece and North Africa.\n• July 1943: Mussolini overthrown.\n• Sept 1943: Italy signs armistice; civil war begins.\n• 1945: German forces in Italy surrender.\n\n----------- Tech & Tactics: -----------\n• Underdeveloped tank designs.\n• Strong mountain warfare units.\n• Pioneers of naval commandos/frogmen.\n\n----------- Homefront & Intelligence: -----------\n• Fascist propaganda and shortages.\n• Partisan resistance after 1943.\n• German occupation causes civil conflict.\n\n----------- Outcome and Legacy: -----------\n• Mussolini removed; monarchy abolished (1946).\n• Italy becomes a republic and rebuilds.",
    "United Kingdom": "----------- Role: -----------\n• Major Allied power; resisted Nazi expansion early in the war.\n\n----------- Key Events & Dates: -----------\n• 3 Sept 1939: Declares war on Germany.\n• July–Oct 1940: Wins the Battle of Britain.\n• 1941–1945: Campaigns in North Africa, Europe, and Asia.\n• 6 June 1944: Leads Allied landing at Normandy (D-Day).\n\n----------- Tech & Tactics: -----------\n• Radar-based air defense.\n• Bletchley Park codebreaking (Ultra).\n• Spitfires and Lancaster bombers.\n• SOE support for resistance movements.\n\n----------- Homefront & Intelligence: -----------\n• Rationing and civilian mobilization.\n• MI6 and SOE espionage operations.\n• Enigma decryption breakthrough.\n\n----------- Outcome and Legacy: -----------\n• Victory but economic exhaustion.\n• Postwar decolonization.\n• NATO founding member.",
    "France": "----------- Role: -----------\n• Early Allied power; later divided between occupation and Vichy rule.\n\n----------- Key Events & Dates: -----------\n• 3 Sept 1939: Declares war on Germany.\n• May–June 1940: Defeated; Paris captured.\n• 1940–1944: Free French forces fight abroad; resistance grows.\n• 6 June 1944: Normandy landings begin liberation.\n• Aug 1944: Paris liberated.\n\n----------- Tech & Tactics: -----------\n• Advanced tanks (Char B1).\n• Maginot Line defenses.\n• Resistance sabotage evolves under occupation.\n\n----------- Homefront & Intelligence: -----------\n• French Resistance emerges.\n• Vichy regime collaborates with Axis.\n• Resistance and Allied intelligence coordinate for D-Day.\n\n----------- Outcome and Legacy: -----------\n• Government restored; major postwar power.\n• Postwar conflicts in Indochina and Algeria.",
    "Poland": "----------- Role: -----------\n• First nation invaded by Germany; major resistance center.\n\n----------- Key Events & Dates: -----------\n• 1 Sept 1939: Germany invades Poland.\n• 17 Sept 1939: USSR invades eastern Poland.\n• Sept–Oct 1939: Poland defeated and partitioned.\n• 1940–1944: Home Army conducts sabotage and intelligence.\n• Apr–May 1943: Katyn Massacre revealed.\n• 1 Aug – 2 Oct 1944: Warsaw Uprising crushed.\n• 1945: Liberated by USSR but becomes Soviet-controlled.\n\n----------- Tech & Tactics: -----------\n• Use of cavalry and armored units in 1939.\n• Underground weapons manufacturing.\n• Broke Enigma cipher before war; aided Allies.\n• Polish pilots excel in Battle of Britain (303 Squadron).\n\n----------- Homefront & Intelligence: -----------\n• Home Army runs resistance networks.\n• Underground couriers provide intel to Britain.\n• Heavy repression, executions, deportations.\n• Jewish uprisings (Warsaw Ghetto, 1943).\n\n----------- Outcome and Legacy: -----------\n• ~6 million citizens killed.\n• Postwar borders shift west.\n• Becomes communist state under Soviet control until 1989.",
    "Norway": "----------- Role: -----------\n• Neutral state invaded by Germany; strategically vital for North Atlantic control.\n\n----------- Key Events & Dates: -----------\n• 9 April 1940: Germany invades Norway (Operation Weserübung).\n• June 1940: Norway surrenders; government-in-exile escapes.\n• 1940–1945: German occupation; Quisling puppet regime installed.\n• 1941–1944: Resistance grows; major sabotage missions.\n• Feb 1943: Vemork heavy-water sabotage halts German nuclear progress.\n• May 1945: German forces in Norway surrender.\n\n----------- Tech & Tactics: -----------\n• Effective mountain/winter warfare.\n• Merchant fleet supports Allies.\n• High-value sabotage (railways, communications, heavy water).\n• Close SOE cooperation.\n\n----------- Homefront & Intelligence: -----------\n• Milorg resistance organizes espionage and sabotage.\n• SOE–Norwegian collaboration extensive.\n• Harsh German occupation and forced labor.\n• Widespread civil disobedience and underground press.\n\n----------- Outcome and Legacy: -----------\n• Regains independence in 1945.\n• Key role in stopping German nuclear program.\n• Founding NATO member.\n• “Quisling” becomes global synonym for traitor.",
    "Soviet Union": "----------- Role: -----------\n• Largest Allied land force; suffered immense casualties.\n\n----------- Key Events & Dates: -----------\n• 23 Aug 1939: Signs non-aggression pact with Germany.\n• 22 June 1941: Germany invades USSR.\n• 1942–1943: Stalingrad turns the tide.\n• 1943–1945: Liberates Eastern Europe.\n• May 1945: Captures Berlin.\n\n----------- Tech & Tactics: -----------\n• T-34 tanks.\n• “Deep Battle” offensive doctrine.\n• Katyusha rocket launchers.\n• Massive industrial relocation eastward.\n\n----------- Homefront & Intelligence: -----------\n• Heavy propaganda and mobilization.\n• NKVD secret police.\n• Strong partisan networks.\n\n----------- Outcome and Legacy: -----------\n• Emerges as a superpower.\n• Controls Eastern Europe.\n• Becomes a central Cold War power.",
  },
};

export class ZoomEuropeLearnWW2ScreenView extends SetupZoomLearnScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, europeConfig);
  }
}

/**
 * Asia
 */
const asiaMEConfig: CountryConfig = {
  headerLeft: "LEARN MODE",
  headerRight: "WORLD WAR 2: ASIA",

  mapImageSrc: "/WorldWar2Asia.png",
  pins: [
    // edit placement        name
    { x: 720, y: 300, name: "Japan" },
    { x: 500, y: 300, name: "China" },
    { x: 290, y: 170, name: "Soviet Union" },
  ],
  countryInfo: {
    // name            name and Info Excerpt
    "Japan": "----------- Role: -----------\n• Asian Axis power; sought dominance in East Asia and the Pacific.\n\n----------- Key Events & Dates: -----------\n• 1937: Begins full-scale war with China.\n• 7 Dec 1941: Attacks Pearl Harbor; U.S. enters war.\n• 1942–1943: Rapid expansion followed by major defeats (e.g., Midway).\n• 6 & 9 Aug 1945: Hiroshima and Nagasaki atomic bombings.\n• 15 Aug 1945: Announces surrender.\n• 2 Sept 1945: Formal surrender ends WWII.\n\n----------- Tech & Tactics: -----------\n• Strong early naval aviation (carrier warfare).\n• Type 93 “Long Lance” torpedoes.\n• Kamikaze attacks (late war).\n• Island fortifications and jungle warfare.\n\n----------- Homefront & Intelligence: -----------\n• Strict civilian control, militarized society.\n• Kempeitai secret police.\n• Severe shortages and total mobilization.\n\n----------- Outcome and Legacy: -----------\n• Occupied by the U.S. until 1952.\n• Demilitarized and democratized.\n• Long-term legacy of atomic bombings.",
    "China": "----------- Role: -----------\n• Major Allied power in Asia; fought Japan long before global war began.\n\n----------- Key Events & Dates: -----------\n• 1937: Second Sino-Japanese War begins.\n• 1941: China joins Allies after Pearl Harbor.\n• 1937–1945: Suffers massive civilian casualties under Japanese occupation.\n• 1945: Recovers territory after Japanese defeat.\n\n----------- Tech & Tactics: -----------\n• Guerrilla warfare.\n• Using terrain to tie down Japanese forces.\n• Cooperation with U.S. (Flying Tigers, Burma Campaign).\n\n----------- Homefront & Intelligence: -----------\n• Severe civilian suffering.\n• Communist and Nationalist factions both resist Japan.\n• Extensive guerrilla intelligence networks.\n\n----------- Outcome and Legacy: -----------\n• Civil War resumes after WWII.\n• 1949 Communist victory establishes PRC.\n• Becomes major geopolitical actor.",
    "Soviet Union": "----------- Role: -----------\n• Largest Allied land force; suffered immense casualties.\n\n----------- Key Events & Dates: -----------\n• 23 Aug 1939: Signs non-aggression pact with Germany.\n• 22 June 1941: Germany invades USSR.\n• 1942–1943: Stalingrad turns the tide.\n• 1943–1945: Liberates Eastern Europe.\n• May 1945: Captures Berlin.\n\n----------- Tech & Tactics: -----------\n• T-34 tanks.\n• “Deep Battle” offensive doctrine.\n• Katyusha rocket launchers.\n• Massive industrial relocation eastward.\n\n----------- Homefront & Intelligence: -----------\n• Heavy propaganda and mobilization.\n• NKVD secret police.\n• Strong partisan networks.\n\n----------- Outcome and Legacy: -----------\n• Emerges as a superpower.\n• Controls Eastern Europe.\n• Becomes a central Cold War power.",
  },
};

export class ZoomAsia_MELearnWW2ScreenView extends SetupZoomLearnScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, asiaMEConfig);
  }
}
