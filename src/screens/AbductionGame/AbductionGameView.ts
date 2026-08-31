// importing konva framework
import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../constants.ts";

// main gameView class
export default class AbductionGameView implements View{
  // fields ---------------------------------------------------------------------------------------
  // tries Text field
  private triesText!: Konva.Text;

  // spaceship, beam, and target fields
  spaceship!: Konva.Group;
  target!: Konva.Circle;
  beam!: Konva.Line;
  beamAct: boolean = false;

  // people fields
  targetPerson: Konva.Group | null;
  targetDir: "left" | "right";
  peopleRight: Konva.Group[] = [];
  peopleLeft: Konva.Group[] = [];
  groundY = 510; 

  private group: Konva.Group;

  // constructor for stage window -------------------------------------------------------------------
  constructor(){
    this.group = new Konva.Group();
    // draw
    this.targetPerson = null;
    this.targetDir = "left";
    this.drawScene(); 
  }

  // methods  ---------------------------------------------------------------------------------------
  // main draw method
  private drawScene(){
    // clear canvas before draw
    this.group = new Konva.Group;
    const W = STAGE_WIDTH;
    const H = STAGE_HEIGHT;
    const groundY = H * 0.65;
    this.groundY = groundY;

    // colors
    const colors = {water: "#6699CC", sky: "#C9ECFE", building1: "#C9B8A8", building2: "#A89988", street: "#5C5C5C", cobblestone: "#4A4A4A", bridge: "#7A6F5D", window: "#2C3E50", roof: "#8B4513", tree: "#4A5F4A"};

    // first layer sky background
    const sky = new Konva.Rect({x: 0, y: 0, width: W, height: H, fill: colors.sky});
    this.group.add(sky);

    // ground layer
    const ground = new Konva.Rect({x: 0, y: groundY, width: W, height: H - groundY, fill: colors.street});
    this.group.add(ground);

    // SOLID : Single purpose of each method (draw method relies on other draw methods)
    // detailed ground stones
    this.drawStones(groundY, colors.cobblestone);

    // canal
    this.drawCanal(colors);

    // generic buildings 
    this.drawBuilding(900, groundY - 290, 150, 290, colors.building1, 4, 5, colors);
    this.drawBuilding(720, groundY - 285, 170, 285, colors.building1, 4, 5, colors);
    this.drawBuilding(500, groundY - 285, 170, 285, colors.building1, 4, 5, colors);
    this.drawBuilding(1200, groundY - 275, 165, 275, colors.building1, 4, 5, colors);
    this.drawBuilding(1000, groundY - 290, 190, 290, colors.building2, 4, 5, colors);
    this.drawBuilding(1300, groundY - 250, 140, 250, colors.building1, 4, 5, colors);
    this.drawBuilding(610, groundY - 270, 310, 270, colors.building2, 4, 5, colors);
    this.drawBuilding(900, groundY - 260, 310, 260, colors.building1, 2, 5, colors);
    this.drawBuilding(1200, groundY - 260, 310, 260, colors.building2, 3, 4, colors);

    // main building
    this.drawMainBuilding(300, groundY - 250, 310, 250, colors);

    // simple trees
    this.drawTree(650, groundY);
    this.drawTree(850, groundY);
    this.drawTree(1000, groundY);
    this.drawTree(1350, groundY);

    // simple street lamps
    this.drawStreetLamp(W * 0.4, groundY);
    this.drawStreetLamp(W * 0.75, groundY);

    // clouds
    this.drawCloud(150, 80, 1.0); 
    this.drawCloud(350, 60, 0.8); 
    this.drawCloud(600, 90, 1.2); 
    this.drawCloud(850, 70, 0.9); 
    this.drawCloud(1000, 70, 1.0); 
    this.drawCloud(1300, 60, 2);

    // tries text display
    this.triesText = new Konva.Text({x: STAGE_WIDTH - 150, y: 20, text: "Tries: 3", fontSize: 24,fill: "black"});
    this.group.add(this.triesText);

    // spaceship
    this.drawSpaceship();

    // adding people to scene
    // start with none
    this.peopleRight = [];
    this.peopleLeft = [];
    // only loop to 15 people
    for(let i = 0; i < 15; i++){
      // start at random depending on width
      const start = Math.random() * STAGE_WIDTH;
      // random gen. directions with 50% prob.
      const direction = Math.random() < 0.5 ? "right" : "left";
      const p = this.drawPerson(start);
      if(direction === "right") {
        this.peopleRight.push(p);
      } else {
        this.peopleLeft.push(p);
      }
      this.group.add(p);
    }

    // adding target person
    this.targetPerson = this.drawTargetPerson(Math.random() * STAGE_WIDTH);
    this.targetDir = Math.random() < 0.5 ? "right" : "left";
    this.group.add(this.targetPerson);

    // bridge
    this.drawBridge(colors);

    // controls message
    this.drawControlsMessage();

    // drawing
    this.group.getLayer()?.draw();

    // walking animation
    this.startPeopleAnimation();
  }

