export class CounterService {
    private activeToInactive: number = 0;
    private inactiveToActive: number = 0;

    activate(){
        this.inactiveToActive++;
    }
    
    deactivate(){
        this.activeToInactive++;
    }

    printStatus(){
        console.log('From active to inactive: ' + this.activeToInactive
        +'\nFrom inactive to active: ' + this.inactiveToActive);
    }

}