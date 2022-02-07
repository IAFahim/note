var Note = /** @class */ (function () {
    function Note(text, end_Time) {
        this._text = text;
        this._create_time = new Date().getTime();
        this._end_time = end_Time;
    }
    return Note;
}());
var Notes = /** @class */ (function () {
    function Notes(key, targetClass, source, button_ID) {
        this._notes = [];
        this._key = key;
        this._targetClass = targetClass;
        this._source = source;
        this._button_ID = button_ID;
        this.notes = JSON.parse(localStorage.getItem(this._key));
    }
    Object.defineProperty(Notes.prototype, "notes", {
        set: function (obj) {
            var _this = this;
            if (!obj) {
                var text = "add Note";
                var date = new Date();
                date.setHours(24);
                var note = new Note(text, date.getTime());
                this.save(this.add(note));
            }
            else {
                this._notes = obj;
                this._notes.forEach(function (note) {
                    _this.add(note);
                });
            }
            document.getElementById(this._button_ID).addEventListener("click", function () {
                var str = document.getElementById(_this._source).value;
                var date = new Date().setHours(24);
                _this.save(_this.add(new Note(str, date)));
            });
        },
        enumerable: false,
        configurable: true
    });
    Notes.prototype.save = function (note) {
        this._notes.push(note);
        localStorage.setItem(this._key, JSON.stringify(this._notes));
    };
    Notes.prototype.add = function (note) {
        var input = document.createElement("input");
        input.setAttribute("class", "checkbox-done-task");
        input.setAttribute("type", "checkbox");
        var p = document.createElement("p");
        p.setAttribute("class", "note-text");
        p.innerText = note._text;
        var element = document.createElement("div");
        element.setAttribute("class", "notes");
        element.appendChild(input);
        element.appendChild(p);
        document.getElementById(this._targetClass).appendChild(element);
        element.addEventListener("click", function () {
            element.remove();
        });
        return note;
    };
    return Notes;
}());
new Notes("note", "notes-holder", "add-notes-input", "add-notes-buttons");
//# sourceMappingURL=index.js.map