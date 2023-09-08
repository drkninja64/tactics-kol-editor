import {CHAR_MAP} from "../constants/char-map.constants";

export class CharacterModel {
  // The data for the character as a number array
  private raw!: number[];
  // The starting point of the character's data
  private pointer!: number;

  public name: string = "";
  imageUrl: string = "";

  constructor(buffer: number[], pointer: number) {
    this.pointer = pointer;
    // Get the 104 bytes of the character
    this.raw = buffer.slice(pointer, pointer + 104);
    this.name = this.parseName();
    console.log(this.name, this.raw);
  }

  private parseName(): string {
    let str = "";
    let key: number = 255;
    for (let i = 48; i < 64; i++) {
      key = this.raw[i];
      if (key === 255) break;
      str += CHAR_MAP[key];
    }
   return str;
  }
}
