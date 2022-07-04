class ViewStateMachine {
    constructor (currentState, stateToView) {
        this.currentState = currentState;
        this.stateToView = stateToView;

        this.stateToView.get(this.currentState).show();
    }

    switchState(newState) {
        this.stateToView.get(this.currentState).hide();

        this.currentState = newState;
        this.stateToView.get(this.currentState).show();
    }
}