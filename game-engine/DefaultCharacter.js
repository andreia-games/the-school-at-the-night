class DefaultPlayer extends Componet {
    constructor(name, x, y, width, height, spriteURL) {
        super(name, x, y, width, height, spriteURL, true);
        this.layout = null;
        this.controler = null;
    }

    setToLayout(layout) {
        this.layout = layout;
        if (this.layout != null) layout.setPlayer(this);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setControler() {
        this.controler = new this.Controler();
    }

    move(xAxis, yAxis) {
        // Initialize with original positions
        let x = this.x + xAxis;
        let y = this.y + yAxis;

        this.layout.changeComponetPosition(this, x, y);
    }

    talk(messange) {
        this.layout.messange(color('black'), 50, CENTER, CENTER, messange, color('white'), 10, 10, 10, 5);
    }

    Controler = class {
        constructor(player) {
            this.player = player;
            this.actions = {}
        }

        setAction(layoutName, actionKey, description, action) {
            if (!this.actions.hasOwnProperty(layoutName)) {
                this.actions[layoutName] = {};
            }
            this.actions[layoutName][actionKey] = {
                description: description,
                action: action
            };
        }

        keyPressed(currentLayout) {
            if (this.actions.hasOwnProperty(currentLayout)) {
                if (this.actions[currentLayout].hasOwnProperty(keyCode)) {
                    this.actions[currentLayout][keyCode].action();
                } else {
                    console.log("In the layout:", currentLayout, "the action", keyCode, "Is not defined");
                }
            } else {
                console.log("The layout:", currentLayout, "has no actions defined");
            }
        }
    }
}