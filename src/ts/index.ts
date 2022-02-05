class Note {
    _text
    _create_time
    _end_time

    constructor(text, end_Time) {
        this._text = text
        this._create_time = new Date().getTime();
        this._end_time = end_Time
    }

    get text() {
        return this._text
    }
}


class Notes {
    _notes = [];
    _key;
    _targetClass;
    _button_ID;
    _source;

    constructor(key, targetClass, source, button_ID) {
        this._key = key;
        this._targetClass = targetClass;
        this._source = source;
        this._button_ID = button_ID;
        this.notes = JSON.parse(localStorage.getItem(this._key));
    }

    set notes(obj) {
        if (!obj) {
            let text = "add Note"
            this.save(this.add(new Note(text, 0)))
        } else {
            this._notes = obj
            this._notes.forEach(note => {
                console.log(note)
                this.add(note)
            })
        }
        document.getElementById(this._button_ID).addEventListener("click", ev => {
            let str = (document.getElementById(this._source) as HTMLInputElement).value;
            this.save(this.add(new Note(str, 0)))
        })
    }

    save(note: Note) {
        this._notes.push(note)
        console.log(note.text)
        localStorage.setItem(this._key, JSON.stringify(this._notes))
    }

    add(note: Note) {
        let input = document.createElement("input")
        input.setAttribute("class", "checkbox-done-task")
        input.setAttribute("type", "checkbox")

        let p = document.createElement("p")
        p.setAttribute("class", "note-text")
        p.innerText = note._text

        let element = document.createElement("div")
        element.setAttribute("class", "notes")
        element.appendChild(input);
        element.appendChild(p)

        document.getElementById(this._targetClass).appendChild(element);

        return note
    }
}

let note = new Notes("note", "notes-holder", "add-notes-input", "add-notes-buttons")