  // ground stones randomly method
  private drawStones(groundY: number, color: string){
    const W = STAGE_WIDTH;
    const H = STAGE_HEIGHT;

    // 20 stones vert. and 20 stones horiz.
    for(let x = 0; x < W; x += 20){
      for(let y = groundY; y < H; y += 20){
        // random placement of bricks -> scatter bricks by a 0.6 range and 0.4 the stone is skipped
        if(Math.random() > 0.4){
          this.group.add(
            new Konva.Rect({
              x: x + 3,
              y: y + 3,
              width: 16,
              height: 16,
              fill: color,
            })
          );
        }
      }
    }
  }

  // tries text updater
  public updateTriesText(remainingTries: number){
    this.triesText.text("Tries: " + remainingTries);
    // redrawing text to new frame
    this.group.getLayer()?.draw();
  }

  // basic building method
  private drawBuilding(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    floors: number,
    windowsPerFloor: number,
    palette: any
  ){
    const building = new Konva.Rect({x, y, width, height, fill: color, stroke: "black", strokeWidth: 2});
    this.group.add(building);

    // roof of building
    const roof = new Konva.Line({points: [x - 10, y, x + width / 2, y - 40, x + width + 10, y,], closed: true, fill: palette.roof, stroke: "black", strokeWidth: 2,});
    this.group.add(roof);
    
    // building windows
    const windowWidth = width / (windowsPerFloor + 1) - 10;
    const windowHeight = height / (floors + 1) - 15;

    for(let floor = 0; floor < floors; floor++){
      for(let w = 0; w < windowsPerFloor; w++){
        const wx = x + 15 + w * (windowWidth + 10);
        const wy = y + 20 + floor * (windowHeight + 15);
        this.group.add(new Konva.Rect({x: wx, y: wy, width: windowWidth, height: windowHeight, fill: palette.window, stroke: "black", strokeWidth: 1,}));
      }
    }
  }

