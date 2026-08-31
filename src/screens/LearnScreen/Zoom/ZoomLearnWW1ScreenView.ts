import { SetupZoomLearnScreenView, type CountryConfig } from "./SetupZoomLearnScreenView";

/**
 * This file is where we make the view and fill in the specifics of each 
 * zoom screen for our WW1 level
 */

/**
 * America
 */
const AmericaConfig: CountryConfig = {
  headerLeft: "LEARN MODE",
  headerRight: "WORLD WAR 1: AMERICA",

  mapImageSrc: "/WorldWar1America.png",

  pins: [

    // edit placement            name
    { x: 440, y: 400, name: "United States" },
  ],
  countryInfo: {
    //  Name              Name and Info Excerpt
    "United States": "----------- Role: -----------\n• Enters war late; provides crucial manpower and economic strength.\n\n----------- Key Events & Dates: -----------\n• Apr 1917: Declares war on Germany.\n• 1917–1918: American Expeditionary Forces (AEF) deploy to Europe.\n• 1918: Battles of Cantigny, St. Mihiel, and Meuse-Argonne.\n• 11 Nov 1918: Helps secure final Allied victory.\n\n----------- Tech & Tactics: -----------\n• Rapid mobilization and troop transport.\n• Supports tank and aircraft development.\n• Emphasis on open warfare vs trench static warfare.\n\n----------- Homefront & Intelligence: -----------\n• Massive industrial mobilization.\n• Espionage/Sedition Acts restrict dissent.\n• Propaganda via Committee on Public Information.\n• American Protective League conducts surveillance.\n\n----------- Outcome and Legacy: -----------\n• Emerges as major world power.\n• Wilson promotes Fourteen Points and League of Nations.\n• Returns to isolationism postwar.",
  },
};

export class ZoomAmericaLearnWW1ScreenView extends SetupZoomLearnScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, AmericaConfig);
  }
}

/**
 * Europe
 */
