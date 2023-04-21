var msgBox = document.getElementById('pt')
var textbox = document.getElementById('questionBox');
var domino = document.getElementById('domino');


var Plaintextprompt = "The answer is G four";
generatePigPen(Plaintextprompt)

//Below is the function called the two seperate for loops create the two different shown ciphers
//---------------------------------------------------------------------------
function generatePigPen(plaintext) {
    msgBox.innerText = plaintext;
    for (var i = 0; i < plaintext.length; i++) {
        if (plaintext.charAt(i) == " ") {
            //var spaceChar = document.createElement('span');
            var spaceChar = document.createTextNode("\u2003");
            textbox.appendChild(spaceChar);


        }
        else {
            var char = plaintext.charAt(i).toLowerCase();
            var img = document.createElement('img');
            var imgTitle = 'img/pigpen' + char.toUpperCase() + '.png';
            img.src = imgTitle;
            img.alt = char;
            img.classList.add('picBack');
            textbox.appendChild(img);
        }
    }


    var cipher = "";

    for (var i = 0; i < plaintext.length; i++) {
        var char = plaintext.charAt(i).toLowerCase();

        switch (char) {
            case "a":
                cipher += String.fromCodePoint(0x1F051);
                break;
            case "b":
                cipher += String.fromCodePoint(0x1F052);
                break;
            case "c":
                cipher += String.fromCodePoint(0x1F053);
                break;
            case "d":
                cipher += String.fromCodePoint(0x1F054);
                break;
            case "e":
                cipher += String.fromCodePoint(0x1F055);
                break;
            case "f":
                cipher += String.fromCodePoint(0x1F056);
                break;
            case "g":
                cipher += String.fromCodePoint(0x1F057);
                break;
            case "h":
                cipher += String.fromCodePoint(0x1F058);
                break;
            case "i":
                cipher += String.fromCodePoint(0x1F059);
                break;
            case "j":
                cipher += String.fromCodePoint(0x1F05A);
                break;
            case "k":
                cipher += String.fromCodePoint(0x1F05B);
                break;
            case "l":
                cipher += String.fromCodePoint(0x1F05C);
                break;
            case "m":
                cipher += String.fromCodePoint(0x1F05D);
                break;
            case "n":
                cipher += String.fromCodePoint(0x1F05E);
                break;
            case "o":
                cipher += String.fromCodePoint(0x1F05F);
                break;
            case "p":
                cipher += String.fromCodePoint(0x1F060);
                break;
            case "q":
                cipher += String.fromCodePoint(0x1F061);
                break;
            case "r":
                cipher += String.fromCodePoint(0x1F062);
                break;
            case "s":
                cipher += String.fromCodePoint(0x1F063);
                break;
            case "t":
                cipher += String.fromCodePoint(0x1F064);
                break;
            case "u":
                cipher += String.fromCodePoint(0x1F065);
                break;
            case "v":
                cipher += String.fromCodePoint(0x1F066);
                break;
            case "w":
                cipher += String.fromCodePoint(0x1F067);
                break;
            case "x":
                cipher += String.fromCodePoint(0x1F068);
                break;
            case "y":
                cipher += String.fromCodePoint(0x1F069);
                break;
            case "z":
                cipher += String.fromCodePoint(0x1F06A);
                break;
            case " ":
                cipher += " ";
                break;
            default:
                cipher += char;
        }
    }
    domino.innerText = cipher;
}