  // main building method (seperate from other to show iconic murder location)
  private drawMainBuilding(
    x: number,
    y: number,
    width: number,
    height: number,
    palette: any
  ){
    const halfHeight = height / 2;
    // adding top half
    const topSection = new Konva.Rect({x, y, width, height: halfHeight, fill: "#FCA3B7", stroke: "black", strokeWidth: 2});
    this.group.add(topSection);
    //adding bottom half
    const bottomSection = new Konva.Rect({x, y: y + halfHeight, width, height: halfHeight, fill: palette.building2, stroke: "black", strokeWidth: 2});
    this.group.add(bottomSection);
    // adding roof using same buidling logic
    const roof = new Konva.Line({points: [x - 10, y, x + width / 2, y - 40, x + width + 10, y], closed: true, fill: palette.roof, stroke: "black", strokeWidth: 2});
    this.group.add(roof);

    // top windows (Square like other buildings)
    const windowsPerFloor = 5;
    const windowSpacingX = width / (windowsPerFloor + 1);
    const windowWidth = windowSpacingX * 0.7;
    const windowHeight = halfHeight * 0.60;

    for(let i = 0; i < windowsPerFloor; i++){
      const wx = x + windowSpacingX * (i + 1) - windowWidth / 2;
      const wy = y + halfHeight * 0.25;
      const window = new Konva.Rect({x: wx, y: wy, width: windowWidth, height: windowHeight * 0.8, fill: palette.window, stroke: "black", strokeWidth: 1});
      this.group.add(window);
    }

    // bottom windows (Iconic windows of the building)
    for(let i = 0; i < windowsPerFloor; i++){
      const wx = x + windowSpacingX * (i + 1) - windowWidth / 2;
      const wy = y + halfHeight + halfHeight * 0.15;
      const arch = new Konva.Path({x: wx, y: wy, data: `M 0 ${windowHeight * 0.5} Q ${windowWidth / 2} 0 ${windowWidth} ${windowHeight * 0.5} L ${windowWidth} ${windowHeight} L 0 ${windowHeight} Z`, fill: palette.window, stroke: "black", strokeWidth: 1});
      this.group.add(arch);
    }
  }

  // canal
  private drawCanal(colors: any){
    const canalWidth = 250;
    const canalDepth = 120;

    // water fill
    const water = new Konva.Rect({x: 0, y: this.groundY + 20, width: canalWidth, height: canalDepth, fill: colors.water});
    this.group.add(water);

    // gap fill
    const gap = new Konva.Rect({x: 0, y: this.groundY, width: canalWidth, height: 50, fill: colors.sky});
    this.group.add(gap);
  }

  // bridge method
  private drawBridge(colors: any){
    const canalWidth = 250;
    
    // bridge base
    const base = new Konva.Rect({x: 0, y: this.groundY - 25, width: canalWidth, height: 50, fill: colors.street});
    this.group.add(base);

    // bridge stands
    const stand1 = new Konva.Rect({x: 20, y: this.groundY, width: 40, height: 143, fill: colors.street});
    const stand2 = new Konva.Rect({x: 170, y: this.groundY, width: 40, height: 143, fill: colors.street});
    this.group.add(stand1, stand2);

    // bridge stones (for base and stands)
    this.group.add(
      new Konva.Rect({x: 10, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 40, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 90, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 120, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 150, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 200, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 220, y: this.groundY - 23, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 5, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 50, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 70, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 95, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 120, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 160, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 195, y: this.groundY + 5, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 235, y: this.groundY + 3, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 20, y: 550, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 43, y: 570, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 20, y: 590, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 43, y: 600, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 20, y: 610, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 43, y: 620, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 170, y: 550, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 193, y: 570, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 170, y: 590, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 193, y: 600, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 170, y: 610, width: 16, height: 16, fill: colors.cobblestone}),
      new Konva.Rect({x: 193, y: 620, width: 16, height: 16, fill: colors.cobblestone})
    );
  }

  // tree method
  private drawTree(x: number, groundY: number){
    const treeGroup = new Konva.Group({x: x, y: groundY});

    // tree trunk
    const trunk = new Konva.Rect({x: -8, y: -60, width: 16, height: 60, fill: "#3D2817", listening: false});
    treeGroup.add(trunk);

    // three bush circles clustered into group (adding this group into tree group)
    const bush = new Konva.Group({x: 0,y: -80,listening: false});

    // top bush
    bush.add(new Konva.Circle({x: 0,y: 0, radius: 35, fill: "#4A5F4A"}));

    // left bush
    bush.add(new Konva.Circle({x: -25, y: 15, radius: 25, fill: "#4A5F4A"}));

    // right bush
    bush.add(new Konva.Circle({x: 25, y: 15, radius: 25, fill: "#4A5F4A"}));

    // adding bush group to tree group
    treeGroup.add(bush);

    // adding tree group to layer
    this.group.add(treeGroup);
}

