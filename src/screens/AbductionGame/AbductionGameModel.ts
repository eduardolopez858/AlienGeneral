export default class AbductionGameModel{
    // setting game model fields
    private maxTries = 3;
    private currentTry = 0;

    // using up a try (update and game keeps running)
    public useTry(){
        if(this.currentTry < this.maxTries){
            this.currentTry++;
        }
    }
    // tries left
    public getTries(){
        return this.maxTries - this.currentTry;
    }
}