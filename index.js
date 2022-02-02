class Note {
    _notes = [];
    _key;
    _targetClass;
    _button_ID;
    _source;

    constructor(key, targetClass,source, button_ID) {

        this._key = key;
        this._targetClass = targetClass;
        this._source=source;
        this._button_ID = button_ID;

        if (localStorage.length === 0) {
            this._notes.push("add Note")
            localStorage.setItem(this._key, JSON.stringify(this._notes))
        } else {
            this._notes = JSON.parse(localStorage.getItem(this._key));
            for (let i = 0; i < this._notes.length; i++) {
                console.log(this._notes[i])
            }
        }
        document.getElementById(this._button_ID).addEventListener("click", ev => {
            this.add(document.getElementById(this._source).value)
        })
    }

    get notes() {
        return this._notes;
    }

    add(text) {

        let input = document.createElement("input")
        input.setAttribute("class", "checkbox-done-task")
        input.setAttribute("type", "checkbox")

        let p = document.createElement("p")
        p.setAttribute("class", "note-text")
        p.innerText=text

        let element = document.createElement("div")
        element.setAttribute("class","notes")
        element.appendChild(input);
        element.appendChild(p)

        document.getElementById(this._targetClass).appendChild(element);
    }
}

let note = new Note("note", "notes-holder", "add-notes-input","add-notes-buttons")