  // street lamp method
  private drawStreetLamp(x: number, y: number){
    const pole = new Konva.Line({points: [x, y, x, y - 80], stroke: "#2C2C2C", strokeWidth: 4});
    const light = new Konva.Circle({x, y: y - 80, radius: 12, fill: "#FFE4B5" });
    this.group.add(pole, light);
  }

  // cloud method using tree logic
  private drawCloud(x: number, y: number, scale: number){
    // cloud group
    const cloud = new Konva.Group({x, y, scaleX: scale, scaleY: scale, listening: false});

    // main puff
    cloud.add(new Konva.Circle({ x: 0, y: 0, radius: 40, fill: "#FFFFFF", opacity: 0.9 }));

    // left puff
    cloud.add(new Konva.Circle({ x: -35, y: 10, radius: 30, fill: "#FFFFFF", opacity: 0.9 }));

    // right puff
    cloud.add(new Konva.Circle({ x: 35, y: 10, radius: 30, fill: "#FFFFFF", opacity: 0.9 }));

    // bottom puff
    cloud.add(new Konva.Circle({ x: 0, y: 20, radius: 25, fill: "#FFFFFF", opacity: 0.85 })); 

    // adding cloud group to layer
    this.group.add(cloud); 
  }

  // spaceship method using lemon logic with basic animation
  private drawSpaceship(){
    // spaceship group
    const spaceship = new Konva.Group({x: 80, y: 80,});
    // adding group to spaceship object(needed for controller)
    this.spaceship = spaceship;
    // adding to layer
    this.group.add(spaceship);

    // top dome (first layer and base over it)
    const dome = new Konva.Ellipse({x: 0, y: -20, radiusX: 35, radiusY: 20, fill: "#b3e5fc", stroke: "black", strokeWidth: 2});
    // adding to spaceship group
    spaceship.add(dome);

    // base
    const base = new Konva.Ellipse({x: 0, y: 0, radiusX: 60, radiusY: 25, fill: "#3E424B", stroke: "black", strokeWidth: 2});
    // adding to group
    spaceship.add(base);
    
    // glowing sections of spaceship using base logic
    const lightPostions = [-35, 0, 35];
    // for loop for each light postion add to group
      lightPostions.forEach((light) => {
        spaceship.add(new Konva.Ellipse({x: light, y: 8, radiusX: 12, radiusY: 7, fill: "#7CFC00", stroke: "black",strokeWidth: 1}));
    });

    // target lazer
    this.target = new Konva.Circle({x: this.spaceship.x() - 80, y: this.groundY - 70, radius: 5, fill: "red", stroke: "red", strokeWidth: 2});
    // adding target object to spaceship group
    this.spaceship.add(this.target);

    // beam 
    this.beam = new Konva.Line({points: [0, 48, 0, 400], stroke: "#42A5FF", strokeWidth: 40, opacity: 0, lineCap: "round"});
    this.spaceship.add(this.beam);
  }

  // redraw/re-render with every movement change on spaceship controlller
  public redraw(){
    this.group.getLayer()?.draw();
  }

  // both fire and stop beam animations (slowish fade in and fade out)
  // activate beam for controller
  public fireBeam(){
    this.beamAct = true; 
    this.beam.to({ opacity: 0.9, duration: 0.15 });
  }

  // stoping the beam for controller
  public stopBeam(){
    this.beamAct = false;
    this.beam.to({ opacity: 0, duration: 0.15 });
  }

