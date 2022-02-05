class Note {
    _text
    _create_time
    _end_time

    constructor(text: string, end_Time: Date) {
        this._text = text
        this._create_time = new Date().getTime();
        this._end_time = end_Time
    }
}


class Notes {
    _notes: Note[] = [];
    _key;
    _targetClass;
    _button_ID;
    _source;

    constructor(key: string, targetClass: string, source: string, button_ID: string) {
        this._key = key;
        this._targetClass = targetClass;
        this._source = source;
        this._button_ID = button_ID;
        this.notes = JSON.parse(localStorage.getItem(this._key));
    }

    set notes(obj) {
        if (!obj) {
            let text = "add Note"
            let date: Date = new Date()
            date.setHours(24)
            let note: Note = new Note(text, date)
            this.save(this.add(note))
        } else {
            this._notes = obj
            this._notes.forEach(note => {
                console.log(note)
                this.add(note)
            })
        }
        document.getElementById(this._button_ID).addEventListener("click", () => {
            let str = (document.getElementById(this._source) as HTMLInputElement).value;
            let date: Date = new Date()
            date.setHours(24)
            this.save(this.add(new Note(str, date)))
        })
    }

    save(note: Note) {
        this._notes.push(note)
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

new Notes("note", "notes-holder", "add-notes-input", "add-notes-buttons")