const europeConfig: CountryConfig = {
  headerLeft: "LEARN MODE",
  headerRight: "WORLD WAR 1: EUROPE",

  mapImageSrc: "/WorldWar1Europe.png",
  pins: [
    // edit placement          name
    { x: 355, y: 330, name: "German Empire" },
    { x: 380, y: 465, name: "Kingdom of Italy" },
    { x: 265, y: 290, name: "United Kingdom" },
    { x: 300, y: 390, name: "French Republic" },
    { x: 450, y: 350, name: "Austria-Hungary" },
    { x: 520, y: 500, name: "Ottoman Empire" },
  ],
  countryInfo: {
    //  Name              Name and Info Excerpt
    "German Empire": "----------- Role: -----------\n• Central Power leader; primary continental military force.\n\n----------- Key Events & Dates: -----------\n• 28 July–Aug 1914: Mobilizes after Austria-Hungary declares war on Serbia.\n• Aug–Sep 1914: Schlieffen Plan advance halted at the Marne.\n• 1915–1917: Major Western Front battles (Ypres, Verdun, Somme).\n• Feb 1917: Resumes unrestricted submarine warfare.\n• 1917: US enters war partly due to U-boat actions.\n• 1918: Spring Offensives nearly succeed before collapse.\n• 11 Nov 1918: Signs Armistice.\n\n----------- Tech & Tactics: -----------\n• Pioneered stormtrooper infiltration tactics.\n• Extensive use of poison gas.\n• U-boat submarine warfare.\n• Heavy artillery and trench innovations.\n\n----------- Homefront & Intelligence: -----------\n• Severe shortages from Allied blockade.\n• Growing unrest culminating in 1918 mutinies.\n• Zimmerman Telegram diplomatic misstep.\n• Hindenburg–Ludendorff military-industrial control.\n\n----------- Outcome and Legacy: -----------\n• Defeated; Kaiser abdicates.\n• Treaty of Versailles imposes heavy penalties.\n• Political instability sets stage for extremist rise.",
    "Kingdom of Italy": "----------- Role: -----------\n• Initially neutral; joins Allies in 1915 for promised territory.\n\n----------- Key Events & Dates: -----------\n• May 1915: Enters war via Treaty of London.\n• 1915–1917: Eleven Isonzo Battles with heavy losses.\n• Oct 1917: Major defeat at Caporetto.\n• Oct 1918: Victory at Vittorio Veneto breaks Austro-Hungarian resistance.\n\n----------- Tech & Tactics: -----------\n• Mountain/cliff warfare in the Alps.\n• Early aircraft reconnaissance.\n• Arditi shock troops.\n\n----------- Homefront & Intelligence: -----------\n• Economic strain and food shortages.\n• Nationalist pressure for territorial gains.\n• High desertion and morale issues.\n\n----------- Outcome and Legacy: -----------\n• Victorious but dissatisfied with territorial rewards.\n• Postwar instability contributes to rise of Mussolini.",
    "United Kingdom": "----------- Role: -----------\n• Major Allied leader with dominant navy and large Western Front presence.\n\n----------- Key Events & Dates: -----------\n• Aug 1914: Declares war after Germany invades Belgium.\n• 1914–1918: Fights major Western Front battles (Marne, Ypres, Somme).\n• 1916: Battle of Jutland—largest naval battle of WWI.\n• 1917: Issues Balfour Declaration.\n• 1918: Supports final Allied offensives.\n\n----------- Tech & Tactics: -----------\n• Invents and deploys first tanks.\n• Naval blockade of Germany.\n• Room 40 codebreaking successes.\n• Mass artillery and machine-gun warfare.\n\n----------- Homefront & Intelligence: -----------\n• Conscription introduced in 1916.\n• Women enter workforce in large numbers.\n• MI5/MI6 foundations expand.\n• Zeppelin air raids hit civilian areas.\n\n----------- Outcome and Legacy: -----------\n• Victorious but economically strained.\n• Gains League of Nations mandates.\n• Heavy casualties reshape society.",
    "French Republic": "----------- Role: -----------\n• Core Allied Power; main battlefield of the Western Front.\n\n----------- Key Events & Dates: -----------\n• Aug 1914: Resists main German offensive.\n• 1914: First Battle of the Marne halts German advance.\n• 1916: Battle of Verdun—symbol of French endurance.\n• 1917: French Army mutinies after Nivelle Offensive.\n• 1918: Key role in halting German Spring Offensives.\n\n----------- Tech & Tactics: -----------\n• Defensive trench systems.\n• Renault FT tank—first modern tank design.\n• Advanced fighter aircraft (SPAD, Nieuport).\n• Use of colonial troops.\n\n----------- Homefront & Intelligence: -----------\n• Northern France heavily devastated.\n• Massive civilian mobilization for factories.\n• Intelligence cases like Mata Hari.\n• Worker strikes in 1917.\n\n----------- Outcome and Legacy: -----------\n• Victorious but heavily damaged.\n• Recovers Alsace-Lorraine.\n• Advocates harsh terms at Versailles.",
    "Austria-Hungary": "----------- Role: -----------\n• Central Power; multi-ethnic empire leading the conflict’s outbreak.\n\n----------- Key Events & Dates: -----------\n• 28 June 1914: Assassination of Archduke Franz Ferdinand in Sarajevo.\n• 28 July 1914: Declares war on Serbia, starting World War I.\n• 1914–1915: Early failures against Serbia and Russia.\n• 1915: Gains German support; heavy fighting on Eastern and Italian fronts.\n• 1916: Brusilov Offensive devastates Austro-Hungarian armies.\n• 1917–1918: Increasing national unrest among ethnic groups.\n• Oct–Nov 1918: Military collapse; empire disintegrates.\n\n----------- Tech & Tactics: -----------\n• Mountain warfare in the Alps and Carpathians.\n• Combined operations with Germany on Eastern Front.\n• Extensive use of artillery but outdated command structure.\n• Struggled with supply shortages and logistical coordination.\n\n----------- Homefront & Intelligence: -----------\n• Severe food shortages and inflation.\n• Ethnic tensions between Czechs, Hungarians, South Slavs, and others.\n• Intelligence services monitor nationalist movements.\n• Political instability grows as defeat looms.\n\n----------- Outcome and Legacy: -----------\n• Defeated; empire dissolves into multiple independent nations.\n• Creates modern Austria, Hungary, Czechoslovakia, and Yugoslavia.\n• Its collapse reshapes the map of Central and Eastern Europe.",
    "Ottoman Empire": "----------- Role: -----------\n• Central Power; controls strategic Middle Eastern and Balkan regions.\n\n----------- Key Events & Dates: -----------\n• Nov 1914: Enters war on side of Central Powers.\n• 1914–1915: Defeats Allied invasion at Gallipoli.\n• 1915–1917: Caucasus Campaign vs. Russia; heavy losses.\n• 1915: Armenian deportations and mass killings.\n• 1916–1918: Arab Revolt weakens Ottoman control in Arabia.\n• 1918: Defeated by advancing British and Arab forces.\n• Oct 1918: Signs Armistice of Mudros.\n\n----------- Tech & Tactics: -----------\n• Effective defensive tactics at Gallipoli.\n• Limited industrial capacity compared to other powers.\n• Reliance on German advisors for modernization.\n• Harsh desert and mountain warfare.\n\n----------- Homefront & Intelligence: -----------\n• Political fragility under the Young Turk government.\n• Food shortages and economic disruption.\n• Intelligence and counterintelligence operate against Arab nationalist groups.\n• Internal divisions and ethnic conflicts.\n\n----------- Outcome and Legacy: -----------\n• Empire collapses after defeat.\n• Partitioned by Allied powers.\n• Turkish War of Independence leads to founding of modern Turkey in 1923.\n• Middle Eastern borders significantly redrawn.",
  },
};