  // collision checking to abuduct people
  public check(){
    if(!this.beamAct) return;
    const beamAbs = this.beam.getAbsolutePosition();
    const beamX = beamAbs.x; // x pos.
    const range = this.beam.strokeWidth() / 2;
    let hits = 0;

    //checking right
    this.peopleRight = this.peopleRight.filter((person) => {
    const pX = person.getAbsolutePosition().x;
    if(Math.abs(pX - beamX) < range){
      // removing person from array and view
      person.destroy(); 
      hits++;
      return false;   
    }    
    return true;     
    });

    // checking left
    this.peopleLeft = this.peopleLeft.filter((person) => {
      const pX = person.getAbsolutePosition().x;
      if(Math.abs(pX - beamX) < range){
        // removing person from array and view
        person.destroy();
        hits++;
        return false;
      }
      return true;
    });

    // checking target
    if(this.targetPerson){
      const targetX = this.targetPerson.getAbsolutePosition().x;
      if(Math.abs(targetX - beamX) < range){
        this.targetPerson.destroy();
        hits++;
        this.targetPerson = null;
      }
    }
    // return true if at least one person is hit (whether left, right, or target)
    return hits > 0;
  }

  // drawing target person method
  private drawTargetPerson(startX: number): Konva.Group {
    // target person group
    const tarPerson = new Konva.Group({x: startX, y: this.groundY - 14});

    // simple stick figure
    // head
    tarPerson.add(new Konva.Circle({x: 0, y: -18, radius: 6, fill: "#ffe0bd"}));
    // body
    tarPerson.add(new Konva.Line({points: [0, -18, 0, 5], stroke: "#ffe0bd", strokeWidth: 2}));
    // arms
    tarPerson.add(new Konva.Line({points: [-9, -5, 9, -5], stroke: "#ffe0bd", strokeWidth: 2}));
    // legs
    tarPerson.add(new Konva.Line({points: [0, 5, -5, 15], stroke: "#ffe0bd", strokeWidth: 2}));
    tarPerson.add(new Konva.Line({points: [0, 5, 5, 15], stroke: "#ffe0bd", strokeWidth: 2}));
    // shirt
    tarPerson.add(new Konva.Rect({x: -3, y: -9, width: 6, height: 13, fill: "#1b618fff", cornerRadius: 2}));
    // belt
    tarPerson.add(new Konva.Rect({x: -3, y: 1, width: 6, height: 5, fill: "red"}));
    // pants
    tarPerson.add(new Konva.Rect({x: -3, y: 3, width: 6, height: 7, fill: "black"}));
    // shoes
    tarPerson.add(new Konva.Rect({x: -6, y: 13, width: 3, height: 3, fill: "black"}));
    tarPerson.add(new Konva.Rect({x: 3, y: 13, width: 3, height: 3, fill: "black"}));
    // hat
    tarPerson.add(new Konva.Rect({x: -7, y: -32, width: 13, height: 11,fill: "#1f5527ff"}));
    tarPerson.add(new Konva.Rect({x: -10, y: -23, width: 19, height: 3,fill: "black"}));
    return tarPerson;
  }

  // drawing person method for people container 
  private drawPerson(startX: number): Konva.Group {
    // random color generator
    const shirtColors = ["#1b618fff", "#875121ff", "#111e16ff"];
    const pantsColors = ["#34495e", "#2c3e50", "#7f8c8d"];
    const shoeColors = ["black", "#4d2600", "#222"];
    const shirtColor = shirtColors[Math.floor(Math.random() * shirtColors.length)];
    const pantsColor = pantsColors[Math.floor(Math.random() * pantsColors.length)];
    const shoeColor = shoeColors[Math.floor(Math.random() * shoeColors.length)];
    // person group like above
    const person = new Konva.Group({x: startX, y: this.groundY - 14});
    // simple stick figure
    // head
    person.add(new Konva.Circle({x: 0, y: -18, radius: 6, fill: "#ffe0bd"}));
    // body
    person.add(new Konva.Line({points: [0, -18, 0, 5], stroke: "#ffe0bd", strokeWidth: 2}));
    // arms
    person.add(new Konva.Line({points: [-9, -5, 9, -5], stroke: "#ffe0bd", strokeWidth: 2}));
    // legs
    person.add(new Konva.Line({points: [0, 5, -5, 15], stroke: "#ffe0bd", strokeWidth: 2}));
    person.add(new Konva.Line({points: [0, 5, 5, 15], stroke: "#ffe0bd", strokeWidth: 2}));
    // shirt
    person.add(new Konva.Rect({x: -3, y: -9, width: 6, height: 13, fill: shirtColor, cornerRadius: 2}));
    // pants
    person.add(new Konva.Rect({x: -3, y: 3, width: 6, height: 7, fill: pantsColor}));
    // shoes
    person.add(new Konva.Rect({x: -6, y: 13, width: 3, height: 3, fill: shoeColor}));
    person.add(new Konva.Rect({x: 3, y: 13, width: 3, height: 3, fill: shoeColor}));
    // hat
    person.add(new Konva.Rect({x: -7, y: -32, width: 13, height: 11,fill: "black"}));
    person.add(new Konva.Rect({x: -10, y: -23, width: 19, height: 3,fill: "black"}));
    return person;
  }

