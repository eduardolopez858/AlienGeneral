import { ScreenController, type ScreenSwitcher } from "../../types";
import AbductionGameModel from "./AbductionGameModel";
import AbductionGameView from "./AbductionGameView";


export class AbductionGameController extends ScreenController{
  // fields -----------------------------------------------------------------
  private model: AbductionGameModel;
  private gameView: AbductionGameView;
  private movement = {left: false, right: false};
  private speed = 5; // ship movement speed (set speed vs cpu speed like in class example)
  private gameOver = false;
  private screenSwitcher: ScreenSwitcher;
  private level: number;

  // contructor --------------------------------------------------------------
  constructor(screenSwitcher: ScreenSwitcher, level: number){
    super();

    this.screenSwitcher = screenSwitcher;
    this.model = new AbductionGameModel(); 
    this.gameView = new AbductionGameView();
    this.level = level;
    this.eventHandler();
    this.startMovementLoop();
  }

  // methods -----------------------------------------------------------------
  // event handler
  private eventHandler(){
    // event press down e -> listen and excute event
    window.addEventListener("keydown", (event) => {
      if(event.key === "ArrowLeft"){
        // prevents window movement bug on events (applied to all key movements)
        event.preventDefault();
        this.movement.left = true;
      }
      if(event.key === "ArrowRight"){
        event.preventDefault();
        this.movement.right = true;
      }
      if(event.code === "Space"){
        event.preventDefault();
        this.gameView.fireBeam();
      }
    });

    // event press up e -> listen and excute event
    window.addEventListener("keyup", (event) => {
      if(event.key === "ArrowLeft"){
        event.preventDefault();
        this.movement.left = false;
      }
      if(event.key === "ArrowRight"){
        event.preventDefault();
        this.movement.right = false;
      }
      if(event.code === "Space"){ 
        event.preventDefault();
        this.gameView.stopBeam();
      }
    });
  }

  // movement/game loop for spaceship (run all frames smoothly and making sure all events are const. checked)
  private startMovementLoop(){
    // loop method where all changes happen
    const loop = () => {
      if(this.gameOver) return;
      const ship = this.gameView.spaceship;
      if(ship){
        // no change
        let pos = 0;
        // change
        if(this.movement.left) pos -= this.speed;
        if(this.movement.right) pos += this.speed;
        
        // only move ship on change
        if(pos !== 0){
          ship.x(ship.x() + pos);
          // smooth on every frame
          this.gameView.redraw();
        }

        if(this.gameView.beamAct){
          const hit = this.gameView.check();
          if(hit){
            this.model.useTry();
            this.gameView.updateTriesText(this.model.getTries());
            // end game when target hit or run out of tries
            if(!this.gameView.targetPerson){
              this.endGame("Commander! You've captured the Target! Nice Job!");
            }
            if(this.model.getTries() <= 0){
              this.endGame("Commander! You have no tries left! Game Over!");
            }
          }
        }
      }
      // keep animation loop running (recursive calling)
      requestAnimationFrame(loop); 
    };
    // start animation loop
    loop();
  }

  // end game method (for messaging)
  private endGame(message: string){
    this.gameOver = true;
    this.gameView.beamAct = false;
    this.gameView.stopBeam();
    this.gameView.drawEndMessage(message);
    console.log(message);
    if(this.level == 1) {
      this.screenSwitcher.switchToScreen( {type: "playWW1Dialogue"});
    } else {
      this.screenSwitcher.switchToScreen( {type: "playWW2Dialogue"});
    }
  }

  getView(): AbductionGameView {
    return this.gameView;
  }

}
