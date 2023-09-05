import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'tactics';

  @ViewChild('display') outputElement: any;
  validExtension = ['sav', 'sv1'];
  fileBuffer: Array<number> = [];
  c = 0;

  CHAR_MAP: Record<number, string> = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'U',
    21: 'V',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z',
    26: 'a',
    27: 'b',
    28: 'c',
    29: 'd',
    30: 'e',
    31: 'f',
    32: 'g',
    33: 'h',
    34: 'i',
    35: 'j',
    36: 'k',
    37: 'l',
    38: 'm',
    39: 'n',
    40: 'o',
    41: 'p',
    42: 'q',
    43: 'r',
    44: 's',
    45: 't',
    46: 'u',
    47: 'v',
    48: 'w',
    49: 'x',
    50: 'y',
    51: 'z',
    52: '0',
    53: '1',
    54: '2',
    55: '3',
    56: '4',
    57: '5',
    58: '6',
    59: '7',
    60: '8',
    61: '9',
    62: '!',
    63: '?',
    64: '.',
    65: ',',
    66: ':',
    67: '&',
    68: '_',
    69: '%',
    70: "'",
    71: '(',
    72: ')',
    73: '<',
    74: '>',
    75: '+',
    76: '-',
    77: '*',
    78: '/',
    79: '=',
    80: '♥',
    81: '"',
    82: '~',
    83: '[',
    84: ']',
    85: ' ',
    86: ' ',
    87: ' ',
    255: '\n',
  };

// Check if valid file
  private validateFile(file: File) {
    let extension = file.name.split('.')[1];
    if (!this.validExtension.includes(extension)) {
      throw "Invalid extension";
    }
    this.outputElement.nativeElement.innerText = file.name;
    var reader = new FileReader();
    let _this = this;
    reader.onload = (e: any) => {
      _this.fileBuffer = [... new Uint8Array(e.target.result)];
    };

    // Read in the image file as a data URL.
    reader.readAsArrayBuffer(file);
  }

// Show name of character
  public showName(charNum: number) {
    let char1 = 57392;
    let str = "";
    let key: number = 255;
    for (let i = 48; i < 64; i++) {
      key = this.fileBuffer[char1 + (charNum * 104) + i];
      if (key === 255) break;
      str += this.CHAR_MAP[key];
    }
    console.log(charNum + 1, str);
  }

  nextItem() {
    this.showName(this.c);
    if (++this.c >= 32) this.c = 0;
  }

  loadFile(event: any) {
    try {
      this.validateFile(event.target.files[0]);
    } catch (e) {
      console.error(e);
    }
    event.target.value = null;
  }
}