  // walking animation
  public startPeopleAnimation(){
    const speed = 1; // walking speed
    const stageWidth = STAGE_WIDTH;

    // right movement animation
    const animRight = new Konva.Animation(() => {
      // for each person in container right, move right
      this.peopleRight.forEach((person) => {
        person.x(person.x() + speed);
        // ones leaves, other joins logic
        if(person.x() > stageWidth + 20){
          person.x(-50);
        }
      });
    }, this.group.getLayer());

    // left movement animation
    const animLeft = new Konva.Animation(() => {
      // for each person in container left, move left at set speed
      this.peopleLeft.forEach((person) => {
        person.x(person.x() - speed);
        // ones leaves, other joins logic
        if(person.x() < -50){
          person.x(stageWidth + 20);
        }
      });
    }, this.group.getLayer());

    // target movement
    const animTarget = new Konva.Animation(() => {
        if (!this.targetPerson) return;

        // using 50% prob. of either right or left movement for target
        if (this.targetDir === "right") {
            this.targetPerson.x(this.targetPerson.x() + speed);
            if (this.targetPerson.x() > stageWidth + 20) this.targetPerson.x(-50);
        } else {
            this.targetPerson.x(this.targetPerson.x() - speed);
            if (this.targetPerson.x() < -50) this.targetPerson.x(stageWidth + 20);
        }
    }, this.group.getLayer());

    // start animations for all
    animRight.start();
    animLeft.start();
    animTarget.start();
  }

  // end game message draw
   drawEndMessage(text: string){
    // scaling size of box
    const scale = 70;
    // message popup
    const message = new Konva.Text({x: STAGE_WIDTH / 2, y: STAGE_HEIGHT / 2, text: text, fontSize: 36, fontFamily: "Calibri", fill: "white"});
    // text box
    const box = new Konva.Rect({width: message.width() + scale * 2, height: message.height() + scale * 2, fill: "rgba(0, 0, 0, 0.75)", cornerRadius: 15});
    // centering
    const centerX = STAGE_WIDTH / 2;
    const centerY = STAGE_HEIGHT / 2;
    box.x(centerX - box.width() / 2);
    box.y(centerY - box.height() / 2);
    message.x(centerX - message.width() / 2);
    message.y(centerY - message.height() / 2);
    // adding layer
    this.group.add(box, message);
    this.group.getLayer()?.draw();
  }

  // controls message
  private drawControlsMessage(){
    // message group
    const messageGroup = new Konva.Group({x: STAGE_WIDTH - 10, y: STAGE_HEIGHT - 10});
    // message text
    const messageText  = new Konva.Text({text: "Controls:\nArrows <- ->: Move UFO\nSPACE: Abduct", fontSize: 14, fill: "white", align: "left"});

    // adjusting postion
    messageText.offsetX(messageText.width() + 20);
    messageText.offsetY(messageText.height() + 40);

    // adding text to group
    messageGroup.add(messageText);
    // adding to layer
    this.group.add(messageGroup);
  }

  getGroup(): Konva.Group {
    return this.group;
  }

  show(): void {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.draw();
  }
}