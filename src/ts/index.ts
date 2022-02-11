class Note {
    _text: string
    _create_time: number
    _end_time: number

    constructor(text: string, end_Time: number) {
        this._text = text
        this._create_time = new Date().getTime();
        this._end_time = end_Time
    }
}


class Notes {
    _notes: Note[] = [];
    _key: string;
    _targetClass: string;
    _button_ID: string;
    _source: string;

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
            let note: Note = new Note(text, date.getTime())
            this.save(this.add(note))
        } else {
            this._notes = obj
            this._notes.forEach(note => {
                this.add(note)
            })
        }
        document.getElementById(this._button_ID).addEventListener("click", () => {
            let str = (document.getElementById(this._source) as HTMLInputElement).value;
            let date: number = new Date().setHours(24)
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
        element.addEventListener("click", (e) => {
            this.remove(element)
        })
        return note
    }

    remove(element: HTMLElement) {
        let index = 0;
        let toBeRemovedElement = element.getElementsByClassName("checkbox-done-task")[0] as HTMLInputElement;
        if (toBeRemovedElement.checked) {
            element.parentNode.childNodes.forEach((e, i) => {
                if (e === element) {
                    this._notes.splice(i - 1, 1)
                    element.remove()
                    return
                    // this.remove(element,i)
                }
            })
        }
        localStorage.setItem(this._key, JSON.stringify(this._notes))
    }

}

new Notes("note", "notes-holder", "add-notes-input", "add-notes-buttons")