export class ZoomEuropeLearnWW1ScreenView extends SetupZoomLearnScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, europeConfig);
  }
}

/**
 * Asia
 */
const asiaConfig: CountryConfig = {
  headerLeft: "LEARN MODE",
  headerRight: "WORLD WAR 1: ASIA",

  mapImageSrc: "/WorldWar1Asia.png",
  pins: [
    // edit placement        name
    { x: 600, y: 450, name: "Empire of Japan" },
    { x: 350, y: 300, name: "Russian Empire" },
  ],
  countryInfo: {
    //  Name              Name and Info Excerpt
    "Empire of Japan": "----------- Role: -----------\n• Allied Power seeking expansion in Asia and the Pacific.\n\n----------- Key Events & Dates: -----------\n• Aug 1914: Declares war on Germany.\n• 1914–1915: Seizes German Asian and Pacific colonies.\n• 1915: Issues Twenty-One Demands to China.\n• 1917–1918: Naval escorts in the Mediterranean.\n\n----------- Tech & Tactics: -----------\n• Modern navy and destroyer escorts.\n• Siege warfare at Qingdao.\n• Expanding industrial capacity.\n\n----------- Homefront & Intelligence: -----------\n• Economic boom during war.\n• Expanding intelligence in China/Russia.\n• 1918 Rice Riots reflect social tensions.\n\n----------- Outcome and Legacy: -----------\n• Gains German Pacific colonies.\n• Enhanced global standing (League of Nations).\n• Sets stage for future expansionism.",
    "Russian Empire": "----------- Role: -----------\n• Major Allied Power until 1917; fights Germany and Austria-Hungary.\n\n----------- Key Events & Dates: -----------\n• 1914: Early defeats at Tannenberg and Masurian Lakes.\n• 1915: Great Retreat.\n• 1916: Brusilov Offensive—costly but successful.\n• 1917: Revolutions overthrow Tsar and bring Bolsheviks to power.\n• Mar 1918: Brest-Litovsk Treaty ends Russian participation.\n\n----------- Tech & Tactics: -----------\n• Large infantry armies with poor logistics.\n• Heavy artillery but shortages.\n• Growing desertions.\n\n----------- Homefront & Intelligence: -----------\n• Shortages, famine, and economic collapse.\n• Okhrana unable to contain revolutionary movements.\n• Political instability and Rasputin controversy.\n\n----------- Outcome and Legacy: -----------\n• Withdraws from war and loses territory.\n• Russian Civil War begins.\n• USSR emerges after 1922.",
  },
};

export class ZoomAsiaLearnWW1ScreenView extends SetupZoomLearnScreenView {
  constructor(onStartClick: (level: string) => void) {
    super(onStartClick, asiaConfig);
  }
}
